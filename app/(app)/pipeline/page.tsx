"use client";

import { ChatWindow } from "@/components/chat/ChatWindow";
import { ProfileRow } from "@/components/pipeline/ProfileRow";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

const MOCK_PROFILES = [
    {
        id: "1",
        name: "Jason K.",
        role: "물류/배송 전문가",
        location: "경기도",
        bio: "동남아 라스트마일 배송 10년 경력, 현지 네트워크 보유",
        company: "GlobalLog Inc.",
        position: "CEO",
        revenue: "$1M - $5M",
        specialties: ["물류/배송", "동남아시장", "라스트마일"],
        canHelpWith: ["물류 네트워크 소개", "동남아 진출 조언"],
        lookingFor: ["기술 파트너 (개발)", "투자자 연결"]
    },
    {
        id: "2",
        name: "Sarah L.",
        role: "SaaS 마케팅 디렉터",
        location: "서울",
        bio: "B2B SaaS 0 to 1 스케일업 전문, 누적 매출 100억 달성",
        company: "TechFlow",
        position: "CMO",
        revenue: "$5M - $10M",
        specialties: ["마케팅/브랜딩", "B2B", "SaaS"],
        canHelpWith: ["GTM 전략 수립", "마케팅 팀 빌딩"],
        lookingFor: ["해외 영업 파트너", "시리즈 B 투자"]
    },
    {
        id: "3",
        name: "David P.",
        role: "제조업 투자 심사역",
        location: "서울",
        bio: "스마트 팩토리 및 자동화 설비 투자 전문 VC",
        company: "Future Invest",
        position: "Partner",
        revenue: "N/A",
        specialties: ["재무/투자", "제조업", "스마트팩토리"],
        canHelpWith: ["투자 검토", "M&A 자문"],
        lookingFor: ["유망 제조 스타트업", "공동 투자자"]
    }
];

export default function PipelinePage() {
    const [chatOpen, setChatOpen] = useState(false);
    const [selectedRecipient, setSelectedRecipient] = useState("");

    const handleChatOpen = (name: string) => {
        setSelectedRecipient(name);
        setChatOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end border-b border-neutral-800 pb-6">
                <div>
                    <h1 className="text-4xl font-heading font-bold tracking-tight mb-2">The Pipeline</h1>
                    <p className="text-neutral-400">검증된 비즈니스 파트너를 찾고 연결하세요.</p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-neutral-900/50 p-4 border border-neutral-800 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                    <label className="text-xs text-neutral-500 font-bold uppercase tracking-wider">산업 분야</label>
                    <Select>
                        <SelectTrigger className="bg-black border-neutral-700 text-white rounded-none h-10">
                            <SelectValue placeholder="전체" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-900 border-neutral-800 text-white rounded-none">
                            <SelectItem value="all">전체</SelectItem>
                            <SelectItem value="manufacturing">제조업</SelectItem>
                            <SelectItem value="logistics">유통/물류</SelectItem>
                            <SelectItem value="it">IT/테크</SelectItem>
                            <SelectItem value="finance">금융/투자</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-neutral-500 font-bold uppercase tracking-wider">전문 역할</label>
                    <Select>
                        <SelectTrigger className="bg-black border-neutral-700 text-white rounded-none h-10">
                            <SelectValue placeholder="전체" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-900 border-neutral-800 text-white rounded-none">
                            <SelectItem value="all">전체</SelectItem>
                            <SelectItem value="marketing">마케팅/브랜딩</SelectItem>
                            <SelectItem value="dev">기술/개발</SelectItem>
                            <SelectItem value="finance">재무/회계</SelectItem>
                            <SelectItem value="sales">영업/BD</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-neutral-500 font-bold uppercase tracking-wider">지역</label>
                    <Select>
                        <SelectTrigger className="bg-black border-neutral-700 text-white rounded-none h-10">
                            <SelectValue placeholder="전체" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-900 border-neutral-800 text-white rounded-none">
                            <SelectItem value="all">전체</SelectItem>
                            <SelectItem value="seoul">서울</SelectItem>
                            <SelectItem value="gyeonggi">경기</SelectItem>
                            <SelectItem value="busan">부산</SelectItem>
                            <SelectItem value="global">해외</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-end">
                    <Button className="w-full bg-white text-black hover:bg-neutral-200 rounded-none font-bold h-10">
                        <Search className="w-4 h-4 mr-2" /> 검색
                    </Button>
                </div>
            </div>

            {/* Profile List */}
            <div className="space-y-4">
                {MOCK_PROFILES.map((profile) => (
                    <div key={profile.id} onClick={() => handleChatOpen(profile.name)}>
                        <ProfileRow {...profile} />
                    </div>
                ))}
            </div>

            <ChatWindow
                isOpen={chatOpen}
                onClose={() => setChatOpen(false)}
                recipientName={selectedRecipient}
            />
        </div>
    );
}
