"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Settings, Save, X, Edit2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Mock data for the initial state
const INITIAL_PROFILE = {
    role: "AI 솔루션 아키텍트",
    location: "서울",
    bio: "엔터프라이즈급 AI 도입 컨설팅 및 구축 경험 5년. 금융권 프로젝트 다수 수행.",
    company: "MyStartup Inc.",
    position: "CTO",
    revenue: "$0 - $1M",
    specialties: ["AI/ML", "FinTech", "Cloud Architecture"],
    canHelpWith: ["AI 도입 전략", "기술 아키텍처 설계"],
    lookingFor: ["초기 투자", "B2B 영업 파트너"]
};

export function PipelineConfiguration() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(INITIAL_PROFILE);
    const [editForm, setEditForm] = useState(INITIAL_PROFILE);

    // Handlers for form changes
    const handleChange = (field: keyof typeof INITIAL_PROFILE, value: string) => {
        setEditForm(prev => ({ ...prev, [field]: value }));
    };

    const handleArrayChange = (field: "specialties" | "canHelpWith" | "lookingFor", index: number, value: string) => {
        const newArray = [...editForm[field]];
        newArray[index] = value;
        setEditForm(prev => ({ ...prev, [field]: newArray }));
    };

    const addArrayItem = (field: "specialties" | "canHelpWith" | "lookingFor") => {
        setEditForm(prev => ({ ...prev, [field]: [...prev[field], ""] }));
    };

    const removeArrayItem = (field: "specialties" | "canHelpWith" | "lookingFor", index: number) => {
        setEditForm(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleSave = () => {
        setProfile(editForm);
        setIsEditing(false);
        toast.success("파이프라인 프로필이 저장되었습니다.");
    };

    const handleCancel = () => {
        setEditForm(profile);
        setIsEditing(false);
    };

    return (
        <Card className="bg-neutral-900 border-neutral-800 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="flex items-center gap-2 text-xl">
                    <Settings className="w-5 h-5" /> 파이프라인 프로필 설정
                </CardTitle>
                {!isEditing && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="border-neutral-700 text-white hover:bg-neutral-800 hover:text-white"
                    >
                        <Edit2 className="w-4 h-4 mr-2" /> 수정하기
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                {isEditing ? (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>직무 / 역할</Label>
                                <Input
                                    value={editForm.role}
                                    onChange={(e) => handleChange("role", e.target.value)}
                                    className="bg-black border-neutral-700 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>활동 지역</Label>
                                <Input
                                    value={editForm.location}
                                    onChange={(e) => handleChange("location", e.target.value)}
                                    className="bg-black border-neutral-700 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>회사명</Label>
                                <Input
                                    value={editForm.company}
                                    onChange={(e) => handleChange("company", e.target.value)}
                                    className="bg-black border-neutral-700 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>직책</Label>
                                <Input
                                    value={editForm.position}
                                    onChange={(e) => handleChange("position", e.target.value)}
                                    className="bg-black border-neutral-700 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>매출 규모</Label>
                                <Input
                                    value={editForm.revenue}
                                    onChange={(e) => handleChange("revenue", e.target.value)}
                                    className="bg-black border-neutral-700 text-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>자기 소개 (Bio)</Label>
                            <Textarea
                                value={editForm.bio}
                                onChange={(e) => handleChange("bio", e.target.value)}
                                className="bg-black border-neutral-700 text-white min-h-[80px]"
                            />
                        </div>

                        {/* Array Fields */}
                        {[
                            { key: "specialties", label: "전문 분야" },
                            { key: "canHelpWith", label: "도움 줄 수 있는 것" },
                            { key: "lookingFor", label: "찾고 있는 것" }
                        ].map(({ key, label }) => (
                            <div key={key} className="space-y-2">
                                <Label>{label}</Label>
                                <div className="space-y-2">
                                    {(editForm[key as keyof typeof editForm] as string[]).map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={item}
                                                onChange={(e) => handleArrayChange(key as any, index, e.target.value)}
                                                className="bg-black border-neutral-700 text-white"
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeArrayItem(key as any, index)}
                                                className="text-neutral-400 hover:text-red-400"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addArrayItem(key as any)}
                                        className="w-full border-dashed border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500"
                                    >
                                        <Plus className="w-4 h-4 mr-2" /> 항목 추가
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <div className="flex gap-2 justify-end pt-4 border-t border-neutral-800">
                            <Button
                                variant="ghost"
                                onClick={handleCancel}
                                className="text-neutral-400 hover:text-white"
                            >
                                <X className="w-4 h-4 mr-2" /> 취소
                            </Button>
                            <Button
                                onClick={handleSave}
                                className="bg-white text-black hover:bg-neutral-200 font-bold"
                            >
                                <Save className="w-4 h-4 mr-2" /> 저장하기
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-baseline gap-2 mb-1">
                                <h3 className="text-lg font-bold text-white">{profile.role}</h3>
                                <span className="text-sm text-neutral-400">in {profile.location}</span>
                            </div>
                            <p className="text-neutral-300">{profile.bio}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 p-4 bg-black border border-neutral-800 rounded-md">
                            <div>
                                <span className="block text-xs text-neutral-500 uppercase tracking-wider mb-1">Company</span>
                                <span className="text-white font-bold">{profile.company}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-neutral-500 uppercase tracking-wider mb-1">Position</span>
                                <span className="text-white font-bold">{profile.position}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-neutral-500 uppercase tracking-wider mb-1">Revenue</span>
                                <span className="text-white font-bold">{profile.revenue}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">전문 분야</h4>
                                <div className="flex flex-wrap gap-2">
                                    {profile.specialties.map((item, i) => (
                                        <Badge key={i} variant="outline" className="border-neutral-700 text-neutral-300">
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">도움 줄 수 있는 것</h4>
                                <div className="flex flex-wrap gap-2">
                                    {profile.canHelpWith.map((item, i) => (
                                        <Badge key={i} variant="outline" className="border-neutral-700 text-neutral-300 bg-neutral-900">
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">찾고 있는 것</h4>
                                <div className="flex flex-wrap gap-2">
                                    {profile.lookingFor.map((item, i) => (
                                        <Badge key={i} variant="secondary" className="bg-white text-black hover:bg-neutral-200">
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
