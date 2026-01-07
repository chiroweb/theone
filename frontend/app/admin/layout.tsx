"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Skip check on login page
        if (pathname === '/admin/login') {
            setAuthorized(true);
            return;
        }

        const isAuth = localStorage.getItem("admin_auth") === "true";
        if (!isAuth) {
            router.push("/admin/login");
        } else {
            setAuthorized(true);
        }
    }, [pathname]);

    if (pathname === '/admin/login') {
        return <div className="min-h-screen bg-black">{children}</div>;
    }

    if (!authorized) return null;

    return (
        <div className="min-h-screen bg-black">
            <AdminSidebar />
            <div className="pl-64">
                {children}
            </div>
        </div>
    );
}
