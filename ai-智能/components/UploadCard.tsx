import React from 'react';

interface UploadCardProps {
  title: string;
  imageSrc: string | null;
  onImageSelected: (file: File, result: string) => void;
  id: string;
  icon?: React.ReactNode;
  stepNumber: string;
}

export const UploadCard: React.FC<UploadCardProps> = ({ 
  title, 
  imageSrc, 
  onImageSelected, 
  id,
  icon,
  stepNumber
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl shadow-lg shadow-indigo-100/50 border border-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-200/50 hover:-translate-y-1">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-white to-slate-50/50">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm shadow-sm ring-2 ring-white">
            {stepNumber}
          </span>
          <h3 className="font-bold text-slate-800 text-lg tracking-tight">{title}</h3>
        </div>
        <div className="text-indigo-400 bg-indigo-50 p-2 rounded-xl">
          {icon}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-5 flex flex-col items-center justify-center relative min-h-[320px] bg-slate-50/30">
        {imageSrc ? (
          <div className="relative w-full h-full flex items-center justify-center group rounded-2xl overflow-hidden bg-white shadow-inner border border-slate-100 p-2">
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-full object-contain rounded-xl" 
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl pointer-events-none" />
            
            {/* Edit Button */}
            <button
              onClick={() => document.getElementById(id)?.click()}
              className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 hover:text-indigo-600 p-3 rounded-2xl shadow-lg border border-white/50 transition-all hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
              title="更换图片"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
          </div>
        ) : (
          <label 
            htmlFor={id}
            className="group relative flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:bg-white hover:border-indigo-400 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-indigo-50/0 group-hover:bg-indigo-50/30 transition-colors duration-300" />
            
            <div className="relative flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
              <div className="p-4 bg-white shadow-sm ring-1 ring-slate-100 text-indigo-500 rounded-2xl mb-4 group-hover:scale-110 group-hover:shadow-md group-hover:text-indigo-600 transition-all duration-300">
                <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
              </div>
              <p className="mb-2 text-base text-slate-700 font-semibold group-hover:text-indigo-600 transition-colors">点击上传图片</p>
              <p className="text-xs text-slate-400">支持 PNG, JPG (建议全身照)</p>
            </div>
          </label>
        )}
        <input 
          id={id} 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};