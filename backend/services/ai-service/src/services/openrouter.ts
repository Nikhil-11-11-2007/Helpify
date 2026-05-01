import axios from 'axios';
import pino from 'pino';

const logger = pino();

// This is an async generator function - it yields tokens one at a time
// as they arrive from OpenRouter's streaming API
// Think of it like a conveyor belt of text pieces that assemble into the full response
export async function* streamCompletion(messages: Array<{ role: string; content: string }>) {
  // POST to OpenRouter with stream: true - this tells it to send the response
  // as a stream of small chunks instead of waiting for the full response
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'openai/gpt-3.5-turbo',
      messages,
      stream: true,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://chatbot.hackathon',
        'X-Title': 'Chatbot',
      },
      // responseType: 'stream' means we get chunks as they arrive, not all at once
      responseType: 'stream',
    }
  );

  const stream = response.data;
  let buffer = '';

  // Loop through each chunk of data from the stream
  // The AI sends data in the format: "data: {json}\n\ndata: {json}\n\n"
  for await (const chunk of stream) {
    buffer += chunk.toString();
    // Split by newlines and process each line
    const lines = buffer.split('\n');
    // Keep any incomplete line in the buffer for the next chunk
    buffer = lines.pop() || '';

    for (const line of lines) {
      // Each line starts with "data: " followed by JSON or "[DONE]"
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') return;  // AI finished generating
        try {
          const parsed = JSON.parse(data);
          // The actual word fragment is deep in choices[0].delta.content
          const token = parsed.choices?.[0]?.delta?.content;
          if (token) yield token;  // Yield one word fragment at a time
        } catch (err) {
          // Sometimes we get incomplete JSON - just skip those chunks
        }
      }
    }
  }
}
