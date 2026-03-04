/**
 * Home Page — Geometric Precision Design
 * Neo-Swiss Modernism: asymmetric layouts, bold typography, geometric accents
 * Signal Red (#e63946) accent, Deep Navy (#1a1a2e) text, Steel Blue (#457b9d) secondary
 */
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Users, FlaskConical, Mail, Terminal, Shield, Cpu, Code2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663252472281/cQ26xxngtens5aiY5g678s/hero-bg-CsefW2okNoyUEVZzezFVrF.webp";
const RESEARCH_SYSTEMS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663252472281/cQ26xxngtens5aiY5g678s/research-systems-KGyefWSERQ86gGXpRKY8cn.webp";
const LAB_ENV = "https://d2xsxph8kpxj0f.cloudfront.net/310519663252472281/cQ26xxngtens5aiY5g678s/lab-environment-YpHRZqvbu4ndqUYYe8yf8i.webp";
const ABOUT_PATTERN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663252472281/cQ26xxngtens5aiY5g678s/about-pattern_12abb75e.png";

const researchAreas = [
  {
    title: "운영체제",
    titleEn: "Operating Systems",
    desc: "리눅스 커널 최적화, 실시간 스케줄링, 가상화 기술 등 운영체제 핵심 영역을 연구합니다.",
    icon: Terminal,
    num: "01",
  },
  {
    title: "컴파일러",
    titleEn: "Compiler Design",
    desc: "프로그램 분석, 코드 최적화, 정적 분석 기법 등 컴파일러 기술을 탐구합니다.",
    icon: Code2,
    num: "02",
  },
  {
    title: "시스템 보안",
    titleEn: "System Security",
    desc: "메모리 안전성, 취약점 분석, 보안 강화 기법 등 시스템 수준의 보안을 연구합니다.",
    icon: Shield,
    num: "03",
  },
  {
    title: "임베디드 시스템",
    titleEn: "Embedded Systems",
    desc: "IoT 디바이스, 실시간 시스템, 저전력 컴퓨팅 등 임베디드 환경을 연구합니다.",
    icon: Cpu,
    num: "04",
  },
];

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

const stats = [
  { value: 10, suffix: "+", label: "연구 논문", sublabel: "Published Papers" },
  { value: 15, suffix: "+", label: "연구실 구성원", sublabel: "Lab Members" },
  { value: 5, suffix: "+", label: "진행 프로젝트", sublabel: "Active Projects" },
  { value: 3, suffix: "+", label: "산학 협력", sublabel: "Industry Partners" },
];

