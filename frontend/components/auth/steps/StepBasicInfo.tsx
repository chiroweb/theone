"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SignupFormData } from "../types";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

interface StepProps {
    data: SignupFormData;
    updateData: (data: Partial<SignupFormData>) => void;
}

export function StepBasicInfo({ data, updateData }: StepProps) {
    const [isVerifying, setIsVerifying] = useState(false);

    const handleVerifyPhone = async () => {
        if (!data.phone) {
            toast.error("휴대폰 번호를 입력해주세요.");
            return;
        }
        setIsVerifying(true);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsVerifying(false);
        updateData({ isPhoneVerified: true });
        toast.success("인증번호가 발송되었습니다. (Mock: 자동 인증 완료)");
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="space-y-4">
                <h2 className="text-3xl font-heading font-bold">기본 정보 입력</h2>
                <p className="text-neutral-400">심사 결과 안내 및 본인 확인을 위해 정확한 정보를 입력해주세요.</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-neutral-300">이름</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => updateData({ name: e.target.value })}
                        placeholder="홍길동"
                        className="bg-neutral-900 border-neutral-800 text-white h-14 rounded-none focus:border-white transition-colors"
                        autoFocus
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-neutral-300">휴대폰 번호</Label>
                    <div className="flex gap-2">
                        <Input
                            id="phone"
                            value={data.phone}
                            onChange={(e) => updateData({ phone: e.target.value })}
                            placeholder="01012345678"
                            className="bg-neutral-900 border-neutral-800 text-white h-14 rounded-none focus:border-white transition-colors"
                            disabled={data.isPhoneVerified}
                        />
                        <Button
                            type="button"
                            onClick={handleVerifyPhone}
                            disabled={data.isPhoneVerified || isVerifying || !data.phone}
                            className={`h-14 w-24 rounded-none font-bold ${data.isPhoneVerified ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-white text-black hover:bg-neutral-200'}`}
                        >
                            {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> :
                                data.isPhoneVerified ? <CheckCircle2 className="w-5 h-5" /> : "인증"}
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-neutral-300">이메일</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => updateData({ email: e.target.value })}
                        placeholder="hello@example.com"
                        className="bg-neutral-900 border-neutral-800 text-white h-14 rounded-none focus:border-white transition-colors"
                    />
                </div>



                <div className="space-y-2">
                    <Label htmlFor="location" className="text-neutral-300">거주 지역</Label>
                    <Input
                        id="location"
                        value={data.location}
                        onChange={(e) => updateData({ location: e.target.value })}
                        placeholder="서울, 대한민국"
                        className="bg-neutral-900 border-neutral-800 text-white h-14 rounded-none focus:border-white transition-colors"
                    />
                </div>
            </div>
        </div>
    );
}
