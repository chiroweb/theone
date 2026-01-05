import { AppShell } from "@/components/layout/AppShell";
import { Suspense } from "react";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <AppShell>{children}</AppShell>
        </Suspense>
    );
}
