import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage, AIMessage, type BaseMessage } from "@langchain/core/messages";

export interface ChatService {
  reply(history: { role: "user" | "assistant"; content: string }[]): Promise<string>;
}

const SYSTEM = "You are Caramel AI, a friendly CA buddy for Indian small-business owners. Answer briefly.";

export class GeminiChatService implements ChatService {
  private model = new ChatGoogleGenerativeAI({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    model: "gemini-2.5-flash",
    maxOutputTokens: 300,
    temperature: 0.3,
  });
  async reply(history: { role: "user" | "assistant"; content: string }[]): Promise<string> {
    const msgs: BaseMessage[] = [new SystemMessage(SYSTEM)];
    for (const m of history) msgs.push(m.role === "user" ? new HumanMessage(m.content) : new AIMessage(m.content));
    const res = await this.model.invoke(msgs);
    return typeof res.content === "string" ? res.content : JSON.stringify(res.content);
  }
}

export class FakeChatService implements ChatService {
  private text: string;
  constructor(text = "FAKE REPLY") { this.text = text; }
  async reply(): Promise<string> { return this.text; }
}
