"use client";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ApplyPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        toast.success("지원서가 제출되었습니다. 심사 결과는 이메일로 안내됩니다.");
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-3xl mx-auto p-6 md:p-12">
                <div className="mb-12 space-y-4">
                    <Link href="/" className="inline-flex items-center text-neutral-500 hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter">
                        MEMBERSHIP APPLICATION
                    </h1>
                    <p className="text-neutral-400 text-lg leading-relaxed">
                        우리는 소수의 혁신가들을 위한 커뮤니티입니다.<br />
                        당신의 비즈니스와 비전을 공유해주세요. 심사 후 초대장을 발송해 드립니다.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Section 1: Basic Info */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white border-b border-neutral-800 pb-2 uppercase tracking-wider">
                            01. 기본 정보
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-neutral-300">이름</Label>
                                <Input id="name" required placeholder="홍길동" className="bg-neutral-900 border-neutral-800 text-white rounded-none h-12" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-neutral-300">이메일</Label>
                                <Input id="email" type="email" required placeholder="name@company.com" className="bg-neutral-900 border-neutral-800 text-white rounded-none h-12" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-neutral-300">연락처</Label>
                                <Input id="phone" type="tel" required placeholder="010-1234-5678" className="bg-neutral-900 border-neutral-800 text-white rounded-none h-12" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location" className="text-neutral-300">거주 지역</Label>
                                <Input id="location" placeholder="서울, 강남구" className="bg-neutral-900 border-neutral-800 text-white rounded-none h-12" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Business Info */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white border-b border-neutral-800 pb-2 uppercase tracking-wider">
                            02. 비즈니스 정보
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-neutral-300">회사/소속</Label>
                                <Input id="company" required placeholder="회사명" className="bg-neutral-900 border-neutral-800 text-white rounded-none h-12" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role" className="text-neutral-300">직책</Label>
                                <Select required>
                                    <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white rounded-none h-12">
                                        <SelectValue placeholder="선택해주세요" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-neutral-800 text-white rounded-none">
                                        <SelectItem value="ceo">CEO / Founder</SelectItem>
                                        <SelectItem value="c-level">C-Level Executive</SelectItem>
                                        <SelectItem value="director">Director / VP</SelectItem>
                                        <SelectItem value="manager">Manager / Team Lead</SelectItem>
                                        <SelectItem value="professional">Professional (Lawyer, Doctor, etc.)</SelectItem>
                                        <SelectItem value="investor">Investor</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="biz-num" className="text-neutral-300">사업자등록번호 (선택)</Label>
                                <Input id="biz-num" placeholder="000-00-00000" className="bg-neutral-900 border-neutral-800 text-white rounded-none h-12" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="revenue" className="text-neutral-300">연 매출 규모</Label>
                                <Select>
                                    <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white rounded-none h-12">
                                        <SelectValue placeholder="선택해주세요" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-neutral-800 text-white rounded-none">
                                        <SelectItem value="seed">Pre-revenue / Seed</SelectItem>
                                        <SelectItem value="under-1m">Under $1M</SelectItem>
                                        <SelectItem value="1m-10m">$1M - $10M</SelectItem>
                                        <SelectItem value="10m-50m">$10M - $50M</SelectItem>
                                        <SelectItem value="over-50m">$50M+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="industry" className="text-neutral-300">산업 분야 (대분류)</Label>
                                <Select required>
                                    <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white rounded-none h-12">
                                        <SelectValue placeholder="선택해주세요" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-neutral-800 text-white rounded-none">
                                        <SelectItem value="manufacturing">제조업</SelectItem>
                                        <SelectItem value="logistics">유통/물류</SelectItem>
                                        <SelectItem value="it">IT/테크</SelectItem>
                                        <SelectItem value="service">서비스업</SelectItem>
                                        <SelectItem value="media">콘텐츠/미디어</SelectItem>
                                        <SelectItem value="other">기타</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sub-industry" className="text-neutral-300">세부 영역 (중분류)</Label>
                                <Select required>
                                    <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white rounded-none h-12">
                                        <SelectValue placeholder="대분류를 먼저 선택하세요" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-neutral-800 text-white rounded-none">
                                        {/* Mock options - in real app, these would depend on selected industry */}
                                        <SelectItem value="welding">금속/용접</SelectItem>
                                        <SelectItem value="plastic">플라스틱/사출</SelectItem>
                                        <SelectItem value="food">식품가공</SelectItem>
                                        <SelectItem value="textile">섬유/의류</SelectItem>
                                        <SelectItem value="saas">SaaS</SelectItem>
                                        <SelectItem value="ai">AI/ML</SelectItem>
                                        <SelectItem value="logistics-domestic">국내배송</SelectItem>
                                        <SelectItem value="logistics-global">해외배송</SelectItem>
                                        <SelectItem value="finance">금융</SelectItem>
                                        <SelectItem value="marketing">마케팅에이전시</SelectItem>
                                        <SelectItem value="other">기타</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-neutral-300">전문 역할 (복수 선택 가능)</Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {["생산/제조", "물류/배송", "마케팅/브랜딩", "재무/투자", "기술/개발", "법률/회계", "영업/BD", "인사/조직", "기타"].map((role) => (
                                    <div key={role} className="flex items-center space-x-2">
                                        <input type="checkbox" id={`role-${role}`} className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-white focus:ring-offset-black" />
                                        <label htmlFor={`role-${role}`} className="text-sm text-neutral-400 cursor-pointer select-none">{role}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio" className="text-neutral-300">한 줄 소개 (50자 이내)</Label>
                            <Input id="bio" maxLength={50} placeholder="예: 동남아 물류 10년, 라스트마일 배송 전문" className="bg-neutral-900 border-neutral-800 text-white rounded-none h-12" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="linkedin" className="text-neutral-300">LinkedIn / Website URL</Label>
                            <Input id="linkedin" placeholder="https://" className="bg-neutral-900 border-neutral-800 text-white rounded-none h-12" />
                        </div>
                    </div>

                    {/* Section 3: Questions */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white border-b border-neutral-800 pb-2 uppercase tracking-wider">
                            03. 가입 신청 질문
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="q1" className="text-neutral-300">
                                    가입 동기가 무엇인가요? 어떤 가치를 얻고자 하시나요?
                                </Label>
                                <Textarea
                                    id="q1"
                                    required
                                    className="bg-neutral-900 border-neutral-800 text-white rounded-none min-h-[120px] resize-none p-4"
                                    placeholder="자유롭게 작성해주세요."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="q2" className="text-neutral-300">
                                    커뮤니티에 어떤 기여를 할 수 있으신가요? (전문성, 네트워크 등)
                                </Label>
                                <Textarea
                                    id="q2"
                                    required
                                    className="bg-neutral-900 border-neutral-800 text-white rounded-none min-h-[120px] resize-none p-4"
                                    placeholder="자유롭게 작성해주세요."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-16 bg-white text-black hover:bg-neutral-200 rounded-none font-bold text-xl tracking-wide"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> 제출 중...
                                </>
                            ) : (
                                "SUBMIT APPLICATION"
                            )}
                        </Button>
                        <p className="text-center text-neutral-500 text-sm mt-4">
                            제출된 정보는 심사 목적으로만 사용되며, 철저히 비밀이 보장됩니다.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
