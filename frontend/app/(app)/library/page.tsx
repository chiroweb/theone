"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, ArrowRight, BookOpen, Scale, Calculator, Building2 } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
    {
        id: "tax",
        title: "세무/회계 가이드",
        description: "홈택스 사용법부터 절세 전략까지, 사업가가 꼭 알아야 할 세무 지식.",
        icon: Calculator,
        color: "text-blue-400",
        count: 12
    },
    {
        id: "startup",
        title: "창업/경영 매뉴얼",
        description: "법인 설립, 사업자 등록, 초기 자금 조달 등 실전 경영 가이드.",
        icon: Building2,
        color: "text-green-400",
        count: 8
    },
    {
        id: "legal",
        title: "법률 및 정책",
        description: "최신 정부 지원 사업, 필수 법률 상식 및 노무 관리.",
        icon: Scale,
        color: "text-purple-400",
        count: 15
    },
    {
        id: "templates",
        title: "필수 서식 모음",
        description: "계약서, 내용증명, 사업계획서 등 검증된 비즈니스 서식.",
        icon: FileText,
        color: "text-orange-400",
        count: 24
    }
];

const FEATURED_RESOURCES = [
    {
        id: "1",
        title: "2026년 개정 세법 완벽 가이드",
        category: "세무/회계",
        type: "PDF",
        date: "2026.01.02",
        downloads: 1205
    },
    {
        id: "2",
        title: "표준 근로계약서 및 노무 관리 체크리스트",
        category: "필수 서식",
        type: "DOCX",
        date: "2025.12.28",
        downloads: 890
    },
    {
        id: "3",
        title: "초기 스타트업을 위한 정부 지원사업 총정리",
        category: "법률/정책",
        type: "PDF",
        date: "2025.12.15",
        downloads: 2100
    }
];

export default function LibraryPage() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-yellow-500 mb-2">
                    <Badge variant="outline" className="border-yellow-500/50 text-yellow-500 rounded-none px-3 py-1 uppercase tracking-wider">Premium Resource</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
                    The 1% 자료실
                </h1>
                <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
                    사업의 성패를 가르는 것은 정보의 질입니다.<br />
                    검증된 실무 가이드와 필수 서식을 마음껏 활용하세요.
                </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CATEGORIES.map((category) => (
                    <Link key={category.id} href={`/library?category=${category.id}`} className="group">
                        <Card className="bg-neutral-900 border-neutral-800 hover:border-neutral-600 transition-all duration-300 h-full">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-lg bg-neutral-800 ${category.color}`}>
                                        <category.icon className="w-6 h-6" />
                                    </div>
                                    <Badge variant="secondary" className="bg-neutral-800 text-neutral-400 rounded-none">
                                        {category.count} 자료
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl mb-2 group-hover:text-white transition-colors">{category.title}</CardTitle>
                                <CardDescription className="text-neutral-400 text-base">
                                    {category.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Featured Resources */}
            <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-neutral-800 pb-4">
                    <h2 className="text-2xl font-bold">최신 업데이트 자료</h2>
                    <Link href="/library/all" className="text-sm text-neutral-400 hover:text-white flex items-center gap-1">
                        전체보기 <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid gap-4">
                    {FEATURED_RESOURCES.map((resource) => (
                        <Link key={resource.id} href={`/library/${resource.id}`} className="group">
                            <div className="flex items-center justify-between p-6 bg-neutral-900/50 border border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-neutral-800 rounded flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-neutral-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-white group-hover:underline decoration-1 underline-offset-4">
                                            {resource.title}
                                        </h3>
                                        <div className="flex items-center gap-3 text-sm text-neutral-500 mt-1">
                                            <span className="text-neutral-400">{resource.category}</span>
                                            <span>•</span>
                                            <span>{resource.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="outline" className="border-neutral-700 text-neutral-400 rounded-none">
                                        {resource.type}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-sm text-neutral-500">
                                        <Download className="w-4 h-4" />
                                        {resource.downloads}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
