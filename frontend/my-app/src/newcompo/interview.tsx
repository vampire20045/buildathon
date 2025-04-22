import React, { useState, useRef } from 'react';

export const InterviewPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const to16BitPCM = (input: Float32Array) => {
    const output = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return output;
  };

  const startStreaming = async () => {
    // Connect to your backend on port 3000
    const ws = new WebSocket('ws://localhost:3000/Interview');
    ws.binaryType = 'arraybuffer';
    socketRef.current = ws;

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
      alert('Cannot connect to interview server.');
      throw new Error('WebSocket connection failed');
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    ws.onopen = async () => {
      console.log('🔗 WebSocket open');

      const audioCtx = new AudioContext({ sampleRate: 16000 });
      audioCtxRef.current = audioCtx;

      const workletCode = `
        class PCMProcessor extends AudioWorkletProcessor {
          process(inputs) {
            const input = inputs[0][0];
            if (input) this.port.postMessage(input);
            return true;
          }
        }
        registerProcessor('pcm-processor', PCMProcessor);
      `;
      const blob      = new Blob([workletCode], { type: 'application/javascript' });
      const moduleUrl = URL.createObjectURL(blob);

      await audioCtx.audioWorklet.addModule(moduleUrl);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioCtx.createMediaStreamSource(stream);
      sourceRef.current = source;

      const pcmNode = new AudioWorkletNode(audioCtx, 'pcm-processor');
      workletNodeRef.current = pcmNode;

      pcmNode.port.onmessage = (e) => {
        const floatData = e.data as Float32Array;
        const int16     = to16BitPCM(floatData);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(int16.buffer);
        }
      };

      source.connect(pcmNode).connect(audioCtx.destination);
    };

    ws.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data as string);
        if (msg.type === 'text') {
          console.log('💬 AI reply:', msg.data);
        }
      } catch (err) {
        console.error('Invalid WS message:', err);
      }
    };
  };

  const stopStreaming = () => {
    socketRef.current?.close();
    workletNodeRef.current?.disconnect();
    sourceRef.current?.disconnect();
    audioCtxRef.current?.close();
  };

  const handleRecordToggle = async () => {
    if (!isRecording) {
      setIsRecording(true);
      try {
        await startStreaming();
      } catch {
        setIsRecording(false);
      }
    } else {
      stopStreaming();
      setIsRecording(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">AI Interview Page</h1>
      <button
        type="button"
        className="mt-4 p-2 bg-blue-600 text-white rounded"
        onClick={handleRecordToggle}
      >
        {isRecording ? 'Stop Recording' : 'Start Interview'}
      </button>
    </div>
  );
};

export default InterviewPage;
