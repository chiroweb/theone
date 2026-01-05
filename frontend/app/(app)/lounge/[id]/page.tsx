"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Heart, MessageSquare, Share2, Flag } from "lucide-react";
import Link from "next/link";
import { CommentList } from "../../../../components/lounge/CommentList";
import { CommentInput } from "../../../../components/lounge/CommentInput";

// Mock Data
const MOCK_POST = {
    id: 1,
    category: "금융/투자",
    title: "2026년 달러 변동성 어떻게 대비하고 계신가요?",
    content: `
        <p>안녕하세요, 최근 환율 변동성이 심상치 않아 보입니다.</p>
        <br />
        <p>특히 2026년 초반에는 미 연준의 금리 정책 변화가 예상되면서 달러 인덱스의 급격한 움직임이 있을 것이라는 전망이 지배적인데요.</p>
        <br />
        <p>저희 회사는 현재 수출 비중이 70% 정도라 환리스크 관리가 필수적인 상황입니다. 현재는 선물환으로 일부 헷징을 하고 있지만, 옵션 상품을 적극적으로 활용해볼까 고민 중입니다.</p>
        <br />
        <p>다른 대표님들은 어떤 전략을 가지고 계신지 고견을 여쭙고 싶습니다.</p>
    `,
    author: {
        name: "Alex V.",
        role: "CFO @ TechCorp",
        avatar: ""
    },
    stats: {
        views: 1205,
        likes: 24,
        comments: 42,
        time: "2시간 전"
    },
    comments: [
        {
            id: 1,
            author: "Jason K.",
            content: "저는 통화 옵션보다는 자연 헷징(Natural Hedging)을 우선적으로 고려하고 있습니다. 수입 결제 대금을 달러로 맞춰서 리스크를 줄이는 방식이죠.",
            time: "1시간 전",
            likes: 12,
            replies: [
                {
                    id: 11,
                    author: "Alex V.",
                    content: "좋은 의견 감사합니다. 저희도 매입처를 다변화해서 자연 헷징 비율을 높여봐야겠네요.",
                    time: "50분 전",
                    likes: 3
                }
            ]
        },
        {
            id: 2,
            author: "Sarah L.",
            content: "저희는 은행과 FX 스왑 계약을 체결해서 고정 환율을 확보해두었습니다. 비용은 좀 들지만 경영 계획 수립에는 훨씬 안정적이더라고요.",
            time: "30분 전",
            likes: 8
        }
    ]
};

export default function PostDetailPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-20">
            {/* Back Button */}
            <Link href="/lounge" className="inline-flex items-center text-neutral-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                목록으로 돌아가기
            </Link>

            {/* Post Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-blue-400 border-blue-500/30">{MOCK_POST.category}</Badge>
                    <Badge variant="secondary" className="bg-red-500/10 text-red-500 hover:bg-red-500/20">HOT</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-white">
                    {MOCK_POST.title}
                </h1>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={MOCK_POST.author.avatar} />
                            <AvatarFallback>{MOCK_POST.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-white text-sm">{MOCK_POST.author.name}</p>
                            <p className="text-xs text-neutral-500">{MOCK_POST.author.role} · {MOCK_POST.stats.time}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-xs text-neutral-500">
                            조회 {MOCK_POST.stats.views.toLocaleString()}
                        </div>
                        {/* Mock Author Actions */}
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white h-8">수정</Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-8">삭제</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Post Content */}
            <div
                className="prose prose-invert max-w-none text-neutral-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: MOCK_POST.content }}
            />

            {/* Actions */}
            <div className="flex items-center justify-between py-6 border-y border-neutral-800">
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="gap-2 rounded-full border-neutral-700 hover:bg-neutral-800 hover:text-white">
                        <Heart className="w-4 h-4" />
                        좋아요 {MOCK_POST.stats.likes}
                    </Button>
                    <Button variant="ghost" className="gap-2 text-neutral-400 hover:text-white">
                        <MessageSquare className="w-4 h-4" />
                        댓글 {MOCK_POST.stats.comments}
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
                        <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
                        <Flag className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-8">
                <h3 className="text-xl font-bold text-white">댓글 {MOCK_POST.stats.comments}개</h3>
                <CommentInput />
                <CommentList comments={MOCK_POST.comments} />
            </div>
        </div>
    );
}
