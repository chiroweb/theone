"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminApplicationsPage() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/admin/applications`);
            const data = await res.json();
            if (data.data) {
                setApplications(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved': return <Badge className="bg-emerald-500 hover:bg-emerald-600">승인됨</Badge>;
            case 'rejected': return <Badge className="bg-red-500 hover:bg-red-600">거절됨</Badge>;
            case 'reviewing': return <Badge className="bg-yellow-500 hover:bg-yellow-600">검토중</Badge>;
            default: return <Badge variant="outline" className="text-neutral-400">대기중</Badge>;
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">가입 신청 관리</h1>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => fetchApplications()}>새로고침</Button>
                </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left text-neutral-400">
                    <thead className="text-xs text-neutral-500 uppercase bg-black border-b border-neutral-800">
                        <tr>
                            <th className="px-6 py-3">신청자</th>
                            <th className="px-6 py-3">유형</th>
                            <th className="px-6 py-3">회사/소속</th>
                            <th className="px-6 py-3">상태</th>
                            <th className="px-6 py-3">신청일</th>
                            <th className="px-6 py-3 text-right">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {loading ? (
                            <tr><td colSpan={6} className="px-6 py-8 text-center">Loading...</td></tr>
                        ) : applications.length === 0 ? (
                            <tr><td colSpan={6} className="px-6 py-8 text-center">신청 내역이 없습니다.</td></tr>
                        ) : (
                            applications.map((app) => (
                                <tr key={app.id} className="hover:bg-neutral-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">
                                        <div>{app.email}</div>
                                        <div className="text-xs text-neutral-500">{app.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {app.memberType === 'business' ? '사업가' : '예비창업가'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {app.businessInfo?.companyName || '-'}
                                        {app.businessInfo?.position && <span className="text-xs ml-1 text-neutral-500">({app.businessInfo.position})</span>}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(app.status)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/admin/applications/${app.id}`}>
                                            <Button size="sm" variant="secondary" className="hover:bg-white hover:text-black">
                                                심사하기
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
