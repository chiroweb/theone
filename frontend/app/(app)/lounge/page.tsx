"use client";

import { DiscussionRow } from "../../../components/lounge/DiscussionRow";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const ALL_POSTS = [
    {
        id: "1",
        title: "[질문] 2026년 달러 변동성, 어떻게 헷징하고 계신가요?",
        author: "Alex V.",
        replies: 42,
        views: 1205,
        lastActive: "2시간 전",
        category: "경제/금융",
        categoryKey: "economy",
        isHot: true,
        type: "question"
    },
    {
        id: "2",
        title: "다가오는 다보스 포럼 전용기 쉐어하실 분",
        author: "Elena R.",
        replies: 8,
        views: 310,
        lastActive: "2일 전",
        category: "네트워킹",
        categoryKey: "networking",
        isHot: false,
        type: "general"
    },
    {
        id: "3",
        title: "최근 읽은 비즈니스 서적 중 추천할만한 것",
        author: "Chris P.",
        replies: 12,
        views: 205,
        lastActive: "3일 전",
        category: "자유게시판",
        categoryKey: "free",
        isHot: false,
        type: "general"
    },
    {
        id: "4",
        title: "[질문] 멀티 SaaS 엑싯을 위한 지주회사 구조 설계 질문",
        author: "Marcus L.",
        replies: 28,
        views: 890,
        lastActive: "5시간 전",
        category: "정책/법률",
        categoryKey: "policy",
        isHot: true,
        type: "question"
    },
    {
        id: "5",
        title: "[질문] 이번 달 메타 광고 ROAS 떨어지시는 분?",
        author: "Sarah J.",
        replies: 15,
        views: 450,
        lastActive: "1일 전",
        category: "비즈니스",
        categoryKey: "business",
        isHot: false,
        type: "question"
    },
    {
        id: "6",
        title: "C-레벨 인재 채용: 헤드헌팅 vs 네트워크?",
        author: "David K.",
        replies: 31,
        views: 920,
        lastActive: "1일 전",
        category: "비즈니스",
        categoryKey: "business",
        isHot: false,
        type: "general"
    }
];

const CATEGORY_MAP: Record<string, string> = {
    business: "비즈니스",
    economy: "경제/금융",
    policy: "정책/법률",
    networking: "네트워킹",
    free: "자유게시판",
};

export default function LoungePage() {
    const searchParams = useSearchParams();
    const categoryKey = searchParams.get("category");
    const categoryName = categoryKey ? CATEGORY_MAP[categoryKey] : "전체보기";

    const filteredPosts = categoryKey
        ? ALL_POSTS.filter(post => post.categoryKey === categoryKey)
        : ALL_POSTS;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end border-b border-neutral-800 pb-6">
                <div>
                    <h1 className="text-4xl font-heading font-bold tracking-tight mb-2">
                        {categoryName}
                    </h1>
                    <p className="text-neutral-400">
                        {categoryKey ? `${categoryName} 관련 토론과 인사이트` : "필터 없는 토론. 현실적인 비즈니스 문제."}
                    </p>
                </div>
                <Link href="/lounge/write">
                    <Button
                        className="bg-white text-black hover:bg-neutral-200 rounded-none font-bold"
                    >
                        <Plus className="w-4 h-4 mr-2" /> 글 작성하기
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="text-sm text-neutral-500">
                    총 <span className="text-white font-bold">{filteredPosts.length}</span>개의 글
                </div>

                {/* Sorting Dropdown */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-500">정렬:</span>
                    <select className="bg-neutral-900 border border-neutral-800 text-white text-sm p-2 rounded-none focus:outline-none focus:border-white">
                        <option value="latest">최신순</option>
                        <option value="popular">인기순</option>
                        <option value="comments">댓글순</option>
                    </select>
                </div>
            </div>

            <div className="border-t border-neutral-800">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((discussion) => (
                        <DiscussionRow key={discussion.id} {...discussion} />
                    ))
                ) : (
                    <div className="py-20 text-center text-neutral-500">
                        등록된 게시글이 없습니다.
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center pt-8">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled className="border-neutral-800 text-neutral-500">이전</Button>
                    <Button variant="default" size="sm" className="bg-white text-black hover:bg-neutral-200">1</Button>
                    <Button variant="outline" size="sm" className="border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900">2</Button>
                    <Button variant="outline" size="sm" className="border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900">3</Button>
                    <span className="text-neutral-600">...</span>
                    <Button variant="outline" size="sm" className="border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900">10</Button>
                    <Button variant="outline" size="sm" className="border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900">다음</Button>
                </div>
            </div>
        </div>
    );
}
