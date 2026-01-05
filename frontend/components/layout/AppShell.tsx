"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Zap,
    Briefcase,
    MessageSquare,
    Menu,
    User,
    MessageCircle,
    Search,
    ChevronDown,
    FolderOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "인사이트 피드", href: "/feed", icon: Zap },
    { name: "파이프라인", href: "/pipeline", icon: Briefcase },
    { name: "The 1% 자료실", href: "/library", icon: FolderOpen },
    {
        name: "라운지",
        href: "/lounge",
        icon: MessageSquare,
        children: [
            { name: "전체보기", href: "/lounge" },
            { name: "비즈니스", href: "/lounge?category=business" },
            { name: "경제/금융", href: "/lounge?category=economy" },
            { name: "정책/법률", href: "/lounge?category=policy" },
            { name: "네트워킹", href: "/lounge?category=networking" },
            { name: "자유게시판", href: "/lounge?category=free" },
        ]
    },
    { name: "대시보드", href: "/dashboard", icon: LayoutDashboard },
    { name: "검색", href: "/search", icon: Search },
    { name: "내 정보", href: "/my-info", icon: User },
    { name: "채팅", href: "/chat", icon: MessageCircle },
];

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>(["/lounge"]);

    const toggleExpand = (href: string) => {
        setExpandedItems(prev =>
            prev.includes(href) ? prev.filter(item => item !== href) : [...prev, href]
        );
    };

    const renderNavItem = (item: any, depth = 0) => {
        const isActive = pathname === item.href || (item.children && item.children.some((child: any) => pathname === child.href));
        const isExpanded = expandedItems.includes(item.href);
        const hasChildren = item.children && item.children.length > 0;

        return (
            <div key={item.href}>
                <Link
                    href={item.href}
                    onClick={(e) => {
                        if (hasChildren) {
                            e.preventDefault();
                            toggleExpand(item.href);
                        } else {
                            setIsOpen(false);
                        }
                    }}
                >
                    <div className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-none transition-all duration-200 cursor-pointer",
                        isActive && !hasChildren
                            ? "bg-white text-black font-medium"
                            : "text-neutral-400 hover:text-white hover:bg-neutral-900",
                        depth > 0 && "pl-12 text-sm py-2"
                    )}>
                        <div className="flex items-center gap-3">
                            {item.icon && <item.icon className="w-5 h-5" />}
                            <span>{item.name}</span>
                        </div>
                        {hasChildren && (
                            <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded ? "rotate-180" : "")} />
                        )}
                    </div>
                </Link>
                {hasChildren && isExpanded && (
                    <div className="border-l border-neutral-800 ml-6 my-1">
                        {item.children.map((child: any) => renderNavItem(child, depth + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 border-r border-neutral-800 h-screen sticky top-0 bg-black">
                <div className="p-8">
                    <h1 className="text-2xl font-heading font-bold tracking-tighter">
                        THE 1%
                    </h1>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => renderNavItem(item))}
                </nav>
                <div className="p-8 border-t border-neutral-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold border border-neutral-700">
                            ME
                        </div>
                        <div className="text-sm">
                            <p className="font-medium text-white">Member</p>
                            <p className="text-xs text-neutral-500">Platinum Tier</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black border-b border-neutral-800 p-4 flex items-center justify-between">
                <h1 className="text-xl font-heading font-bold tracking-tighter">THE 1%</h1>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-neutral-900">
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-black border-r border-neutral-800 text-white w-64 p-0">
                        <div className="p-8">
                            <h1 className="text-2xl font-heading font-bold tracking-tighter">
                                THE 1%
                            </h1>
                        </div>
                        <nav className="flex-1 px-4 space-y-1">
                            {navItems.map((item) => renderNavItem(item))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content */}
            <main className="flex-1 pt-20 md:pt-0 min-h-screen">
                <div className="p-6 md:p-12 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
            <Toaster />
        </div>
    );
}
