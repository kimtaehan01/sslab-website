/**
 * 404 Not Found — Geometric Precision Design
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Background number */}
      <span className="absolute font-heading font-bold text-[20rem] lg:text-[30rem] text-navy/[0.03] select-none pointer-events-none leading-none">
        404
      </span>

      <div className="container relative text-center">
        <div className="w-14 h-[2px] bg-signal-red mx-auto mb-6" />
        <h1 className="font-heading font-bold text-6xl lg:text-8xl text-navy mb-4">404</h1>
        <p className="font-mono text-signal-red text-xs tracking-[0.2em] uppercase mb-4">Page Not Found</p>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8 leading-relaxed">
          요청하신 페이지를 찾을 수 없습니다. 주소를 다시 확인하시거나, 아래 버튼을 통해 홈으로 이동해 주세요.
        </p>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 px-7 py-3 bg-navy text-white font-heading font-medium text-sm tracking-wide hover:bg-navy/90 transition-colors"
        >
          홈으로 돌아가기
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
