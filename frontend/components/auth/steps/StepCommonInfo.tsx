"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SignupFormData } from "../types";

interface StepProps {
    data: SignupFormData;
    updateData: (data: Partial<SignupFormData>) => void;
}

export function StepCommonInfo({ data, updateData }: StepProps) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="space-y-4">
                <h2 className="text-3xl font-heading font-bold">마지막 질문</h2>
                <p className="text-neutral-400">커뮤니티 멤버로서의 가치관을 확인합니다.</p>
            </div>

            <div className="space-y-8">
                <div className="space-y-2">
                    <Label className="text-neutral-300 text-lg">
                        1. The 1% 커뮤니티에서 어떤 가치를 얻고 싶으신가요?
                    </Label>
                    <Textarea
                        value={data.motivation}
                        onChange={(e) => updateData({ motivation: e.target.value })}
                        className="bg-neutral-900 border-neutral-800 text-white min-h-[120px] rounded-none focus:border-white transition-colors p-4 resize-none"
                        placeholder="예: 동종 업계 대표님들과의 네트워킹, 실질적인 비즈니스 협업 기회 등"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-neutral-300 text-lg">
                        2. 본인은 커뮤니티에 어떤 기여를 할 수 있으신가요?
                    </Label>
                    <Textarea
                        value={data.contribution}
                        onChange={(e) => updateData({ contribution: e.target.value })}
                        className="bg-neutral-900 border-neutral-800 text-white min-h-[120px] rounded-none focus:border-white transition-colors p-4 resize-none"
                        placeholder="예: 10년차 이커머스 마케팅 노하우 공유, 글로벌 진출 자문 등"
                    />
                </div>

                <div className="bg-neutral-900 p-6 border border-neutral-800 text-sm text-neutral-400">
                    <p className="font-bold text-white mb-2">📢 허위 사실 기재에 대한 안내</p>
                    <ul className="list-disc pl-4 space-y-1">
                        <li>제출하신 정보가 사실과 다를 경우, 즉시 승인이 취소될 수 있습니다.</li>
                        <li>가입 이후라도 허위 사실이 밝혀질 경우, 멤버십 박탈 및 강제 탈퇴 처리됩니다.</li>
                        <li>위 내용에 동의하시면 제출 버튼을 눌러주세요.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
