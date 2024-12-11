import { LLM } from "@/interfaces/llm";

export const implementedModels: LLM[] = [
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