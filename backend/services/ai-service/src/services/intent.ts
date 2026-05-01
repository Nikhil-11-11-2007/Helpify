import axios from 'axios';

// Asks the AI to figure out what the user wants (e.g., "refund", "complaint", "question")
// Runs BEFORE generating the main response so we can use the intent to decide how to respond
export async function classifyIntent(text: string): Promise<{ intent: string; confidence: number }> {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Classify user intent. Reply with JSON: {"intent": "...", "confidence": 0.0-1.0}',
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

    // Parse the JSON response from the AI - it should return something like
    // {"intent": "refund_request", "confidence": 0.85}
    const content = response.data.choices[0].message.content;
    const parsed = JSON.parse(content);
    return { intent: parsed.intent || 'unknown', confidence: parsed.confidence || 0.5 };
  } catch {
    // If anything fails (network, parse error), default to unknown with low confidence
    return { intent: 'unknown', confidence: 0.5 };
  }
}
