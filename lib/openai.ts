import OpenAI from 'openai';

let openai: OpenAI | null = null;

function getOpenAI() {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

export async function generateInsight(moodLogs: any[], lastChats: string[]): Promise<string> {
  try {
    const client = getOpenAI();
    const prompt = `Analyze these mood logs and chats for mental health insights. Mood 1-5 scale. Logs: ${JSON.stringify(moodLogs.slice(-7))}. Recent chats: ${lastChats.slice(-3).join(', ')}. Give 1 actionable insight for better mental health in 1 sentence.`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
    });

    return completion.choices[0].message.content || 'Take a deep breath and reflect.';
  } catch (error) {
    console.error('OpenAI error:', error);
    return 'Take a deep breath and reflect on your day.';
  }
}

export async function generateReply(message: string, context: string[]): Promise<string> {
  try {
    const client = getOpenAI();
    const prompt = `You are Mira, empathetic mental health companion. Reply warmly to: ${message}. Context: ${context.slice(-5).join(', ')}.`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    return completion.choices[0].message.content || "I'm here for you.";
  } catch (error) {
    console.error('OpenAI error:', error);
    return "I'm here for you. How are you feeling today?";
  }
}

