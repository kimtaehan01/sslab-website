/**
 * Admin Dashboard — Overview page
 */
import { trpc } from "@/lib/trpc";
import { Users, BookOpen, FlaskConical, Newspaper } from "lucide-react";
import { Link } from "wouter";

export default function AdminDashboard() {
  const members = trpc.members.list.useQuery();
  const publications = trpc.publications.list.useQuery();
  const researchAreas = trpc.researchAreas.list.useQuery();
  const newsList = trpc.news.list.useQuery();

  const stats = [
    { label: "구성원", count: members.data?.length ?? 0, icon: Users, href: "/admin/members", color: "bg-blue-500" },
    { label: "출판물", count: publications.data?.length ?? 0, icon: BookOpen, href: "/admin/publications", color: "bg-green-500" },
    { label: "연구분야", count: researchAreas.data?.length ?? 0, icon: FlaskConical, href: "/admin/research", color: "bg-purple-500" },
    { label: "소식", count: newsList.data?.length ?? 0, icon: Newspaper, href: "/admin/news", color: "bg-orange-500" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl text-navy">대시보드</h1>
        <p className="text-muted-foreground text-sm mt-1">SSLAB 웹사이트 관리 현황</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group bg-white border border-border rounded-lg p-5 hover:border-signal-red/30 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon size={20} className="text-white" />
              </div>
              <span className="font-heading font-bold text-3xl text-navy">{stat.count}</span>
            </div>
            <p className="text-muted-foreground text-sm font-heading">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white border border-border rounded-lg p-6">
        <h2 className="font-heading font-semibold text-lg text-navy mb-4">빠른 시작</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/admin/members"
            className="flex items-center gap-3 p-3 rounded-md border border-border hover:bg-muted/50 transition-colors"
          >
            <Users size={18} className="text-signal-red" />
            <div>
              <p className="text-sm font-medium text-navy">구성원 추가</p>
              <p className="text-xs text-muted-foreground">교수, 대학원생, 학부연구생 관리</p>
            </div>
          </Link>
          <Link
            href="/admin/publications"
            className="flex items-center gap-3 p-3 rounded-md border border-border hover:bg-muted/50 transition-colors"
          >
            <BookOpen size={18} className="text-signal-red" />
            <div>
              <p className="text-sm font-medium text-navy">논문 추가</p>
              <p className="text-xs text-muted-foreground">학술지, 학회 논문 관리</p>
            </div>
          </Link>
          <Link
            href="/admin/research"
            className="flex items-center gap-3 p-3 rounded-md border border-border hover:bg-muted/50 transition-colors"
          >
            <FlaskConical size={18} className="text-signal-red" />
            <div>
              <p className="text-sm font-medium text-navy">연구분야 편집</p>
              <p className="text-xs text-muted-foreground">연구 분야 및 주제 관리</p>
            </div>
          </Link>
          <Link
            href="/admin/news"
            className="flex items-center gap-3 p-3 rounded-md border border-border hover:bg-muted/50 transition-colors"
          >
            <Newspaper size={18} className="text-signal-red" />
            <div>
              <p className="text-sm font-medium text-navy">소식 작성</p>
              <p className="text-xs text-muted-foreground">공지사항 및 소식 관리</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
