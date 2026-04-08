/**
 * Admin Layout — SSLAB Admin Dashboard
 * Sidebar navigation with SSLAB branding
 */
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import {
  Users, BookOpen, FlaskConical, Newspaper, LayoutDashboard,
  LogOut, ChevronLeft, Menu, ArrowLeft, Loader2, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const adminMenuItems = [
  { icon: LayoutDashboard, label: "대시보드", path: "/admin" },
  { icon: Users, label: "구성원 관리", path: "/admin/members" },
  { icon: BookOpen, label: "출판물 관리", path: "/admin/publications" },
  { icon: FlaskConical, label: "연구분야 관리", path: "/admin/research" },
  { icon: Newspaper, label: "소식 관리", path: "/admin/news" },
];

function LoginForm() {
  const [password, setPassword] = useState("");
  const utils = trpc.useUtils();
  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    loginMutation.mutate({ password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-sm w-full p-8">
        <div className="w-14 h-14 bg-navy flex items-center justify-center mx-auto mb-6 relative">
          <span className="font-heading font-bold text-white text-lg">SS</span>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-signal-red" />
        </div>
        <h1 className="font-heading font-bold text-2xl text-navy mb-2">관리자 로그인</h1>
        <p className="text-muted-foreground text-sm mb-6">
          SSLAB 관리자 대시보드
        </p>
        <form onSubmit={handleSubmit} className="space-y-3 text-left">
          <div className="relative">
            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="password"
              placeholder="관리자 비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9"
              autoFocus
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-signal-red hover:bg-signal-red/90 text-white font-heading"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <Loader2 size={16} className="animate-spin mr-2" />
            ) : null}
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-navy" size={32} />
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md p-8">
          <h1 className="font-heading font-bold text-2xl text-navy mb-3">접근 권한 없음</h1>
          <p className="text-muted-foreground text-sm mb-6">
            관리자 권한이 필요합니다. 관리자에게 문의하세요.
          </p>
          <Link href="/">
            <Button variant="outline" className="font-heading">
              <ArrowLeft size={16} className="mr-2" />
              홈으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 bg-navy text-white flex flex-col transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-white/[0.08] shrink-0">
          {sidebarOpen ? (
            <div className="flex items-center gap-3 w-full">
              <div className="w-8 h-8 bg-white/10 flex items-center justify-center relative shrink-0">
                <span className="font-heading font-bold text-white text-xs">SS</span>
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-signal-red" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-heading font-bold text-sm block">SSLAB Admin</span>
                <span className="text-[10px] text-white/40 tracking-wider">관리자 대시보드</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors hidden lg:block"
              >
                <ChevronLeft size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-full flex justify-center p-1 hover:bg-white/10 rounded transition-colors"
            >
              <Menu size={18} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {adminMenuItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-md text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-signal-red text-white"
                    : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                } ${!sidebarOpen ? "justify-center" : ""}`}
                title={item.label}
              >
                <item.icon size={18} className="shrink-0" />
                {sidebarOpen && <span className="font-heading font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/[0.08] p-3 shrink-0">
          <Link
            href="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-white/40 hover:text-white hover:bg-white/[0.06] text-xs transition-all ${
              !sidebarOpen ? "justify-center" : ""
            }`}
          >
            <ArrowLeft size={14} className="shrink-0" />
            {sidebarOpen && <span>사이트로 돌아가기</span>}
          </Link>
          <button
            onClick={logout}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-white/40 hover:text-signal-red hover:bg-white/[0.06] text-xs transition-all w-full mt-1 ${
              !sidebarOpen ? "justify-center" : ""
            }`}
          >
            <LogOut size={14} className="shrink-0" />
            {sidebarOpen && <span>로그아웃</span>}
          </button>
          {sidebarOpen && (
            <div className="mt-3 px-3">
              <p className="text-white/30 text-[10px] truncate">{user.name || user.email}</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden sticky top-0 z-30 bg-background border-b border-border h-14 flex items-center px-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 hover:bg-muted rounded-md"
          >
            <Menu size={20} />
          </button>
          <span className="font-heading font-semibold text-navy ml-3">SSLAB Admin</span>
        </div>

        <main className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
