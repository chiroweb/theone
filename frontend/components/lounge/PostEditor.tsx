"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon, Paperclip, X, Loader2, Bold, Italic, List, Link as LinkIcon, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
    { value: "business", label: "비즈니스" },
    { value: "economy", label: "경제/금융" },
    { value: "policy", label: "정책/법률" },
    { value: "networking", label: "네트워킹" },
    { value: "free", label: "자유게시판" },
];

export function PostEditor() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Note: Auth token should be handled by httpOnly cookie or global interceptor.
                    // If using localStorage token: "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    content,
                    category,
                    imageUrls: images,
                    tags,
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || "게시글 작성에 실패했습니다.");
            }

            toast.success("게시글이 성공적으로 등록되었습니다.");
            router.push("/lounge");
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSaveDraft = () => {
        toast.success("임시저장 되었습니다.");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
            <div className="flex justify-end mb-4">
                <Button type="button" variant="outline" onClick={handleSaveDraft} className="border-neutral-700 hover:bg-neutral-800 text-neutral-300 gap-2">
                    <Save className="w-4 h-4" /> 임시저장
                </Button>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-neutral-300">카테고리</Label>
                        <Select value={category} onValueChange={setCategory} required>
                            <SelectTrigger className="bg-neutral-900 border-neutral-800 h-12 text-white">
                                <SelectValue placeholder="카테고리 선택" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                {CATEGORIES.map(cat => (
                                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-neutral-300">제목</Label>
                        <Input
                            id="title"
                            placeholder="제목을 입력하세요"
                            className="bg-neutral-900 border-neutral-800 h-12 text-lg text-white placeholder:text-neutral-600"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-neutral-300">내용</Label>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-md overflow-hidden">
                        {/* Editor Toolbar */}
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
                            <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 text-neutral-400 hover:text-white hover:bg-neutral-800">
                                <Paperclip className="w-4 h-4" />
                            </Button>
                        </div>

                        <Textarea
                            placeholder="자유롭게 이야기를 나누어보세요.&#13;&#10;비즈니스 인사이트, 질문, 또는 가벼운 잡담 모두 환영합니다."
                            className="min-h-[400px] bg-transparent border-0 resize-none focus-visible:ring-0 p-4 text-base leading-relaxed text-white placeholder:text-neutral-600"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />

                        {/* Attachment Preview Area */}
                        {images.length > 0 && (
                            <div className="p-4 border-t border-neutral-800 bg-neutral-900/30">
                                <div className="flex gap-4 overflow-x-auto pb-2">
                                    {images.map((img, idx) => (
                                        <div key={idx} className="relative group shrink-0 w-24 h-24 bg-neutral-800 border border-neutral-700 rounded overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Hidden File Input */}
                <Input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                />

                {/* Hashtags */}
                <div className="space-y-2">
                    <Label htmlFor="tags" className="text-neutral-300">해시태그</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-neutral-800 text-neutral-300 hover:bg-neutral-700 gap-1 pl-2 pr-1 py-1 rounded">
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
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-neutral-800">
                <Button
                    type="button"
                    variant="outline"
                    className="border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900"
                    onClick={() => router.back()}
                >
                    취소
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-white text-black hover:bg-neutral-200 min-w-[100px] font-bold"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            등록 중
                        </>
                    ) : (
                        "등록하기"
                    )}
                </Button>
            </div>
        </form>
    );
}
