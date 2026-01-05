"use client";

import { CommentItem } from "./CommentItem";

interface CommentProps {
    id: number;
    author: string;
    avatar?: string;
    content: string;
    time: string;
    likes: number;
    replies?: CommentProps[];
}

export function CommentList({ comments }: { comments: CommentProps[] }) {
    return (
        <div className="space-y-6">
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    );
}
