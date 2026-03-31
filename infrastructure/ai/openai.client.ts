import 'server-only';

import OpenAI from 'openai';

let openAIClient: OpenAI | null = null;

export const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      'OPENAI_API_KEY environment variable is not set. Please set it to use OpenAI-powered quiz features.',
    );
  }

  openAIClient ??= new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  return openAIClient;
};
