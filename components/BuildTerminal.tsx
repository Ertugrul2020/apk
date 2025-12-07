import React, { useEffect, useRef } from 'react';
import { BuildLog } from '../types';
import { Terminal, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface BuildTerminalProps {
  logs: BuildLog[];
  isVisible: boolean;
}

const BuildTerminal: React.FC<BuildTerminalProps> = ({ logs, isVisible }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isVisible) return null;

  return (
    <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-gray-700 shadow-2xl flex flex-col h-[300px] w-full mt-6">
      {/* Terminal Header */}
      <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-gray-400" />
          <span className="text-gray-300 text-xs font-mono">APK Builder Console</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Terminal Content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1.5" style={{ direction: 'ltr' }}>
        {logs.length === 0 && (
            <div className="text-gray-500 italic">Ready to build...</div>
        )}
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-2 animate-fadeIn">
            <span className="text-gray-500 text-[10px] min-w-[60px] pt-1">
                {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}
            </span>
            {log.type === 'success' && <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />}
            {log.type === 'error' && <AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" />}
            {log.type === 'warning' && <AlertCircle size={14} className="text-yellow-500 mt-0.5 shrink-0" />}
            {log.type === 'info' && <span className="text-blue-400 font-bold mt-0.5 shrink-0">i</span>}
            
            <span className={`break-all ${
              log.type === 'success' ? 'text-green-400' :
              log.type === 'error' ? 'text-red-400' :
              log.type === 'warning' ? 'text-yellow-400' :
              'text-gray-300'
            }`}>
              {log.message}
            </span>
          </div>
        ))}
        {logs.some(l => l.message.includes('Building')) && !logs.some(l => l.message.includes('Success') || l.message.includes('Failed')) && (
             <div className="flex items-center gap-2 text-gray-400">
                <Loader2 size={14} className="animate-spin" />
                <span>Processing task...</span>
             </div>
        )}
      </div>
    </div>
  );
};

export default BuildTerminal;