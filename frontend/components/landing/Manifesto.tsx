"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ApplyButton } from "./ApplyButton";

export function Manifesto() {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-black text-white p-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black opacity-40 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="z-10 max-w-5xl text-center space-y-12 flex flex-col items-center"
            >
                <h1 className="text-6xl md:text-9xl font-heading font-bold tracking-tighter leading-[0.9]">
                    THE 1% <br />
                    <span className="text-neutral-600">BUSINESS ELITE</span>
                </h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="space-y-6"
                >
                    <p className="text-xl md:text-3xl text-neutral-400 font-light max-w-3xl mx-auto leading-relaxed word-keep-all">
                        압도적인 폐쇄성. 철저한 프라이버시. 기술적 우위.
                    </p>
                    <p className="text-lg md:text-xl text-neutral-500 font-light max-w-2xl mx-auto word-keep-all">
                        우리는 모두를 위한 커뮤니티가 아닙니다. <br /> 미래를 설계하는 소수의 혁신가들을 위한 요새입니다.
                    </p>
                </motion.div>

                <ApplyButton />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="mt-12"
                >
                    <Link href="/login" className="text-neutral-600 hover:text-white text-sm tracking-widest uppercase transition-colors border-b border-transparent hover:border-white pb-1">
                        Member Access
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
