"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Bookmark, Share2 } from "lucide-react";
import { toast } from "sonner";

interface InsightCardProps {
    title: string;
    source: string;
    date: string;
    summary: string[];
    action: string;
    tags: string[];
}

export function InsightCard({ title, source, date, summary, action, tags }: InsightCardProps) {
    return (
        <Card className="bg-neutral-900 border-neutral-800 text-white hover:border-neutral-700 transition-colors">
            <CardHeader className="space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider">
                            <Badge variant="outline" className="text-neutral-400 border-neutral-700 rounded-none px-1.5 py-0.5 text-[10px]">
                                {source.includes("TechCrunch") ? "🇺🇸 US" : source.includes("Nikkei") ? "🇯🇵 JP" : "🇰🇷 KR"}
                            </Badge>
                            <span className="text-white font-bold">{source}</span>
                            <span>•</span>
                            <span>{date}</span>
                        </div>
                        <CardTitle className="text-2xl font-heading leading-tight">{title}</CardTitle>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-neutral-400 hover:text-white"
                            onClick={() => toast.success("인사이트가 저장되었습니다.")}
                        >
                            <Bookmark className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-neutral-400 hover:text-white"
                            onClick={() => toast.info("공유 링크가 복사되었습니다.")}
                        >
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
                <div className="flex gap-2">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-neutral-800 text-neutral-300 hover:bg-neutral-700 rounded-none">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-3">
                    <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-widest">AI 요약</h4>
                    <ul className="space-y-2">
                        {summary.map((line, index) => (
                            <li key={index} className="flex gap-3 text-neutral-300">
                                <span className="text-neutral-600 font-bold">{index + 1}.</span>
                                <span className="leading-relaxed">{line}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-neutral-900/50 p-4 border border-neutral-800">
                    <h4 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        🇰🇷 한국 시장 체크포인트
                    </h4>
                    <div className="space-y-2 text-sm text-neutral-300">
                        <div className="flex gap-2">
                            <span className="text-neutral-500 min-w-[80px]">유사 서비스:</span>
                            <span>국내 'OOO' 등 존재하나 초기 단계</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-neutral-500 min-w-[80px]">규제 이슈:</span>
                            <span>금융위 인허가 필요 가능성 높음</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-neutral-500 min-w-[80px]">진입 장벽:</span>
                            <span className="text-yellow-500 font-bold">중간 (Medium)</span>
                        </div>
                    </div>
                    <p className="text-[10px] text-neutral-600 mt-3">* 본 분석은 참고용이며, 사업 판단은 본인 책임입니다.</p>
                </div>

                <div className="bg-white/5 p-6 border-l-2 border-white">
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">실행 아이디어</h4>
                    <p className="text-lg font-medium text-white">{action}</p>
                </div>
            </CardContent>
            <CardFooter className="justify-end pt-2">
                <Button
                    variant="link"
                    className="text-white hover:text-neutral-300 p-0 h-auto font-bold"
                    onClick={() => toast.info("원본 소스로 이동합니다...")}
                >
                    원문 보기 <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
            </CardFooter>
        </Card>
    );
}
