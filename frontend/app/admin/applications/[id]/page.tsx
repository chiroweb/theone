"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, X, ExternalLink } from "lucide-react";

export default function ApplicationDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [app, setApp] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (params.id) {
            fetchApplication();
        }
    }, [params.id]);

    const fetchApplication = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/admin/applications/${params.id}`);
            const data = await res.json();
            if (data.data) {
                setApp(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async () => {
        if (!confirm('승인하시겠습니까? 해당 회원이 자동으로 생성됩니다.')) return;

        try {
            setProcessing(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/admin/applications/${params.id}/approve`, {
                method: 'POST',
            });
            const data = await res.json();

            if (res.ok) {
                alert('승인되었습니다.');
                router.push('/admin/applications');
            } else {
                alert(data.error || '승인 실패');
            }
        } catch (error) {
            console.error(error);
            alert('오류가 발생했습니다.');
        } finally {
            setProcessing(false);
        }
    };

    const handleReject = async () => {
        const reason = prompt('거절 사유를 입력하세요:');
        if (reason === null) return; // Cancelled

        try {
            setProcessing(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/admin/applications/${params.id}/reject`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reason }),
            });

            if (res.ok) {
                alert('거절되었습니다.');
                router.push('/admin/applications');
            } else {
                alert('거절 실패');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <div className="p-8 text-neutral-400">Loading details...</div>;
    if (!app) return <div className="p-8 text-neutral-400">Application not found</div>;

    const info = app.memberType === 'business' ? app.businessInfo : app.founderInfo;

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <Link href="/admin/applications" className="inline-flex items-center text-neutral-400 hover:text-white mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> 목록으로
            </Link>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-neutral-400 border-neutral-700 uppercase">
                            {app.memberType}
                        </Badge>
                        <span className="text-neutral-500 text-sm">{new Date(app.createdAt).toLocaleString()}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {app.memberType === 'business' ? info?.companyName : '예비창업'}
                        <span className="text-neutral-500 font-normal ml-3 text-xl">
                            {app.memberType === 'business' ? info?.representativeName : app.email}
                        </span>
                    </h1>
                    <div className="text-neutral-400">
                        {app.email} · {app.phone}
                    </div>
                </div>

                <div className="flex gap-3">
                    {app.status === 'pending' || app.status === 'reviewing' ? (
                        <>
                            <Button variant="outline" className="border-red-900 text-red-500 hover:bg-red-950 hover:text-red-400" onClick={handleReject} disabled={processing}>
                                <X className="w-4 h-4 mr-2" /> 거절
                            </Button>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleApprove} disabled={processing}>
                                <Check className="w-4 h-4 mr-2" /> 승인
                            </Button>
                        </>
                    ) : (
                        <div className="text-lg font-bold capitalize">
                            {app.status === 'approved' && <span className="text-emerald-500">승인됨</span>}
                            {app.status === 'rejected' && <span className="text-red-500">거절됨</span>}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Basic Info */}
                <div className="space-y-6">
                    <section className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">상세 정보</h2>
                        <div className="space-y-4">
                            {info && Object.entries(info).map(([key, value]) => {
                                if (key.includes('Url') || typeof value !== 'string') return null;
                                return (
                                    <div key={key}>
                                        <div className="text-xs text-neutral-500 uppercase mb-1">{key}</div>
                                        <div className="text-white">{value as string}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">소셜/링크</h2>
                        <div className="space-y-3">
                            {info?.websiteUrl && (
                                <a href={info.websiteUrl} target="_blank" rel="noopener" className="flex items-center text-blue-400 hover:underline">
                                    <ExternalLink className="w-4 h-4 mr-2" /> 웹사이트
                                </a>
                            )}
                            {info?.linkedinUrl && (
                                <a href={info.linkedinUrl} target="_blank" rel="noopener" className="flex items-center text-blue-400 hover:underline">
                                    <ExternalLink className="w-4 h-4 mr-2" /> LinkedIn
                                </a>
                            )}
                            {info?.portfolioUrl && (
                                <a href={info.portfolioUrl} target="_blank" rel="noopener" className="flex items-center text-blue-400 hover:underline">
                                    <ExternalLink className="w-4 h-4 mr-2" /> 포트폴리오
                                </a>
                            )}
                        </div>
                    </section>
                </div>

                {/* Right Column: Q&A */}
                <div className="space-y-6">
                    <section className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">지원 동기</h2>
                        <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">
                            {app.motivation || '입력된 내용이 없습니다.'}
                        </p>
                    </section>

                    <section className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Can Provide</h2>
                        <div className="flex flex-wrap gap-2">
                            {app.canProvide?.map((tag: string, i: number) => (
                                <Badge key={i} variant="secondary">{tag}</Badge>
                            )) || <span className="text-neutral-500">-</span>}
                        </div>
                    </section>

                    <section className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Looking For</h2>
                        <div className="flex flex-wrap gap-2">
                            {app.lookingFor?.map((tag: string, i: number) => (
                                <Badge key={i} variant="outline" className="border-neutral-600">{tag}</Badge>
                            )) || <span className="text-neutral-500">-</span>}
                        </div>
                    </section>

                    {app.status === 'rejected' && app.rejectionReason && (
                        <section className="bg-red-950/20 border border-red-900/50 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-red-500 mb-2">거절 사유</h2>
                            <p className="text-red-400">{app.rejectionReason}</p>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
