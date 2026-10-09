import React, { useState } from 'react';
import { Shield, Info, Key, RotateCcw, X, CheckCircle2, Lock } from 'lucide-react';
import { useLearner } from '../../context/LearnerContext';

interface TransparencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransparencyModal: React.FC<TransparencyModalProps> = ({ isOpen, onClose }) => {
  const { profile, updateProfile, resetAllProgress } = useLearner();
  const [apiKeyInput, setApiKeyInput] = useState(profile.apiKey || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ apiKey: apiKeyInput, isDemoMode: !apiKeyInput.trim() });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all demo learning progress?')) {
      resetAllProgress();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">AI Transparency & Privacy</h3>
              <p className="text-xs text-slate-500">Responsible AI principles behind Learnova AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600">
          {/* Section 1: Privacy Guarantee */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-semibold">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>100% Zero-PII & Local Persistence</span>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Learnova AI collects zero personal names, emails, phone numbers, or passwords. All your learning diagnostic records and mastery metrics remain isolated inside your browser's LocalStorage.
            </p>
          </div>

          {/* Section 2: How Personalization Works */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-600" />
              How Personalization Works
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <li className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="font-semibold text-indigo-900 block mb-1">Misconception Detection</span>
                Wrong quiz options trigger specific error analysis mapping to pinpoint misunderstandings.
              </li>
              <li className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="font-semibold text-indigo-900 block mb-1">Adaptive Questioning</span>
                Question difficulty dynamically scales (Easy → Medium → Hard) based on consecutive accuracy.
              </li>
              <li className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="font-semibold text-indigo-900 block mb-1">Multi-Style Explanations</span>
                Transform any lesson into Story Mode, Step-by-step technical, or Real-world analogies.
              </li>
              <li className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="font-semibold text-indigo-900 block mb-1">Mastery Estimation</span>
                Mastery levels (0-100%) are estimated purely from observed practice performance.
              </li>
            </ul>
          </div>

          {/* Section 3: Optional Live Gemini API Configuration */}
          <form onSubmit={handleSaveKey} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-900 flex items-center gap-2">
                <Key className="w-4 h-4 text-violet-600" />
                Optional: Live Gemini API Key
              </label>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                profile.apiKey ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {profile.apiKey ? 'Live AI Connected' : 'Demo Mode Active'}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              The platform functions seamlessly out-of-the-box with our Expert AI engine without any API key. If you wish to enable live Gemini LLM calls, enter your key below. Keys are never transmitted to external servers.
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-colors"
              >
                Save Connection
              </button>
            </div>
            {saveSuccess && (
              <p className="text-xs text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> API configuration updated successfully!
              </p>
            )}
          </form>

          {/* Section 4: Data Reset Control */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">Clear Learning History</p>
              <p className="text-xs text-slate-500">Reset diagnostic scores, mastery estimates, and quiz logs.</p>
            </div>
            <button
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};
