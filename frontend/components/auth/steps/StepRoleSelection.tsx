"use client";

import { SignupFormData } from "../types";
import { Building2, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProps {
    data: SignupFormData;
    updateData: (data: Partial<SignupFormData>) => void;
}

export function StepRoleSelection({ data, updateData }: StepProps) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="space-y-4">
                <h2 className="text-3xl font-heading font-bold">회원 유형 선택</h2>
                <p className="text-neutral-400">본인에게 해당되는 유형을 선택해주세요. 유형에 따라 심사 기준이 다릅니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {/* Business Owner Card */}
                <button
                    onClick={() => updateData({ role: "business" })}
                    className={cn(
                        "group relative p-8 text-left border-2 transition-all duration-300 hover:bg-neutral-900 flex flex-col gap-6",
                        data.role === "business"
                            ? "border-white bg-neutral-900"
                            : "border-neutral-800 hover:border-neutral-600"
                    )}
                >
                    <div className="w-14 h-14 rounded-none bg-neutral-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                        <Building2 className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">사업가</h3>
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                            사업자등록증 보유 및 실제 운영 중인 대표/임원.
                        </p>
                        <div className="pt-4 border-t border-neutral-800">
                            <p className="text-xs font-bold text-neutral-300 mb-2">검증 초점</p>
                            <p className="text-xs text-neutral-500">"진짜 사업하는 사람인가"</p>
                        </div>
                        <ul className="mt-3 text-xs text-neutral-500 space-y-1">
                            <li>• 사업자등록증 확인 (필수)</li>
                            <li>• 직책 및 매출 규모 확인</li>
                        </ul>
                    </div>
                </button>

                {/* Founder Card */}
                <button
                    onClick={() => updateData({ role: "founder" })}
                    className={cn(
                        "group relative p-8 text-left border-2 transition-all duration-300 hover:bg-neutral-900 flex flex-col gap-6",
                        data.role === "founder"
                            ? "border-white bg-neutral-900"
                            : "border-neutral-800 hover:border-neutral-600"
                    )}
                >
                    <div className="w-14 h-14 rounded-none bg-neutral-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                        <Rocket className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">창업자 (예비/초기)</h3>
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                            아직 법인/사업자는 없으나 구체적인 비전이 있는 분.
                        </p>
                        <div className="pt-4 border-t border-neutral-800">
                            <p className="text-xs font-bold text-neutral-300 mb-2">검증 초점</p>
                            <p className="text-xs text-neutral-500">"기여할 수 있는 사람인가"</p>
                        </div>
                        <ul className="mt-3 text-xs text-neutral-500 space-y-1">
                            <li>• 포트폴리오/이력 (필수)</li>
                            <li>• 구체적인 자기소개 (300자)</li>
                        </ul>
                    </div>
                </button>
            </div>
        </div>
    );
}
