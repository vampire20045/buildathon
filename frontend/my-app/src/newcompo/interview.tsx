import React, { useState, useEffect, useRef } from "react";

export const InterviewPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(1500);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const VOLUME_THRESHOLD = 5;
  const SILENCE_DURATION = 1500;
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleRecordToggle = async () => {
    if (!isRecording && secondsLeft === 1500) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
        mediaRecorderRef.current = mediaRecorder;

        const ws = new WebSocket("ws://localhost:3000/Interview");
        ws.binaryType = 'arraybuffer'; // to receive audio buffers
        ws.onopen = () => {
          console.log("WebSocket connection established.");
          setSocket(ws);
        };

        ws.onmessage = async (event) => {
          try {
            if (typeof event.data === 'string') {
              const maybeJson = JSON.parse(event.data);
              if (maybeJson?.type === "text") {
                const utterance = new SpeechSynthesisUtterance(maybeJson.text);
                window.speechSynthesis.speak(utterance);
              }
            } else {
              stopRecording();

              const audioBlob = new Blob([event.data], { type: "audio/wav" });
              const audioUrl = URL.createObjectURL(audioBlob);
              const audio = new Audio(audioUrl);
              audio.onended = () => startRecording(ws);
              audio.play();
            }
          } catch (err) {
            console.error("Failed to process WebSocket message", err);
          }
        };

        mediaRecorder.onstart = () => {
          console.log("Recording started...");
        };
        
        mediaRecorder.ondataavailable = async (e) => {
          console.log("Data available:", e.data.size);  // Log size of the data
          if (e.data.size > 0) {
            console.log("Recording audio data:", e.data);
            const buffer = await e.data.arrayBuffer();
            chunksRef.current.push(e.data);
        
            if (ws.readyState === WebSocket.OPEN) {
              console.log("✅ Sending audio chunk to WebSocket:", buffer.byteLength, "bytes");
              ws.send(buffer); // Sending the ArrayBuffer
            }
          } else {
            console.log("No audio data recorded in this chunk.");
          }
        };
        
        
        mediaRecorder.onstop = () => {
          console.log("Recording stopped.");
        };
        
        
        

        mediaRecorder.onstop = async () => {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          chunksRef.current = [];
          await sendAudioToBackend(blob);
        };

        mediaRecorder.start();
        setupSilenceDetection(stream);
        setIsRecording(true);

        const intervalId = setInterval(() => {
          setSecondsLeft((prev) => {
            if (prev <= 1) {
              clearInterval(intervalId);
              stopRecording();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } catch (err) {
        alert("Mic permission required.");
        console.error(err);
      }
    }
  };

  const setupSilenceDetection = (stream: MediaStream) => {
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    const dataArray = new Uint8Array(analyser.fftSize);
    source.connect(analyser);

    sourceRef.current = source;
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;

    const checkSilence = () => {
      analyser.getByteTimeDomainData(dataArray);
      const maxVolume = Math.max(...dataArray);

      if (maxVolume < VOLUME_THRESHOLD) {
        if (!silenceTimerRef.current) {
          silenceTimerRef.current = setTimeout(() => {
            if (mediaRecorderRef.current?.state === "recording") {
              mediaRecorderRef.current.stop();
            }
            silenceTimerRef.current = null;
          }, SILENCE_DURATION);
        }
      } else {
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }
      }

      if (isRecording) requestAnimationFrame(checkSilence);
    };

    checkSilence();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    socket?.close();
    setIsRecording(false);
  };

  const startRecording = (ws: WebSocket) => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setupSilenceDetection(streamRef.current as MediaStream);
      console.log("Recording restarted.");
    }
  };

  const sendAudioToBackend = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("audio", blob, "chunk.webm");

    try {
      console.log("Sending audio to backend...");
      await fetch("http://localhost:3000/Interview/audio", {
        method: "POST",
        body: formData,
      });
    } catch (err) {
      console.error("Failed to send audio chunk", err);
    }
  };

  const formatTime = (sec: number) => {
    const min = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${min}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6 space-y-8">
      <div className="flex flex-row w-full h-2/3 items-center justify-center gap-10">
        <div className="flex flex-col gap-1 h-full w-1/2">
          <div className="flex flex-row gap-2">
            <h2 className="text-blue-700 text-xl font-semibold">AI Question</h2>
            <p className="text-sm text-gray-400 mt-2">Time left: {formatTime(secondsLeft)}</p>
          </div>

          <div className="w-2/3 h-52 bg-gray-800/60 backdrop-blur rounded-2xl p-6 text-center shadow-lg border border-gray-700 flex flex-col justify-center items-center">
            <p className="text-lg mb-4">Tell me about yourself.</p>
          </div>
        </div>

        <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 animate-float shadow-lg flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white/10 border-4 border-white/20 blur-xl" />
        </div>
      </div>

      <button
        onClick={handleRecordToggle}
        disabled={isRecording || secondsLeft === 0}
        className={`mt-6 px-6 py-3 rounded-full text-md font-semibold transition-all duration-300 ${
          isRecording || secondsLeft === 0
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-700 hover:bg-cyan-800"
        }`}
      >
        {isRecording ? "Going on..." : "Start Interview"}
      </button>
    </div>
  );
};

export default InterviewPage;
