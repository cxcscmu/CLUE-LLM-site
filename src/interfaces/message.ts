export interface Message {
  // This lets me use Message as a class throughout the project, so that things like the chatlog know what properties to expect from Message objects.

  // I should be able to drop this from usage because of the CoreMessage interface that does the same thing.
  role: string;
  content: string;
}
