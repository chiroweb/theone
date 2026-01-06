"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SignupFormData } from "../types";
import { Upload, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface StepProps {
    data: SignupFormData;
    updateData: (data: Partial<SignupFormData>) => void;
}

export function StepBusinessForm({ data, updateData }: StepProps) {
    const [isCheckingBiz, setIsCheckingBiz] = useState(false);

    const handleBizCheck = async () => {
        if (!data.bizRegistrationNumber || data.bizRegistrationNumber.length < 10) {
            toast.error("올바른 사업자등록번호를 입력해주세요.");
            return;
        }
        setIsCheckingBiz(true);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsCheckingBiz(false);
        // Simulate Success
        updateData({
            isBizVerified: true,
            companyName: data.companyName || "(주)아이럼컴퍼니" // Mock auto-fill
        });
        toast.success("사업자등록번호가 확인되었습니다.");
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="space-y-4">
                <h2 className="text-3xl font-heading font-bold">비즈니스 정보</h2>
                <p className="text-neutral-400">사업가 검증을 위한 필수 정보를 입력해주세요.</p>
            </div>

            <div className="space-y-6">
                {/* Business Verification Area */}
                <div className="p-6 border border-neutral-800 bg-neutral-900/50">
                    <Label className="text-neutral-300 mb-2 block">사업자등록번호 인증 (필수)</Label>
                    <div className="flex gap-2 mb-2">
                        <Input
                            value={data.bizRegistrationNumber || ""}
                            onChange={(e) => updateData({ bizRegistrationNumber: e.target.value })}
                            placeholder="000-00-00000"
                            className="bg-black border-neutral-800 text-white h-12 rounded-none focus:border-white transition-colors"
                            disabled={data.isBizVerified}
                        />
                        <Button
                            type="button"
                            onClick={handleBizCheck}
                            disabled={data.isBizVerified || isCheckingBiz}
                            className={`h-12 w-32 rounded-none font-bold ${data.isBizVerified ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-white text-black hover:bg-neutral-200'}`}
                        >
                            {isCheckingBiz ? <Loader2 className="w-4 h-4 animate-spin" /> :
                                data.isBizVerified ? "인증 완료" : "조회"}
                        </Button>
                    </div>
                    {data.isBizVerified ? (
                        <div className="flex items-center gap-2 text-sm text-green-500 mt-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>국세청 등록 사업자 확인됨: <strong>{data.companyName}</strong></span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-sm text-neutral-500 mt-2">
                            <span className="text-xs">※ 휴/폐업 시 가입이 제한될 수 있습니다.</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-neutral-300">회사명</Label>
                        <Input
                            value={data.companyName}
                            onChange={(e) => updateData({ companyName: e.target.value })}
                            placeholder="회사명 자동 입력"
                            className="bg-neutral-900 border-neutral-800 text-white h-12 rounded-none focus:border-white transition-colors"
                            readOnly={data.isBizVerified} // Only editable if not verified, but verification is required...
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
                                <SelectItem value="cxo">C-Level 임원</SelectItem>
                                <SelectItem value="executive">등기이사 / 본부장</SelectItem>
                                <SelectItem value="team_lead">팀장급 (검토 필요)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-neutral-300">연 매출 규모 (2024년 기준)</Label>
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
                        <Label className="text-neutral-300">직원 수</Label>
                        <Select onValueChange={(val) => updateData({ employeeCount: val })} defaultValue={data.employeeCount}>
                            <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white h-12 rounded-none">
                                <SelectValue placeholder="선택해주세요" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 border-neutral-800 text-white rounded-none">
                                <SelectItem value="1_5">1-5명</SelectItem>
                                <SelectItem value="6_20">6-20명</SelectItem>
                                <SelectItem value="21_50">21-50명</SelectItem>
                                <SelectItem value="over_50">50명 이상</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-neutral-300">사업자등록증 사본 (선택 - 추가 검증용)</Label>
                    <div className="border-2 border-dashed border-neutral-800 rounded-none p-8 text-center hover:bg-neutral-900 transition-colors cursor-pointer group">
                        <Upload className="w-8 h-8 mx-auto text-neutral-500 group-hover:text-white mb-2" />
                        <p className="text-sm text-neutral-400">PDF, JPG, PNG 파일 업로드</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-neutral-300">웹사이트 / LinkedIn (선택, 가산점)</Label>
                    <Input
                        value={data.website}
                        onChange={(e) => updateData({ website: e.target.value })}
                        placeholder="https://"
                        className="bg-neutral-900 border-neutral-800 text-white h-12 rounded-none focus:border-white transition-colors"
                    />
                </div>

                <div className="bg-neutral-900/30 p-4 border border-neutral-800 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <div className="text-xs text-neutral-400">
                        <strong className="text-white block mb-1">허위 정보 기재 주의</strong>
                        연 매출 규모 및 직책 정보를 허위로 기재할 경우, 사후 검증을 통해 즉시 제명 처리될 수 있습니다.
                    </div>
                </div>
            </div>
        </div>
    );
}
