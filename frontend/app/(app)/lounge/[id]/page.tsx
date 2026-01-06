"use client";

import { PostDetail } from "@/components/lounge/PostDetail";
import { notFound } from "next/navigation";

// Mock Data Source (shared/duplicated from page.tsx for now, but enriched)
const MOCK_POSTS: Record<string, any> = {
    "1": {
        id: "1",
        title: "[질문] 2026년 달러 변동성, 어떻게 헷징하고 계신가요?",
        author: "Alex V.",
        date: "2시간 전",
        category: "경제/금융",
        views: 1205,
        likes: 124,
        isHot: true,
        type: "question",
        content: `최근 연준의 금리 정책 발표 이후 환율 변동성이 심상치 않습니다.
저희는 현재 수출 비중이 70% 정도라 환리스크 관리가 필수적인데, 기존의 통화선물 방식만으로는 한계가 느껴지네요.

다른 대표님들은 현재 상황에서 어떤 방식으로 헷징 포트폴리오를 구성하고 계신지 궁금합니다.
특히 엔화 관련해서도 이슈가 있는데, 다들 어떻게 대응하고 계신지요?

저희는 현재:
1. 통화선물 50%
2. 환변동보험 30%
3. 현물 보유 20%

정도로 가져가고 있습니다만, 현금 흐름 측면에서 좀 더 유연한 전략이 필요해 보입니다.
고견 부탁드립니다.`,
        attachments: [
            { name: "2026_FX_Outlook.pdf", size: "2.4 MB", type: "PDF" },
            { name: "Hedge_Strategy_Draft_v2.xlsx", size: "45 KB", type: "EXCEL" }
        ]
    },
    "2": {
        id: "2",
        title: "다가오는 다보스 포럼 전용기 쉐어하실 분",
        author: "Elena R.",
        date: "2일 전",
        category: "네트워킹",
        views: 310,
        likes: 45,
        content: `안녕하세요, 이번 1월 다보스 포럼 참석 예정이신 분들 계신가요?
서울(GMP) 출발 취리히행 전용기(G650ER) 섭외했는데 현재 4자리 정도 여유가 있습니다.

일정: 1/14 출발 - 1/20 귀국 (조정 가능)
비용: 1/N (쪽지 문의)

비즈니스 네트워킹 겸 편하게 이동하실 분들 연락 주시기 바랍니다.`,
    },
    // Fallback for other IDs just to show something
    "default": {
        id: "999",
        title: "샘플 게시글 제목입니다.",
        author: "Unknown",
        date: "1일 전",
        category: "자유게시판",
        views: 100,
        likes: 10,
        content: "내용이 없습니다.",
    }
};

export default function PostPage({ params }: { params: { id: string } }) {
    const post = MOCK_POSTS[params.id] || { ...MOCK_POSTS["default"], id: params.id, title: `게시글 ${params.id}` };

    if (!post) return notFound();

    return <PostDetail post={post} />;
}
