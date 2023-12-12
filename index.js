const { OpenAI } = require("openai");
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const openFun = async () => {
  try {
    const filePath = __filename;
    const code = fs.readFileSync(filePath, 'utf-8');

    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: `Explain the code:\n\n${code} and optimize it` },
    ];

    const maxTokens = 1000;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: maxTokens,
    });

    console.log(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

openFun();
