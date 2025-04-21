'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaImage, FaSearch } from 'react-icons/fa';

type User = {
  id: string;
  name: string;
  profilePic?: string;
};

type ChatMessage = {
  type: 'text' | 'image';
  content: string;
  sender: 'You' | 'Other';
};

const mockUsers: User[] = [
  { id: '1', name: 'Alex' },
  { id: '2', name: 'Jordan' },
  { id: '3', name: 'Taylor' },
  { id: '4', name: 'Sam' },
];

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [chats, setChats] = useState<{ [userId: string]: ChatMessage[] }>({});
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [search, setSearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, selectedUser]);

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = () => {
    if (!selectedUser) return;
    const newMessage: ChatMessage = {
      type: 'text',
      content: message,
      sender: 'You',
    };
    if (message.trim()) {
      setChats(prev => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
      }));
      setMessage('');
    }

    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgMsg: ChatMessage = {
          type: 'image',
          content: reader.result as string,
          sender: 'You',
        };
        setChats(prev => ({
          ...prev,
          [selectedUser.id]: [...(prev[selectedUser.id] || []), imgMsg],
        }));
      };
      reader.readAsDataURL(image);
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    }
  };

  return (
    <div className="h-[90vh] max-w-6xl mx-auto flex bg-gray-100 rounded-3xl overflow-hidden shadow-xl">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r border-gray-200 p-5 flex flex-col gap-4">
        <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-xl shadow-sm">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none text-gray-800 focus:outline-none text-sm"
          />
        </div>

        <div className="overflow-y-auto flex-1 custom-scrollbar space-y-2">
          {filteredUsers.map(user => (
            <button
              title="Send message"
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-150 ${
                selectedUser?.id === user.id
                  ? 'bg-gradient-to-r from-blue-100 to-blue-50'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-bold flex items-center justify-center">
                {user.name[0]}
              </div>
              <span className="font-medium text-gray-700">{user.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col justify-between bg-gray-50 p-6">
        {selectedUser ? (
          <>
            <div className="mb-3 font-semibold text-lg text-gray-800">
              Chat with <span className="text-blue-500">{selectedUser.name}</span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 p-2">
              {(chats[selectedUser.id] || []).map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs p-3 rounded-xl shadow ${
                    msg.sender === 'You'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                  }`}
                  >
                    {msg.type === 'text' ? (
                      msg.content
                    ) : (
                      <img
                        src={msg.content}
                        alt="sent-img"
                        className="max-w-[200px] rounded-xl"
                      />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {image && (
              <div className="flex items-center gap-3 border border-dashed border-blue-300 p-3 rounded-xl mt-3 bg-blue-50">
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-16 h-16 object-cover rounded-xl"
                />
                <span className="text-sm text-gray-600">Image ready to send</span>
              </div>
            )}

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Upload an image"
                className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition"
              >
                <FaImage />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                title="Upload an image file"
              />
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleSend}
                title="Send message"
                className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow transition"
              >
                <FaPaperPlane />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a user to start chatting 💬
          </div>
        )}
      </div>
    </div>
  );
}
