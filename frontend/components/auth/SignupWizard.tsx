"use client";

import { useState } from "react";
import { SignupFormData, INITIAL_DATA } from "./types";
import { StepBasicInfo } from "./steps/StepBasicInfo";
import { StepRoleSelection } from "./steps/StepRoleSelection";
import { StepBusinessForm } from "./steps/StepBusinessForm";
import { StepFounderForm } from "./steps/StepFounderForm";
import { StepCommonInfo } from "./steps/StepCommonInfo";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

export function SignupWizard() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<SignupFormData>(INITIAL_DATA);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateData = (newData: Partial<SignupFormData>) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const nextStep = () => {
        if (canProceed()) {
            setStep(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async () => {
        if (!formData.termsAgreed) {
            toast.error("약관에 동의해주세요.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (formData.referralCode) {
                toast.success("가입 신청 완료! 추천인 코드로 임시 입장이 허용됩니다.");
                // Redirect to lounge (Immediate Access)
                router.push("/lounge");
            } else {
                toast.success("가입 신청서가 제출되었습니다. 심사 결과는 메일로 안내드립니다.");
                router.push("/login?pending=true");
            }
        } catch (error) {
            toast.error("오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <StepBasicInfo data={formData} updateData={updateData} />;
            case 2:
                return <StepRoleSelection data={formData} updateData={updateData} />;
            case 3:
                return formData.role === "business"
                    ? <StepBusinessForm data={formData} updateData={updateData} />
                    : <StepFounderForm data={formData} updateData={updateData} />;
            case 4:
                return <StepCommonInfo data={formData} updateData={updateData} />;
            default:
                return null;
        }
    };

    const isLastStep = step === 4;

    const canProceed = () => {
        if (step === 1) return !!(formData.name && formData.email && formData.password && formData.phone);
        if (step === 2) return !!formData.role;
        if (step === 3) {
            if (formData.role === "business") {
                // Must have Biz Number verified for Business
                // return !!formData.isBizVerified && !!formData.jobTitle; // Strict
                return !!formData.bizRegistrationNumber; // Lenient for UX preview
            } else {
                // Must have Bio and Portfolio for Founder
                return !!formData.portfolioUrl && (formData.founderBio?.length || 0) >= 10; // Lenient length for testing, ideally 300
            }
        }
        return true;
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-12 relative px-4">
                <div className="absolute left-0 top-1/2 w-full h-0.5 bg-neutral-800 -z-10" />
                {[1, 2, 3, 4].map((s) => (
                    <div
                        key={s}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 z-10
                            ${step >= s
                                ? "bg-white text-black border-white"
                                : "bg-black text-neutral-500 border-neutral-800"
                            }`}
                    >
                        {step > s ? <Check className="w-5 h-5" /> : s}
                    </div>
                ))}
            </div>

            <div className="bg-black border border-neutral-900 p-6 md:p-12 min-h-[400px]">
                {renderStep()}
            </div>

            <div className="flex justify-between mt-8 mb-20">
                <Button
                    variant="ghost"
                    disabled={step === 1}
                    onClick={prevStep}
                    className="text-neutral-400 hover:text-white"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    이전
                </Button>

                {isLastStep ? (
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !formData.termsAgreed}
                        className="bg-white text-black hover:bg-neutral-200 px-8 py-6 text-lg font-bold rounded-none min-w-[160px]"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                제출 중...
                            </>
                        ) : (
                            "신청서 제출"
                        )}
                    </Button>
                ) : (
                    <Button
                        onClick={nextStep}
                        disabled={!canProceed()}
                        className="bg-white text-black hover:bg-neutral-200 px-8 py-6 text-lg font-bold rounded-none min-w-[160px]"
                    >
                        다음
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>
        </div>
    );
}
