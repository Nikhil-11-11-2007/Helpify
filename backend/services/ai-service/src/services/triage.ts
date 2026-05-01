import { classifyIntent } from './intent';
import { analyzeSentiment } from './sentiment';

// This is the main decision-making pipeline
// It runs intent + sentiment in PARALLEL (both at the same time for speed)
// Then combines them to decide: answer this ourselves or hand it to a human?
export async function triage(text: string) {
  // Promise.all runs both AI calls simultaneously - faster than one after the other
  const [intentResult, sentimentResult] = await Promise.all([
    classifyIntent(text),
    analyzeSentiment(text),
  ]);

  // Average the confidence scores from both analyses
  const confidence = (intentResult.confidence + sentimentResult.confidence) / 2;

  const shouldEscalate = confidence < 0.6;

  return {
    intent: intentResult.intent,
    sentiment: sentimentResult.sentiment,
    confidence,
    shouldEscalate,
  };
}
