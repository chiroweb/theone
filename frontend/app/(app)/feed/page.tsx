"use client";

import { InsightCard } from "@/components/feed/InsightCard";
import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import { toast } from "sonner";

interface Insight {
    id: number;
    source: string;
    country: string;
    original_url: string;
    original_title: string;
    ai_summary: string;
    action_idea: string;
    kr_check_similar: string;
    kr_check_regulation: string;
    kr_check_barrier: string;
    created_at: string;
}

export default function FeedPage() {
    const [insights, setInsights] = useState<Insight[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const response = await api.get('/insights');
                if (response.data) {
                    setInsights(response.data);
                }
            } catch (error) {
                console.error("Error fetching insights:", error);
                toast.error("인사이트를 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchInsights();
    }, []);

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-end border-b border-neutral-800 pb-6">
                <div>
                    <h1 className="text-4xl font-heading font-bold tracking-tight mb-2">Insight Feed</h1>
                    <p className="text-neutral-400">상위 1%를 위한 AI 기반 비즈니스 인텔리전스.</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-sm text-neutral-500">최근 업데이트: 실시간</p>
                    <p className="text-xs text-neutral-600">출처: Global Business Network</p>
                </div>
            </div>

            <div className="space-y-6">
                {loading ? (
                    <div className="text-white text-center py-20">로딩 중...</div>
                ) : insights.length === 0 ? (
                    <div className="text-neutral-500 text-center py-20">
                        <p>아직 등록된 인사이트가 없습니다.</p>
                        <p className="text-sm mt-2">매일 아침/저녁에 자동으로 업데이트됩니다.</p>
                    </div>
                ) : (
                    insights.map((insight) => (
                        <InsightCard
                            key={insight.id}
                            title={insight.original_title}
                            source={insight.source}
                            date={new Date(insight.created_at).toLocaleDateString()}
                            summary={insight.ai_summary.split('\n')}
                            action={insight.action_idea}
                            tags={[insight.country, "Business", "Trend"]}
                            kr_check={{
                                similar_service: insight.kr_check_similar,
                                regulation: insight.kr_check_regulation,
                                barrier: insight.kr_check_barrier
                            }}
                            original_url={insight.original_url}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
