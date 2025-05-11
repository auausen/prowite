export async function fetchAIResponse(profile: string): Promise<string> {
    // 本番APIが使えないため仮の応答
    return `（仮の添削結果）${profile}（←もっと丁寧に！）`;
}

// src/api.ts
export async function generateProfile(): Promise<string> {
    // 本番APIが使えないための仮置き
    return 'こんにちは！映画とカフェ巡りが好きな25歳です。週末はよく友達と旅行に行っています。';
}
