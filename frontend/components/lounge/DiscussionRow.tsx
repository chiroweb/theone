"use client";

import { Badge } from "@/components/ui/badge";
import { MessageSquare, Eye, Clock } from "lucide-react";
import Link from "next/link";

interface DiscussionRowProps {
    id: string;
    title: string;
    author: string;
    replies: number;
    views: number;
    lastActive: string;
    category: string;
    isHot?: boolean;
}

export function DiscussionRow({ id, title, author, replies, views, lastActive, category, isHot }: DiscussionRowProps) {
    return (
        <Link href={`/lounge/${id}`} className="block group">
            <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-black hover:bg-neutral-900 transition-colors">
                <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-neutral-400 border-neutral-700 rounded-none text-[10px] uppercase tracking-wider">
                            {category}
                        </Badge>
                        {isHot && (
                            <Badge className="bg-white text-black hover:bg-neutral-200 rounded-none text-[10px] uppercase tracking-wider font-bold">
                                HOT
                            </Badge>
                        )}
                    </div>
                    <h3 className="text-lg font-medium text-white group-hover:underline decoration-1 underline-offset-4 truncate">
                        {title}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1">
                        작성자 <span className="text-neutral-300">{author}</span>
                    </p>
                </div>

                <div className="flex items-center gap-8 text-neutral-500 text-sm shrink-0">
                    <div className="flex items-center gap-2 w-16 justify-end">
                        <MessageSquare className="w-4 h-4" />
                        <span>{replies}</span>
                    </div>
                    <div className="flex items-center gap-2 w-16 justify-end hidden md:flex">
                        <Eye className="w-4 h-4" />
                        <span>{views}</span>
                    </div>
                    <div className="flex items-center gap-2 w-24 justify-end hidden md:flex">
                        <Clock className="w-4 h-4" />
                        <span>{lastActive}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
