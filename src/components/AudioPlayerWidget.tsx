import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';

export const AudioPlayerWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);

  // Web Audio Context & Oscillator Synth references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const noteIndexRef = useRef(0);

  // Canon in D notes & arpeggios (in Hz)
  const melodyNotes = [
    293.66, 369.99, 440.0, 587.33, // D4, F#4, A4, D5
    220.0, 277.18, 329.63, 440.0,  // A3, C#4, E4, A4
    246.94, 293.66, 369.99, 493.88,// B3, D4, F#4, B4
    185.0, 220.0, 277.18, 369.99,  // F#3, A3, C#4, F#4
    196.0, 246.94, 293.66, 392.0,  // G3, B3, D4, G4
    293.66, 369.99, 440.0, 587.33, // D4, F#4, A4, D5
    196.0, 246.94, 293.66, 392.0,  // G3, B3, D4, G4
    220.0, 277.18, 329.63, 440.0   // A3, C#4, E4, A4
  ];

  const playChimeNote = (freq: number) => {
    if (!audioCtxRef.current || isMuted) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Soft envelope for dreamy music-box / harp effect
      noteGain.gain.setValueAtTime(0, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(noteGain);
      if (gainNodeRef.current) {
        noteGain.connect(gainNodeRef.current);
      } else {
        noteGain.connect(ctx.destination);
      }

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.3);
    } catch {
      // AudioContext policy fallback
    }
  };

  const togglePlay = () => {
    if (!isPlaying) {
      // Init Audio Context on user gesture
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
        gainNodeRef.current = audioCtxRef.current.createGain();
        gainNodeRef.current.gain.value = isMuted ? 0 : 0.8;
        gainNodeRef.current.connect(audioCtxRef.current.destination);
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      setIsPlaying(true);
      // Start note scheduler
      timerRef.current = window.setInterval(() => {
        const freq = melodyNotes[noteIndexRef.current % melodyNotes.length];
        playChimeNote(freq);
        noteIndexRef.current = (noteIndexRef.current + 1) % melodyNotes.length;
        setTrackProgress((prev) => (prev >= 100 ? 0 : prev + 3.125));
      }, 500);
    } else {
      setIsPlaying(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = !isMuted ? 0 : 0.8;
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 rounded-full bg-stone-900/90 text-white shadow-xs border border-stone-700/60 backdrop-blur-md">
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-900 hover:bg-rose-800 text-amber-300 flex items-center justify-center transition-transform active:scale-90 cursor-pointer shadow-xs shrink-0"
        title={isPlaying ? 'Tạm dừng nhạc lễ cưới' : 'Phát nhạc hòa tấu lễ cưới'}
      >
        {isPlaying ? <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5" />}
      </button>

      {/* Soundwave animation */}
      <div className="flex items-end gap-0.5 h-2.5 sm:h-3 px-0.5">
        {[0.4, 0.9, 0.6, 1, 0.5, 0.8].map((scale, i) => (
          <span
            key={i}
            className={`w-0.5 rounded-full bg-amber-400 transition-all ${
              isPlaying ? 'animate-pulse' : 'h-1 opacity-40'
            }`}
            style={{
              height: isPlaying ? `${Math.max(3, scale * 12)}px` : '3px',
              animationDelay: `${i * 120}ms`,
            }}
          />
        ))}
      </div>

      {/* Track Label */}
      <div className="hidden md:flex flex-col text-left pr-0.5">
        <span className="text-[9px] font-bold text-amber-300 flex items-center gap-1 leading-none">
          <Sparkles className="w-2 h-2" /> Canon in D
        </span>
        <span className="text-[8px] text-stone-400 leading-tight">
          Hòa tấu lễ cưới
        </span>
      </div>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="p-0.5 text-stone-400 hover:text-white transition-colors cursor-pointer shrink-0"
        title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
      >
        {isMuted ? <VolumeX className="w-3 h-3 text-rose-400" /> : <Volume2 className="w-3 h-3" />}
      </button>

      {/* Mini Progress hairline */}
      {isPlaying && (
        <div className="hidden lg:block w-10 h-1 bg-stone-700/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-rose-400 transition-all duration-500"
            style={{ width: `${trackProgress}%` }}
          />
        </div>
      )}
    </div>
  );
};
