import { useState, useRef } from 'react';
import { fetchAIResponse } from './api';

function App() {
  const [profile, setProfile] = useState('');
  const [result, setResult] = useState('');
  const [age, setAge] = useState('');
  const [hobby, setHobby] = useState('');
  const [personality, setPersonality] = useState('');
  const resultRef = useRef<HTMLParagraphElement>(null);

  const handleSubmit = async () => {
    setResult('添削中...');
    const aiResponse = await fetchAIResponse(profile);
    setResult(aiResponse);
  };

  const handleGenerate = async () => {
    const generated = await fetchAIResponse('自己紹介文を生成してください');
    setProfile(generated);
  };

  const handleAutoGenerate = () => {
    const sentence = `こんにちは！${hobby}が好きな${age}歳です。${personality}な性格で、週末はよく友達と出かけています。`;
    setProfile(sentence);
  };

  const copyToClipboard = () => {
    if (resultRef.current) {
      navigator.clipboard.writeText(resultRef.current.innerText);
      alert('コピーしました！');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 text-gray-800 p-6 font-sans">
      <h1 className="text-5xl font-extrabold text-center mb-8">🌟 プロフ添削AI 🌟</h1>

      <div className="space-y-4 max-w-md mx-auto">
        <div>
          <label className="block font-bold">年齢:</label>
          <input
            className="w-full p-2 rounded border border-gray-300"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="例: 25"
          />
        </div>
        <div>
          <label className="block font-bold">趣味:</label>
          <input
            className="w-full p-2 rounded border border-gray-300"
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
            placeholder="例: 映画"
          />
        </div>
        <div>
          <label className="block font-bold">性格:</label>
          <input
            className="w-full p-2 rounded border border-gray-300"
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            placeholder="例: 明るい、落ち着いている"
          />
        </div>

        <textarea
          className="w-full h-32 p-4 rounded border border-gray-300"
          placeholder="プロフィール文を入力してください"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        />

        <div className="flex justify-center gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow"
            onClick={handleSubmit}
          >
            🚀 添削する
          </button>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded shadow"
            onClick={handleAutoGenerate}
          >
            ✨ 自動生成する
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-2">AIの添削結果:</h2>
        {result === '添削中...' ? (
          <div className="flex justify-center items-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-gray-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>添削中...</span>
          </div>
        ) : (
          <>
            <p ref={resultRef} className="mb-4 whitespace-pre-wrap">{result}</p>
            <button
              className="bg-black hover:bg-gray-800 text-white font-medium px-4 py-1 rounded"
              onClick={copyToClipboard}
            >
              コピー
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;