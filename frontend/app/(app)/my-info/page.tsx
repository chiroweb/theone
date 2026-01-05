"use client";

import { TierBadge } from "../../../components/dashboard/TierBadge";
import { PipelineConfiguration } from "../../../components/dashboard/PipelineConfiguration";

export default function MyInfoPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-heading font-bold tracking-tight mb-6">내 정보</h1>

            <div className="grid grid-cols-1 gap-8 max-w-2xl">
                {/* Tier Status */}
                <div>
                    <TierBadge />
                </div>

                {/* Pipeline Configuration */}
                <div>
                    <PipelineConfiguration />
                </div>
            </div>
        </div>
    );
}
