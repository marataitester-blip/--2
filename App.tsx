import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ChatBox } from './components/ChatBox';
import { InputArea } from './components/InputArea';
import type { Message } from './types';
import { Sender } from './types';
import { getBotResponse } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-bot-message',
      sender: Sender.Bot,
      text: 'Здравствуйте! Я ваш электронный психолог-помощник. Расскажите, что вас беспокоит, и я постараюсь помочь. Помните: это не замена профессиональной помощи.',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: Sender.User,
      text,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const botText = await getBotResponse(messages);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: Sender.Bot,
        text: botText,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        sender: Sender.Bot,
        text: 'Извините, произошла ошибка. Пожалуйста, попробуйте отправить ваше сообщение еще раз.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);


  return (
    <div className="flex justify-center items-center min-h-screen p-4 font-sans">
      <div className="w-full max-w-[600px] h-[80vh] flex flex-col bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
        <Header />
        <ChatBox messages={messages} />
        <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default App;