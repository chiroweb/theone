"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoungeWritePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            toast.success("이미지가 첨부되었습니다.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast.success("게시글이 성공적으로 등록되었습니다.");
        router.push("/lounge");
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4 border-b border-neutral-800 pb-6">
                <Link href="/lounge">
                    <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-heading font-bold tracking-tight">글 작성하기</h1>
                    <p className="text-neutral-400 text-sm">새로운 인사이트나 질문을 공유하세요.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-neutral-300">카테고리</Label>
                        <Select required>
                            <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white rounded-none h-12">
                                <SelectValue placeholder="카테고리 선택" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 border-neutral-800 text-white rounded-none">
                                <SelectItem value="free">자유게시판</SelectItem>
                                <SelectItem value="qna">질문/답변</SelectItem>
                                <SelectItem value="finance">금융/투자</SelectItem>
                                <SelectItem value="business">비즈니스</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-neutral-300">제목</Label>
                        <Input
                            id="title"
                            required
                            placeholder="제목을 입력하세요"
                            className="bg-neutral-900 border-neutral-800 text-white rounded-none h-12 placeholder:text-neutral-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content" className="text-neutral-300">내용</Label>
                        <Textarea
                            id="content"
                            required
                            placeholder="내용을 자유롭게 작성해주세요..."
                            className="bg-neutral-900 border-neutral-800 text-white rounded-none min-h-[300px] placeholder:text-neutral-600 resize-none p-4"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-neutral-300">이미지 첨부</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="image-upload"
                                onChange={handleImageUpload}
                            />
                            <Label
                                htmlFor="image-upload"
                                className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 cursor-pointer transition-colors"
                            >
                                <ImageIcon className="w-4 h-4" /> 이미지 선택
                            </Label>
                            {imagePreview && (
                                <span className="text-xs text-green-500 font-bold">이미지 1개 선택됨</span>
                            )}
                        </div>
                        {imagePreview && (
                            <div className="mt-4 relative w-full aspect-video bg-neutral-900 border border-neutral-800 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-neutral-800">
                    <Link href="/lounge">
                        <Button type="button" variant="ghost" className="text-neutral-400 hover:text-white rounded-none">
                            취소
                        </Button>
                    </Link>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-white text-black hover:bg-neutral-200 rounded-none font-bold px-8"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> 등록 중...
                            </>
                        ) : (
                            "등록하기"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
