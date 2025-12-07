import React from 'react';
import { AppConfig } from '../types';
import { Wifi, Battery, Signal, Menu, Home, User, Bell } from 'lucide-react';

interface MobilePreviewProps {
  config: AppConfig;
  loading?: boolean;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ config, loading }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      {/* Phone Bezel */}
      <div className="relative border-gray-800 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Notch / Camera */}
        <div className="h-[32px] w-full bg-gray-800 absolute top-0 left-0 z-20 rounded-t-[2rem] flex justify-center">
            <div className="h-[18px] w-[120px] bg-black rounded-b-[1rem]"></div>
        </div>

        {/* Status Bar */}
        <div className="h-8 bg-gray-900 w-full flex items-center justify-between px-5 pt-2 z-10 text-white text-[10px]">
          <span>9:41</span>
          <div className="flex gap-1">
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={12} />
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 bg-gray-50 relative overflow-hidden flex flex-col" style={{ direction: 'rtl' }}>
          
          {/* App Header */}
          <div className="p-4 pt-8 shadow-sm text-white transition-colors duration-500" style={{ backgroundColor: config.primaryColor }}>
             <div className="flex justify-between items-center mt-2">
                <Menu size={20} />
                <h1 className="font-bold text-lg">{config.appName || "معاينة التطبيق"}</h1>
                <Bell size={20} />
             </div>
          </div>

          {/* App Body */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {loading ? (
               <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: config.primaryColor }}></div>
                  <p className="text-gray-500 text-sm">جاري إنشاء الواجهة...</p>
               </div>
            ) : (
                <>
                    {/* Hero Section */}
                    <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
                        <h2 className="font-bold text-gray-800 mb-2">مرحباً بك!</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {config.description || "هذا النص تجريبي لوصف التطبيق. قم بتعديل الوصف لرؤية التغييرات هنا."}
                        </p>
                    </div>

                    {/* Features Grid */}
                    <h3 className="text-gray-700 font-bold mb-3 text-sm">المميزات</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {config.features.length > 0 ? (
                            config.features.map((feature, idx) => (
                                <div key={idx} className="bg-white p-3 rounded-lg shadow-sm flex flex-col items-center justify-center text-center gap-2 border border-gray-100">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-opacity-10" style={{ backgroundColor: `${config.primaryColor}20`, color: config.primaryColor }}>
                                        <span className="font-bold">✓</span>
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">{feature}</span>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 text-center text-gray-400 text-xs py-4 border-2 border-dashed border-gray-300 rounded-lg">
                                أضف مميزات لتظهر هنا
                            </div>
                        )}
                    </div>

                     {/* Fake List */}
                     <h3 className="text-gray-700 font-bold mt-4 mb-3 text-sm">نشاطات حديثة</h3>
                     {[1, 2, 3].map((i) => (
                         <div key={i} className="bg-white p-3 rounded-lg shadow-sm mb-2 flex items-center gap-3">
                             <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                             <div className="flex-1">
                                 <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
                                 <div className="h-2 w-32 bg-gray-100 rounded"></div>
                             </div>
                         </div>
                     ))}
                </>
            )}
          </div>

          {/* Bottom Nav (Mock) */}
          <div className="bg-white border-t border-gray-200 h-16 flex justify-around items-center text-gray-400">
             <div className="flex flex-col items-center text-xs" style={{ color: config.primaryColor }}>
                <Home size={20} />
                <span className="mt-1">الرئيسية</span>
             </div>
             <div className="flex flex-col items-center text-xs">
                <User size={20} />
                <span className="mt-1">حسابي</span>
             </div>
          </div>

        </div>

        {/* Home Indicator */}
        <div className="h-1 w-1/3 bg-white opacity-40 rounded-full absolute bottom-2 left-1/3"></div>
      </div>
      
      <p className="mt-6 text-gray-500 text-sm font-medium">معاينة تفاعلية (Mockup)</p>
    </div>
  );
};

export default MobilePreview;