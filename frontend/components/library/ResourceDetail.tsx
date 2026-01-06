"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Download,
    Eye,
    FileText,
    Share2,
    Star,
    Calendar,
    ArrowLeft,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Resource {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    views: number;
    downloads: number;
    type: string;
    files: Array<{ name: string; size: string; type: string }>;
    related?: Array<{ id: string; title: string; category: string }>;
}

export function ResourceDetail({ resource }: { resource: Resource }) {

    const handleDownload = (filename: string) => {
        toast.success(`${filename} 다운로드가 시작되었습니다.`);
    };

    return (
        <div className="max-w-6xl mx-auto pb-20">
            {/* Header / Nav */}
            <div className="mb-6">
                <Link href="/library">
                    <Button variant="ghost" className="pl-0 text-neutral-400 hover:text-white hover:bg-transparent -ml-2">
                        <ArrowLeft className="w-4 h-4 mr-2" /> 자료실 목록
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant="outline" className="text-blue-400 border-blue-400/30 rounded-none px-3 py-1 bg-blue-400/10">
                                {resource.category}
                            </Badge>
                            <Badge variant="outline" className="text-neutral-400 border-neutral-700 rounded-none px-3 py-1">
                                {resource.type}
                            </Badge>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-white leading-tight mb-6">
                            {resource.title}
                        </h1>
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
                            <div className="flex items-center gap-4 text-sm text-neutral-500">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{resource.date}</span>
                                </div>
                                <div className="w-px h-3 bg-neutral-800" />
                                <div className="flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    <span>{resource.views.toLocaleString()}</span>
                                </div>
                                <div className="w-px h-3 bg-neutral-800" />
                                <div className="flex items-center gap-2 text-white font-medium">
                                    <Download className="w-4 h-4" />
                                    <span>{resource.downloads.toLocaleString()} 다운로드</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white hover:bg-neutral-800">
                                    <Share2 className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white hover:bg-neutral-800">
                                    <Star className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none text-neutral-300 leading-loose">
                        <h3 className="text-white font-bold text-xl mb-4">자료 소개</h3>
                        <p className="whitespace-pre-wrap">{resource.description}</p>

                        <h3 className="text-white font-bold text-xl mt-8 mb-4">이런 분들에게 추천합니다</h3>
                        <ul className="list-none space-y-2 pl-0">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>초기 법인 설립을 준비 중인 대표님</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>복잡한 세무 일정을 한 눈에 파악하고 싶은 경영지원팀</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span>정부 지원금 신청 자격을 미리 확인하고 싶은 분</span>
                            </li>
                        </ul>
                    </div>

                    <Separator className="bg-neutral-800" />

                    {/* Files Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-6">포함된 파일 <span className="text-neutral-500 text-base font-normal ml-2">({resource.files.length}개)</span></h3>
                        <div className="space-y-4">
                            {resource.files.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between p-6 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-neutral-800 flex items-center justify-center rounded text-neutral-400 group-hover:bg-white group-hover:text-black transition-colors">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-lg font-medium text-white mb-1 group-hover:underline decoration-1 underline-offset-4">{file.name}</div>
                                            <div className="flex items-center gap-3 text-sm text-neutral-500">
                                                <Badge variant="secondary" className="bg-neutral-800 text-neutral-400 rounded-none text-xs">{file.type}</Badge>
                                                <span>{file.size}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        className="bg-white text-black hover:bg-neutral-200 font-bold min-w-[100px]"
                                        onClick={() => handleDownload(file.name)}
                                    >
                                        <Download className="w-4 h-4 mr-2" /> 다운로드
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Access Card */}
                    <Card className="bg-neutral-900 border-neutral-800 text-white p-6 sticky top-24">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-xl mb-2">The 1% 멤버십 전용</CardTitle>
                            <p className="text-neutral-400 text-sm">이 자료는 멤버십 회원에게만 제공되는 프리미엄 콘텐츠입니다. 무단 배포 시 제재를 받을 수 있습니다.</p>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <Button className="w-full h-12 text-lg font-bold bg-yellow-500 hover:bg-yellow-600 text-black border-none rounded-none">
                                전체 다운로드 (ZIP)
                            </Button>
                            <p className="text-center text-xs text-neutral-500">
                                바이러스 검사 완료 • 안전한 파일입니다.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Similar Resources */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">함께 본 자료</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <Link key={i} href="#" className="block p-4 border border-neutral-800 hover:bg-neutral-900 transition-colors group">
                                    <div className="text-xs text-neutral-500 mb-2">세무/회계</div>
                                    <div className="font-medium text-white group-hover:underline mb-2 line-clamp-2">
                                        스타트업을 위한 2026년 스톡옵션 과세 특례 해설
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                                        <Download className="w-3 h-3" />
                                        <span>340</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
