// This file is essentially just a list of the models (their value strings, with an internal label) for me to use in implementing the random choice of LLMs.

import { selection } from "@interfaces";

// Models from OpenAI
const OPENAI_GPT_4o: selection = {
  value: "gpt-4o",
  label: "OpenAI: ChatGPT",
};
const OPENAI_GPT_4o_mini: selection = {
  value: "gpt-4o-mini",
  label: "OpenAI: ChatGPT Mini",
};

// Models from Anthropic
const Anthropic_Claude_Sonnet: selection = {
  value: "claude-3-5-sonnet-20241022",
  label: "Anthropic: Claude 3.5 Sonnet",
};
const Anthropic_Claude_Haiku: selection = {
  value: "claude-3-5-haiku-20241022",
  label: "Anthropic: Claude 3.5 Haiku",
};
const Anthropic_Claude_Opus: selection = {
  value: "claude-3-5-opus-20240229",
  label: "Anthropic: Claude 3.5 Opus",
};

// Models from Google
const Gemini_2_0_Flash: selection = {
  value: "gemini-2.0-flash-exp",
  label: "Google: Gemini 2.0 Flash (Experimental)",
};
const Gemini_1_5_Flash: selection = {
  value: "gemini-1.5-flash",
  label: "Google: Gemini 1.5 Flash",
};
const Gemini_1_5_Pro: selection = {
  value: "gemini-1.5-pro",
  label: "Google: Gemini 1.5 Pro",
};

// Other companies
const Deepseek_V3: selection = {
  value: "deepseek-chat",
  label: "Deepseek V3",
};

export const sessionModels: selection[] = [
  OPENAI_GPT_4o,
  // Anthropic_Claude_Sonnet,
  Gemini_1_5_Flash,
  // Gemini_2_0_Flash,
  Deepseek_V3,
];

export const interviewModels: selection[] = [
  OPENAI_GPT_4o,
  // Anthropic_Claude_Sonnet,
];
