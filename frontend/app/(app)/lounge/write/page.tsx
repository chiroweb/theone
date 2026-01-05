"use client";

import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";
import { ArrowLeft, Image as ImageIcon, Loader2, Bold, Italic, List, Link as LinkIcon, X, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function LoungeWritePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages: string[] = [];
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImages(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
            toast.success(`${files.length}개의 이미지가 추가되었습니다.`);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSaveDraft = () => {
        toast.success("임시저장 되었습니다.");
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
        <div className="max-w-2xl mx-auto space-y-8 pb-20">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
                <div className="flex items-center gap-4">
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
                <Button variant="outline" onClick={handleSaveDraft} className="border-neutral-700 hover:bg-neutral-800 text-neutral-300 gap-2">
                    <Save className="w-4 h-4" /> 임시저장
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-neutral-300">카테고리</Label>
                        <Select required>
                            <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white rounded-none h-12">
                                <SelectValue placeholder="카테고리를 선택하세요" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 border-neutral-800 text-white rounded-none">
                                <SelectItem value="business">비즈니스</SelectItem>
                                <SelectItem value="economy">경제/금융</SelectItem>
                                <SelectItem value="policy">정책/법률</SelectItem>
                                <SelectItem value="networking">네트워킹</SelectItem>
                                <SelectItem value="free">자유게시판</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-neutral-300">제목</Label>
                        <Input
                            id="title"
                            required
                            placeholder="제목을 입력하세요"
                            className="bg-neutral-900 border-neutral-800 text-white rounded-none h-12 placeholder:text-neutral-600 text-lg font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content" className="text-neutral-300">내용</Label>
                        <div className="bg-neutral-900 border border-neutral-800">
                            {/* Simple Toolbar */}
                            <div className="flex items-center gap-1 p-2 border-b border-neutral-800 bg-neutral-900/50">
                                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 text-neutral-400 hover:text-white hover:bg-neutral-800">
                                    <Bold className="w-4 h-4" />
                                </Button>
                                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 text-neutral-400 hover:text-white hover:bg-neutral-800">
                                    <Italic className="w-4 h-4" />
                                </Button>
                                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 text-neutral-400 hover:text-white hover:bg-neutral-800">
                                    <List className="w-4 h-4" />
                                </Button>
                                <div className="w-px h-4 bg-neutral-800 mx-1" />
                                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 text-neutral-400 hover:text-white hover:bg-neutral-800">
                                    <LinkIcon className="w-4 h-4" />
                                </Button>
                                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 text-neutral-400 hover:text-white hover:bg-neutral-800" onClick={() => fileInputRef.current?.click()}>
                                    <ImageIcon className="w-4 h-4" />
                                </Button>
                            </div>
                            <Textarea
                                id="content"
                                required
                                placeholder="내용을 자유롭게 작성해주세요..."
                                className="bg-transparent border-0 text-white rounded-none min-h-[400px] placeholder:text-neutral-600 resize-none p-4 focus-visible:ring-0"
                            />
                        </div>
                    </div>

                    {/* Hashtags */}
                    <div className="space-y-2">
                        <Label htmlFor="tags" className="text-neutral-300">해시태그</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="bg-neutral-800 text-neutral-300 hover:bg-neutral-700 gap-1 pl-2 pr-1 py-1">
                                    #{tag}
                                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-white">
                                        <X className="w-3 h-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                        <Input
                            id="tags"
                            placeholder="태그를 입력하고 Enter를 누르세요 (예: #물류 #스타트업)"
                            className="bg-neutral-900 border-neutral-800 text-white rounded-none h-10 placeholder:text-neutral-600"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <Label className="text-neutral-300">이미지 첨부</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-900 rounded-none h-24 w-24 flex flex-col gap-2"
                            >
                                <ImageIcon className="w-6 h-6" />
                                <span className="text-xs">추가</span>
                            </Button>

                            {/* Image Previews */}
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {images.map((img, index) => (
                                    <div key={index} className="relative w-24 h-24 flex-shrink-0 bg-neutral-900 border border-neutral-800 group">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-xs text-neutral-500">최대 10장까지 첨부 가능합니다.</p>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-neutral-800">
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
