import { useState } from "react";
import { GeminiChatService, type ChatService } from "./services/chat";

export default function App({ service = new GeminiChatService() }: { service?: ChatService }) {
  const [history, setHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  async function send() {
    const next = [...history, { role: "user" as const, content: input }];
    setHistory(next); setInput(""); setBusy(true);
    try { const r = await service.reply(next); setHistory([...next, { role: "assistant", content: r }]); }
    catch (e) { setHistory([...next, { role: "assistant", content: "ERROR: " + String(e) }]); }
    finally { setBusy(false); }
  }
  return (
    <main>
      <h1>Caramel AI — Your CA Buddy</h1>
      <ul data-testid="messages">{history.map((m, i) => <li key={i} data-role={m.role}>{m.content}</li>)}</ul>
      <input aria-label="message" value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={send} disabled={busy || !input}>Send</button>
    </main>
  );
}
