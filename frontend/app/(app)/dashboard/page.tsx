"use client";

import { ChatWindow } from "@/components/chat/ChatWindow";
import { TierBadge } from "@/components/dashboard/TierBadge";
import { PipelineConfiguration } from "../../../components/dashboard/PipelineConfiguration";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Bookmark, FileText, MessageSquare } from "lucide-react";
import { useState } from "react";

const MOCK_LOGS = [
    { id: 1, action: "'2026년 헷징' 글에 댓글 작성", time: "2시간 전", points: "+10" },
    { id: 2, action: "'C-레벨 채용' 글 작성", time: "1일 전", points: "+50" },
    { id: 3, action: "내 댓글에 좋아요 받음", time: "1일 전", points: "+20" },
    { id: 4, action: "'마이크로 SaaS' 인사이트 저장", time: "2일 전", points: "+5" },
];

const MOCK_ARCHIVES = [
    { id: 1, title: "마이크로 SaaS 애그리게이터의 부상", date: "10월 24일" },
    { id: 2, title: "DeepSeek의 오픈소스 모델", date: "10월 23일" },
];

const MOCK_CHATS = [
    { id: 1, user: "Jason K.", message: "안녕하세요, 물류 관련 문의드립니다.", time: "10분 전", unread: true },
    { id: 2, user: "Sarah Kim", message: "투자 제안서 검토 부탁드립니다.", time: "3시간 전", unread: false },
];

export default function DashboardPage() {
    const [chatOpen, setChatOpen] = useState(false);
    const [selectedRecipient, setSelectedRecipient] = useState("");

    const handleOpenChat = (name: string) => {
        setSelectedRecipient(name);
        setChatOpen(true);
    };

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-heading font-bold tracking-tight mb-6">My Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Tier Status */}
                <div className="lg:col-span-1">
                    <TierBadge />
                </div>

                {/* Right Column: Activity & Archives */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Pipeline Configuration */}
                    <PipelineConfiguration />

                    {/* Chat Management */}
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

                    {/* Activity Logs */}
                    <Card className="bg-neutral-900 border-neutral-800 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="w-5 h-5" /> 활동 로그
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {MOCK_LOGS.map((log) => (
                                    <li key={log.id} className="flex justify-between items-center border-b border-neutral-800 pb-2 last:border-0 last:pb-0">
                                        <div>
                                            <p className="text-sm font-medium text-white">{log.action}</p>
                                            <p className="text-xs text-neutral-500">{log.time}</p>
                                        </div>
                                        <span className="text-xs font-bold text-white bg-neutral-800 px-2 py-1">{log.points}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Archives */}
                    <Card className="bg-neutral-900 border-neutral-800 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bookmark className="w-5 h-5" /> 저장된 인사이트
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                {MOCK_ARCHIVES.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3 p-3 bg-black border border-neutral-800 hover:border-white transition-colors cursor-pointer">
                                        <FileText className="w-4 h-4 text-neutral-400" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">{item.title}</p>
                                            <p className="text-xs text-neutral-500">{item.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <ChatWindow
                isOpen={chatOpen}
                onClose={() => setChatOpen(false)}
                recipientName={selectedRecipient}
            />
        </div>
    );
}
