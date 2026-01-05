"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, FileText, Zap } from "lucide-react";

// Mock Data
const SAVED_INSIGHTS = [
    { id: 1, title: "마이크로 SaaS 애그리게이터의 부상", source: "TechCrunch", date: "10월 24일" },
    { id: 2, title: "DeepSeek의 오픈소스 모델", source: "VentureBeat", date: "10월 23일" },
    { id: 3, title: "2026년 글로벌 물류 트렌드", source: "Bloomberg", date: "10월 20일" },
];

const SAVED_POSTS = [
    { id: 1, title: "2026년 헷징 전략에 대한 고찰", author: "Alex V.", date: "10월 25일", comments: 42 },
    { id: 2, title: "C-레벨 채용 시 고려해야 할 점", author: "Sarah L.", date: "10월 22일", comments: 15 },
];

export default function SavedPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <h1 className="text-4xl font-heading font-bold tracking-tight mb-6">저장된 항목</h1>

            <Tabs defaultValue="insights" className="space-y-6">
                <TabsList className="bg-neutral-900 border border-neutral-800 p-1">
                    <TabsTrigger value="insights" className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white">
                        <Zap className="w-4 h-4 mr-2" /> 인사이트
                    </TabsTrigger>
                    <TabsTrigger value="posts" className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white">
                        <FileText className="w-4 h-4 mr-2" /> 게시글
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="insights" className="space-y-4">
                    {SAVED_INSIGHTS.map((item) => (
                        <Card key={item.id} className="bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer group">
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="p-2 bg-neutral-800 rounded-lg text-yellow-500 group-hover:text-yellow-400 transition-colors">
                                    <Bookmark className="w-5 h-5 fill-current" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-white group-hover:text-yellow-400 transition-colors truncate">{item.title}</h3>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
                                        <span>{item.source}</span>
                                        <span>•</span>
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="posts" className="space-y-4">
                    {SAVED_POSTS.map((item) => (
                        <Card key={item.id} className="bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer group">
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="p-2 bg-neutral-800 rounded-lg text-blue-500 group-hover:text-blue-400 transition-colors">
                                    <Bookmark className="w-5 h-5 fill-current" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors truncate">{item.title}</h3>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
                                        <span>{item.author}</span>
                                        <span>•</span>
                                        <span>{item.date}</span>
                                        <span>•</span>
                                        <span>댓글 {item.comments}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}
