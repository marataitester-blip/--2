import React, { useMemo } from 'react';
import type { Message as MessageType } from '../types';
import { Sender } from '../types';
import { speakText } from '../utils/speech';
import { parseMessage } from '../utils/parsing';

interface MessageProps {
  message: MessageType;
}

const ApproachTag: React.FC<{ approach: string }> = ({ approach }) => {
  const getTagStyle = (app: string) => {
    const lowerCaseApp = app.toLowerCase();
    if (lowerCaseApp.includes('кпт')) return { style: 'bg-[#d1ecf1] text-[#0c5460]', text: '🧠 КПТ' };
    if (lowerCaseApp.includes('гештальт')) return { style: 'bg-[#d4edda] text-[#155724]', text: '🎭 Гештальт' };
    if (lowerCaseApp.includes('логотерапия')) return { style: 'bg-[#fff3cd] text-[#856404]', text: '🔍 Логотерапия' };
    if (lowerCaseApp.includes('системный')) return { style: 'bg-[#f8d7da] text-[#721c24]', text: '🔗 Системный' };
    if (lowerCaseApp.includes('интегративн')) return { style: 'bg-[#e2e3e5] text-[#383d41]', text: '⚡ Интегративный' };
    return { style: 'bg-gray-100 text-gray-600', text: app };
  };

  const { style, text } = getTagStyle(approach);

  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${style}`}>
      {text}
    </span>
  );
};

export const Message: React.FC<MessageProps> = ({ message }) => {
  const { cleanText, approaches } = useMemo(() => parseMessage(message.text), [message.text]);

  const isUser = message.sender === Sender.User;

  const handleSpeak = () => {
    speakText(cleanText);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] px-4 py-3 rounded-[18px] ${isUser ? 'bg-[#667eea] text-white rounded-br-md' : 'bg-[#f0f0f0] text-gray-800 rounded-bl-md'}`}>
        <p className="whitespace-pre-wrap leading-relaxed">{cleanText}</p>
        
        {(approaches.length > 0 || !isUser) && (
          <div className="mt-3 flex flex-wrap gap-2 items-center">
            {approaches.map((app, index) => (
              <ApproachTag key={index} approach={app} />
            ))}
            {!isUser && (
              <button
                onClick={handleSpeak}
                title="Озвучить ответ"
                className="ml-2 bg-[#667eea] text-white rounded-full w-8 h-8 flex items-center justify-center text-base hover:opacity-80 transition-opacity"
                aria-label="Озвучить ответ"
              >
                🔊
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};