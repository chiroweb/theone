export default function AdminDashboardPage() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-white mb-6">대시보드</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg">
                    <div className="text-neutral-400 text-sm mb-2">신규 신청</div>
                    <div className="text-3xl font-bold text-white">12</div>
                    <div className="text-emerald-500 text-sm mt-2">+2 오늘</div>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg">
                    <div className="text-neutral-400 text-sm mb-2">총 회원</div>
                    <div className="text-3xl font-bold text-white">1,205</div>
                    <div className="text-emerald-500 text-sm mt-2">+5% 이번 달</div>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg">
                    <div className="text-neutral-400 text-sm mb-2">오늘의 게시글</div>
                    <div className="text-3xl font-bold text-white">45</div>
                </div>
            </div>
        </div>
    );
}
