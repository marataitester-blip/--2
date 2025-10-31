
import React, { useRef, useEffect } from 'react';
import type { Message as MessageType } from '../types';
import { Message } from './Message';

interface ChatBoxProps {
  messages: MessageType[];
}

export const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};
