export interface LLM {
  // This lets me use LLM as a class throughout the project, mostly so that the selector can display a different value for the name of the model vs its actual text. That's a local-only thing but it's still useful.

  value: string;
  label: string;
}
