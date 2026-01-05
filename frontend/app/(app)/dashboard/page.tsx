"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Bookmark, FileText, PenTool } from "lucide-react";

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

const MOCK_MY_POSTS = [
    { id: 1, title: "2026년 헷징 전략에 대한 고찰", date: "10월 25일", views: 120 },
    { id: 2, title: "C-레벨 채용 시 고려해야 할 점", date: "10월 22일", views: 85 },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-heading font-bold tracking-tight mb-6">My Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

                {/* My Posts */}
                <Card className="bg-neutral-900 border-neutral-800 text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PenTool className="w-5 h-5" /> 내가 작성한 글
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            {MOCK_MY_POSTS.map((item) => (
                                <div key={item.id} className="flex items-center gap-3 p-3 bg-black border border-neutral-800 hover:border-white transition-colors cursor-pointer">
                                    <FileText className="w-4 h-4 text-neutral-400" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">{item.title}</p>
                                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                                            <span>{item.date}</span>
                                            <span>•</span>
                                            <span>조회 {item.views}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

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
        </div>
    );
}