export default function Home() {
  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-navy">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={HERO_BG}
            alt=""
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/30" />
        </div>

        {/* Geometric decorations */}
        <div className="absolute top-20 right-[10%] w-72 h-72 border border-white/[0.04] rotate-45" />
        <div className="absolute top-40 right-[15%] w-48 h-48 border border-white/[0.03] rotate-45" />
        <div className="absolute bottom-32 right-[20%] w-32 h-32 border border-signal-red/15 rotate-12" />
        <div className="absolute top-1/3 right-[5%] w-[2px] h-32 bg-signal-red/20" />
        <div className="absolute bottom-1/4 left-[8%] w-16 h-16 border border-steel-blue/10 -rotate-12" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-14 h-[2px] bg-signal-red" />
              <span className="font-mono text-signal-red text-sm tracking-[0.2em] uppercase">
                Hannam University
              </span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="font-heading font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] tracking-tight mb-8"
            >
              System
              <br />
              Software
              <br />
              <span className="text-signal-red italic">Laboratory</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="text-white/55 text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed mb-10"
            >
              한남대학교 컴퓨터공학과 시스템 소프트웨어 연구실에서는
              운영체제, 컴파일러, 시스템 보안 등 핵심 시스템 소프트웨어 분야의
              최첨단 연구를 수행하고 있습니다.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/research"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-signal-red text-white font-heading font-medium text-sm tracking-wide hover:bg-signal-red/90 transition-all duration-300"
              >
                연구 분야 보기
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white/80 font-heading font-medium text-sm tracking-wide hover:bg-white/5 hover:border-white/30 transition-all duration-300"
              >
                연락하기
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom geometric bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          <div className="w-1/4 bg-signal-red" />
          <div className="w-1/4 bg-steel-blue" />
          <div className="w-1/4 bg-signal-red/40" />
          <div className="w-1/4 bg-steel-blue/40" />
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-white border-b border-border relative">
        <div className="container py-10 lg:py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
                className="relative"
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-heading font-bold text-4xl lg:text-5xl text-navy">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
                <p className="text-foreground font-medium text-sm mt-2">{stat.label}</p>
                <p className="text-muted-foreground text-xs font-mono tracking-wide">{stat.sublabel}</p>
                {/* Divider line on right for non-last items */}
                {i < stats.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.15]">
          <img src={ABOUT_PATTERN} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-7"
            >
              <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-5">
                <div className="accent-line" />
                <span className="font-mono text-signal-red text-xs tracking-[0.2em] uppercase">About SSLAB</span>
              </motion.div>

              <motion.h2 variants={fadeUp} custom={1} className="font-heading font-bold text-3xl lg:text-5xl text-navy leading-[1.15] mb-7">
                시스템의 본질을
                <br />
                탐구합니다
              </motion.h2>

              <motion.div variants={fadeUp} custom={2} className="space-y-5 mb-8">
                <p className="text-foreground/70 text-base lg:text-lg leading-relaxed">
                  SSLAB은 한남대학교 컴퓨터공학과에 소속된 시스템 소프트웨어 연구실입니다.
                  우리는 컴퓨터 시스템의 가장 근본적인 계층인 운영체제, 컴파일러, 시스템 보안 분야에서
                  혁신적인 연구를 수행하고 있습니다.
                </p>
                <p className="text-foreground/70 text-base lg:text-lg leading-relaxed">
                  학부생과 대학원생이 함께 협력하며, 이론적 깊이와 실용적 구현 능력을 동시에 갖춘
                  시스템 소프트웨어 전문가를 양성하는 것을 목표로 합니다.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} custom={3}>
                <Link
                  href="/members"
                  className="group inline-flex items-center gap-2 text-signal-red font-heading font-medium text-sm hover:gap-3 transition-all duration-300"
                >
                  구성원 보기 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
              className="lg:col-span-5 relative"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-signal-red/20" />
                <img
                  src={LAB_ENV}
                  alt="SSLAB 연구 환경"
                  className="w-full aspect-[4/3] object-cover relative z-10"
                />
                <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-signal-red/10 z-0" />
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-signal-red z-20 translate-x-2 -translate-y-2" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== RESEARCH AREAS ===== */}
      <section className="py-24 lg:py-32 bg-navy relative overflow-hidden">
        {/* Geometric decorations */}
        <div className="absolute top-10 left-10 w-56 h-56 border border-white/[0.04] rotate-45" />
        <div className="absolute bottom-10 right-10 w-40 h-40 border border-white/[0.04] -rotate-12" />
        <div className="absolute top-1/2 right-[5%] w-[1px] h-48 bg-signal-red/10" />

        <div className="container relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-14 lg:mb-20"
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-5">
              <div className="accent-line" />
              <span className="font-mono text-signal-red text-xs tracking-[0.2em] uppercase">Research Areas</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading font-bold text-3xl lg:text-5xl text-white leading-tight">
              연구 분야
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {researchAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
                className="group relative bg-white/[0.03] border border-white/[0.08] p-8 lg:p-10 hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500"
              >
                {/* Corner accents on hover */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-signal-red group-hover:w-12 transition-all duration-500" />
                <div className="absolute top-0 left-0 w-[2px] h-0 bg-signal-red group-hover:h-12 transition-all duration-500" />

                <span className="font-heading font-bold text-6xl text-white/[0.04] absolute top-4 right-6 group-hover:text-signal-red/15 transition-colors duration-500">
                  {area.num}
                </span>
                
                <div className="w-10 h-10 bg-signal-red/10 flex items-center justify-center mb-5 group-hover:bg-signal-red/20 transition-colors duration-300">
                  <area.icon size={20} className="text-signal-red" />
                </div>

                <h3 className="font-heading font-bold text-xl text-white mb-1 relative z-10">
                  {area.title}
                </h3>
                <p className="font-mono text-signal-red/70 text-xs mb-4 tracking-wide">
                  {area.titleEn}
                </p>
                <p className="text-white/50 text-sm leading-relaxed relative z-10">
                  {area.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="mt-12 text-center"
          >
            <Link
              href="/research"
              className="group inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white/80 font-heading font-medium text-sm tracking-wide hover:bg-white/5 hover:border-white/30 transition-all duration-300"
            >
              연구 분야 자세히 보기 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED IMAGE SECTION ===== */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
              className="lg:col-span-6"
            >
              <div className="relative">
                <img
                  src={RESEARCH_SYSTEMS}
                  alt="시스템 소프트웨어 아키텍처"
                  className="w-full aspect-video object-cover"
                />
                {/* Decorative corner */}
                <div className="absolute -bottom-3 -right-3 w-full h-full border border-steel-blue/20 -z-10" />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-6 lg:pl-4"
            >
              <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-5">
                <div className="accent-line" />
                <span className="font-mono text-signal-red text-xs tracking-[0.2em] uppercase">Our Approach</span>
              </motion.div>

              <motion.h2 variants={fadeUp} custom={1} className="font-heading font-bold text-3xl lg:text-4xl text-navy leading-tight mb-7">
                이론과 실제의
                <br />
                균형 잡힌 연구
              </motion.h2>

              <motion.p variants={fadeUp} custom={2} className="text-foreground/70 text-base leading-relaxed mb-8">
                SSLAB에서는 학술 논문 발표뿐만 아니라 실제 시스템에 적용 가능한 기술 개발을 중시합니다.
                오픈소스 프로젝트 기여, 산학 협력 프로젝트, 그리고 학생 주도의 연구를 통해
                실질적인 영향력을 만들어 갑니다.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="space-y-4">
                {[
                  { icon: BookOpen, text: "학술 논문 및 학회 발표", sub: "국내외 학술지 및 학회에 연구 성과 발표" },
                  { icon: FlaskConical, text: "오픈소스 프로젝트 기여", sub: "리눅스 커널 등 주요 오픈소스에 기여" },
                  { icon: Users, text: "산학 협력 연구", sub: "기업과의 공동 연구 및 기술 이전" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-signal-red/10 flex items-center justify-center shrink-0 group-hover:bg-signal-red/20 transition-colors">
                      <item.icon size={18} className="text-signal-red" />
                    </div>
                    <div>
                      <span className="text-foreground/90 text-sm font-heading font-medium block">{item.text}</span>
                      <span className="text-muted-foreground text-xs">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 lg:py-32 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }} />
        </div>
        
        {/* Geometric accent */}
        <div className="absolute top-1/2 left-[5%] -translate-y-1/2 w-32 h-32 border border-signal-red/10 rotate-45" />
        <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-24 h-24 border border-steel-blue/10 -rotate-12" />

        <div className="container relative text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-heading font-bold text-3xl lg:text-5xl text-white mb-5">
              함께 연구할 동료를 찾습니다
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-white/50 text-lg max-w-xl mx-auto mb-10">
              시스템 소프트웨어에 관심이 있는 학부생, 대학원생의 참여를 환영합니다.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-signal-red text-white font-heading font-medium text-sm tracking-wide hover:bg-signal-red/90 transition-all duration-300"
              >
                <Mail size={16} />
                연락하기
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/members"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white/80 font-heading font-medium text-sm tracking-wide hover:bg-white/5 hover:border-white/30 transition-all duration-300"
              >
                구성원 보기
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
