"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, MessageSquare, UserPlus, Heart, Check } from "lucide-react";

// Mock Data
const NOTIFICATIONS = [
    {
        id: 1,
        type: "comment",
        user: "Jason K.",
        content: "회원님의 게시글에 댓글을 남겼습니다: '좋은 정보 감사합니다.'",
        time: "2분 전",
        read: false
    },
    {
        id: 2,
        type: "like",
        user: "Sarah L.",
        content: "회원님의 댓글을 좋아합니다.",
        time: "1시간 전",
        read: true
    },
    {
        id: 3,
        type: "connection",
        user: "Mike R.",
        content: "회원님에게 연결 요청을 보냈습니다.",
        time: "3시간 전",
        read: true
    },
    {
        id: 4,
        type: "system",
        user: "System",
        content: "THE 1% 멤버십 승인이 완료되었습니다.",
        time: "1일 전",
        read: true
    },
];

export default function NotificationsPage() {
    return (
        <div className="space-y-8 max-w-3xl">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-heading font-bold tracking-tight">알림</h1>
                <Button variant="outline" className="text-neutral-400 hover:text-white border-neutral-800 hover:bg-neutral-900">
                    <Check className="w-4 h-4 mr-2" /> 모두 읽음 처리
                </Button>
            </div>

            <div className="space-y-4">
                {NOTIFICATIONS.map((item) => (
                    <Card key={item.id} className={`border-neutral-800 transition-colors ${item.read ? "bg-black" : "bg-neutral-900/50 border-l-4 border-l-blue-500"}`}>
                        <CardContent className="p-4 flex gap-4 items-start">
                            <div className={`p-2 rounded-full ${item.type === 'comment' ? 'bg-blue-500/10 text-blue-500' :
                                    item.type === 'like' ? 'bg-red-500/10 text-red-500' :
                                        item.type === 'connection' ? 'bg-purple-500/10 text-purple-500' :
                                            'bg-neutral-800 text-neutral-400'
                                }`}>
                                {item.type === 'comment' && <MessageSquare className="w-5 h-5" />}
                                {item.type === 'like' && <Heart className="w-5 h-5" />}
                                {item.type === 'connection' && <UserPlus className="w-5 h-5" />}
                                {item.type === 'system' && <Bell className="w-5 h-5" />}
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm text-white">
                                    <span className="font-bold">{item.user}</span> {item.content.replace(item.user, "")}
                                </p>
                                <p className="text-xs text-neutral-500">{item.time}</p>
                            </div>
                            {!item.read && (
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
