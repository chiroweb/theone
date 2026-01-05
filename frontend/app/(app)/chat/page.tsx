"use client";

import { useState } from "react";
import { ChatWindow } from "../../../components/chat/ChatWindow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const MOCK_CHATS = [
    { id: 1, user: "Jason K.", message: "안녕하세요, 물류 관련 문의드립니다.", time: "10분 전", unread: true },
    { id: 2, user: "Sarah Kim", message: "투자 제안서 검토 부탁드립니다.", time: "3시간 전", unread: false },
];

export default function ChatPage() {
    const [chatOpen, setChatOpen] = useState(false);
    const [selectedRecipient, setSelectedRecipient] = useState("");

    const handleOpenChat = (name: string) => {
        setSelectedRecipient(name);
        setChatOpen(true);
    };

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-heading font-bold tracking-tight mb-6">채팅</h1>

            <div className="max-w-4xl">
                <Card className="bg-neutral-900 border-neutral-800 text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="w-5 h-5" /> 진행 중인 대화
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {MOCK_CHATS.map((chat) => (
                                <div key={chat.id} className="flex justify-between items-center border-b border-neutral-800 pb-4 last:border-0 last:pb-0">
                                    <div className="flex-1 min-w-0 mr-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-white">{chat.user}</span>
                                            {chat.unread && <span className="w-2 h-2 bg-green-500 rounded-full" />}
                                            <span className="text-xs text-neutral-500">{chat.time}</span>
                                        </div>
                                        <p className="text-sm text-neutral-400 truncate">{chat.message}</p>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="bg-white text-black hover:bg-neutral-200 rounded-none font-bold h-8"
                                        onClick={() => handleOpenChat(chat.user)}
                                    >
                                        답장
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <ChatWindow
                isOpen={chatOpen}
                onClose={() => setChatOpen(false)}
                recipientName={selectedRecipient}
            />
        </div>
    );
}
