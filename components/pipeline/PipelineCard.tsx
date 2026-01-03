"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, DollarSign, Users } from "lucide-react";
import { toast } from "sonner";

interface PipelineCardProps {
    title: string;
    author: string;
    authorRole: string;
    type: "Investment" | "Co-founder" | "Hiring" | "Partnership";
    budget?: string;
    description: string;
    tags: string[] | readonly string[];
}

export function PipelineCard({ title, author, authorRole, type, budget, description, tags }: PipelineCardProps) {
    return (
        <Card className="bg-neutral-900 border-neutral-800 text-white hover:border-neutral-700 transition-all group">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-white border-white rounded-none uppercase text-xs">
                            {type}
                        </Badge>
                        {budget && (
                            <span className="text-xs text-neutral-400 flex items-center gap-1">
                                <DollarSign className="w-3 h-3" /> {budget}
                            </span>
                        )}
                    </div>
                    <CardTitle className="text-xl font-heading leading-tight group-hover:underline decoration-1 underline-offset-4">
                        {title}
                    </CardTitle>
                </div>
                <Avatar className="h-10 w-10 border border-neutral-700">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`} />
                    <AvatarFallback>{author[0]}</AvatarFallback>
                </Avatar>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-neutral-400 text-sm line-clamp-2">
                    {description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <span className="font-bold text-neutral-300">{author}</span>
                        <span>•</span>
                        <span>{authorRole}</span>
                    </div>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white hover:text-black rounded-none h-8 text-xs font-bold"
                        onClick={() => toast.info("상세 정보를 불러오는 중입니다...")}
                    >
                        자세히 보기 <ArrowRight className="ml-2 w-3 h-3" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
