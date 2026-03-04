/**
 * Research Page — Geometric Precision Design
 * Detailed research areas with asymmetric layout and geometric accents
 */
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Code2, Shield, Cpu } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const RESEARCH_SYSTEMS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663252472281/cQ26xxngtens5aiY5g678s/research-systems-KGyefWSERQ86gGXpRKY8cn.webp";
const RESEARCH_COMPILER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663252472281/cQ26xxngtens5aiY5g678s/research-compiler-bZfUVTNgJrJSVGoey6HcGS.webp";
const ABOUT_PATTERN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663252472281/cQ26xxngtens5aiY5g678s/about-pattern_12abb75e.png";

const researchDetails = [
  {
    number: "01",
    title: "운영체제",
    titleEn: "Operating Systems",
    icon: Terminal,
    image: RESEARCH_SYSTEMS,
    description:
      "운영체제는 컴퓨터 시스템의 핵심 소프트웨어로, 하드웨어 자원을 효율적으로 관리하고 사용자에게 편리한 인터페이스를 제공합니다. SSLAB에서는 리눅스 커널 최적화, 실시간 스케줄링 알고리즘, 가상화 기술, 컨테이너 기반 격리 기법 등을 연구합니다.",
    topics: [
      "리눅스 커널 성능 최적화",
      "실시간 태스크 스케줄링",
      "컨테이너 및 가상화 기술",
      "메모리 관리 기법",
      "파일 시스템 설계",
    ],
  },
  {
    number: "02",
    title: "컴파일러",
    titleEn: "Compiler Design",
    icon: Code2,
    image: RESEARCH_COMPILER,
    description:
      "컴파일러는 고급 프로그래밍 언어를 기계어로 변환하는 핵심 시스템 소프트웨어입니다. SSLAB에서는 프로그램 분석, 코드 최적화, 정적 분석 기법, 중간 표현(IR) 설계 등 컴파일러 기술 전반을 연구합니다.",
    topics: [
      "정적 프로그램 분석",
      "코드 최적화 기법",
      "LLVM 기반 컴파일러 개발",
      "도메인 특화 언어(DSL) 설계",
      "Just-In-Time 컴파일",
    ],
  },
  {
    number: "03",
    title: "시스템 보안",
    titleEn: "System Security",
    icon: Shield,
    description:
      "시스템 보안은 운영체제와 시스템 소프트웨어 수준에서 발생하는 보안 위협에 대응하는 연구 분야입니다. 메모리 안전성, 커널 취약점 분석, 접근 제어 메커니즘, 하드웨어 기반 보안 기법 등을 연구합니다.",
    topics: [
      "메모리 안전성 보장 기법",
      "커널 취약점 분석 및 방어",
      "하드웨어 기반 보안 (TEE, SGX)",
      "퍼징(Fuzzing) 기반 취약점 탐지",
      "접근 제어 및 격리 기법",
    ],
  },
  {
    number: "04",
    title: "임베디드 시스템",
    titleEn: "Embedded Systems",
    icon: Cpu,
    description:
      "임베디드 시스템은 특정 기능을 수행하도록 설계된 컴퓨터 시스템으로, IoT 디바이스부터 자동차, 의료기기까지 다양한 분야에 적용됩니다. SSLAB에서는 실시간 운영체제, 저전력 컴퓨팅, 엣지 컴퓨팅 등을 연구합니다.",
    topics: [
      "실시간 운영체제 (RTOS)",
      "IoT 디바이스 소프트웨어",
      "저전력 컴퓨팅 최적화",
      "엣지 컴퓨팅 플랫폼",
      "센서 네트워크 시스템",
    ],
  },
];

