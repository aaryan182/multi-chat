"use client";

import { useState } from "react";
import { useSocket } from "../context/SocketProvider";

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");
  return (
    <div>
      <div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Message..."
        ></input>
        <button onClick={(e) => sendMessage(message)}>Send</button>
      </div>
      <div>
        {messages.map((msg) => (
          <p key={msg}>{msg}</p>
        ))}
      </div>
    </div>
  );
}
