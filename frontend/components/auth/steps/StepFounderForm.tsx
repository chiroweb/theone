"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SignupFormData } from "../types";
import { Upload } from "lucide-react";

interface StepProps {
    data: SignupFormData;
    updateData: (data: Partial<SignupFormData>) => void;
}

const EXPERT_ROLES = ["개발/IT", "디자인", "마케팅", "비즈니스전략", "재무/회계", "법률", "영업", "기타"];

export function StepFounderForm({ data, updateData }: StepProps) {
    const toggleRole = (role: string) => {
        const current = data.expertRoles || [];
        const next = current.includes(role)
            ? current.filter(r => r !== role)
            : [...current, role];
        updateData({ expertRoles: next });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="space-y-4">
                <h2 className="text-3xl font-heading font-bold">창업자 정보</h2>
                <p className="text-neutral-400">본인의 전문성과 창업 비전을 보여주세요.</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label className="text-neutral-300">준비 중인 사업 분야</Label>
                    <Input
                        value={data.startupField}
                        onChange={(e) => updateData({ startupField: e.target.value })}
                        placeholder="예: AI 기반 핀테크, 친환경 패키징 등"
                        className="bg-neutral-900 border-neutral-800 text-white h-12 rounded-none focus:border-white transition-colors"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-neutral-300">자기소개 (300자 이상 권장)</Label>
                    <p className="text-xs text-neutral-500 mb-2">어떤 사업을 준비 중이며, 본인이 가진 핵심 역량은 무엇인가요?</p>
                    <Textarea
                        value={data.founderBio}
                        onChange={(e) => updateData({ founderBio: e.target.value })}
                        className="bg-neutral-900 border-neutral-800 text-white min-h-[150px] rounded-none focus:border-white transition-colors p-4 resize-none"
                        placeholder="자유롭게 작성해주세요."
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-neutral-300">포트폴리오 업로드 (필수)</Label>
                    <div className="border-2 border-dashed border-neutral-800 rounded-none p-8 text-center hover:bg-neutral-900 transition-colors cursor-pointer group">
                        <Upload className="w-8 h-8 mx-auto text-neutral-500 group-hover:text-white mb-2" />
                        <p className="text-sm text-neutral-400">PDF 또는 주요 링크 문서</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="text-neutral-300">전문 역할 (중복 선택)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {EXPERT_ROLES.map((role) => (
                            <div
                                key={role}
                                onClick={() => toggleRole(role)}
                                className={`cursor-pointer border px-3 py-2 text-sm text-center transition-all ${(data.expertRoles || []).includes(role)
                                        ? "bg-white text-black border-white font-bold"
                                        : "bg-black text-neutral-400 border-neutral-800 hover:border-neutral-600"
                                    }`}
                            >
                                {role}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-neutral-300">LinkedIn / GitHub / Behance (선택)</Label>
                    <Input
                        value={data.portfolioUrl}
                        onChange={(e) => updateData({ portfolioUrl: e.target.value })}
                        placeholder="https://"
                        className="bg-neutral-900 border-neutral-800 text-white h-12 rounded-none focus:border-white transition-colors"
                    />
                </div>
            </div>
        </div>
    );
}
