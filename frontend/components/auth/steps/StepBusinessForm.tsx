"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SignupFormData } from "../types";
import { Upload } from "lucide-react";

interface StepProps {
    data: SignupFormData;
    updateData: (data: Partial<SignupFormData>) => void;
}

export function StepBusinessForm({ data, updateData }: StepProps) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="space-y-4">
                <h2 className="text-3xl font-heading font-bold">비즈니스 정보</h2>
                <p className="text-neutral-400">사업가 인증에 필요한 정보를 입력해주세요.</p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-neutral-300">회사명</Label>
                        <Input
                            value={data.companyName}
                            onChange={(e) => updateData({ companyName: e.target.value })}
                            placeholder="회사명 입력"
                            className="bg-neutral-900 border-neutral-800 text-white h-12 rounded-none focus:border-white transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-neutral-300">직책</Label>
                        <Select onValueChange={(val) => updateData({ jobTitle: val })} defaultValue={data.jobTitle}>
                            <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white h-12 rounded-none">
                                <SelectValue placeholder="선택해주세요" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 border-neutral-800 text-white rounded-none">
                                <SelectItem value="ceo">CEO / 대표</SelectItem>
                                <SelectItem value="executive">임원 (C-Level)</SelectItem>
                                <SelectItem value="director">이사 / 본부장</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-neutral-300">사업자등록증 (필수)</Label>
                    <div className="border-2 border-dashed border-neutral-800 rounded-none p-8 text-center hover:bg-neutral-900 transition-colors cursor-pointer group">
                        <Upload className="w-8 h-8 mx-auto text-neutral-500 group-hover:text-white mb-2" />
                        <p className="text-sm text-neutral-400">클릭하여 파일 업로드 (PDF, JPG, PNG)</p>
                        <p className="text-xs text-neutral-600 mt-1">최대 10MB</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-neutral-300">연 매출 규모</Label>
                    <Select onValueChange={(val) => updateData({ revenue: val })} defaultValue={data.revenue}>
                        <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white h-12 rounded-none">
                            <SelectValue placeholder="선택해주세요" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-900 border-neutral-800 text-white rounded-none">
                            <SelectItem value="under_100m">1억원 미만</SelectItem>
                            <SelectItem value="100m_1b">1억원 ~ 10억원</SelectItem>
                            <SelectItem value="1b_10b">10억원 ~ 100억원</SelectItem>
                            <SelectItem value="over_10b">100억원 이상</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-neutral-300">웹사이트 / LinkedIn (선택)</Label>
                    <Input
                        value={data.website}
                        onChange={(e) => updateData({ website: e.target.value })}
                        placeholder="https://"
                        className="bg-neutral-900 border-neutral-800 text-white h-12 rounded-none focus:border-white transition-colors"
                    />
                </div>
            </div>
        </div>
    );
}
