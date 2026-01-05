"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignupFormData } from "../types";

interface StepProps {
    data: SignupFormData;
    updateData: (data: Partial<SignupFormData>) => void;
}

export function StepBasicInfo({ data, updateData }: StepProps) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="space-y-4">
                <h2 className="text-3xl font-heading font-bold">기본 정보 입력</h2>
                <p className="text-neutral-400">심사 결과 안내를 위해 정확한 정보를 입력해주세요.</p>
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
                    <Label htmlFor="phone" className="text-neutral-300">연락처</Label>
                    <Input
                        id="phone"
                        value={data.phone}
                        onChange={(e) => updateData({ phone: e.target.value })}
                        placeholder="010-0000-0000"
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
