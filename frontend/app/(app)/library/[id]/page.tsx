"use client";

import { ResourceDetail } from "@/components/library/ResourceDetail";
import { notFound } from "next/navigation";

// Mock Data
const MOCK_RESOURCES: Record<string, any> = {
    "1": {
        id: "1",
        title: "2026년 개정 세법 완벽 가이드",
        description: `2026년 새롭게 개정된 세법의 주요 내용을 실무자 관점에서 알기 쉽게 정리했습니다.
법인세, 소득세, 부가가치세 등 주요 세목별 변경 사항과 절세 포인트를 확인하세요.

[주요 내용]
1. 법인세율 구간 조정 및 세액공제 확대 방안
2. 가업상속공제 한도 상향 및 요건 완화
3. R&D 세액공제 및 고용증대 세액공제 최신 규정
4. 2026년 적용되는 조세특례제한법 주요 이슈

본 자료는 세무법인 OO와 제휴하여 작성되었으며, 실제 세무 처리 시에는 전문가와의 상담을 권장합니다.`,
        category: "세무/회계",
        type: "Premium",
        date: "2026.01.02",
        views: 3420,
        downloads: 1205,
        files: [
            { name: "2026_Tax_Guide_v1.0.pdf", size: "12.5 MB", type: "PDF" },
            { name: "Key_Changes_Summary.pptx", size: "5.2 MB", type: "PPTX" }
        ]
    },
    // Fallback for others
    "default": {
        id: "999",
        title: "자료 제목 예시",
        description: "자료 설명이 들어갑니다.",
        category: "기타",
        type: "General",
        date: "2026.01.01",
        views: 100,
        downloads: 10,
        files: [
            { name: "Sample_File.pdf", size: "1.0 MB", type: "PDF" }
        ]
    }
};

export default function ResourcePage({ params }: { params: { id: string } }) {
    const resource = MOCK_RESOURCES[params.id] || { ...MOCK_RESOURCES["default"], id: params.id };

    if (!resource) return notFound();

    return <ResourceDetail resource={resource} />;
}
