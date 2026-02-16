import axios from 'axios'

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

export const askLumina = async (userMessage, context = {}) => {
  const systemPrompt = `You are Lumina, the witty, slightly savage AI assistant for IEEE IGDTUW. 
You know every member's skills, every upcoming event, and you speak like a cool senior who actually cares.

User Context:
- Skills: ${context.skills?.join(', ') || 'Not specified'}
- Interests: ${context.interests?.join(', ') || 'Not specified'}
- Year: ${context.year || 'Unknown'}
- Branch: ${context.branch || 'Unknown'}

Available Events: ${JSON.stringify(context.events || [])}
Available Members: ${JSON.stringify(context.members || [])}

Rules:
1. Be helpful but fun
2. Match users with relevant people/events
3. Give specific, actionable suggestions
4. Keep responses under 150 words
5. Use emojis sparingly but effectively
6. If you find matches, format them clearly with numbers

IMPORTANT: Always provide REAL matches from the context data provided.`

  try {
    const response = await axios.post(
      GROQ_URL,
      {
        model: 'llama-3.1-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Lumina AI Error:', error)
    return "Oops, even I need a coffee break sometimes. Try again in a sec! ☕"
  }
}

export const generateVibexPulse = async (branchData) => {
  const prompt = `Summarize this in ONE energetic sentence (max 20 words):
- ${branchData.newProjects} new project ideas
- ${branchData.lookingForTeammates} people seeking teammates
- ${branchData.upcomingEvents} upcoming events
- Latest post: "${branchData.latestPost}"

Make it sound exciting and casual!`

  try {
    const response = await axios.post(
      GROQ_URL,
      {
        model: 'llama-3.1-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 100
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.choices[0].message.content
  } catch  {
    return "The vibe is immaculate right now! ✨"
  }
}
