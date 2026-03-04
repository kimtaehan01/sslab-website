/**
 * Members Page — Geometric Precision Design
 * Professor, graduate students, undergraduate researchers, and alumni
 */
import { motion } from "framer-motion";
import { Mail, GraduationCap, ExternalLink, User, Briefcase } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const ABOUT_PATTERN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663252472281/cQ26xxngtens5aiY5g678s/about-pattern_12abb75e.png";

interface Member {
  name: string;
  role: string;
  research: string;
  email?: string;
}

const professor: Member = {
  name: "지도교수",
  role: "교수 / 연구실 책임자",
  research: "운영체제, 시스템 보안, 컴파일러 최적화",
  email: "sslab@hnu.kr",
};

const gradStudents: Member[] = [
  {
    name: "대학원생 1",
    role: "석사과정",
    research: "리눅스 커널 최적화, 가상화 기술",
  },
  {
    name: "대학원생 2",
    role: "석사과정",
    research: "컴파일러 설계, 정적 분석",
  },
  {
    name: "대학원생 3",
    role: "석사과정",
    research: "시스템 보안, 퍼징 기법",
  },
];

const undergradStudents: Member[] = [
  {
    name: "학부연구생 1",
    role: "학부 4학년",
    research: "임베디드 시스템, IoT",
  },
  {
    name: "학부연구생 2",
    role: "학부 4학년",
    research: "운영체제, 시스템 프로그래밍",
  },
  {
    name: "학부연구생 3",
    role: "학부 3학년",
    research: "컴파일러, 프로그래밍 언어",
  },
  {
    name: "학부연구생 4",
    role: "학부 3학년",
    research: "시스템 보안, 네트워크 보안",
  },
];

const alumni: { name: string; year: string; current: string }[] = [
  { name: "졸업생 1", year: "2024", current: "대기업 시스템 소프트웨어 엔지니어" },
  { name: "졸업생 2", year: "2023", current: "보안 전문 기업 연구원" },
  { name: "졸업생 3", year: "2023", current: "대학원 진학 (석사과정)" },
];

function MemberCard({ member, index, featured = false }: { member: Member; index: number; featured?: boolean }) {
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
      {/* Corner accents on hover */}
      <div className="absolute top-0 left-0 w-0 h-[2px] bg-signal-red group-hover:w-10 transition-all duration-500" />
      <div className="absolute top-0 left-0 w-[2px] h-0 bg-signal-red group-hover:h-10 transition-all duration-500" />

      <div className="flex items-start gap-5">
        {/* Avatar placeholder */}
        <div className={`shrink-0 bg-navy/[0.04] flex items-center justify-center ${featured ? "w-20 h-20" : "w-14 h-14"}`}>
          {featured ? (
            <GraduationCap size={28} className="text-navy/25" />
          ) : (
            <User size={20} className="text-navy/25" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`font-heading font-bold text-navy ${featured ? "text-xl" : "text-base"}`}>
            {member.name}
          </h3>
          <p className="font-mono text-signal-red text-xs tracking-wide mt-1">
            {member.role}
          </p>
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
            {member.research}
          </p>
          {member.email && (
            <a
              href={`mailto:${member.email}`}
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

      {/* Professor */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]">
          <img src={ABOUT_PATTERN} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10"
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-3">
              <div className="accent-line" />
              <span className="font-mono text-signal-red text-xs tracking-[0.2em] uppercase">Professor</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading font-bold text-2xl lg:text-3xl text-navy">
              지도교수
            </motion.h2>
          </motion.div>

          <div className="max-w-2xl">
            <MemberCard member={professor} index={0} featured />
          </div>
        </div>
      </section>

      {/* Graduate Students */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10"
          >
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
              <MemberCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Undergraduate Students */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10"
          >
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
              <MemberCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Alumni */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10"
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-3">
              <div className="accent-line" />
              <span className="font-mono text-signal-red text-xs tracking-[0.2em] uppercase">Alumni</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading font-bold text-2xl lg:text-3xl text-navy">
              졸업생
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alumni.map((alum, i) => (
              <motion.div
                key={alum.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
                className="group border border-border bg-white p-6 hover:border-signal-red/30 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-signal-red group-hover:w-10 transition-all duration-500" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-navy/[0.04] flex items-center justify-center shrink-0">
                    <Briefcase size={18} className="text-navy/25" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-navy text-sm">{alum.name}</h3>
                    <p className="font-mono text-signal-red text-xs mt-1">{alum.year}년 졸업</p>
                    <p className="text-muted-foreground text-xs mt-2 leading-relaxed">{alum.current}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