export default function Research() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-navy py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-56 h-56 border border-white/[0.04] rotate-45" />
        <div className="absolute bottom-10 left-10 w-28 h-28 border border-signal-red/10 -rotate-12" />
        <div className="absolute top-1/2 right-[8%] w-[1px] h-32 bg-signal-red/15" />

        <div className="container relative">
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-5">
              <div className="accent-line" />
              <span className="font-mono text-signal-red text-xs tracking-[0.2em] uppercase">Research</span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="font-heading font-bold text-4xl lg:text-6xl text-white leading-tight mb-5">
              연구 분야
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-white/50 text-lg max-w-2xl leading-relaxed">
              SSLAB은 시스템 소프트웨어의 핵심 분야에서 깊이 있는 연구를 수행합니다.
              운영체제부터 컴파일러, 시스템 보안, 임베디드 시스템까지 폭넓은 연구 영역을 다루고 있습니다.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          <div className="w-1/4 bg-signal-red" />
          <div className="w-1/4 bg-steel-blue" />
          <div className="w-1/4 bg-signal-red/40" />
          <div className="w-1/4 bg-steel-blue/40" />
        </div>
      </section>

      {/* Research Areas Detail */}
      {researchDetails.map((area, idx) => (
        <section
          key={area.number}
          className={`py-24 lg:py-32 relative overflow-hidden ${idx % 2 === 1 ? "bg-muted/30" : ""}`}
        >
          {/* Subtle background pattern for sections without images */}
          {!area.image && (
            <div className="absolute inset-0 opacity-[0.08]">
              <img src={ABOUT_PATTERN} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="container relative">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start`}>
              {/* Content */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={`lg:col-span-7 ${idx % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <motion.div variants={fadeUp} custom={0} className="relative mb-10">
                  <span className="font-heading font-bold text-[7rem] lg:text-[10rem] leading-none text-muted/50 absolute -top-8 -left-2 select-none pointer-events-none">
                    {area.number}
                  </span>
                  <div className="relative z-10 pt-14">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="accent-line" />
                      <span className="font-mono text-signal-red text-xs tracking-[0.2em] uppercase">
                        {area.titleEn}
                      </span>
                    </div>
                    <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy">
                      {area.title}
                    </h2>
                  </div>
                </motion.div>

                <motion.p variants={fadeUp} custom={1} className="text-foreground/70 text-base lg:text-lg leading-relaxed mb-10">
                  {area.description}
                </motion.p>

                <motion.div variants={fadeUp} custom={2}>
                  <h3 className="font-heading font-semibold text-sm text-navy mb-5 tracking-wide uppercase">
                    주요 연구 주제
                  </h3>
                  <ul className="space-y-3">
                    {area.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-3 group">
                        <ArrowRight size={14} className="text-signal-red mt-1 shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span className="text-foreground/70 text-sm">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>

              {/* Image or Geometric Element */}
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" as const }}
                className={`lg:col-span-5 ${idx % 2 === 1 ? "lg:order-1" : ""}`}
              >
                {area.image ? (
                  <div className="relative sticky top-28">
                    <div className="absolute -top-4 -left-4 w-full h-full border-2 border-signal-red/15" />
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full aspect-[4/3] object-cover relative z-10"
                    />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-signal-red z-20 translate-x-2 -translate-y-2" />
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] bg-navy flex items-center justify-center sticky top-28 overflow-hidden">
                    <div className="absolute -top-4 -left-4 w-full h-full border-2 border-signal-red/15" />
                    
                    {/* Geometric composition */}
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-signal-red/10 flex items-center justify-center">
                        <area.icon size={36} className="text-signal-red/60" />
                      </div>
                      <span className="font-heading font-bold text-[6rem] text-white/[0.06]">
                        {area.number}
                      </span>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-8 right-8 w-20 h-20 border border-signal-red/15 rotate-45" />
                    <div className="absolute bottom-8 left-8 w-14 h-14 border border-steel-blue/15 -rotate-12" />
                    <div className="absolute top-1/4 left-1/4 w-[1px] h-16 bg-white/[0.06]" />
                    <div className="absolute bottom-1/3 right-1/3 w-12 h-[1px] bg-white/[0.06]" />
                    
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-signal-red z-20 translate-x-2 -translate-y-2" />
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
