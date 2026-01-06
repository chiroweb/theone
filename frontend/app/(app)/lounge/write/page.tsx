"use client";

import { PostEditor } from "@/components/lounge/PostEditor";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoungeWritePage() {
    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-20">
            <div className="flex items-center gap-4 border-b border-neutral-800 pb-6 mb-8">
                <Link href="/lounge">
                    <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-heading font-bold tracking-tight">글 작성하기</h1>
                    <p className="text-neutral-400 text-sm">새로운 인사이트나 질문을 공유하세요.</p>
                </div>
            </div>

            <PostEditor />
        </div>
    );
}
