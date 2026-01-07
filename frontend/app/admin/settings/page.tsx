"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
    const [persona, setPersona] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchPersona();
    }, []);

    const fetchPersona = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/admin/persona`);
            const data = await res.json();
            if (data.persona) {
                setPersona(data.persona);
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/admin/persona`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ persona }),
            });

            if (res.ok) {
                toast.success('페르소나가 저장되었습니다.');
            } else {
                toast.error('저장 실패');
            }
        } catch (error) {
            console.error(error);
            toast.error('오류가 발생했습니다.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl">
            <h1 className="text-2xl font-bold text-white mb-6">설정</h1>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-white">AI 페르소나 설정</h2>
                        <p className="text-neutral-400 text-sm">뉴스 분석 AI의 성격과 역할을 지정합니다.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="py-8 text-center text-neutral-500">Loading...</div>
                ) : (
                    <div className="space-y-4">
                        <Textarea
                            value={persona}
                            onChange={(e) => setPersona(e.target.value)}
                            className="min-h-[400px] bg-black border-neutral-700 text-white font-mono text-sm leading-relaxed"
                            placeholder="페르소나 정의를 입력하세요..."
                        />
                        <div className="flex justify-end">
                            <Button onClick={handleSave} disabled={saving} className="bg-white text-black hover:bg-neutral-200">
                                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                저장하기
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
