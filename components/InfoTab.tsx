import React from 'react';
import { AlertTriangle, Phone, ShieldAlert, Home, Map, ExternalLink, Car, Snowflake } from 'lucide-react';

const InfoTab: React.FC = () => {
  return (
    <div className="px-4 pb-24 pt-4">
      <h1 className="text-2xl font-bold mb-6 text-winter-blue sticky top-0 bg-snow-light z-10 py-2">重要資訊 (INFO)</h1>

      {/* Emergency */}
      <div className="bg-red-50 p-5 mb-6 rounded-2xl shadow-lg border border-red-100">
        <h2 className="text-lg font-bold mb-4 text-red-600 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" /> 緊急聯絡資訊
        </h2>
        <ul className="space-y-3 text-pine-green text-sm">
          <li className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3 text-red-500 flex-shrink-0">
               <Phone className="w-4 h-4" />
            </div>
            <span>警察 (Police)：<a href="tel:110" className="font-bold underline ml-1">110</a></span>
          </li>
          <li className="flex items-center">
             <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3 text-red-500 flex-shrink-0">
               <Phone className="w-4 h-4" />
            </div>
            <span>救護車/火警：<a href="tel:119" className="font-bold underline ml-1">119</a></span>
          </li>
          <li className="flex items-start">
             <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3 text-red-500 flex-shrink-0 mt-1">
               <ShieldAlert className="w-4 h-4" />
            </div>
            <span className="leading-relaxed">
              <span className="font-bold">務必投保！</span> 滑雪是高風險運動，請在行前投保相關保險。看骨科是很貴的！
            </span>
          </li>
        </ul>
      </div>

      {/* Accommodation */}
      <div className="bg-white p-5 mb-6 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-pine-green flex items-center">
          <Home className="w-5 h-5 mr-2" /> 住宿地點
        </h2>

        <div className="space-y-6">
          <div className="relative pl-4 border-l-4 border-winter-blue">
            <h3 className="font-bold text-winter-blue">旭川住宿 (12/26 - 12/31)</h3>
            <p className="text-sm text-gray-600 mt-1">地址：1条通12丁目209-1, Asahikawa</p>
            <a href="https://maps.app.goo.gl/KDPCAm2G9ciPqe6a8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-sky-500 font-medium mt-2 hover:underline">
              <Map className="w-4 h-4 mr-1" /> Google Map
            </a>
            <p className="text-xs text-red-500 mt-2 bg-red-50 inline-block px-2 py-1 rounded">
               注意：男生請坐著尿尿
            </p>
          </div>

          <div className="relative pl-4 border-l-4 border-sunset-orange">
            <h3 className="font-bold text-sunset-orange">富良野住宿 (12/31 - 01/06)</h3>
            <p className="text-sm text-gray-600 mt-1">地址：1944-84 Nakanosawa, Kamifurano</p>
            <a href="https://maps.app.goo.gl/mCJy1fuFEsMJe9LE6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-sky-500 font-medium mt-2 hover:underline">
               <Map className="w-4 h-4 mr-1" /> Google Map
            </a>
            <p className="text-xs text-red-500 mt-2 bg-red-50 inline-block px-2 py-1 rounded">
               注意：男生請坐著尿尿
            </p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-pine-green">實用連結與注意</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-sky-50 rounded-xl border border-sky-100">
            <h3 className="text-sm font-bold text-sky-700 mb-2 flex items-center">
                <Snowflake className="w-4 h-4 mr-2" /> 雪票/課程
            </h3>
            <div className="space-y-2">
                <a href="https://tw.wamazing.com/snow/items/11845" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-700 hover:text-winter-blue flex items-center">
                    <ExternalLink className="w-3 h-3 mr-2 text-gray-400" /> 神居雪票連結
                </a>
                <a href="https://tw.wamazing.com/snow/items/11830" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-700 hover:text-winter-blue flex items-center">
                    <ExternalLink className="w-3 h-3 mr-2 text-gray-400" /> 富良野雪票連結 (早鳥)
                </a>
            </div>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                建議滑2休1，不確定天數可先買少量。
            </p>
          </div>

          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
             <h3 className="text-sm font-bold text-orange-700 mb-2 flex items-center">
                <Car className="w-4 h-4 mr-2" /> 交通與駕照
            </h3>
            <p className="text-sm text-gray-700 mb-2">
                租車/油錢/過路費以乘車者均攤。
            </p>
            <p className="text-sm font-bold text-red-600">
                Kevin Yang 請務必攜帶駕照日文譯本 + 護照！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoTab;