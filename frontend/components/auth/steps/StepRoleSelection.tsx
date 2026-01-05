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
                        <h3 className="text-xl font-bold mb-2">사업가</h3>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            현재 사업체를 운영 중이며, 실질적인 비즈니스 네트워킹과 확장을 목표로 하는 분.
                        </p>
                        <ul className="mt-4 text-xs text-neutral-500 space-y-1">
                            <li>• 필수: 사업자등록증 확인</li>
                            <li>• 필수: 직책 및 매출 규모 확인</li>
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
                        <h3 className="text-xl font-bold mb-2">창업자 (예비/초기)</h3>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            혁신적인 아이디어로 창업을 준비 중이거나 초기 단계에 있는 분.
                        </p>
                        <ul className="mt-4 text-xs text-neutral-500 space-y-1">
                            <li>• 필수: 포트폴리오/이력 확인</li>
                            <li>• 심사: 성장 잠재력 및 전문성</li>
                        </ul>
                    </div>
                </button>
            </div>
        </div>
    );
}
