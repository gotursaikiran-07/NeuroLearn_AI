import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Square } from 'lucide-react';

interface TextToSpeechButtonProps {
  textToRead: string;
  label?: string;
}

export const TextToSpeechButton: React.FC<TextToSpeechButtonProps> = ({
  textToRead,
  label = 'Listen'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }
  }, []);

  const handleTogglePlay = () => {
    if (!isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel(); // Stop any previous playback

      // Clean markdown symbols for clearer speech synthesis
      const cleanText = textToRead
        .replace(/[*#_`>]/g, '')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1');

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  if (!isSupported) {
    return (
      <span className="text-xs text-slate-400 flex items-center gap-1">
        <VolumeX className="w-3.5 h-3.5" /> Speech unavailable in browser
      </span>
    );
  }

  return (
    <button
      onClick={handleTogglePlay}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        isPlaying
          ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
      }`}
      title={isPlaying ? 'Stop Speech' : 'Listen to Explanation'}
    >
      {isPlaying ? (
        <>
          <Square className="w-3.5 h-3.5 fill-current" />
          <span>Stop Speech</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
