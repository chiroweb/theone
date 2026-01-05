"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Lock, Shield, User } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <h1 className="text-4xl font-heading font-bold tracking-tight mb-6">설정</h1>

            <Tabs defaultValue="account" className="space-y-6">
                <TabsList className="bg-neutral-900 border border-neutral-800 p-1">
                    <TabsTrigger value="account" className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white">
                        <User className="w-4 h-4 mr-2" /> 계정
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white">
                        <Bell className="w-4 h-4 mr-2" /> 알림
                    </TabsTrigger>
                    <TabsTrigger value="privacy" className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white">
                        <Shield className="w-4 h-4 mr-2" /> 프라이버시
                    </TabsTrigger>
                </TabsList>

                {/* Account Settings */}
                <TabsContent value="account" className="space-y-6">
                    <Card className="bg-neutral-900 border-neutral-800 text-white">
                        <CardHeader>
                            <CardTitle>계정 정보</CardTitle>
                            <CardDescription className="text-neutral-400">기본적인 계정 정보를 관리합니다.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>이메일</Label>
                                <Input value="user@example.com" disabled className="bg-neutral-950 border-neutral-800 text-neutral-400" />
                            </div>
                            <div className="space-y-2">
                                <Label>비밀번호 변경</Label>
                                <Input type="password" placeholder="현재 비밀번호" className="bg-neutral-950 border-neutral-800 text-white mb-2" />
                                <Input type="password" placeholder="새 비밀번호" className="bg-neutral-950 border-neutral-800 text-white mb-2" />
                                <Input type="password" placeholder="새 비밀번호 확인" className="bg-neutral-950 border-neutral-800 text-white" />
                            </div>
                            <div className="pt-4">
                                <Button className="bg-white text-black hover:bg-neutral-200 font-bold">변경사항 저장</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-red-950/10 border-red-900/30 text-white">
                        <CardHeader>
                            <CardTitle className="text-red-500">위험 구역</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-white">회원 탈퇴</p>
                                <p className="text-sm text-neutral-400">계정을 삭제하면 되돌릴 수 없습니다.</p>
                            </div>
                            <Button variant="destructive">계정 삭제</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notification Settings */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card className="bg-neutral-900 border-neutral-800 text-white">
                        <CardHeader>
                            <CardTitle>알림 설정</CardTitle>
                            <CardDescription className="text-neutral-400">어떤 알림을 받을지 선택하세요.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">이메일 알림</Label>
                                    <p className="text-sm text-neutral-400">주요 업데이트 및 활동 내역을 이메일로 받습니다.</p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">새 메시지 알림</Label>
                                    <p className="text-sm text-neutral-400">새로운 채팅 메시지가 오면 알림을 받습니다.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">댓글 알림</Label>
                                    <p className="text-sm text-neutral-400">내 글에 댓글이 달리면 알림을 받습니다.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">마케팅 정보 수신</Label>
                                    <p className="text-sm text-neutral-400">이벤트 및 프로모션 정보를 받습니다.</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Privacy Settings */}
                <TabsContent value="privacy" className="space-y-6">
                    <Card className="bg-neutral-900 border-neutral-800 text-white">
                        <CardHeader>
                            <CardTitle>프라이버시 설정</CardTitle>
                            <CardDescription className="text-neutral-400">개인정보 공개 범위를 설정합니다.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">프로필 공개</Label>
                                    <p className="text-sm text-neutral-400">다른 멤버들에게 내 프로필을 공개합니다.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">온라인 상태 표시</Label>
                                    <p className="text-sm text-neutral-400">현재 접속 중임을 다른 멤버에게 알립니다.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
