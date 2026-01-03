"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, User } from "lucide-react";
import { toast } from "sonner";

interface ProfileRowProps {
    name: string;
    role: string;
    location: string;
    bio: string;
    company: string;
    position: string;
    revenue: string;
    specialties: string[];
    canHelpWith: string[];
    lookingFor: string[];
}

export function ProfileRow({
    name,
    role,
    location,
    bio,
    company,
    position,
    revenue,
    specialties,
    canHelpWith,
    lookingFor
}: ProfileRowProps) {
    return (
        <Card className="bg-black border border-neutral-800 p-6 rounded-none hover:border-neutral-600 transition-colors">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar & Basic Info */}
                <div className="flex-shrink-0 flex flex-col items-center md:items-start space-y-4 min-w-[200px]">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16 border border-neutral-700">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-neutral-900 text-neutral-400">
                                <User className="w-8 h-8" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="md:hidden text-left">
                            <h3 className="text-xl font-bold text-white">{name}</h3>
                            <p className="text-sm text-neutral-400">{role} · {location}</p>
                        </div>
                    </div>
                    <div className="hidden md:block text-center md:text-left space-y-1">
                        <h3 className="text-xl font-bold text-white">{name}</h3>
                        <p className="text-sm text-neutral-400">{role} · {location}</p>
                    </div>
                    <div className="w-full space-y-2 pt-2">
                        <Button
                            className="w-full bg-white text-black hover:bg-neutral-200 rounded-none font-bold h-9 text-xs"
                            onClick={() => toast.info("프로필 상세 보기 (준비 중)")}
                        >
                            프로필 보기
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full border-neutral-700 text-white hover:bg-neutral-900 hover:text-white rounded-none h-9 text-xs"
                            onClick={() => toast.info("채팅 기능이 곧 활성화됩니다.")}
                        >
                            <MessageSquare className="w-3 h-3 mr-2" /> 메시지
                        </Button>
                    </div>
                </div>

                {/* Detailed Info */}
                <div className="flex-grow space-y-6 border-t md:border-t-0 md:border-l border-neutral-800 pt-6 md:pt-0 md:pl-6">
                    <div>
                        <p className="text-lg font-medium text-white mb-4">"{bio}"</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-neutral-400 bg-neutral-900/30 p-4 border border-neutral-800/50">
                            <div>
                                <span className="block text-xs text-neutral-500 uppercase tracking-wider mb-1">Company</span>
                                <span className="text-white font-bold">{company}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-neutral-500 uppercase tracking-wider mb-1">Position</span>
                                <span className="text-white font-bold">{position}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-neutral-500 uppercase tracking-wider mb-1">Revenue</span>
                                <span className="text-white font-bold">{revenue}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">도움 줄 수 있는 것</h4>
                            <div className="flex flex-wrap gap-2">
                                {canHelpWith.map((item) => (
                                    <Badge key={item} variant="outline" className="border-neutral-700 text-neutral-300 rounded-none bg-neutral-900/50">
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">찾는 것</h4>
                            <div className="flex flex-wrap gap-2">
                                {lookingFor.map((item) => (
                                    <Badge key={item} variant="secondary" className="bg-white text-black hover:bg-neutral-200 rounded-none font-bold">
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
