import React, { useState, useEffect, useMemo } from 'react';
import { GROUP_MEMBERS } from '../constants';
import { Expense } from '../types';
import { calculateSettlement, compressImageToBase64 } from '../utils';
import { Calculator, ArrowRight, Save, Trash2, Camera, Users, Info } from 'lucide-react';

const WalletTab: React.FC = () => {
  // Exchange Rate & Calculator State
  const [exchangeRate, setExchangeRate] = useState<number>(0.22);
  const [calcInput, setCalcInput] = useState<string>('');
  const [calcResultJpy, setCalcResultJpy] = useState<string>('0');
  const [calcResultTwd, setCalcResultTwd] = useState<string>('0');

  // Expense Form State
  const [payer, setPayer] = useState<string>('');
  const [item, setItem] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>(GROUP_MEMBERS);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Data State
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load Initial Data
  useEffect(() => {
    const savedRate = localStorage.getItem('customExchangeRate');
    if (savedRate) setExchangeRate(parseFloat(savedRate));

    const savedExpenses = localStorage.getItem('travelExpenses');
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  // Settlement Calculation
  const settlement = useMemo(() => calculateSettlement(expenses), [expenses]);
  const totalStats = useMemo(() => {
      const totalJpy = expenses.reduce((acc, curr) => acc + curr.jpy, 0);
      const totalTwd = expenses.reduce((acc, curr) => acc + curr.twd, 0);
      return { totalJpy, totalTwd };
  }, [expenses]);

  // Handlers
  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setExchangeRate(val);
    localStorage.setItem('customExchangeRate', val.toString());
  };

  const handleCalculate = () => {
    try {
      // eslint-disable-next-line no-new-func
      const result = new Function('return ' + calcInput)();
      if (!isNaN(result)) {
        setCalcResultJpy(Math.round(result).toLocaleString() + ' JPY');
        setCalcResultTwd(Math.round(result * exchangeRate).toLocaleString() + ' TWD');
      } else {
        setCalcResultJpy('Error');
        setCalcResultTwd('-');
      }
    } catch {
      setCalcResultJpy('Error');
      setCalcResultTwd('-');
    }
  };

  const toggleMember = (member: string) => {
    setSelectedMembers(prev => 
      prev.includes(member) ? prev.filter(m => m !== member) : [...prev, member]
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64 = await compressImageToBase64(e.target.files[0]);
        setImagePreview(base64);
      } catch (err) {
        console.error('Image upload failed', err);
        alert('照片處理失敗');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payer) return alert('請選擇付款人');
    if (selectedMembers.length === 0) return alert('請至少選擇一位分賬成員');
    
    const amountVal = parseFloat(amount);
    if (isNaN(amountVal) || amountVal <= 0) return alert('金額無效');

    const twdAmount = amountVal * exchangeRate;
    const splitCount = selectedMembers.length;
    
    const newExpense: Expense = {
      id: Date.now(),
      item,
      jpy: amountVal,
      twd: twdAmount,
      payer,
      splitCount,
      twdPerPerson: twdAmount / splitCount,
      participants: selectedMembers,
      date: new Date().toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit' }),
      thumbnail: imagePreview || undefined,
    };

    const newExpenses = [newExpense, ...expenses];
    setExpenses(newExpenses);
    localStorage.setItem('travelExpenses', JSON.stringify(newExpenses));

    // Reset Form
    setItem('');
    setAmount('');
    setImagePreview(null);
    setSelectedMembers(GROUP_MEMBERS);
  };

  const handleDelete = (id: number) => {
    if (confirm('確定刪除此筆紀錄?')) {
      const newExpenses = expenses.filter(e => e.id !== id);
      setExpenses(newExpenses);
      localStorage.setItem('travelExpenses', JSON.stringify(newExpenses));
    }
  };

  return (
    <div className="px-4 pb-24 pt-4">
      <h1 className="text-2xl font-bold mb-6 text-winter-blue sticky top-0 bg-snow-light z-10 py-2">記帳與匯率 (WALLET)</h1>

      {/* Calculator */}
      <div className="bg-white p-5 mb-6 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-lg font-semibold mb-3 text-pine-green flex items-center">
            <Calculator className="w-5 h-5 mr-2" /> 即時匯率換算
        </h2>
        <div className="flex items-center space-x-3 mb-3 text-sm">
          <label className="text-gray-600">匯率 (1 JPY = ? TWD):</label>
          <input 
            type="number" 
            step="0.0001" 
            value={exchangeRate} 
            onChange={handleRateChange}
            className="w-24 p-1.5 border border-gray-300 rounded-lg text-center font-mono bg-gray-50 focus:ring-2 focus:ring-winter-blue focus:outline-none"
          />
        </div>
        <input 
          type="text" 
          value={calcInput}
          onChange={(e) => setCalcInput(e.target.value)}
          placeholder="輸入算式 (例: 500+200*3)" 
          className="w-full p-4 mb-4 text-xl font-mono border-2 border-winter-blue/30 rounded-xl bg-gray-50 focus:border-winter-blue focus:outline-none"
        />
        <div className="flex justify-between items-center">
          <button onClick={handleCalculate} className="bg-winter-blue text-white py-2 px-6 rounded-xl font-bold shadow-md hover:bg-pine-green active:scale-95 transition-all">
            換算 (=)
          </button>
          <div className="text-right">
            <p className="text-xs text-gray-500">總額 (JPY)</p>
            <p className="text-xl font-bold text-pine-green">{calcResultJpy}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">換算 (TWD)</p>
            <p className="text-xl font-bold text-sunset-orange">{calcResultTwd}</p>
          </div>
        </div>
      </div>

      {/* Settlement Section */}
      <div className="bg-white p-5 mb-6 rounded-2xl shadow-lg border border-winter-blue/20">
        <h2 className="text-lg font-semibold mb-4 text-winter-blue flex items-center">
          <Users className="w-5 h-5 mr-2" /> 總結算 (Debt Settlement)
        </h2>
        <div className="space-y-3">
          {settlement.length === 0 ? (
            <p className="text-center text-gray-500 py-2">目前無債務或已結清。</p>
          ) : (
            settlement.map((t, idx) => (
              <div key={idx} className="flex justify-between items-center bg-red-50 p-3 rounded-lg border border-red-100 text-sm">
                 <div className="flex items-center space-x-2">
                    <span className="font-bold text-red-700">{t.from}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="font-bold text-winter-blue">{t.to}</span>
                 </div>
                 <span className="font-extrabold text-sunset-orange">{t.amount.toLocaleString()} <span className="text-xs font-normal text-gray-500">TWD</span></span>
              </div>
            ))
          )}
          <p className="text-xs text-center text-gray-400 mt-2">（金額為 TWD 換算後四捨五入取整數）</p>
        </div>
      </div>

      {/* Add Expense Form */}
      <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-pine-green flex items-center">
            <Save className="w-5 h-5 mr-2" /> 新增消費紀錄
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">付款人</label>
            <select 
              value={payer} 
              onChange={(e) => setPayer(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-winter-blue focus:outline-none"
              required
            >
              <option value="" disabled>請選擇付款人</option>
              {GROUP_MEMBERS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="col-span-2">
                <input 
                    type="text" 
                    placeholder="品項 (如: 纜車票)" 
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-winter-blue focus:outline-none"
                    required
                />
              </div>
              <div className="col-span-1">
                 <input 
                    type="number" 
                    placeholder="JPY" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-winter-blue focus:outline-none"
                    required
                 />
              </div>
          </div>

          <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
             <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-gray-600">分賬成員 ({selectedMembers.length})</h3>
                <div className="space-x-2">
                    <button type="button" onClick={() => setSelectedMembers(GROUP_MEMBERS)} className="text-xs text-winter-blue font-medium hover:underline">全選</button>
                    <button type="button" onClick={() => setSelectedMembers([])} className="text-xs text-gray-400 hover:text-red-500 hover:underline">全取消</button>
                </div>
             </div>
             <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
                {GROUP_MEMBERS.map((member, idx) => (
                    <label key={idx} className="flex items-center space-x-2 cursor-pointer p-1 rounded hover:bg-white transition-colors">
                        <input 
                            type="checkbox" 
                            checked={selectedMembers.includes(member)}
                            onChange={() => toggleMember(member)}
                            className="w-4 h-4 text-winter-blue rounded border-gray-300 focus:ring-winter-blue"
                        />
                        <span className="text-xs text-gray-700 truncate">{member}</span>
                    </label>
                ))}
             </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center justify-center w-full p-3 bg-gray-100 text-gray-600 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors">
                <Camera className="w-5 h-5 mr-2" />
                <span className="text-sm">拍照/上傳照片</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {imagePreview && (
                <div className="mt-3 relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
                    <img src={imagePreview} alt="Preview" className="h-full object-contain" />
                    <button 
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-red-500"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )}
          </div>

          <button type="submit" className="w-full bg-sunset-orange text-white py-3.5 rounded-xl font-bold shadow-lg hover:bg-red-500 active:scale-95 transition-all flex items-center justify-center">
            <Save className="w-5 h-5 mr-2" /> 儲存紀錄
          </button>
        </form>
      </div>

      {/* History List */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-pine-green flex items-center justify-between">
            <span>歷史消費</span>
            <span className="text-xs font-normal text-gray-500 bg-gray-200 px-2 py-1 rounded-full">{expenses.length} 筆</span>
        </h2>
        
        {expenses.length > 0 && (
             <div className="flex justify-between items-center bg-winter-blue text-white p-4 rounded-xl shadow-lg mb-4">
                <span className="font-medium text-sm">總計</span>
                <div className="text-right">
                    <p className="font-bold text-lg">{Math.round(totalStats.totalJpy).toLocaleString()} JPY</p>
                    <p className="text-sm text-ski-highlight">{Math.round(totalStats.totalTwd).toLocaleString()} TWD</p>
                </div>
            </div>
        )}

        <div className="space-y-3">
          {expenses.map(expense => (
            <div key={expense.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group">
               <div className="flex justify-between items-start">
                   <div className="flex space-x-3 items-start flex-1 min-w-0">
                       {expense.thumbnail ? (
                           <img src={expense.thumbnail} alt="receipt" className="w-12 h-12 rounded-lg object-cover border border-gray-200 flex-shrink-0" />
                       ) : (
                           <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 flex-shrink-0">
                               <Info className="w-5 h-5" />
                           </div>
                       )}
                       <div className="flex-1 min-w-0">
                           <h3 className="font-bold text-pine-green truncate pr-6">{expense.item}</h3>
                           <div className="flex items-center text-xs text-winter-blue mt-0.5">
                               <Users className="w-3 h-3 mr-1" />
                               {expense.payer} 付款
                           </div>
                           <p className="text-xs text-gray-400 mt-1">{expense.date}</p>
                       </div>
                   </div>
                   <div className="text-right flex-shrink-0">
                        <p className="font-bold text-pine-green">{Math.round(expense.jpy).toLocaleString()} <span className="text-xs font-normal">JPY</span></p>
                        <p className="text-sm text-sunset-orange">{Math.round(expense.twd).toLocaleString()} <span className="text-xs font-normal">TWD</span></p>
                   </div>
               </div>
               
               {expense.splitCount > 0 && (
                   <div className="mt-3 pt-2 border-t border-gray-100">
                       <p className="text-xs text-gray-500 flex justify-between">
                           <span>分攤給 {expense.splitCount} 人</span>
                           <span>每人約 {Math.round(expense.twdPerPerson).toLocaleString()} TWD</span>
                       </p>
                       <p className="text-[10px] text-gray-400 mt-1 truncate">
                           {expense.participants.join(', ')}
                       </p>
                   </div>
               )}

               <button 
                  onClick={() => handleDelete(expense.id)}
                  className="absolute top-2 right-2 text-gray-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
               >
                   <Trash2 className="w-4 h-4" />
               </button>
            </div>
          ))}
          
          {expenses.length === 0 && (
              <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                  <p className="text-gray-400">尚無紀錄</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletTab;