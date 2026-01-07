import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black">
            <AdminSidebar />
            <div className="pl-64">
                {children}
            </div>
        </div>
    );
}
