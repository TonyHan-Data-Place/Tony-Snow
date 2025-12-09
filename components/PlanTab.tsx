import React from 'react';
import { ITINERARY_DATA } from '../constants';
import { Snowflake, MapPin, AlertCircle } from 'lucide-react';

const PlanTab: React.FC = () => {
  return (
    <div className="px-4 pb-24 pt-4">
      <h1 className="text-2xl font-bold mb-6 text-winter-blue sticky top-0 bg-snow-light z-10 py-2">行程表 (PLAN)</h1>
      <div className="space-y-6 relative">
        <div className="absolute top-0 left-4 bottom-0 w-0.5 bg-gray-300 -ml-px"></div>
        
        {ITINERARY_DATA.map((item, index) => {
          const markerColor = item.isSkiDay ? 'bg-winter-blue ring-4 ring-ski-highlight' : 'bg-winter-blue ring-4 ring-white';
          const cardClass = item.isSkiDay
            ? 'bg-ski-highlight/20 border-2 border-ski-highlight'
            : 'bg-white border border-gray-100';
          const isImportant = item.important && (item.important.includes('包車') || item.important.includes('退房'));

          return (
            <div key={index} className="relative">
              {/* Dot */}
              <div className="flex items-center space-x-3 mb-2">
                 <div className={`relative z-10 w-8 h-8 rounded-full ${markerColor} flex items-center justify-center shadow-md`}>
                    <Snowflake className="w-4 h-4 text-white" />
                 </div>
                 <div className="text-sm font-bold text-gray-500 bg-white/80 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
                   {item.date}
                 </div>
              </div>

              {/* Card */}
              <div className={`ml-12 p-4 rounded-xl shadow-lg ${cardClass} transition-all hover:shadow-xl`}>
                <h3 className="text-lg font-bold text-winter-blue mb-1">{item.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">{item.details}</p>
                <div className="flex items-center text-xs text-gray-500 font-medium mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    住宿：{item.accommodation}
                </div>

                {item.important && (
                  <div className={`text-xs p-2 rounded-lg flex items-start ${isImportant ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-gray-100 text-gray-700'}`}>
                    <AlertCircle className="w-3 h-3 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span>{item.important}</span>
                  </div>
                )}

                {item.links && item.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.links.map((link, idx) => (
                      <a 
                        key={idx} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 rounded-full bg-winter-blue/10 text-winter-blue text-xs font-semibold hover:bg-winter-blue hover:text-white transition-colors"
                      >
                        <MapPin className="w-3 h-3 mr-1" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanTab;