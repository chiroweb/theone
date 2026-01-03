"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Save, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        setIsEditing(false);
        toast.success("프로필이 저장되었습니다.");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-end border-b border-neutral-800 pb-6">
                <div>
                    <h1 className="text-4xl font-heading font-bold tracking-tight mb-2">My Profile</h1>
                    <p className="text-neutral-400">멤버들에게 보여지는 나의 프로필을 관리하세요.</p>
                </div>
                {!isEditing ? (
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-white text-black hover:bg-neutral-200 rounded-none font-bold"
                    >
                        프로필 수정
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            onClick={() => setIsEditing(false)}
                            className="text-neutral-400 hover:text-white rounded-none"
                        >
                            취소
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="bg-white text-black hover:bg-neutral-200 rounded-none font-bold"
                        >
                            {isLoading ? "저장 중..." : <><Save className="w-4 h-4 mr-2" /> 저장하기</>}
                        </Button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Avatar & Basic Info */}
                <div className="space-y-6">
                    <div className="relative group w-32 h-32 mx-auto md:mx-0">
                        <Avatar className="w-full h-full border-2 border-neutral-800">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-neutral-900 text-neutral-400">
                                <User className="w-12 h-12" />
                            </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-neutral-500 text-xs uppercase tracking-wider font-bold">이름</Label>
                            {isEditing ? (
                                <Input defaultValue="홍길동" className="bg-neutral-900 border-neutral-800 text-white rounded-none" />
                            ) : (
                                <p className="text-xl font-bold text-white">홍길동</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-neutral-500 text-xs uppercase tracking-wider font-bold">직책 / 회사</Label>
                            {isEditing ? (
                                <div className="grid grid-cols-2 gap-2">
                                    <Input defaultValue="CEO" placeholder="직책" className="bg-neutral-900 border-neutral-800 text-white rounded-none" />
                                    <Input defaultValue="MyCompany" placeholder="회사명" className="bg-neutral-900 border-neutral-800 text-white rounded-none" />
                                </div>
                            ) : (
                                <p className="text-neutral-300">CEO @ MyCompany</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-neutral-500 text-xs uppercase tracking-wider font-bold">지역</Label>
                            {isEditing ? (
                                <Select defaultValue="seoul">
                                    <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white rounded-none">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-neutral-800 text-white rounded-none">
                                        <SelectItem value="seoul">서울</SelectItem>
                                        <SelectItem value="gyeonggi">경기</SelectItem>
                                        <SelectItem value="busan">부산</SelectItem>
                                        <SelectItem value="global">해외</SelectItem>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p className="text-neutral-300">서울</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Detailed Info */}
                <div className="md:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <Label className="text-white text-lg font-bold border-b border-neutral-800 pb-2 block">자기 소개</Label>
                        {isEditing ? (
                            <Textarea
                                defaultValue="안녕하세요, IT 스타트업을 운영하고 있습니다."
                                className="bg-neutral-900 border-neutral-800 text-white rounded-none min-h-[100px]"
                            />
                        ) : (
                            <p className="text-neutral-300 leading-relaxed">
                                "안녕하세요, IT 스타트업을 운영하고 있습니다."
                            </p>
                        )}
                    </div>

                    <div className="space-y-4">
                        <Label className="text-white text-lg font-bold border-b border-neutral-800 pb-2 block">전문 영역 (Specialties)</Label>
                        <div className="flex flex-wrap gap-2">
                            {["IT/테크", "SaaS", "스타트업"].map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-neutral-800 text-neutral-300 hover:bg-neutral-700 rounded-none px-3 py-1">
                                    {tag}
                                    {isEditing && <button className="ml-2 hover:text-white">×</button>}
                                </Badge>
                            ))}
                            {isEditing && (
                                <Button variant="outline" size="sm" className="rounded-none border-dashed border-neutral-700 text-neutral-500 hover:text-white h-7">
                                    + 추가
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <Label className="text-white text-lg font-bold border-b border-neutral-800 pb-2 block">도움 줄 수 있는 것</Label>
                            <div className="space-y-2">
                                {["기술 자문", "개발 팀 빌딩"].map((item) => (
                                    <div key={item} className="flex items-center gap-2 text-neutral-300">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                        {item}
                                    </div>
                                ))}
                                {isEditing && (
                                    <Input placeholder="직접 입력..." className="bg-neutral-900 border-neutral-800 text-white rounded-none h-9 text-sm mt-2" />
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-white text-lg font-bold border-b border-neutral-800 pb-2 block">찾는 것</Label>
                            <div className="space-y-2">
                                {["시리즈 A 투자", "마케팅 파트너"].map((item) => (
                                    <div key={item} className="flex items-center gap-2 text-neutral-300">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        {item}
                                    </div>
                                ))}
                                {isEditing && (
                                    <Input placeholder="직접 입력..." className="bg-neutral-900 border-neutral-800 text-white rounded-none h-9 text-sm mt-2" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
