"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Building2, Briefcase, Link as LinkIcon, Mail, MessageCircle, UserPlus } from "lucide-react";
import Link from "next/link";

// Mock Data
const MOCK_PROFILE = {
    id: 1,
    name: "Jason K.",
    role: "물류/배송 전문가",
    location: "경기도, KR",
    avatar: "",
    bio: "동남아 라스트마일 배송 10년 경력. 현재 글로벌 물류 스타트업을 운영하며 크로스보더 이커머스 물류 혁신을 주도하고 있습니다.",
    company: {
        name: "GlobalLog Inc.",
        role: "CEO",
        revenue: "$1M - $5M",
        employees: "11-50명"
    },
    expertise: ["물류/배송", "동남아시장", "라스트마일", "이커머스", "콜드체인"],
    offers: [
        "동남아 현지 물류 네트워크 소개 가능",
        "베트남/인도네시아 진출 조언",
        "크로스보더 물류 비용 절감 컨설팅"
    ],
    needs: [
        "물류 시스템 고도화를 위한 기술 파트너 (CTO급)",
        "시리즈 A 투자 유치를 위한 VC 연결",
        "현지 마케팅 파트너"
    ],
    activity: [
        { id: 1, type: "post", content: "물류비 절감 팁 공유합니다", time: "3일 전" },
        { id: 2, type: "comment", content: "저희도 비슷한 고민을 했었는데...", time: "1주 전" }
    ]
};

export default function ProfileDetailPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            {/* Back Button */}
            <Link href="/pipeline" className="inline-flex items-center text-neutral-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                파이프라인으로 돌아가기
            </Link>

            {/* Header Profile Card */}
            <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl flex flex-col md:flex-row gap-8 items-start md:items-center">
                <Avatar className="w-32 h-32 border-4 border-neutral-800">
                    <AvatarImage src={MOCK_PROFILE.avatar} />
                    <AvatarFallback className="text-4xl">{MOCK_PROFILE.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4 w-full">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-white">{MOCK_PROFILE.name}</h1>
                        <p className="text-lg text-neutral-400">{MOCK_PROFILE.role}</p>
                        <div className="flex items-center gap-2 text-sm text-neutral-500 mt-1">
                            <MapPin className="w-4 h-4" />
                            {MOCK_PROFILE.location}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button className="bg-white text-black hover:bg-neutral-200 font-bold gap-2">
                            <MessageCircle className="w-4 h-4" />
                            메시지 보내기
                        </Button>
                        <Button variant="outline" className="border-neutral-700 hover:bg-neutral-800 text-white gap-2">
                            <UserPlus className="w-4 h-4" />
                            연결 요청
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Info */}
                <div className="md:col-span-2 space-y-8">
                    {/* Bio */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">소개</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            {MOCK_PROFILE.bio}
                        </p>
                    </section>

                    {/* Company Info */}
                    <Card className="bg-neutral-900 border-neutral-800 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Building2 className="w-5 h-5" /> 회사 정보
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-neutral-500">회사명</p>
                                <p className="font-medium">{MOCK_PROFILE.company.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500">직책</p>
                                <p className="font-medium">{MOCK_PROFILE.company.role}</p>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500">매출 규모</p>
                                <p className="font-medium">{MOCK_PROFILE.company.revenue}</p>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500">직원 수</p>
                                <p className="font-medium">{MOCK_PROFILE.company.employees}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Needs & Offers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-neutral-900 border-neutral-800 text-white">
                            <CardHeader>
                                <CardTitle className="text-lg text-green-400">Give (줄 수 있는 것)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {MOCK_PROFILE.offers.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                                            <span className="text-green-500 mt-1">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card className="bg-neutral-900 border-neutral-800 text-white">
                            <CardHeader>
                                <CardTitle className="text-lg text-blue-400">Take (찾고 있는 것)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {MOCK_PROFILE.needs.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                                            <span className="text-blue-500 mt-1">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Right Column: Expertise & Activity */}
                <div className="space-y-8">
                    {/* Expertise */}
                    <section>
                        <h2 className="text-lg font-bold text-white mb-4">전문 영역</h2>
                        <div className="flex flex-wrap gap-2">
                            {MOCK_PROFILE.expertise.map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-neutral-800 text-neutral-300 hover:bg-neutral-700">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </section>

                    {/* Recent Activity */}
                    <section>
                        <h2 className="text-lg font-bold text-white mb-4">최근 활동</h2>
                        <div className="space-y-4">
                            {MOCK_PROFILE.activity.map((act) => (
                                <div key={act.id} className="border-l-2 border-neutral-800 pl-4 py-1">
                                    <p className="text-sm text-white line-clamp-2 hover:underline cursor-pointer">"{act.content}"</p>
                                    <p className="text-xs text-neutral-500 mt-1">{act.time} · {act.type === 'post' ? '게시글' : '댓글'}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
