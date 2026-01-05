"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, FileText, Calendar, Eye, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock Data for Detail Page
const RESOURCE_DETAIL = {
    id: "1",
    title: "2026년 개정 세법 완벽 가이드",
    subtitle: "법인세, 소득세 주요 변경 사항 및 절세 전략 총정리",
    category: "세무/회계",
    author: "김세무 회계사",
    date: "2026.01.02",
    views: 1205,
    downloads: 540,
    type: "PDF",
    size: "2.4 MB",
    content: `
        <div class="space-y-6 text-neutral-300 leading-relaxed">
            <p>
                2026년 세법 개정안이 확정되었습니다. 이번 개정안은 기업의 투자 활성화와 고용 증대를 위한 다양한 세제 혜택을 포함하고 있습니다.
                특히 스타트업과 중소기업 대표님들이 반드시 알아두셔야 할 핵심 변경 사항들을 정리했습니다.
            </p>
            
            <h3 class="text-xl font-bold text-white mt-8 mb-4">1. 법인세율 구간 조정</h3>
            <p>
                과세표준 구간이 일부 상향 조정되어, 중소기업의 세부담이 실질적으로 완화될 전망입니다.
                구체적인 구간별 세율 변화는 첨부된 가이드 12페이지를 참고하시기 바랍니다.
            </p>

            <h3 class="text-xl font-bold text-white mt-8 mb-4">2. 고용증대 세액공제 확대</h3>
            <p>
                청년 정규직 채용 시 공제되는 금액이 수도권 기준 1인당 1,500만원으로 확대되었습니다.
                이는 전년 대비 20% 상향된 금액으로, 인력 충원을 계획 중인 대표님들께 큰 도움이 될 것입니다.
            </p>

            <h3 class="text-xl font-bold text-white mt-8 mb-4">3. 가업상속공제 요건 완화</h3>
            <p>
                가업 영위 기간 요건이 기존 10년에서 5년으로 단축되었습니다.
                2세 경영 승계를 준비하시는 분들은 이번 기회를 적극 활용하시기 바랍니다.
            </p>

            <div class="bg-neutral-900 border-l-4 border-yellow-500 p-6 my-8">
                <h4 class="font-bold text-white mb-2">💡 전문가의 조언</h4>
                <p>
                    이번 개정안은 혜택을 '신청'하는 기업에게만 돌아갑니다.
                    3월 법인세 신고 전, 담당 세무사와 반드시 상의하여 누락되는 공제 항목이 없는지 체크하시기 바랍니다.
                </p>
            </div>
        </div>
    `
};

export default function LibraryDetailPage() {
    const params = useParams();
    // In a real app, fetch data based on params.id

    return (
        <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link href="/library" className="inline-flex items-center text-neutral-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                자료실 목록으로 돌아가기
            </Link>

            {/* Header */}
            <div className="border-b border-neutral-800 pb-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400 rounded-none px-3 py-1">
                        {RESOURCE_DETAIL.category}
                    </Badge>
                    <span className="text-neutral-500 text-sm">{RESOURCE_DETAIL.date}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-white mb-4">
                    {RESOURCE_DETAIL.title}
                </h1>
                <p className="text-xl text-neutral-400">
                    {RESOURCE_DETAIL.subtitle}
                </p>

                <div className="flex items-center justify-between mt-8">
                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <span>작성자 <span className="text-neutral-300">{RESOURCE_DETAIL.author}</span></span>
                        <span className="w-px h-3 bg-neutral-800"></span>
                        <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" /> {RESOURCE_DETAIL.views}
                        </div>
                        <div className="flex items-center gap-1">
                            <Download className="w-4 h-4" /> {RESOURCE_DETAIL.downloads}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
                            <Bookmark className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: RESOURCE_DETAIL.content }}
                    />
                </div>

                {/* Sidebar / Download Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-neutral-900 border border-neutral-800 p-6">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-yellow-500" />
                                자료 다운로드
                            </h3>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-400">파일 형식</span>
                                    <span className="text-white font-mono">{RESOURCE_DETAIL.type}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-400">파일 크기</span>
                                    <span className="text-white font-mono">{RESOURCE_DETAIL.size}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-400">업데이트</span>
                                    <span className="text-white font-mono">{RESOURCE_DETAIL.date}</span>
                                </div>
                            </div>
                            <Button className="w-full bg-white text-black hover:bg-neutral-200 font-bold rounded-none h-12">
                                <Download className="w-4 h-4 mr-2" /> 다운로드 받기
                            </Button>
                            <p className="text-xs text-neutral-500 mt-4 text-center">
                                * 프리미엄 멤버십 회원만 다운로드 가능합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
