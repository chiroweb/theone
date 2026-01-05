"use client";

import { SignupWizard } from "@/components/auth/SignupWizard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12 max-w-3xl mx-auto">
                    <Link href="/login" className="inline-flex items-center text-neutral-500 hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Login
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mb-4 text-center md:text-left">
                        MEMBERSHIP APPLICATION
                    </h1>
                    <p className="text-neutral-400 text-lg leading-relaxed text-center md:text-left">
                        The 1%는 검증된 비즈니스 리더와 혁신적인 창업가들을 위한 프라이빗 커뮤니티입니다.<br className="hidden md:block" />
                        귀하의 역량과 비전을 증명하고, 최고의 네트워크에 합류하세요.
                    </p>
                </div>

                <SignupWizard />
            </div>
        </div>
    );
}
