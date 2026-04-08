/**
 * Contact Page — Geometric Precision Design
 * Lab contact info, location, and how to join
 */
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Building, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const ABOUT_PATTERN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663252472281/cQ26xxngtens5aiY5g678s/about-pattern_12abb75e.png";

const contactInfo = [
  {
    icon: Mail,
    label: "이메일",
    value: "sslab@hnu.kr",
    href: "mailto:sslab@hnu.kr",
  },
  {
    icon: MapPin,
    label: "주소",
    value: "대전광역시 대덕구 한남로 70\n한남대학교 공학관",
  },
  {
    icon: Phone,
    label: "전화",
    value: "042-629-XXXX",
  },
  {
    icon: Clock,
    label: "운영 시간",
    value: "월 - 금, 09:00 - 18:00",
  },
];

export default function Contact() {
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
              <span className="font-mono text-signal-red text-xs tracking-[0.2em] uppercase">Contact</span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="font-heading font-bold text-4xl lg:text-6xl text-white leading-tight mb-5">
              연락처
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-white/50 text-lg max-w-2xl leading-relaxed">
              SSLAB에 관심이 있으시다면 언제든지 연락해 주세요.
              연구실 방문도 환영합니다.
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

      {/* Contact Info + Map */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]">
          <img src={ABOUT_PATTERN} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact Details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <motion.div variants={fadeUp} custom={0} className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="accent-line" />
                  <span className="font-mono text-signal-red text-xs tracking-[0.2em] uppercase">Get in Touch</span>
                </div>
                <h2 className="font-heading font-bold text-2xl lg:text-3xl text-navy">
                  연구실 정보
                </h2>
              </motion.div>

              <div className="space-y-7">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    custom={i + 1}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-navy/[0.04] flex items-center justify-center shrink-0 group-hover:bg-signal-red/10 transition-colors duration-300">
                      <item.icon size={20} className="text-signal-red" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-navy text-sm">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-foreground/70 text-sm hover:text-signal-red transition-colors whitespace-pre-line mt-1 block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground/70 text-sm whitespace-pre-line mt-1">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Affiliation */}
              <motion.div variants={fadeUp} custom={5} className="mt-10 p-7 border border-border bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <Building size={18} className="text-navy/40" />
                  <h3 className="font-heading font-semibold text-navy text-sm">소속</h3>
                </div>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  한남대학교 공과대학 컴퓨터공학과
                  <br />
                  <span className="font-mono text-xs text-muted-foreground mt-1 block">
                    Department of Computer Engineering, Hannam University
                  </span>
                </p>
              </motion.div>
            </motion.div>

            {/* Map Area */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
              className="lg:col-span-7"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-signal-red/15" />
                <div className="relative z-10 bg-navy/[0.04] aspect-[4/3] overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3213.8!2d127.4219!3d36.3544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35654955f1e2c1e1%3A0x1c3f3b3b3b3b3b3b!2z7ZWc64Ko64yA7ZWZ6rWQ!5e0!3m2!1sko!2skr!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="한남대학교 위치"
                    className="absolute inset-0 w-full h-full"
                  />
                  {/* Fallback */}
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-navy/20">
                    <MapPin size={48} />
                    <span className="font-heading text-sm">한남대학교</span>
                    <span className="font-mono text-xs">대전광역시 대덕구 한남로 70</span>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-signal-red z-20 translate-x-2 -translate-y-2" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-24 lg:py-32 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }} />
        </div>
        
        <div className="absolute top-1/2 left-[5%] -translate-y-1/2 w-32 h-32 border border-signal-red/10 rotate-45" />

        <div className="container relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-5">
              <div className="accent-line" />
              <span className="font-mono text-signal-red text-xs tracking-[0.2em] uppercase">Join Us</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading font-bold text-3xl lg:text-4xl text-white mb-6">
              SSLAB에 합류하세요
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/50 text-lg max-w-2xl mb-12 leading-relaxed">
              시스템 소프트웨어에 관심이 있는 학부생, 대학원 진학 희망자의 지원을 환영합니다.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "관심 분야 탐색",
                desc: "SSLAB의 연구 분야를 살펴보고, 본인의 관심사와 맞는 주제를 찾아보세요.",
              },
              {
                step: "02",
                title: "이메일 문의",
                desc: "간단한 자기소개와 관심 연구 분야를 포함하여 jhjang@hnu.kr로 이메일을 보내주세요.",
              },
              {
                step: "03",
                title: "연구실 방문",
                desc: "교수님과의 면담을 통해 연구 방향을 논의하고, 연구실 환경을 직접 확인해 보세요.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
                className="group relative bg-white/[0.03] border border-white/[0.08] p-8 lg:p-10 hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500"
              >
                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-signal-red group-hover:w-10 transition-all duration-500" />
                <div className="absolute top-0 left-0 w-[2px] h-0 bg-signal-red group-hover:h-10 transition-all duration-500" />

                <span className="font-heading font-bold text-5xl text-white/[0.04] absolute top-4 right-6 group-hover:text-signal-red/15 transition-colors duration-500">
                  {item.step}
                </span>
                <div className="w-8 h-[2px] bg-signal-red mb-5" />
                <h3 className="font-heading font-bold text-white text-lg mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
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
            <a
              href="mailto:jhjang@hnu.kr"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-signal-red text-white font-heading font-medium text-sm tracking-wide hover:bg-signal-red/90 transition-all duration-300"
            >
              <Mail size={16} />
              이메일 보내기
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
