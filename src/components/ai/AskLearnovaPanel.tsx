import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, RefreshCw } from 'lucide-react';
import { useLearner } from '../../context/LearnerContext';
import { askLearnovaAI } from '../../services/aiService';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  isLive?: boolean;
}

interface AskLearnovaPanelProps {
  currentTopic: string;
  conceptName: string;
}

export const AskLearnovaPanel: React.FC<AskLearnovaPanelProps> = ({
  currentTopic,
  conceptName
}) => {
  const { profile } = useLearner();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! I'm your Learnova AI Assistant. Ask me any question about **${conceptName}** in ${currentTopic}, or paste a syllabus below and I’ll explain the relevant topic from it.`,
      isLive: !profile.isDemoMode && Boolean(profile.apiKey)
    }
  ]);
  const [input, setInput] = useState('');
  const [syllabusText, setSyllabusText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    'Explain the main topic from this syllabus in simple language',
    'Why does LEFT JOIN preserve NULLs?',
    'Give me another real-world analogy',
    'What is a common interview question on this?'
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsLoading(true);

    try {
      const contextStr = `Topic: ${currentTopic}, Concept: ${conceptName}, Student Proficiency: ${profile.proficiency}, Style: ${profile.explanationStyle}`;
      const response = await askLearnovaAI(textToSend, contextStr, profile.apiKey, syllabusText);

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        isLive: response.isLive
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error in Ask Learnova:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-xs text-white">Ask Learnova AI</h4>
            <p className="text-[10px] text-slate-400">Contextual Lesson Assistant</p>
          </div>
        </div>

        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${
          profile.apiKey ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
        }`}>
          <Sparkles className="w-2.5 h-2.5" />
          {profile.apiKey ? 'Live Gemini AI' : 'Expert AI Engine'}
        </span>
      </div>

      {/* Messages Scrollable Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-[300px] max-h-[450px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-100 text-indigo-700'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/60'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2 items-center text-xs text-slate-400 p-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
            Learnova AI is thinking...
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-1.5">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            disabled={isLoading}
            className="text-[10px] px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 border border-slate-200 rounded-full transition-colors text-left"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Paste syllabus / course outline */}
      <div className="p-3 bg-slate-50 border-t border-slate-200">
        <label className="block text-[10px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
          Paste syllabus or notes
        </label>
        <textarea
          value={syllabusText}
          onChange={(e) => setSyllabusText(e.target.value)}
          rows={4}
          placeholder="Paste your course syllabus, chapter list, or notes here..."
          className="w-full resize-none px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Input Field */}
      <div className="p-3 bg-white border-t border-slate-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={syllabusText.trim() ? 'Ask about this syllabus...' : `Ask about ${conceptName}...`}
          className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => handleSend()}
          disabled={isLoading || !input.trim()}
          className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
