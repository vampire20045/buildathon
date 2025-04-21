import React, { useState, useEffect, useRef } from "react";

export const InterviewPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(1500);
  const [socket, setSocket] = useState<WebSocket | null>(null); // WebSocket state

  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const VOLUME_THRESHOLD = 5; // silence if max < 5
  const SILENCE_DURATION = 1500; // 1.5 seconds
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleRecordToggle = async () => {
    if (!isRecording && secondsLeft === 1500) {
      try {
        // Start recording
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        // Set up WebSocket connection
        const ws = new WebSocket("wss://your-backend-websocket-url"); // Replace with your WebSocket URL
        ws.onopen = () => {
          console.log("WebSocket connection established.");
          setSocket(ws);
        };

        // Handle server's audio response
        ws.onmessage = async (event) => {
          const response = event.data;

          if (response) {
            if (response.type === "audio") {
              // If the response is audio data, stop recording and play it
              stopRecording(); // Stop microphone recording

              // Play the server's audio response
              const audioBlob = new Blob([response.data], { type: "audio/wav" });
              const audioUrl = URL.createObjectURL(audioBlob);
              const audio = new Audio(audioUrl);
              audio.onended = () => {
                // After the audio finishes, start recording again
                startRecording(ws); // Start recording user audio again
              };
              audio.play();
            } else {
              // Handle text responses, for example using text-to-speech
              const utterance = new SpeechSynthesisUtterance(response);
              window.speechSynthesis.speak(utterance);
            }
          }
        };

        // Send audio chunk to WebSocket server
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunksRef.current.push(e.data);
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(e.data); // Send the audio chunk to backend
            }
          }
        };

        // Stop recording and finalize audio
        mediaRecorder.onstop = async () => {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          chunksRef.current = [];
          await sendAudioToBackend(blob); // For final audio processing if needed
        };

        mediaRecorder.start(); // Start continuous recording
        setupSilenceDetection(stream);
        setIsRecording(true);

        // Countdown timer
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
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
              mediaRecorderRef.current.stop(); // Trigger onstop and sendAudio
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

    setIsRecording(false);
  };

  const startRecording = (ws: WebSocket) => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start(); // Restart recording
      setIsRecording(true); // Mark as recording
      setupSilenceDetection(streamRef.current as MediaStream); // Continue silence detection
    }
  };

  const sendAudioToBackend = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("audio", blob, "chunk.webm");

    try {
      await fetch("https://your-backend.com/upload-audio", {
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
