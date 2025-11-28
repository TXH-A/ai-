import React from 'react';

interface ResultCardProps {
  imageSrc: string | null;
  isLoading: boolean;
  error: string | null;
}

export const ResultCard: React.FC<ResultCardProps> = ({ imageSrc, isLoading, error }) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-3xl shadow-lg shadow-indigo-200/40 border border-indigo-100 overflow-hidden relative transition-all duration-300 hover:shadow-xl hover:shadow-indigo-300/40">
      {/* Header */}
      <div className="px-6 py-5 border-b border-indigo-50 bg-gradient-to-r from-indigo-50/50 to-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-200">
            3
          </span>
          <h3 className="font-bold text-indigo-900 text-lg tracking-tight">生成效果</h3>
        </div>
        <div className="text-indigo-600 bg-white p-2 rounded-xl shadow-sm border border-indigo-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" x2="22" y1="5" y2="5"/><line x1="19" x2="19" y1="2" y2="8"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-5 flex flex-col items-center justify-center min-h-[320px] bg-slate-50/30 relative">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-center p-8 w-full h-full absolute inset-0 bg-white/80 backdrop-blur-sm z-10">
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 border-[6px] border-indigo-100 rounded-full"></div>
              <div className="absolute inset-0 border-[6px] border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <svg className="w-8 h-8 text-indigo-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                 </svg>
              </div>
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">正在施展魔法...</h4>
            <p className="text-slate-500 max-w-xs mx-auto animate-pulse">AI 正在仔细分析服装结构并进行全身合成，请耐心等待 10-20 秒</p>
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-50/50 rounded-2xl border border-red-100 mx-4 max-w-sm animate-fade-in">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-800 font-bold text-lg mb-2">生成遇到问题</p>
            <p className="text-red-600 text-sm leading-relaxed">{error}</p>
          </div>
        ) : imageSrc ? (
          <div className="relative w-full h-full flex items-center justify-center group animate-fade-in p-2">
            <img 
              src={imageSrc} 
              alt="Generated Result" 
              className="max-h-[500px] w-full object-contain rounded-2xl shadow-xl ring-1 ring-black/5" 
            />
            {/* Download Button Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
               <a
                href={imageSrc}
                download="ai-try-on-result.png"
                className="bg-white/90 backdrop-blur-md hover:bg-white text-indigo-600 hover:text-indigo-700 px-6 py-3 rounded-full shadow-lg border border-white/50 flex items-center gap-2.5 font-bold transition-all hover:scale-105 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                保存高清美图
              </a>
            </div>
          </div>
        ) : (
           <div className="text-center text-slate-400 max-w-xs mx-auto">
             <div className="w-24 h-24 mx-auto mb-6 bg-indigo-50/50 rounded-full flex items-center justify-center text-indigo-200 ring-4 ring-indigo-50">
                <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3M3.34 16c-.77 1.333.192 3 1.732 3h13.856c1.54 0 2.502-1.667 1.732-3L12 6l-8.66 10z" />
                </svg>
             </div>
             <p className="font-bold text-slate-600 text-lg mb-2">等待生成</p>
             <p className="text-sm text-slate-500 leading-relaxed">请先在左侧上传人物和服装照片，点击底部的生成按钮即可开始魔法变身。</p>
           </div>
        )}
      </div>
    </div>
  );
};