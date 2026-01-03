import { InsightCard } from "@/components/feed/InsightCard";

const MOCK_INSIGHTS = [
    {
        id: "1",
        title: "2026년 마이크로 SaaS 애그리게이터의 부상",
        source: "TechCrunch",
        date: "2025년 10월 24일",
        summary: [
            "사모펀드(PE)들이 월 매출 $10k-$50k 규모의 마이크로 SaaS 툴을 묶음으로 인수하는 사례가 증가하고 있습니다.",
            "틈새 B2B 툴의 가치는 ARR 4-5배 수준에서 안정화되었으며, 이는 롤업(Roll-up) 전략에 매력적인 가격대입니다.",
            "AI 에이전트를 통한 실사(Due Diligence) 자동화로 딜 소싱 속도가 300% 가속화되었습니다."
        ],
        action: "특정 버티컬(예: 치과용 CRM)을 타겟으로 하는 3-5개의 상호 보완적인 B2B 툴 포트폴리오를 구축하여 번들 매각을 목표로 하세요.",
        tags: ["SaaS", "M&A", "트렌드"]
    },
    {
        id: "2",
        title: "DeepSeek의 오픈소스 모델, GPT-5에 도전장",
        source: "Y Combinator Forum",
        date: "2025년 10월 23일",
        summary: [
            "DeepSeek-V3가 코딩 벤치마크에서 GPT-5와 대등한 성능을 보이면서도 추론 비용은 1/10 수준입니다.",
            "개발자들은 개인정보 보호가 중요한 애플리케이션을 위해 자체 호스팅(Self-hosted) 모델로 이동하고 있습니다.",
            "단순 래퍼(Wrapper) 스타트업의 해자가 예상보다 빠르게 붕괴되고 있습니다."
        ],
        action: "'AI 래퍼'에서 독자적인 데이터를 보유한 '버티컬 AI 에이전트'로 피벗하세요. 원가 절감을 위해 모델 자체 호스팅을 고려하세요.",
        tags: ["AI", "LLM", "전략"]
    },
    {
        id: "3",
        title: "럭셔리 커머스: '하이터치' 디지털의 귀환",
        source: "Vogue Business",
        date: "2025년 10월 22일",
        summary: [
            "Z세대 럭셔리 소비자들이 알고리즘 피드 대신 사람이 큐레이션한 디지털 부티크를 선호하기 시작했습니다.",
            "1:1 화상 상담을 제공하는 브랜드들의 LTV(고객 생애 가치)가 40% 증가했습니다.",
            "'조용한 럭셔리(Silent Luxury)' 트렌드가 디지털 자산과 독점 커뮤니티 접근권으로 이동하고 있습니다."
        ],
        action: "이커머스 브랜드에 '컨시어지 티어'를 도입하세요. 비디오 커머스 툴을 활용해 개인화된 쇼핑 경험을 제공하세요.",
        tags: ["이커머스", "럭셔리", "소비자"]
    }
];

export default function FeedPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-end border-b border-neutral-800 pb-6">
                <div>
                    <h1 className="text-4xl font-heading font-bold tracking-tight mb-2">Insight Feed</h1>
                    <p className="text-neutral-400">상위 1%를 위한 AI 기반 비즈니스 인텔리전스.</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-sm text-neutral-500">최근 업데이트: 방금 전</p>
                    <p className="text-xs text-neutral-600">출처: Global Business Network</p>
                </div>
            </div>

            <div className="grid gap-8">
                {MOCK_INSIGHTS.map((insight) => (
                    <InsightCard key={insight.id} {...insight} />
                ))}
            </div>
        </div>
    );
}
