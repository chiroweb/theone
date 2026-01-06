"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SignupFormData } from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface StepProps {
    data: SignupFormData;
    updateData: (data: Partial<SignupFormData>) => void;
}

const GIVE_OPTIONS = [
    { label: "💻 기술 (개발/디자인)", value: "tech" },
    { label: "📢 마케팅/브랜딩", value: "marketing" },
    { label: "💼 비즈니스 전략", value: "business" },
    { label: "💰 투자/재무/세무", value: "finance" },
    { label: "🌐 네트워킹/해외진출", value: "network" },
    { label: "⚙️ 운영/인사/법률", value: "ops" },
];

const TAKE_OPTIONS = [
    { label: "💰 자금 (투자/지원사업)", value: "capital" },
    { label: "🤝 멘토링/네트워킹", value: "network" },
    { label: "💼 실무 지원 (법률/세무/개발 등)", value: "support" },
    { label: "📚 지식/인사이트", value: "knowledge" },
    { label: "🏢 인프라 (사무실/채용)", value: "infra" },
];

export function StepCommonInfo({ data, updateData }: StepProps) {
    const handleGiveChange = (value: string) => {
        const current = data.giveElements || [];
        const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
        updateData({ giveElements: next });
    };

    const handleTakeChange = (value: string) => {
        const current = data.takeElements || [];
        if (current.includes(value)) {
            updateData({ takeElements: current.filter(v => v !== value) });
        } else if (current.length < 5) {
            updateData({ takeElements: [...current, value] });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="space-y-4">
                <h2 className="text-3xl font-heading font-bold">마지막 단계</h2>
                <p className="text-neutral-400">Give & Take 매칭과 가입 동기를 확인합니다.</p>
            </div>

            <div className="space-y-8">
                {/* Give */}
                <div className="space-y-3">
                    <Label className="text-neutral-300 text-lg flex items-center justify-between">
                        <span className="font-bold">1. 다른 멤버에게 어떤 도움을 줄 수 있나요? (Give)</span>
                        <span className="text-xs font-normal text-neutral-500">최소 1개 선택</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                        {GIVE_OPTIONS.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => handleGiveChange(opt.value)}
                                className={cn(
                                    "cursor-pointer border px-4 py-3 text-sm transition-all flex items-center gap-2",
                                    (data.giveElements || []).includes(opt.value)
                                        ? "bg-white text-black border-white font-bold"
                                        : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600"
                                )}
                            >
                                <div className={cn("w-4 h-4 border flex items-center justify-center shrink-0",
                                    (data.giveElements || []).includes(opt.value) ? "border-black bg-black" : "border-neutral-600"
                                )}>
                                    {(data.giveElements || []).includes(opt.value) && <div className="w-2 h-2 bg-white" />}
                                </div>
                                {opt.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Take */}
                <div className="space-y-3">
                    <Label className="text-neutral-300 text-lg flex items-center justify-between">
                        <span className="font-bold">2. 커뮤니티에서 무엇을 얻고 싶으신가요? (Take)</span>
                        <span className="text-xs font-normal text-neutral-500">최대 5개 선택</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                        {TAKE_OPTIONS.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => handleTakeChange(opt.value)}
                                className={cn(
                                    "cursor-pointer border px-4 py-3 text-sm transition-all flex items-center gap-2",
                                    (data.takeElements || []).includes(opt.value)
                                        ? "bg-neutral-800 text-white border-white"
                                        : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600"
                                )}
                            >
                                <div className={cn("w-4 h-4 border flex items-center justify-center shrink-0 rounded-full",
                                    (data.takeElements || []).includes(opt.value) ? "border-white bg-white" : "border-neutral-600"
                                )}>
                                    {(data.takeElements || []).includes(opt.value) && <div className="w-2 h-2 bg-black rounded-full" />}
                                </div>
                                {opt.label}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-neutral-300">3. 가입 동기 (필수)</Label>
                    <Textarea
                        value={data.motivation}
                        onChange={(e) => updateData({ motivation: e.target.value })}
                        className="bg-neutral-900 border-neutral-800 text-white min-h-[100px] rounded-none focus:border-white transition-colors p-4 resize-none"
                        placeholder="구체적으로 작성해주시면 심사에 도움이 됩니다."
                    />
                </div>

                <div className="space-y-2 pt-4 border-t border-neutral-800">
                    <Label className="text-neutral-300">추천인 코드 (선택)</Label>
                    <div className="relative">
                        <Input
                            value={data.referralCode}
                            onChange={(e) => updateData({ referralCode: e.target.value })}
                            placeholder="초대 또는 추천인 코드 입력"
                            className="bg-neutral-900 border-neutral-800 text-white h-12 rounded-none focus:border-white transition-colors"
                        />
                        {data.referralCode && data.referralCode.length > 3 && (
                            <div className="absolute right-3 top-3.5 text-xs text-green-500 font-bold">
                                ※ 코드 확인됨 (임시 액세스 가능)
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                        * 추천인 코드가 확인되면 심사 전 <strong>임시 액세스 권한</strong>이 부여됩니다.
                    </p>
                </div>

                <div className="flex items-start space-x-2 pt-4">
                    <Checkbox id="terms" checked={data.termsAgreed} onCheckedChange={(c) => updateData({ termsAgreed: c === true })} className="rounded-none border-neutral-600 data-[state=checked]:bg-white data-[state=checked]:text-black" />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none text-neutral-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            [필수] 이용 약관 및 허위 정보 제공 시 제명 조항에 동의합니다.
                        </label>
                        <p className="text-xs text-neutral-500">
                            제출한 정보가 허위일 경우, 즉시 자격 박탈 및 재가입이 불가함을 확인했습니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
