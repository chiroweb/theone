"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, X } from "lucide-react";
import { useState } from "react";

interface ChatWindowProps {
    isOpen: boolean;
    onClose: () => void;
    recipientName: string;
}

export function ChatWindow({ isOpen, onClose, recipientName }: ChatWindowProps) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<{ text: string; isMe: boolean }[]>([
        { text: "안녕하세요, 프로필 보고 연락드립니다.", isMe: true },
        { text: "네, 안녕하세요! 어떤 점이 궁금하신가요?", isMe: false },
    ]);

    if (!isOpen) return null;

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;
        setMessages([...messages, { text: message, isMe: true }]);
        setMessage("");
    };

    return (
        <div className="fixed bottom-4 right-4 w-80 md:w-96 bg-black border border-neutral-800 shadow-2xl z-50 flex flex-col h-[500px]">
            <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-900">
                <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8 border border-neutral-700">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-black text-neutral-400">
                            <User className="w-4 h-4" />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h4 className="text-sm font-bold text-white">{recipientName}</h4>
                        <span className="text-xs text-green-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online
                        </span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-neutral-400 hover:text-white h-8 w-8">
                    <X className="w-4 h-4" />
                </Button>
            </div>

            <ScrollArea className="flex-grow p-4">
                <div className="space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] p-3 text-sm ${msg.isMe
                                    ? "bg-white text-black font-medium"
                                    : "bg-neutral-900 text-neutral-300 border border-neutral-800"
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <form onSubmit={handleSend} className="p-4 border-t border-neutral-800 bg-black flex gap-2">
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지 입력..."
                    className="bg-neutral-900 border-neutral-800 text-white rounded-none focus:border-white h-10"
                />
                <Button type="submit" size="icon" className="bg-white text-black hover:bg-neutral-200 rounded-none h-10 w-10">
                    <Send className="w-4 h-4" />
                </Button>
            </form>
        </div>
    );
}
