import React, { useState, useEffect } from 'react';
import { INITIAL_CHECKLIST } from '../constants';
import { ChecklistItem } from '../types';
import { ClipboardList, RotateCcw, PenTool, ExternalLink } from 'lucide-react';

const ListsTab: React.FC = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [memo, setMemo] = useState<string>('');

  useEffect(() => {
    const savedChecklist = localStorage.getItem('travelChecklist');
    if (savedChecklist) {
      setChecklist(JSON.parse(savedChecklist));
    } else {
      setChecklist(INITIAL_CHECKLIST.map(text => ({ text, checked: false })));
    }

    const savedMemo = localStorage.getItem('personalMemoContent');
    if (savedMemo) {
      setMemo(savedMemo);
    }
  }, []);

  const toggleCheck = (index: number) => {
    const newList = [...checklist];
    newList[index].checked = !newList[index].checked;
    setChecklist(newList);
    localStorage.setItem('travelChecklist', JSON.stringify(newList));
  };

  const resetChecklist = () => {
    if (confirm('重設清單?')) {
      const newList = INITIAL_CHECKLIST.map(text => ({ text, checked: false }));
      setChecklist(newList);
      localStorage.setItem('travelChecklist', JSON.stringify(newList));
    }
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setMemo(val);
    localStorage.setItem('personalMemoContent', val);
  };

  // Memo Link Rendering Logic
  const renderMemoContent = (text: string) => {
    if (!text) return <p className="text-gray-400 italic text-sm">無備忘錄內容...</p>;
    
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
    return text.split('\n').map((line, i) => {
      const parts = line.split(urlRegex);
      return (
        <div key={i} className="min-h-[1.2em] mb-1">
          {parts.map((part, j) => {
            if (part && part.match(urlRegex)) {
              return (
                <a key={j} href={part} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-winter-blue/10 text-winter-blue text-xs px-2 py-0.5 rounded mx-1 hover:bg-winter-blue hover:text-white transition-colors">
                  <ExternalLink className="w-3 h-3 mr-1" /> 連結
                </a>
              );
            }
            // Skip regex groups that are part of the split but not the match itself if they are undefined or protocols
            if (part === undefined || part === 'https' || part === 'http') return null;
            return <span key={j} className="text-gray-700 text-sm break-words">{part}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <div className="px-4 pb-24 pt-4">
      <h1 className="text-2xl font-bold mb-6 text-winter-blue sticky top-0 bg-snow-light z-10 py-2">清單與備忘錄 (LISTS)</h1>

      {/* Checklist */}
      <div className="bg-white p-5 mb-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-pine-green flex items-center">
             <ClipboardList className="w-5 h-5 mr-2" /> 行前準備 CheckList
          </h2>
          <button onClick={resetChecklist} className="text-gray-400 hover:text-red-500 transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {checklist.map((item, idx) => (
            <label key={idx} className="flex items-start cursor-pointer group">
              <div className="relative flex items-center mt-0.5">
                <input 
                  type="checkbox" 
                  checked={item.checked} 
                  onChange={() => toggleCheck(idx)}
                  className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded checked:bg-winter-blue checked:border-winter-blue transition-all"
                />
                <svg className="absolute w-3 h-3 text-white hidden peer-checked:block left-1 pointer-events-none" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="1 5 4 8 11 1"></polyline>
                </svg>
              </div>
              <span className={`ml-3 text-sm transition-all ${item.checked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {item.text}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Memo */}
      <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 h-auto">
        <h2 className="text-lg font-semibold mb-3 text-pine-green flex items-center">
            <PenTool className="w-5 h-5 mr-2" /> 個人備忘錄
        </h2>
        <textarea 
          value={memo}
          onChange={handleMemoChange}
          placeholder="在這裡輸入任何備註、待辦事項或網址。網址會自動轉換為連結。"
          className="w-full h-32 p-3 border border-gray-200 rounded-xl mb-4 text-sm focus:ring-2 focus:ring-winter-blue focus:outline-none resize-none bg-gray-50"
        />
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 min-h-[100px]">
          <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">預覽 & 連結點擊</h3>
          {renderMemoContent(memo)}
        </div>
      </div>
    </div>
  );
};

export default ListsTab;