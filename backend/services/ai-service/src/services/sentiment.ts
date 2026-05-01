import axios from 'axios';

// Analyzes whether the user sounds happy, neutral, or upset
// This helps decide if we need to be extra careful or apologetic in the response
export async function analyzeSentiment(text: string): Promise<{ sentiment: string; confidence: number }> {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Analyze sentiment. Reply with JSON: {"sentiment": "positive|neutral|negative", "confidence": 0.0-1.0}',
          },
          { role: 'user', content: text },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    const parsed = JSON.parse(content);
    return { sentiment: parsed.sentiment || 'neutral', confidence: parsed.confidence || 0.5 };
  } catch {
    return { sentiment: 'neutral', confidence: 0.5 };
  }
}
