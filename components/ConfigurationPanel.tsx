import React, { useState } from 'react';
import { AppConfig, AppStatus } from '../types';
import { Layers, Package, Palette, FileText, Plus, X, Wand2, Smartphone, LayoutTemplate, Camera } from 'lucide-react';
import { generateAppDescription } from '../services/geminiService';

interface ConfigurationPanelProps {
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  status: AppStatus;
  onGenerate: () => void;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ config, setConfig, status, onGenerate }) => {
  const [newFeature, setNewFeature] = useState('');
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);

  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFeature.trim()) {
      setConfig(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setConfig(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleAutoDescription = async () => {
      if (!config.appName) return;
      setIsGeneratingDesc(true);
      const desc = await generateAppDescription(config.appName, config.features);
      setConfig(prev => ({ ...prev, description: desc }));
      setIsGeneratingDesc(false);
  };

  const applyTemplate = (type: 'empty' | 'uvc') => {
    if (type === 'uvc') {
        setConfig({
            appName: 'UVCCamera Pro',
            packageName: 'com.serenegiant.usbcameratest',
            category: 'Tools',
            primaryColor: '#3b82f6',
            description: 'تطبيق احترافي للتحكم في كاميرات USB الخارجية (UVC) وعرض الفيديو المباشر. يعتمد على مكتبة Serenegiant لتوفير أداء عالي وتوافق واسع مع الأجهزة.',
            features: ['Serenegiant UVCCamera Library', 'USB Device Detection', 'Live Preview', 'Video Recording', 'Snapshot Capture']
        });
    } else {
        setConfig({
            appName: '',
            packageName: '',
            category: 'General',
            primaryColor: '#10b981',
            description: '',
            features: []
        });
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 text-right">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Smartphone className="text-primary" />
          إعدادات التطبيق
        </h2>
        <p className="text-gray-400 text-sm">قم بتخصيص معلومات تطبيقك قبل البدء بعملية البناء.</p>
      </div>

       {/* Templates Section */}
       <div className="mb-6">
         <label className="text-sm font-medium text-gray-300 mb-2 block">قوالب سريعة</label>
         <div className="grid grid-cols-2 gap-3">
            <button 
                onClick={() => applyTemplate('empty')}
                disabled={status !== AppStatus.IDLE && status !== AppStatus.COMPLETED && status !== AppStatus.ERROR}
                className="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-700 bg-dark-light hover:bg-gray-800 transition-colors text-xs text-gray-300"
            >
                <FileText size={16} />
                مشروع جديد
            </button>
            <button 
                onClick={() => applyTemplate('uvc')}
                disabled={status !== AppStatus.IDLE && status !== AppStatus.COMPLETED && status !== AppStatus.ERROR}
                className="flex items-center justify-center gap-2 p-3 rounded-lg border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 transition-colors text-xs text-blue-300 font-medium"
            >
                <Camera size={16} />
                UVCCamera / Serenegiant
            </button>
         </div>
       </div>

       <div className="h-px bg-gray-800 w-full mb-6"></div>

      <div className="space-y-6">
        {/* App Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <FileText size={16} />
            اسم التطبيق
          </label>
          <input
            type="text"
            value={config.appName}
            onChange={(e) => setConfig({ ...config, appName: e.target.value })}
            className="w-full bg-dark-light border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-right placeholder-gray-600"
            placeholder="مثال: متجر إلكتروني"
            disabled={status !== AppStatus.IDLE && status !== AppStatus.COMPLETED && status !== AppStatus.ERROR}
          />
        </div>

        {/* Package Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Package size={16} />
            اسم الحزمة (Package Name)
          </label>
          <input
            type="text"
            value={config.packageName}
            onChange={(e) => setConfig({ ...config, packageName: e.target.value })}
            className="w-full bg-dark-light border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-right placeholder-gray-600 font-mono text-sm"
            placeholder="com.example.myapp"
             disabled={status !== AppStatus.IDLE && status !== AppStatus.COMPLETED && status !== AppStatus.ERROR}
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Layers size={16} />
                الفئة
            </label>
            <select 
                value={config.category}
                onChange={(e) => setConfig({...config, category: e.target.value})}
                className="w-full bg-dark-light border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-right"
                disabled={status !== AppStatus.IDLE && status !== AppStatus.COMPLETED && status !== AppStatus.ERROR}
            >
                <option value="General">عام</option>
                <option value="Business">أعمال</option>
                <option value="Social">تواصل اجتماعي</option>
                <option value="Education">تعليم</option>
                <option value="Entertainment">ترفيه</option>
                <option value="Health">صحة ولياقة</option>
                <option value="Tools">أدوات (Tools)</option>
            </select>
        </div>

        {/* Primary Color */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Palette size={16} />
            اللون الأساسي
          </label>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {['#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899', '#6366f1', '#14b8a6'].map((color) => (
              <button
                key={color}
                onClick={() => setConfig({ ...config, primaryColor: color })}
                className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${config.primaryColor === color ? 'border-white scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: color }}
                type="button"
                disabled={status !== AppStatus.IDLE && status !== AppStatus.COMPLETED && status !== AppStatus.ERROR}
              />
            ))}
            <input 
                type="color" 
                value={config.primaryColor}
                onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-0 p-0"
                disabled={status !== AppStatus.IDLE && status !== AppStatus.COMPLETED && status !== AppStatus.ERROR}
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300">وصف التطبيق</label>
                <button 
                    type="button"
                    onClick={handleAutoDescription}
                    disabled={isGeneratingDesc || !config.appName}
                    className="text-xs text-secondary hover:text-blue-400 flex items-center gap-1 disabled:opacity-50"
                >
                    <Wand2 size={12} />
                    {isGeneratingDesc ? 'جاري الكتابة...' : 'توليد بالذكاء الاصطناعي'}
                </button>
            </div>
            <textarea
                value={config.description}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                className="w-full bg-dark-light border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-right placeholder-gray-600 h-24 resize-none"
                placeholder="صف وظيفة تطبيقك بإيجاز..."
                disabled={status !== AppStatus.IDLE && status !== AppStatus.COMPLETED && status !== AppStatus.ERROR}
            />
        </div>

        {/* Features */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">المميزات والوظائف</label>
          <form onSubmit={handleAddFeature} className="flex gap-2">
            <button
              type="submit"
              disabled={!newFeature.trim() || (status !== AppStatus.IDLE && status !== AppStatus.COMPLETED && status !== AppStatus.ERROR)}
              className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-lg disabled:opacity-50 transition-colors"
            >
              <Plus size={20} />
            </button>
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              className="flex-1 bg-dark-light border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-right placeholder-gray-600"
              placeholder="أضف ميزة (مثال: تسجيل الدخول)"
              disabled={status !== AppStatus.IDLE && status !== AppStatus.COMPLETED && status !== AppStatus.ERROR}
            />
          </form>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {config.features.map((feature, idx) => (
              <span key={idx} className="bg-gray-800 border border-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                <button onClick={() => removeFeature(idx)} className="hover:text-red-400 transition-colors">
                  <X size={14} />
                </button>
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-4">
          <button
            onClick={onGenerate}
            disabled={status !== AppStatus.IDLE && status !== AppStatus.COMPLETED && status !== AppStatus.ERROR}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3
              ${status === AppStatus.IDLE || status === AppStatus.COMPLETED || status === AppStatus.ERROR
                ? 'bg-gradient-to-l from-primary to-emerald-600 text-white hover:shadow-emerald-500/20' 
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
          >
            {status === AppStatus.IDLE || status === AppStatus.COMPLETED || status === AppStatus.ERROR ? (
                <>
                    <Wand2 className="animate-pulse" />
                    <span>إنشاء الكود وملف APK</span>
                </>
            ) : (
                <span>جاري المعالجة...</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;