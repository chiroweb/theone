"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ApplyButton() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8"
        >
            <Link href="/apply">
                <Button
                    size="lg"
                    className="bg-white text-black hover:bg-neutral-200 text-lg px-10 py-8 rounded-none border border-transparent hover:border-white transition-all duration-300 font-heading font-bold tracking-wide"
                >
                    멤버십 신청하기 <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </Link>
        </motion.div>
    );
}
