/**
 * Publications Page — Geometric Precision Design
 * Academic papers and publications with year-based grouping and filtering
 * Connected to DB
 */
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { FileText, ExternalLink, Filter, BookOpen } from "lucide-react";
import { trpc } from "@/lib/trpc";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

type PubCategory = "all" | "journal" | "conference" | "workshop" | "thesis" | "other";

const categories: { value: PubCategory; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "journal", label: "저널" },
  { value: "conference", label: "학회" },
  { value: "other", label: "저서" },
];

const categoryColors: Record<string, string> = {
  journal: "bg-signal-red/10 text-signal-red",
  conference: "bg-steel-blue/10 text-steel-blue",
  workshop: "bg-purple-100 text-purple-700",
  thesis: "bg-green-100 text-green-700",
  other: "bg-navy/10 text-navy",
};

const categoryLabels: Record<string, string> = {
  journal: "Journal",
  conference: "Conference",
  workshop: "Workshop",
  thesis: "Thesis",
  other: "Book",
};

export default function Publications() {
  const [filter, setFilter] = useState<PubCategory>("all");
  const pubsQuery = trpc.publications.list.useQuery();

  const publications = useMemo(() => {
    return pubsQuery.data || [];
  }, [pubsQuery.data]);

  const filtered = filter === "all" ? publications : publications.filter((p) => p.category === filter);

  const grouped = filtered.reduce<Record<number, typeof filtered>>((acc, pub) => {
    if (!acc[pub.year]) acc[pub.year] = [];
    acc[pub.year].push(pub);
    return acc;
  }, {});

  const years = Object.keys(grouped).map(Number).sort((a, b) => b - a);

  const totalCount = publications.length;
  const journalCount = publications.filter(p => p.category === "journal").length;
  const bookCount = publications.filter(p => p.category === "other").length;

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

            {/* Stats */}
            {totalCount > 0 && (
              <motion.div variants={fadeUp} custom={3} className="flex gap-8 mt-8">
                <div>
                  <span className="font-heading font-bold text-2xl text-white">{totalCount}</span>
                  <span className="text-white/40 text-sm ml-2">전체</span>
                </div>
                <div>
                  <span className="font-heading font-bold text-2xl text-signal-red">{journalCount}</span>
                  <span className="text-white/40 text-sm ml-2">저널 논문</span>
                </div>
                {bookCount > 0 && (
                  <div>
                    <span className="font-heading font-bold text-2xl text-steel-blue">{bookCount}</span>
                    <span className="text-white/40 text-sm ml-2">저서</span>
                  </div>
                )}
              </motion.div>
            )}
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
          {/* Loading State */}
          {pubsQuery.isLoading && (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-signal-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">출판물 목록을 불러오는 중...</p>
            </div>
          )}

          {/* Empty State */}
          {!pubsQuery.isLoading && publications.length === 0 && (
            <div className="text-center py-20">
              <BookOpen size={48} className="text-muted-foreground/20 mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">아직 등록된 출판물이 없습니다.</p>
              <p className="text-muted-foreground text-xs mt-1">관리자 페이지에서 출판물 정보를 추가해 주세요.</p>
            </div>
          )}

          {/* Filter Tabs */}
          {publications.length > 0 && (
            <>
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={0}
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
                        key={`${pub.title}-${i}`}
                        initial="hidden" whileInView="visible"
                        viewport={{ once: true, margin: "-30px" }}
                        variants={fadeUp} custom={i}
                        className="group relative border border-border bg-white p-6 lg:p-7 hover:border-signal-red/20 transition-all duration-300"
                      >
                        <div className="absolute top-0 left-0 w-0 h-[2px] bg-signal-red group-hover:w-8 transition-all duration-500" />

                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-navy/[0.04] flex items-center justify-center shrink-0 mt-0.5">
                            {pub.category === "other" ? (
                              <BookOpen size={18} className="text-navy/25" />
                            ) : (
                              <FileText size={18} className="text-navy/25" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <h3 className="font-heading font-semibold text-navy text-sm lg:text-base leading-snug">
                                {pub.title}
                              </h3>
                              <span className={`shrink-0 px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase ${categoryColors[pub.category] || categoryColors.other}`}>
                                {categoryLabels[pub.category] || pub.category}
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
            </>
          )}
        </div>
      </section>
    </div>
  );
}
