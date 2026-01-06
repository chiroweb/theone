"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SignupFormData } from "../types";
import { Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

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
                <p className="text-neutral-400">본인의 전문성과 창업 비전을 보여주세요. (기여 가능성 중심)</p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-neutral-300">준비 중인 사업 분야</Label>
                        <Input
                            value={data.startupField}
                            onChange={(e) => updateData({ startupField: e.target.value })}
                            placeholder="예: AI 기반 핀테크"
                            className="bg-neutral-900 border-neutral-800 text-white h-12 rounded-none focus:border-white transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-neutral-300">현재 단계</Label>
                        <Select onValueChange={(val) => updateData({ startupStage: val })} defaultValue={data.startupStage}>
                            <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white h-12 rounded-none">
                                <SelectValue placeholder="선택해주세요" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 border-neutral-800 text-white rounded-none">
                                <SelectItem value="idea">아이디어 단계</SelectItem>
                                <SelectItem value="mvp">MVP 개발 중</SelectItem>
                                <SelectItem value="early">초기 운영 (매출 발생 전)</SelectItem>
                                <SelectItem value="revenue">매출 발생 시작</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label className="text-neutral-300">자기소개 (필수)</Label>
                        <span className={cn("text-xs", (data.founderBio?.length || 0) < 300 ? "text-red-500" : "text-green-500")}>
                            {data.founderBio?.length || 0} / 300자 이상
                        </span>
                    </div>
                    <p className="text-xs text-neutral-500 mb-2">
                        1. 준비 중인 사업 소개<br />
                        2. 본인의 전문성 (기술/경험)<br />
                        3. 커뮤니티에서 얻고자 하는 것 및 기여할 수 있는 점
                    </p>
                    <Textarea
                        value={data.founderBio}
                        onChange={(e) => updateData({ founderBio: e.target.value })}
                        className="bg-neutral-900 border-neutral-800 text-white min-h-[200px] rounded-none focus:border-white transition-colors p-4 resize-none"
                        placeholder="심사에 가장 중요한 항목입니다. 구체적으로 작성해주세요."
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-neutral-300">포트폴리오 / 경력 증빙 (필수)</Label>
                    <div className="space-y-3">
                        <Input
                            value={data.portfolioUrl}
                            onChange={(e) => updateData({ portfolioUrl: e.target.value })}
                            placeholder="URL 입력 (LinkedIn, GitHub, Behance, Blog 등)"
                            className="bg-neutral-900 border-neutral-800 text-white h-12 rounded-none focus:border-white transition-colors"
                        />
                        <div className="border-2 border-dashed border-neutral-800 rounded-none p-6 text-center hover:bg-neutral-900 transition-colors cursor-pointer group">
                            <Upload className="w-6 h-6 mx-auto text-neutral-500 group-hover:text-white mb-2" />
                            <p className="text-sm text-neutral-400">또는 파일 업로드 (PDF)</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="text-neutral-300">전문 역할 (중복 선택)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {EXPERT_ROLES.map((role) => (
                            <div
                                key={role}
                                onClick={() => toggleRole(role)}
                                className={cn(
                                    "cursor-pointer border px-3 py-2 text-sm text-center transition-all",
                                    (data.expertRoles || []).includes(role)
                                        ? "bg-white text-black border-white font-bold"
                                        : "bg-black text-neutral-400 border-neutral-800 hover:border-neutral-600"
                                )}
                            >
                                {role}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
