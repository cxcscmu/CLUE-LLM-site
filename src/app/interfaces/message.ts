export interface Message {
  // This lets me use Message as a class throughout the project, so that things like the chatlog know what properties to expect from Message objects.
  role: string;
  content: string;
}
