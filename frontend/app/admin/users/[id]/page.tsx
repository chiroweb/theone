"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save } from "lucide-react";

export default function UserDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [tier, setTier] = useState("standard");

    useEffect(() => {
        if (params.id) {
            fetchUser();
        }
    }, [params.id]);

    const fetchUser = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/admin/users/${params.id}`);
            const data = await res.json();
            if (data.data) {
                setUser(data.data);
                setTier(data.data.tier || "standard");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/admin/users/${params.id}/tier`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tier }),
            });

            if (res.ok) {
                alert('저장되었습니다.');
                router.refresh();
            } else {
                alert('저장 실패');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-neutral-400">Loading user...</div>;
    if (!user) return <div className="p-8 text-neutral-400">User not found</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <Link href="/admin/users" className="inline-flex items-center text-neutral-400 hover:text-white mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> 회원 목록
            </Link>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                    <div className="text-neutral-400">
                        {user.email} · {user.phone}
                    </div>
                </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-white mb-4">멤버십 관리</h2>
                <div className="flex items-center gap-4">
                    <div className="w-1/3">
                        <label className="block text-sm font-medium text-neutral-400 mb-2">티어</label>
                        <select
                            value={tier}
                            onChange={(e) => setTier(e.target.value)}
                            className="w-full bg-black border border-neutral-700 text-white rounded-md px-3 py-2 focus:outline-none focus:border-white"
                        >
                            <option value="standard">Standard</option>
                            <option value="premium">Premium</option>
                            <option value="platinum">Platinum</option>
                        </select>
                    </div>
                    <div className="flex-1 pt-7">
                        <Button onClick={handleSave} disabled={saving} className="bg-white text-black hover:bg-neutral-200">
                            <Save className="w-4 h-4 mr-2" /> 변경사항 저장
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-4">프로필 정보</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <div className="text-sm text-neutral-500 mb-1">회사</div>
                        <div className="text-white">{user.company || '-'}</div>
                    </div>
                    <div>
                        <div className="text-sm text-neutral-500 mb-1">직책</div>
                        <div className="text-white">{user.position || '-'}</div>
                    </div>
                    <div className="col-span-2">
                        <div className="text-sm text-neutral-500 mb-1">소개</div>
                        <div className="text-white">{user.bio || '-'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
