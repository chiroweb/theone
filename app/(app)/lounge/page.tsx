"use client";

import { DiscussionRow } from "@/components/lounge/DiscussionRow";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const FREE_BOARD_DATA = [
    {
        id: "1",
        title: "2026년 달러 변동성, 어떻게 헷징하고 계신가요?",
        author: "Alex V.",
        replies: 42,
        views: 1205,
        lastActive: "2시간 전",
        category: "금융",
        isHot: true
    },
    {
        id: "2",
        title: "다가오는 다보스 포럼 전용기 쉐어하실 분",
        author: "Elena R.",
        replies: 8,
        views: 310,
        lastActive: "2일 전",
        category: "라이프스타일",
        isHot: false
    },
    {
        id: "3",
        title: "최근 읽은 비즈니스 서적 중 추천할만한 것",
        author: "Chris P.",
        replies: 12,
        views: 205,
        lastActive: "3일 전",
        category: "자기계발",
        isHot: false
    }
];

const QNA_BOARD_DATA = [
    {
        id: "4",
        title: "멀티 SaaS 엑싯을 위한 지주회사 구조 설계 질문",
        author: "Marcus L.",
        replies: 28,
        views: 890,
        lastActive: "5시간 전",
        category: "법률",
        isHot: true
    },
    {
        id: "5",
        title: "이번 달 메타 광고 ROAS 떨어지시는 분?",
        author: "Sarah J.",
        replies: 15,
        views: 450,
        lastActive: "1일 전",
        category: "마케팅",
        isHot: false
    },
    {
        id: "6",
        title: "C-레벨 인재 채용: 헤드헌팅 vs 네트워크?",
        author: "David K.",
        replies: 31,
        views: 920,
        lastActive: "1일 전",
        category: "채용",
        isHot: false
    }
];

export default function LoungePage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end border-b border-neutral-800 pb-6">
                <div>
                    <h1 className="text-4xl font-heading font-bold tracking-tight mb-2">The Lounge</h1>
                    <p className="text-neutral-400">필터 없는 토론. 현실적인 비즈니스 문제.</p>
                </div>
                <Link href="/lounge/write">
                    <Button
                        className="bg-white text-black hover:bg-neutral-200 rounded-none font-bold"
                    >
                        <Plus className="w-4 h-4 mr-2" /> 글 작성하기
                    </Button>
                </Link>
            </div>

            <Tabs defaultValue="free" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-neutral-900 rounded-none p-0 h-12">
                    <TabsTrigger
                        value="free"
                        className="rounded-none data-[state=active]:bg-white data-[state=active]:text-black text-neutral-400 h-full font-bold uppercase tracking-wider transition-all"
                    >
                        자유게시판
                    </TabsTrigger>
                    <TabsTrigger
                        value="qna"
                        className="rounded-none data-[state=active]:bg-white data-[state=active]:text-black text-neutral-400 h-full font-bold uppercase tracking-wider transition-all"
                    >
                        질문/답변
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="free" className="mt-6 border-t border-neutral-800">
                    {FREE_BOARD_DATA.map((discussion) => (
                        <DiscussionRow key={discussion.id} {...discussion} />
                    ))}
                </TabsContent>

                <TabsContent value="qna" className="mt-6 border-t border-neutral-800">
                    {QNA_BOARD_DATA.map((discussion) => (
                        <DiscussionRow key={discussion.id} {...discussion} />
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}
