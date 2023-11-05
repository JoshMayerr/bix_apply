import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const system_prompt = `
You are an agent filling in tech internship applications for students.
You are given a list of strings that are direct questions pulled from the application website.
Your task:
(1) Decide if the question is a Yes/No or a written response. If Yes/No simply answer "Yes" or "No", nothing else.
(2) answer the questions according to the question style from task (1) and then asnwer
in such a way that gives the student applicant the best chance of getting past the screening process.
(3) Write a concise cover letter on behalf of the applicant.

Formatting: Do not provide any explanation or reasoning to your response. Simply respond in the same list formate, replacing the question string
with the corresponding answer string.

Example Input:
['Will you now or in the future require work visa?', 'Tell us about a project that you are proud of']

Example Output:
['No', 'Last summer I worked on a project called sunflowers.dev. I am extremely proud of this project because
in just a few months over 8,000 students have use it', "<Generic Cover letter>"]

`;

const messages = [
  {
    role: "system",
    content: system_prompt,
  },
  {
    role: "user",
    content: `[
        'Are you eligible to work in the United States?✱YesNo',
        '1. Are you a U.S. citizen, a lawful permanent resident of the United States (“green card holder”), an asylee, a refugee, or temporary resident under the 1986 legalization program?✱YesNo',
        '2. Are you a national, citizen, or permanent resident of Cuba, Iran, North Korea, Sudan, Syria, or Crimea (region of Ukraine)?✱YesNo',
        '3. Selection criteria should be part of the application process and be provided in writing to all candidates on a consistent basis. TRI is committed to compliance with U.S. and other applicable export control laws.  Under U.S. export control laws, the release or disclosure of U.S.-origin controlled technology to foreign nationals is deemed to be an export or re-export to the foreign nationals’ home countries.  This “deemed export” rule does not apply to technology transfers between and among U.S. citizens, persons lawfully admitted for U.S. permanent residence, persons granted U.S. asylum or refugee status, or temporary residents under the 1986 legalization program. Your answers will be used by the company solely to ensure compliance with U.S. export control laws.✱I have read and understand the selection criteria.'
    ]`,
  },
];

async function main() {
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();
