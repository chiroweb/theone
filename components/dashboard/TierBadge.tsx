"use client";

import { Progress } from "@/components/ui/progress";
import { Crown } from "lucide-react";

export function TierBadge() {
    return (
        <div className="bg-neutral-900 border border-neutral-800 p-8 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white text-black mb-4">
                <Crown className="w-10 h-10" />
            </div>

            <div className="space-y-2">
                <h2 className="text-3xl font-heading font-bold tracking-tight text-white">PLATINUM MEMBER</h2>
                <p className="text-neutral-400">상위 1% 멤버</p>
            </div>

            <div className="max-w-md mx-auto space-y-2">
                <div className="flex justify-between text-xs text-neutral-500 uppercase font-bold">
                    <span>현재 포인트</span>
                    <span>다음 등급: Black</span>
                </div>
                <div className="h-2 bg-neutral-800 w-full overflow-hidden">
                    <div className="h-full bg-white w-[75%]" />
                </div>
                <p className="text-right text-xs text-neutral-400">1,250 / 1,500 PTS</p>
            </div>
        </div>
    );
}
