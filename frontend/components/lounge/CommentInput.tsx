"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function CommentInput() {
    const [content, setContent] = useState("");

    const handleSubmit = () => {
        if (!content.trim()) return;
        // Handle submit logic here
        console.log("Submit comment:", content);
        setContent("");
    };

    return (
        <div className="space-y-2">
            <Textarea
                placeholder="댓글을 남겨주세요..."
                className="bg-neutral-900 border-neutral-800 text-white min-h-[80px] resize-none focus-visible:ring-white/20"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex justify-end">
                <Button
                    onClick={handleSubmit}
                    disabled={!content.trim()}
                    className="bg-white text-black hover:bg-neutral-200 font-bold"
                >
                    등록
                </Button>
            </div>
        </div>
    );
}
