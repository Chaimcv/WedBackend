const OpenAI = require('openai');
const config = require('../../../config');

const openai = new OpenAI({
  apiKey: config.openaiKey,
});

const generateWeddingPlan = async (details) => {
  const prompt = `Plan a destination wedding. Title: ${details.title}, Destination: ${details.destination}, Days: ${details.days}, Guest Count: ${details.guestCount}, Style: ${details.style}. Provide a JSON response with timeline, budget breakdown, and vendor suggestions.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices[0].message.content);
};

const suggestBudget = async (weddingId, totalBudget) => {
    // Logic for budget suggestions
    return {
        venue: totalBudget * 0.4,
        food: totalBudget * 0.3,
        decor: totalBudget * 0.15,
        other: totalBudget * 0.15
    };
};

module.exports = { generateWeddingPlan, suggestBudget };
