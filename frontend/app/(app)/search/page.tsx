"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, Users, MessageSquare, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock Data
const MOCK_RESULTS = {
    news: [
        { id: 1, title: "2026년 글로벌 물류 트렌드 전망", source: "TechCrunch", date: "2시간 전" },
        { id: 2, title: "AI가 바꾸는 라스트마일 배송", source: "VentureBeat", date: "5시간 전" },
        { id: 3, title: "콜드체인 시장의 급성장", source: "Bloomberg", date: "1일 전" },
    ],
    pipeline: [
        { id: 1, name: "Jason K.", role: "CEO @ GlobalLog", location: "Seoul, KR", match: "물류" },
        { id: 2, name: "Sarah L.", role: "Investment Director", location: "New York, US", match: "물류 투자" },
    ],
    community: [
        { id: 1, title: "물류 스타트업 창업 고민입니다.", author: "Startupper", comments: 12 },
        { id: 2, title: "동남아 물류 파트너 찾습니다.", author: "GlobalBiz", comments: 5 },
        { id: 3, title: "3PL 업체 추천 부탁드려요.", author: "Seller101", comments: 8 },
        { id: 4, title: "최근 해상 운임 동향 공유", author: "LogiExpert", comments: 24 },
    ]
};

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const [activeTab, setActiveTab] = useState<"all" | "news" | "pipeline" | "community">("all");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setHasSearched(true);
        }
    };

    const counts = {
        news: MOCK_RESULTS.news.length,
        pipeline: MOCK_RESULTS.pipeline.length,
        community: MOCK_RESULTS.community.length,
    };

    return (
        <div className="space-y-8 min-h-[80vh] flex flex-col">
            {/* Search Header / Initial State */}
            <div className={`transition-all duration-500 ${hasSearched ? "py-4" : "flex-1 flex flex-col justify-center items-center py-20"}`}>
                {!hasSearched && (
                    <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter mb-8 text-center bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
                        What are you looking for?
                    </h1>
                )}

                <form onSubmit={handleSearch} className={`w-full ${hasSearched ? "" : "max-w-2xl"}`}>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className={`w-5 h-5 ${hasSearched ? "text-neutral-400" : "text-neutral-500 group-focus-within:text-white"}`} />
                        </div>
                        <Input
                            type="text"
                            placeholder="Search insights, people, or discussions..."
                            className={`pl-12 pr-4 py-6 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 focus-visible:ring-white/20 focus-visible:border-white transition-all ${hasSearched ? "text-lg" : "text-xl rounded-full"}`}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        {!hasSearched && (
                            <div className="absolute inset-y-0 right-2 flex items-center">
                                <Button type="submit" size="icon" className="rounded-full w-10 h-10 bg-white text-black hover:bg-neutral-200">
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </div>
                        )}
                    </div>
                </form>
            </div>

            {/* Search Results */}
            {hasSearched && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        <Button
                            variant={activeTab === "all" ? "default" : "outline"}
                            onClick={() => setActiveTab("all")}
                            className="rounded-full"
                        >
                            All
                        </Button>
                        <Button
                            variant={activeTab === "news" ? "default" : "outline"}
                            onClick={() => setActiveTab("news")}
                            className="rounded-full gap-2"
                        >
                            <FileText className="w-4 h-4" />
                            News
                            <Badge variant="secondary" className="ml-1 bg-neutral-800 text-neutral-400 hover:bg-neutral-700">{counts.news}</Badge>
                        </Button>
                        <Button
                            variant={activeTab === "pipeline" ? "default" : "outline"}
                            onClick={() => setActiveTab("pipeline")}
                            className="rounded-full gap-2"
                        >
                            <Users className="w-4 h-4" />
                            Pipeline
                            <Badge variant="secondary" className="ml-1 bg-neutral-800 text-neutral-400 hover:bg-neutral-700">{counts.pipeline}</Badge>
                        </Button>
                        <Button
                            variant={activeTab === "community" ? "default" : "outline"}
                            onClick={() => setActiveTab("community")}
                            className="rounded-full gap-2"
                        >
                            <MessageSquare className="w-4 h-4" />
                            Community
                            <Badge variant="secondary" className="ml-1 bg-neutral-800 text-neutral-400 hover:bg-neutral-700">{counts.community}</Badge>
                        </Button>
                    </div>

                    <div className="grid gap-8">
                        {/* News Section */}
                        {(activeTab === "all" || activeTab === "news") && (
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-blue-400" />
                                        News & Insights
                                    </h2>
                                    {activeTab === "all" && counts.news > 0 && (
                                        <Button variant="link" onClick={() => setActiveTab("news")} className="text-neutral-400 hover:text-white">View all</Button>
                                    )}
                                </div>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {MOCK_RESULTS.news.map((item) => (
                                        <Card key={item.id} className="bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer group">
                                            <CardHeader className="pb-3">
                                                <div className="flex justify-between items-start">
                                                    <Badge variant="outline" className="border-blue-500/30 text-blue-400">{item.source}</Badge>
                                                    <span className="text-xs text-neutral-500">{item.date}</span>
                                                </div>
                                                <CardTitle className="text-lg mt-2 group-hover:text-blue-400 transition-colors">{item.title}</CardTitle>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Pipeline Section */}
                        {(activeTab === "all" || activeTab === "pipeline") && (
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        <Users className="w-5 h-5 text-purple-400" />
                                        Pipeline Matches
                                    </h2>
                                    {activeTab === "all" && counts.pipeline > 0 && (
                                        <Button variant="link" onClick={() => setActiveTab("pipeline")} className="text-neutral-400 hover:text-white">View all</Button>
                                    )}
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {MOCK_RESULTS.pipeline.map((item) => (
                                        <Card key={item.id} className="bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer">
                                            <CardContent className="p-6 flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-lg font-bold border border-neutral-700">
                                                    {item.name.charAt(0)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-white truncate">{item.name}</h3>
                                                    <p className="text-sm text-neutral-400 truncate">{item.role}</p>
                                                    <p className="text-xs text-neutral-500 mt-1">{item.location}</p>
                                                </div>
                                                <Badge className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border-0">
                                                    {item.match}
                                                </Badge>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Community Section */}
                        {(activeTab === "all" || activeTab === "community") && (
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-green-400" />
                                        Community Discussions
                                    </h2>
                                    {activeTab === "all" && counts.community > 0 && (
                                        <Button variant="link" onClick={() => setActiveTab("community")} className="text-neutral-400 hover:text-white">View all</Button>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    {MOCK_RESULTS.community.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-4 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors cursor-pointer group">
                                            <div className="flex-1 min-w-0 mr-4">
                                                <h3 className="font-medium text-white group-hover:text-green-400 transition-colors truncate">{item.title}</h3>
                                                <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
                                                    <span>{item.author}</span>
                                                    <span>•</span>
                                                    <span>댓글 {item.comments}</span>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
