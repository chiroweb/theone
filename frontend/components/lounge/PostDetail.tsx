"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Clock,
    Eye,
    Heart,
    MessageSquare,
    Share2,
    Bookmark,
    MoreHorizontal,
    Flag,
    FileText,
    Download,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CommentInput } from "./CommentInput";
import { CommentList } from "./CommentList";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Post {
    id: string;
    title: string;
    author: string;
    authorAvatar?: string;
    date: string;
    category: string;
    views: number;
    likes: number;
    content: string;
    isHot?: boolean;
    type?: string;
    attachments?: Array<{ name: string; size: string; type: string }>;
}

const MOCK_COMMENTS = [
    {
        id: 1,
        author: "Sarah Kim",
        content: "좋은 인사이트 감사합니다. 특히 리스크 관리 부분이 인상적이네요.",
        time: "1시간 전",
        likes: 5,
        replies: [
            {
                id: 2,
                author: "Alex V.",
                content: "도움이 되셨다니 다행입니다!",
                time: "30분 전",
                likes: 2
            }
        ]
    },
    {
        id: 3,
        author: "David Lee",
        content: "혹시 관련해서 참고할만한 서적이 있을까요?",
        time: "3시간 전",
        likes: 1
    }
];

export function PostDetail({ post }: { post: Post }) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleLike = () => {
        if (isLiked) {
            setLikeCount(prev => prev - 1);
            toast.dismiss(); // Clear previous toast if any? maybe too aggressive.
        } else {
            setLikeCount(prev => prev + 1);
            toast.success("게시글을 추천했습니다.");
        }
        setIsLiked(!isLiked);
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        toast.success(isBookmarked ? "북마크가 해제되었습니다." : "게시글이 북마크되었습니다.");
    };

    const handleReport = () => {
        toast.success("신고가 접수되었습니다. 관리자 검토 후 처리됩니다.");
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header / Nav */}
            <div className="mb-6">
                <Link href="/lounge">
                    <Button variant="ghost" className="pl-0 text-neutral-400 hover:text-white hover:bg-transparent -ml-2">
                        <ArrowLeft className="w-4 h-4 mr-2" /> 목록으로 돌아가기
                    </Button>
                </Link>
            </div>

            {/* Post Header */}
            <div className="space-y-6 mb-8">
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-neutral-400 border-neutral-700 rounded-none">
                        {post.category}
                    </Badge>
                    {post.isHot && <Badge className="bg-white text-black hover:bg-neutral-200 rounded-none">HOT</Badge>}
                    {post.type === 'question' && <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20 rounded-none">질문</Badge>}
                </div>

                <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-white leading-tight">
                    {post.title.replace("[질문] ", "")}
                </h1>

                <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={post.authorAvatar} />
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium text-white">{post.author}</div>
                            <div className="flex items-center gap-2 text-xs text-neutral-500">
                                <Clock className="w-3 h-3" />
                                <span>{post.date}</span>
                                <span className="w-px h-2 bg-neutral-800" />
                                <Eye className="w-3 h-3" />
                                <span>{post.views}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white" onClick={handleBookmark}>
                            <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current text-yellow-500" : ""}`} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
                            <Share2 className="w-5 h-5" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
                                    <MoreHorizontal className="w-5 h-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-neutral-900 border-neutral-800 text-white rounded-none">
                                <DropdownMenuItem onClick={handleReport} className="focus:bg-red-900/20 text-red-500 focus:text-red-400 cursor-pointer">
                                    <Flag className="w-4 h-4 mr-2" /> 신고하기
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none mb-12 text-neutral-200 leading-relaxed whitespace-pre-wrap">
                {post.content}
            </div>

            {/* Attachments */}
            {post.attachments && post.attachments.length > 0 && (
                <div className="mb-12 space-y-3">
                    <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">첨부파일</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {post.attachments.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-neutral-900 border border-neutral-800 rounded group hover:border-neutral-600 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-neutral-800 rounded text-neutral-400">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white group-hover:underline">{file.name}</div>
                                        <div className="text-xs text-neutral-500">{file.size}</div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-white">
                                    <Download className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Actions (Like) */}
            <div className="flex justify-center mb-12">
                <Button
                    variant="outline"
                    size="lg"
                    className={`gap-2 min-w-[120px] rounded-full border-neutral-700 hover:bg-neutral-800 hover:text-red-500 ${isLiked ? "border-red-500/50 text-red-500 bg-red-500/10" : "text-neutral-300"}`}
                    onClick={handleLike}
                >
                    <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                    <span>추천 {likeCount}</span>
                </Button>
            </div>

            <Separator className="bg-neutral-800 mb-12" />

            {/* Comments */}
            <div className="space-y-8">
                <div className="flex items-center gap-2 mb-6">
                    <MessageSquare className="w-5 h-5 text-neutral-400" />
                    <h3 className="text-lg font-bold">댓글 <span className="text-neutral-500">3</span></h3>
                </div>

                <CommentInput />

                <div className="mt-8">
                    <CommentList comments={MOCK_COMMENTS} />
                </div>
            </div>
        </div>
    );
}
