"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Key } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [code, setCode] = useState("");

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black opacity-40 pointer-events-none" />

            <div className="z-10 w-full max-w-md space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter">
                        MEMBER ACCESS
                    </h1>
                    <p className="text-neutral-500 uppercase tracking-widest text-sm">
                        Enter your private key
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
                            <Input
                                type="password"
                                placeholder="ACCESS CODE"
                                className="bg-neutral-900 border-neutral-800 text-white pl-10 h-14 rounded-none focus:border-white transition-colors font-mono tracking-widest text-center"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                    </div>

                    <Link href="/dashboard">
                        <Button className="w-full h-14 bg-white text-black hover:bg-neutral-200 rounded-none font-bold text-lg tracking-wide mt-4">
                            ENTER THE FORTRESS
                        </Button>
                    </Link>
                </div>

                <div className="text-center space-y-4">
                    <Link href="/apply" className="block text-neutral-500 hover:text-white text-xs tracking-widest uppercase transition-colors">
                        Not a member? Apply for access
                    </Link>
                    <Link href="/" className="text-neutral-600 hover:text-white text-sm flex items-center justify-center gap-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> BACK TO GATEWAY
                    </Link>
                </div>
            </div>
        </div>
    );
}
