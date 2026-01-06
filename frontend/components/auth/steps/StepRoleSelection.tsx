"use client";

import { SignupFormData } from "../types";
import { Building2, Rocket, Ticket, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface StepProps {
    data: SignupFormData;
    updateData: (data: Partial<SignupFormData>) => void;
}

export function StepRoleSelection({ data, updateData }: StepProps) {
    const [inviteCode, setInviteCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

    const handleVerifyCode = async () => {
        if (!inviteCode || inviteCode.length < 4) {
            toast.error("유효한 코드를 입력해주세요.");
            return;
        }
        setIsVerifying(true);
        // Mock API
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsVerifying(false);

        // Success
        toast.success("초대 코드가 확인되었습니다.");
        updateData({ role: "invited", referralCode: inviteCode });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="space-y-4">
                <h2 className="text-3xl font-heading font-bold">회원 유형 선택</h2>
                <p className="text-neutral-400">본인에게 해당되는 유형을 선택해주세요. (총 3가지)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                {/* 1. Business Owner Card */}
                <button
                    onClick={() => updateData({ role: "business" })}
                    className={cn(
                        "group relative p-6 text-left border-2 transition-all duration-300 hover:bg-neutral-900 flex flex-col gap-4",
                        data.role === "business"
                            ? "border-white bg-neutral-900"
                            : "border-neutral-800 hover:border-neutral-600"
                    )}
                >
                    <div className="w-12 h-12 rounded-none bg-neutral-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                        <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-1">사업가</h3>
                        <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                            실제 사업 운영 중인 대표/임원
                        </p>
                        <ul className="text-[10px] text-neutral-500 space-y-1 bg-neutral-950 p-2 border border-neutral-900">
                            <li>• 사업자등록증 필수</li>
                            <li>• 매출/직책 검증</li>
                        </ul>
                    </div>
                </button>

                {/* 2. Founder Card */}
                <button
                    onClick={() => updateData({ role: "founder" })}
                    className={cn(
                        "group relative p-6 text-left border-2 transition-all duration-300 hover:bg-neutral-900 flex flex-col gap-4",
                        data.role === "founder"
                            ? "border-white bg-neutral-900"
                            : "border-neutral-800 hover:border-neutral-600"
                    )}
                >
                    <div className="w-12 h-12 rounded-none bg-neutral-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                        <Rocket className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-1">창업자/예비</h3>
                        <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                            구체적 비전을 가진 초기 창업가
                        </p>
                        <ul className="text-[10px] text-neutral-500 space-y-1 bg-neutral-950 p-2 border border-neutral-900">
                            <li>• 포트폴리오 필수</li>
                            <li>• 300자 자기소개</li>
                        </ul>
                    </div>
                </button>

                {/* 3. Invitation Card (Interactive) */}
                <div
                    className={cn(
                        "relative p-6 text-left border-2 transition-all duration-300 flex flex-col gap-4",
                        data.role === "invited"
                            ? "border-white bg-neutral-900"
                            : "border-neutral-800 bg-black"
                    )}
                >
                    <div className="w-12 h-12 rounded-none bg-neutral-800 flex items-center justify-center text-white">
                        <Ticket className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold mb-1">초대 코드</h3>
                            {data.role === "invited" && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        </div>
                        <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                            기존 멤버의 초대를 받으셨나요?
                        </p>

                        <div className="space-y-2 mt-2">
                            <Input
                                placeholder="코드 입력"
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value)}
                                className="h-8 text-xs bg-neutral-950 border-neutral-800 rounded-none focus:border-white"
                                disabled={data.role === "invited"}
                            />
                            <Button
                                onClick={handleVerifyCode}
                                disabled={isVerifying || !inviteCode || data.role === "invited"}
                                className="w-full h-8 text-xs rounded-none bg-white text-black hover:bg-neutral-200"
                            >
                                {isVerifying ? <Loader2 className="w-3 h-3 animate-spin" /> : "검증 및 선택"}
                            </Button>
                        </div>
                        {data.role === "invited" && (
                            <p className="text-[10px] text-green-500 mt-2 font-bold">
                                * 심사 절차가 생략됩니다.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
