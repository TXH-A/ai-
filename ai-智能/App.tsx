import React, { useState } from 'react';
import { UploadCard } from './components/UploadCard';
import { ResultCard } from './components/ResultCard';
import { generateTryOn } from './services/geminiService';
import { ImageState } from './types';

export default function App() {
  const [personImage, setPersonImage] = useState<ImageState>({ file: null, previewUrl: null, base64: null });
  const [clothingImage, setClothingImage] = useState<ImageState>({ file: null, previewUrl: null, base64: null });
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePersonUpload = (file: File, result: string) => {
    setPersonImage({ file, previewUrl: result, base64: result });
    setError(null);
  };

  const handleClothingUpload = (file: File, result: string) => {
    setClothingImage({ file, previewUrl: result, base64: result });
    setError(null);
  };

  const handleGenerate = async () => {
    if (!personImage.base64 || !clothingImage.base64) {
      setError("请同时上传人物照片和服装照片。");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const generatedImage = await generateTryOn(personImage.base64, clothingImage.base64);
      setResultImage(generatedImage);
    } catch (err: any) {
      setError(err.message || "发生意外错误。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50/40 via-white to-slate-100 font-sans selection:bg-indigo-100 selection:text-indigo-800">
      
      {/* Background Decoration */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl translate-y-1/4"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 transition-all duration-300 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 text-white p-2.5 rounded-xl shadow-lg shadow-indigo-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2 2 10"/><path d="M22 14 14 22"/></svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI 智能<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">换装</span></h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide">VIRTUAL TRY-ON STUDIO</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
             <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">
               Gemini 2.5 Flash Image
             </span>
             <a href="#" className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">使用教程</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            定义你的<span className="relative whitespace-nowrap">
              <span className="absolute -bottom-2 left-0 right-0 h-4 bg-indigo-200/50 -rotate-1 rounded-full"></span>
              <span className="relative text-indigo-900">专属风格</span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            无需试衣间，上传照片即可一键生成超写实全身试穿效果。<br className="hidden md:block"/>
            <span className="text-indigo-600 font-semibold">AI 驱动</span>，还原真实面料质感与光影细节。
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Uploads (Steps 1 & 2) */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-6">
            {/* Step 1: Person */}
            <div className="flex-1 min-h-[400px]">
               <UploadCard 
                id="person-upload"
                title="上传人物"
                stepNumber="1"
                imageSrc={personImage.previewUrl}
                onImageSelected={handlePersonUpload}
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
              />
            </div>

            {/* Step 2: Clothes */}
            <div className="flex-1 min-h-[400px]">
              <UploadCard 
                id="clothing-upload"
                title="上传服装"
                stepNumber="2"
                imageSrc={clothingImage.previewUrl}
                onImageSelected={handleClothingUpload}
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.4a2 2 0 0 0-1.2-1.2a1.993 1.993 0 0 0-1.8 0l-2.3 1.1a2 2 0 0 1-1.6 0l-2.3-1.1a2 2 0 0 0-1.8 0l-2.3 1.1a2 2 0 0 1-1.6 0l-2.3-1.1a1.993 1.993 0 0 0-1.8 0a2 2 0 0 0-1.2 1.2v16.6a2 2 0 0 0 1.2 1.2a1.993 1.993 0 0 0 1.8 0l2.3-1.1a2 2 0 0 1 1.6 0l2.3 1.1a2 2 0 0 0 1.8 0l2.3-1.1a2 2 0 0 1 1.6 0l2.3 1.1a1.993 1.993 0 0 0 1.8 0a2 2 0 0 0 1.2-1.2V3.4Z"/></svg>}
              />
            </div>
          </div>

          {/* Right Column: Result (Step 3) */}
          <div className="lg:col-span-5 min-h-[500px] lg:min-h-0">
             <ResultCard 
              imageSrc={resultImage}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>

      {/* Floating Action Bar */}
      <div className="sticky bottom-6 z-40 px-4">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl shadow-slate-200/50 p-3 flex items-center justify-between gap-4 pl-6">
          <div className="hidden sm:flex flex-col">
             <span className="text-sm font-bold text-slate-800">
               {personImage.file && clothingImage.file ? "准备就绪" : "等待上传"}
             </span>
             <span className="text-xs text-slate-500">
               {personImage.file && clothingImage.file ? "点击右侧按钮开始生成" : "请先完成上方两个步骤"}
             </span>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!personImage.file || !clothingImage.file || isLoading}
            className={`flex-1 sm:flex-none sm:w-64 h-12 rounded-xl font-bold text-white shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2.5 text-base
              ${(!personImage.file || !clothingImage.file || isLoading) 
                ? 'bg-slate-300 cursor-not-allowed text-slate-500 shadow-none' 
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-indigo-500/30 hover:-translate-y-0.5'}`}
          >
            {isLoading ? (
              <>
                 <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                正在合成中...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2 2 10"/><path d="M22 14 14 22"/></svg>
                立即生成试穿效果
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}