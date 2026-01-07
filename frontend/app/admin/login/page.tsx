"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "0812") {
            // Simple Client-side check logic
            // In a real app, this should generate a session token via API
            localStorage.setItem("admin_auth", "true");
            document.cookie = "admin_auth=true; path=/"; // Set cookie for middleware if needed
            router.push("/admin");
        } else {
            alert("비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white">THE 1% ADMIN</h1>
                    <p className="text-neutral-400 mt-2">관리자 암호를 입력하세요</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-neutral-900 border-neutral-800 text-white"
                    />
                    <Button type="submit" className="w-full bg-white text-black hover:bg-neutral-200">
                        접속
                    </Button>
                </form>
            </div>
        </div>
    );
}
