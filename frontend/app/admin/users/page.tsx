"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/admin/users`);
            const data = await res.json();
            if (data.data) {
                setUsers(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getTierBadge = (tier: string) => {
        switch (tier) {
            case 'platinum': return <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-purple-500/50">Platinum</Badge>;
            case 'premium': return <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/50">Premium</Badge>;
            default: return <Badge variant="outline" className="text-neutral-400">Standard</Badge>;
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">회원 관리</h1>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => fetchUsers()}>새로고침</Button>
                </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left text-neutral-400">
                    <thead className="text-xs text-neutral-500 uppercase bg-black border-b border-neutral-800">
                        <tr>
                            <th className="px-6 py-3">회원명</th>
                            <th className="px-6 py-3">티어</th>
                            <th className="px-6 py-3">연락처</th>
                            <th className="px-6 py-3">회사/직책</th>
                            <th className="px-6 py-3">가입일</th>
                            <th className="px-6 py-3 text-right">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {loading ? (
                            <tr><td colSpan={6} className="px-6 py-8 text-center">Loading...</td></tr>
                        ) : users.length === 0 ? (
                            <tr><td colSpan={6} className="px-6 py-8 text-center">회원이 없습니다.</td></tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-neutral-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">
                                        <div>{user.name}</div>
                                        <div className="text-xs text-neutral-500">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getTierBadge(user.tier)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.company || '-'}
                                        {user.position && <span className="text-xs ml-1 text-neutral-500">({user.position})</span>}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/admin/users/${user.id}`}>
                                            <Button size="sm" variant="ghost" className="hover:text-white">
                                                수정
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
