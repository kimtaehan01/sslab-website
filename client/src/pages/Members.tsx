/**
 * Members Page — Geometric Precision Design
 * Professor, graduate students, undergraduate researchers, and alumni
 * Connected to DB
 */
import { motion } from "framer-motion";
import { Mail, GraduationCap, User, Briefcase } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useMemo } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const ABOUT_PATTERN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663252472281/cQ26xxngtens5aiY5g678s/about-pattern_12abb75e.png";

interface MemberData {
  id?: number;
  name: string;
  nameEn?: string | null;
  role: string;
  research?: string | null;
  email?: string | null;
  imageUrl?: string | null;
}

function MemberCard({ member, index, featured = false }: { member: MemberData; index: number; featured?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
      custom={index}
      className={`group relative border border-border bg-white hover:border-signal-red/30 transition-all duration-300 ${
        featured ? "p-8 lg:p-10" : "p-6 lg:p-7"
      }`}
    >
      <div className="absolute top-0 left-0 w-0 h-[2px] bg-signal-red group-hover:w-10 transition-all duration-500" />
      <div className="absolute top-0 left-0 w-[2px] h-0 bg-signal-red group-hover:h-10 transition-all duration-500" />

      <div className="flex items-start gap-5">
        <div className={`shrink-0 bg-navy/[0.04] flex items-center justify-center overflow-hidden ${featured ? "w-20 h-20" : "w-14 h-14"}`}>
          {member.imageUrl ? (
            <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
          ) : featured ? (
            <GraduationCap size={28} className="text-navy/25" />
          ) : (
            <User size={20} className="text-navy/25" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`font-heading font-bold text-navy ${featured ? "text-xl" : "text-base"}`}>
            {member.name}
            {member.nameEn && (
              <span className="text-muted-foreground font-normal text-sm ml-2">{member.nameEn}</span>
            )}
          </h3>
          <p className="font-mono text-signal-red text-xs tracking-wide mt-1">{member.role}</p>
          {member.research && (
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{member.research}</p>
          )}
          {member.email && (
            <a href={`mailto:${member.email}`}
              className="inline-flex items-center gap-1.5 text-steel-blue text-xs mt-3 hover:text-signal-red transition-colors"
            >
              <Mail size={12} />
              {member.email}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Members() {
  const membersQuery = trpc.members.list.useQuery();

  const { professors, gradStudents, undergradStudents, alumni, hasData, isLoading } = useMemo(() => {
    const isLoading = membersQuery.isLoading;
    const data = membersQuery.data || [];
    const hasData = data.length > 0;

    return {
      professors: data.filter(m => m.category === "professor"),
      gradStudents: data.filter(m => m.category === "graduate"),
      undergradStudents: data.filter(m => m.category === "undergraduate"),
      alumni: data.filter(m => m.category === "alumni"),
      hasData,
      isLoading,
    };
  }, [membersQuery.data, membersQuery.isLoading]);

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
              <span className="font-mono text-signal-red text-xs tracking-[0.2em] uppercase">Members</span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="font-heading font-bold text-4xl lg:text-6xl text-white leading-tight mb-5">
              구성원
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-white/50 text-lg max-w-2xl leading-relaxed">
              SSLAB의 교수진, 대학원생, 학부연구생을 소개합니다.
              함께 시스템 소프트웨어의 미래를 만들어 가고 있습니다.
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

      {/* Loading State */}
      {isLoading && (
        <section className="py-20">
          <div className="container text-center">
            <div className="w-8 h-8 border-2 border-signal-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">구성원 정보를 불러오는 중...</p>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!isLoading && !hasData && (
        <section className="py-20">
          <div className="container text-center">
            <User size={48} className="text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">아직 등록된 구성원이 없습니다.</p>
            <p className="text-muted-foreground text-xs mt-1">관리자 페이지에서 구성원 정보를 추가해 주세요.</p>
          </div>
        </section>
      )}

      {/* Professor */}
      {professors.length > 0 && (
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.08]">
            <img src={ABOUT_PATTERN} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="container relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
              <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-3">
                <div className="accent-line" />
                <span className="font-mono text-signal-red text-xs tracking-[0.2em] uppercase">Professor</span>
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="font-heading font-bold text-2xl lg:text-3xl text-navy">
                지도교수
              </motion.h2>
            </motion.div>

            <div className="max-w-2xl">
              {professors.map((prof, i) => (
                <MemberCard key={prof.id || prof.name} member={prof} index={i} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Graduate Students */}
      {gradStudents.length > 0 && (
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
              <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-3">
                <div className="accent-line" />
                <span className="font-mono text-signal-red text-xs tracking-[0.2em] uppercase">Graduate Students</span>
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="font-heading font-bold text-2xl lg:text-3xl text-navy">
                대학원생
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gradStudents.map((member, i) => (
                <MemberCard key={member.id || member.name} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Undergraduate Students */}
      {undergradStudents.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
              <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-3">
                <div className="accent-line" />
                <span className="font-mono text-signal-red text-xs tracking-[0.2em] uppercase">Undergraduate Researchers</span>
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="font-heading font-bold text-2xl lg:text-3xl text-navy">
                학부연구생
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {undergradStudents.map((member, i) => (
                <MemberCard key={member.id || member.name} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Alumni */}
      {alumni.length > 0 && (
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
              <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-3">
                <div className="accent-line" />
                <span className="font-mono text-signal-red text-xs tracking-[0.2em] uppercase">Alumni</span>
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="font-heading font-bold text-2xl lg:text-3xl text-navy">
                졸업생
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {alumni.map((alum: any, i: number) => (
                <motion.div
                  key={alum.id || alum.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i}
                  className="group relative border border-border bg-white p-6 hover:border-signal-red/30 transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-signal-red group-hover:w-10 transition-all duration-500" />
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-navy/[0.04] flex items-center justify-center shrink-0">
                      <Briefcase size={18} className="text-navy/25" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-navy text-sm">{alum.name}</h3>
                      <p className="font-mono text-signal-red text-xs mt-1">
                        {alum.graduationYear}년 졸업
                      </p>
                      <p className="text-muted-foreground text-xs mt-2 leading-relaxed">
                        {alum.currentPosition}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
