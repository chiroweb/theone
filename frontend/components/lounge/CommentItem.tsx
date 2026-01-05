"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface CommentProps {
    id: number;
    author: string;
    avatar?: string;
    content: string;
    time: string;
    likes: number;
    replies?: CommentProps[];
}

export function CommentItem({ comment }: { comment: CommentProps }) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(comment.likes);

    const handleLike = () => {
        if (isLiked) {
            setLikeCount(prev => prev - 1);
        } else {
            setLikeCount(prev => prev + 1);
        }
        setIsLiked(!isLiked);
    };

    return (
        <div className="flex gap-3">
            <Avatar className="w-8 h-8">
                <AvatarImage src={comment.avatar} />
                <AvatarFallback>{comment.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{comment.author}</span>
                        <span className="text-xs text-neutral-500">{comment.time}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-neutral-500 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </div>
                <p className="text-sm text-neutral-300">{comment.content}</p>
                <div className="flex items-center gap-4 pt-1">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-1 text-xs ${isLiked ? "text-red-500" : "text-neutral-500 hover:text-white"} transition-colors`}
                    >
                        <Heart className={`w-3 h-3 ${isLiked ? "fill-current" : ""}`} />
                        {likeCount}
                    </button>
                    <button className="flex items-center gap-1 text-xs text-neutral-500 hover:text-white transition-colors">
                        <MessageCircle className="w-3 h-3" />
                        답글
                    </button>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-3 space-y-3 pl-3 border-l-2 border-neutral-800">
                        {comment.replies.map((reply) => (
                            <CommentItem key={reply.id} comment={reply} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
