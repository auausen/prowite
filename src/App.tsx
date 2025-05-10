import React, { useState } from 'react';
import './index.css';

function App() {
  const [profileText, setProfileText] = useState('');
  const [tone, setTone] = useState('bright');
  const [result, setResult] = useState('');

  // Spring Boot 側のAPIを呼び出す処理（仮のURL）
  const handleSubmit = async () => {
    const res = await fetch('http://localhost:8080/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: profileText, tone }),
    });
    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">📝 プロフ添削AI</h1>

      <textarea
        className="w-full p-4 rounded-lg bg-gray-800 text-white"
        placeholder="プロフィール文を入力してください"
        rows={5}
        value={profileText}
        onChange={(e) => setProfileText(e.target.value)}
      />

      <div className="my-4 space-y-2">
        <label className="block">
          <input
            type="radio"
            value="bright"
            checked={tone === 'bright'}
            onChange={() => setTone('bright')}
            className="mr-2"
          />
          明るく元気な印象
        </label>
        <label className="block">
          <input
            type="radio"
            value="serious"
            checked={tone === 'serious'}
            onChange={() => setTone('serious')}
            className="mr-2"
          />
          まじめで誠実な印象
        </label>
        <label className="block">
          <input
            type="radio"
            value="snarky"
            checked={tone === 'snarky'}
            onChange={() => setTone('snarky')}
            className="mr-2"
          />
          ひねくれ診断（ネタ）
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-300"
      >
        🚀 添削する
      </button>

      {result && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
          <p className="mb-2 font-semibold">AIの結果：</p>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
