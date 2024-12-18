// This file is essentially just a list of the models (their value strings, with an internal label) for me to use in implementing the random choice of LLMs.

import { selection } from "@interfaces";

export const implementedModels: selection[] = [
  {
    value: "gpt-4o",
    label: "OpenAI: ChatGPT",
  },
  {
    value: "gpt-4o-mini",
    label: "OpenAI: ChatGPT Mini",
  },
  {
    value: "claude-3-5-haiku-20241022",
    label: "Anthropic: Claude 3.5 Haiku",
  },
  {
    value: "claude-3-opus-20240229",
    label: "Anthropic: Claude 3.5 Opus",
  },
  {
    value: "claude-3-5-sonnet-20241022",
    label: "Anthropic: Claude 3.5 Sonnet",
  },
];

export const interviewModels: selection[] = [
  implementedModels[0],
  implementedModels[2],
];
