"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    FileText,
    BarChart,
    Bell,
    Settings
} from "lucide-react";

const NAV_ITEMS = [
    { name: "대시보드", href: "/admin", icon: LayoutDashboard },
    { name: "가입 신청", href: "/admin/applications", icon: FileText },
    { name: "회원 관리", href: "/admin/users", icon: Users },
    { name: "콘텐츠 관리", href: "/admin/posts", icon: FileText }, // Using FileText for posts too
    { name: "인사이트", href: "/admin/insights", icon: BarChart },
    { name: "알림 발송", href: "/admin/notifications", icon: Bell },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-black border-r border-neutral-800 flex flex-col h-screen fixed top-0 left-0">
            <div className="h-16 flex items-center px-6 border-b border-neutral-800">
                <span className="text-white font-bold text-lg">THE 1% ADMIN</span>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-white text-black"
                                    : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-neutral-800">
                <div className="text-xs text-neutral-600">
                    v1.0.0
                </div>
            </div>
        </div>
    );
}
