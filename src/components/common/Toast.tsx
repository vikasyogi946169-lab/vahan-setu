import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs font-medium max-w-md">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
