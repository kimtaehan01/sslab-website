/**
 * Publications Page — Geometric Precision Design
 * Academic papers and publications with year-based grouping and filtering
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { FileText, ExternalLink, Filter } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

type PubCategory = "all" | "journal" | "conference" | "domestic";

interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  category: Exclude<PubCategory, "all">;
  link?: string;
}

const publications: Publication[] = [
  {
    title: "Efficient Memory Management for Real-Time Container Orchestration",
    authors: "SSLAB Members",
    venue: "IEEE Transactions on Computers",
    year: 2025,
    category: "journal",
  },
  {
    title: "A Static Analysis Framework for Detecting Kernel Vulnerabilities",
    authors: "SSLAB Members",
    venue: "ACM SIGOPS Operating Systems Review",
    year: 2025,
    category: "journal",
  },
  {
    title: "Optimizing JIT Compilation for Edge Computing Platforms",
    authors: "SSLAB Members",
    venue: "International Conference on Compilers, Architecture, and Synthesis for Embedded Systems (CASES)",
    year: 2024,
    category: "conference",
  },
  {
    title: "Lightweight Virtualization for IoT: A Performance Study",
    authors: "SSLAB Members",
    venue: "USENIX Annual Technical Conference (ATC)",
    year: 2024,
    category: "conference",
  },
  {
    title: "Fuzzing-based Security Testing for Embedded RTOS",
    authors: "SSLAB Members",
    venue: "IEEE Symposium on Security and Privacy (S&P)",
    year: 2024,
    category: "conference",
  },
  {
    title: "리눅스 커널 스케줄러 성능 분석 및 최적화 기법 연구",
    authors: "SSLAB Members",
    venue: "한국정보과학회 학술발표논문집",
    year: 2024,
    category: "domestic",
  },
  {
    title: "컨테이너 기반 엣지 컴퓨팅 환경에서의 자원 관리 기법",
    authors: "SSLAB Members",
    venue: "한국정보처리학회 추계학술발표대회",
    year: 2023,
    category: "domestic",
  },
  {
    title: "Hardware-Assisted Memory Safety for System Software",
    authors: "SSLAB Members",
    venue: "ACM Conference on Computer and Communications Security (CCS)",
    year: 2023,
    category: "conference",
  },
  {
    title: "정적 분석 기반 커널 취약점 탐지 프레임워크",
    authors: "SSLAB Members",
    venue: "한국소프트웨어공학회 학술대회",
    year: 2023,
    category: "domestic",
  },
];

const categories: { value: PubCategory; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "journal", label: "저널" },
  { value: "conference", label: "국제 학회" },
  { value: "domestic", label: "국내 학회" },
];

const categoryColors: Record<Exclude<PubCategory, "all">, string> = {
  journal: "bg-signal-red/10 text-signal-red",
  conference: "bg-steel-blue/10 text-steel-blue",
  domestic: "bg-navy/10 text-navy",
};

const categoryLabels: Record<Exclude<PubCategory, "all">, string> = {
  journal: "Journal",
  conference: "Conference",
  domestic: "Domestic",
};

export default function Publications() {
  const [filter, setFilter] = useState<PubCategory>("all");

  const filtered = filter === "all" ? publications : publications.filter((p) => p.category === filter);

  const grouped = filtered.reduce<Record<number, Publication[]>>((acc, pub) => {
    if (!acc[pub.year]) acc[pub.year] = [];
    acc[pub.year].push(pub);
    return acc;
  }, {});

  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div>
      {/* Page Header */}
      <section className="bg-navy py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-56 h-56 border border-white/[0.04] rotate-45" />
        <div className="absolute top-1/2 right-[8%] w-[1px] h-32 bg-signal-red/15" />

        <div className="container relative">
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-5">
              <div className="accent-line" />
              <span className="font-mono text-signal-red text-xs tracking-[0.2em] uppercase">Publications</span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="font-heading font-bold text-4xl lg:text-6xl text-white leading-tight mb-5">
              출판물
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-white/50 text-lg max-w-2xl leading-relaxed">
              SSLAB에서 발표한 학술 논문 및 연구 성과물 목록입니다.
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

      {/* Filter & List */}
      <section className="py-20 lg:py-28">
        <div className="container">
          {/* Filter Tabs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="flex items-center gap-2 mb-14 flex-wrap"
          >
            <Filter size={16} className="text-muted-foreground mr-2" />
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-5 py-2.5 font-heading text-sm font-medium tracking-wide transition-all duration-300 border ${
                  filter === cat.value
                    ? "bg-navy text-white border-navy"
                    : "bg-transparent text-foreground/60 border-border hover:border-navy/30 hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Publications by Year */}
          {years.map((year) => (
            <div key={year} className="mb-14 last:mb-0">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-heading font-bold text-5xl lg:text-6xl text-navy/[0.08] select-none">{year}</span>
                <div className="flex-1 h-[1px] bg-border" />
                <span className="font-mono text-xs text-muted-foreground tracking-wide">
                  {grouped[year].length} papers
                </span>
              </div>

              <div className="space-y-4">
                {grouped[year].map((pub, i) => (
                  <motion.div
                    key={pub.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-30px" }}
                    variants={fadeUp}
                    custom={i}
                    className="group relative border border-border bg-white p-6 lg:p-7 hover:border-signal-red/20 transition-all duration-300"
                  >
                    {/* Corner accent */}
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-signal-red group-hover:w-8 transition-all duration-500" />

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-navy/[0.04] flex items-center justify-center shrink-0 mt-0.5">
                        <FileText size={18} className="text-navy/25" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-heading font-semibold text-navy text-sm lg:text-base leading-snug">
                            {pub.title}
                          </h3>
                          <span className={`shrink-0 px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase ${categoryColors[pub.category]}`}>
                            {categoryLabels[pub.category]}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-xs mt-2">{pub.authors}</p>
                        <p className="text-foreground/50 text-xs mt-1 italic">{pub.venue}</p>
                        {pub.link && (
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-steel-blue text-xs mt-3 hover:text-signal-red transition-colors"
                          >
                            <ExternalLink size={10} />
                            Paper Link
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <FileText size={48} className="text-muted-foreground/20 mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">해당 카테고리의 출판물이 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
