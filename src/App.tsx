import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  BookOpen,
  Compass,
  Crown,
  Feather,
  Globe2,
  Menu,
  MoveUpRight,
  ScrollText,
  Shield,
  Sparkles,
  X,
} from "lucide-react";

type Campaign = {
  year: string;
  title: string;
  location: string;
  category: string;
  result: string;
  description: string;
  image: string;
  number: string;
};

const campaigns: Campaign[] = [
  {
    year: "1805",
    title: "Austerlitz",
    location: "Moravia · Present-day Czechia",
    category: "Victory",
    result: "Decisive victory",
    description:
      "The Battle of the Three Emperors. Napoleon defeated the combined Russian and Austrian armies through maneuver, timing, and a carefully exploited weakness.",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=85",
    number: "01",
  },
  {
    year: "1806",
    title: "Jena–Auerstedt",
    location: "Prussia · Germany",
    category: "Victory",
    result: "Prussian defeat",
    description:
      "A rapid campaign that shattered Prussian resistance and demonstrated the speed and flexibility of the French army.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
    number: "02",
  },
  {
    year: "1812",
    title: "The Russian Campaign",
    location: "Russian Empire",
    category: "Defeat",
    result: "Strategic disaster",
    description:
      "The invasion reached Moscow, but distance, logistics, weather, and Russian resistance turned the campaign into a catastrophe for the Grande Armée.",
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=85",
    number: "03",
  },
  {
    year: "1815",
    title: "Waterloo",
    location: "Near Brussels · Belgium",
    category: "Defeat",
    result: "Final defeat",
    description:
      "Napoleon's return ended at Waterloo, where coalition forces defeated the French army and closed the chapter of the Hundred Days.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
    number: "04",
  },
];

const timeline = [
  {
    year: "1769",
    title: "The Beginning",
    text: "Born in Ajaccio, Corsica, shortly after the island came under French control.",
    type: "ORIGINS",
  },
  {
    year: "1799",
    title: "The Coup of 18 Brumaire",
    text: "A political coup brought Napoleon to power as First Consul of France.",
    type: "ASCENSION",
  },
  {
    year: "1804",
    title: "The Crown",
    text: "Napoleon crowned himself Emperor of the French in Notre-Dame Cathedral, Paris.",
    type: "EMPIRE",
  },
  {
    year: "1805",
    title: "Austerlitz",
    text: "One of his most celebrated victories against the Third Coalition.",
    type: "TRIUMPH",
  },
  {
    year: "1812",
    title: "The Turning Point",
    text: "The Russian campaign devastated the Grande Armée and weakened imperial power.",
    type: "DECLINE",
  },
  {
    year: "1815",
    title: "The Final Chapter",
    text: "Defeated at Waterloo, Napoleon was exiled to Saint Helena.",
    type: "EXILE",
  },
];

const portrait =
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/David_-_Napoleon_crossing_the_Alps_-_Malmaison1.jpg/960px-David_-_Napoleon_crossing_the_Alps_-_Malmaison1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail";

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduced ? 0 : 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mono flex items-center gap-3 text-[10px] tracking-[.28em] text-[#c8a76b]">
      <span className="h-px w-8 bg-[#c8a76b]" />
      {children}
    </div>
  );
}

function App() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Campaign | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredCampaigns =
    filter === "All"
      ? campaigns
      : campaigns.filter((campaign) => campaign.category === filter);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="grain min-h-screen overflow-hidden bg-[#11100e] text-[#eee5d2]">
      {/* Navigation */}
      <header className="relative z-30 border-b border-[#c8a76b25]">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
          {/** biome-ignore lint/a11y/useValidAnchor: - */}
          <a
            // type="button"
            href="#home"
            className="group flex items-center gap-3"
            onClick={closeMenu}
          >
            <div className="flex h-10 w-10 items-center justify-center border border-[#c8a76b80] text-[#c8a76b] transition duration-500 group-hover:rotate-45 group-hover:bg-[#c8a76b] group-hover:text-[#11100e]">
              <Crown size={20} strokeWidth={1.3} />
            </div>
            <div>
              <p className="serif text-xl leading-none tracking-[.08em]">
                IMPERIUM
              </p>
              <p className="mono mt-1 text-[8px] tracking-[.26em] text-[#a99a80]">
                THE NAPOLEON ARCHIVE
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {[
              ["The Emperor", "#home"],
              ["Campaigns", "#campaigns"],
              ["Chronicle", "#chronicle"],
              ["Legacy", "#legacy"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="mono text-[10px] tracking-[.12em] text-[#bdb29f] transition-colors hover:text-[#d6b77d]"
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#chronicle"
            className="hidden items-center gap-2 border border-[#c8a76b55] px-4 py-3 text-[10px] tracking-[.12em] transition duration-300 hover:border-[#c8a76b] hover:bg-[#c8a76b] hover:text-[#11100e] md:flex"
          >
            OPEN THE ARCHIVE <ArrowUpRight size={13} />
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="border border-[#c8a76b40] p-3 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-[#c8a76b25] bg-[#171512] md:hidden"
            >
              {[
                ["The Emperor", "#home"],
                ["Campaigns", "#campaigns"],
                ["Chronicle", "#chronicle"],
                ["Legacy", "#legacy"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  className="mono flex items-center justify-between border-b border-[#c8a76b15] px-6 py-4 text-xs tracking-widest hover:bg-[#c8a76b10]"
                >
                  {label}
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative mx-auto min-h-[720px] max-w-[1440px] scroll-mt-10 px-5 sm:px-8 lg:min-h-[760px] lg:px-14"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute right-[-8%] top-[8%] h-[650px] w-[650px] rounded-full border border-[#c8a76b12]" />
          <div className="absolute right-[-2%] top-[14%] h-[540px] w-[540px] rounded-full border border-dashed border-[#c8a76b18]" />
          <div className="absolute right-[8%] top-[23%] h-[400px] w-[400px] rounded-full border border-[#c8a76b12]" />
          <div className="map-grid absolute inset-0 opacity-30 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
        </div>

        <div className="relative grid min-h-[720px] items-center lg:min-h-[760px] lg:grid-cols-[1.02fr_.98fr]">
          <div className="relative z-10 pb-12 pt-16 lg:py-20">
            <Reveal>
              <div className="mono mb-9 flex items-center gap-3 text-[9px] tracking-[.26em] text-[#c8a76b] sm:text-[10px]">
                <span className="h-2 w-2 rotate-45 bg-[#c8a76b]" />A STUDY OF
                POWER, AMBITION & HISTORY
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="serif max-w-[720px] text-[clamp(4.4rem,10vw,9rem)] leading-[.78] tracking-[-.065em]">
                The
                <br />
                <span className="italic text-[#c8a76b]">Emperor</span>
                <br />
                <span className="ml-[.1em]">of France.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="my-9 flex items-center gap-4">
                <div className="gold-line w-16" />
                <span className="mono text-[9px] tracking-[.3em] text-[#b1a58f]">
                  NAPOLÉON BONAPARTE · 1769—1821
                </span>
              </div>

              <p className="max-w-[440px] text-sm leading-7 text-[#bdb4a4] sm:text-base sm:leading-8">
                From a Corsican artillery officer to the architect of an empire.
                Explore the victories, contradictions, and ambition that
                reshaped Europe.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#chronicle"
                  className="group flex items-center gap-4 bg-[#c8a76b] px-6 py-4 text-[10px] font-bold tracking-[.12em] text-[#17130d] transition duration-300 hover:bg-[#ead4a5]"
                >
                  EXPLORE HIS STORY
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
                <a
                  href="#campaigns"
                  className="flex items-center gap-3 border border-[#c8a76b35] px-5 py-4 text-[10px] tracking-[.1em] transition hover:border-[#c8a76b] hover:bg-white/[.03]"
                >
                  <Compass size={14} className="text-[#c8a76b]" />
                  THE CAMPAIGNS
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-16 grid max-w-[440px] grid-cols-3 border-t border-[#c8a76b35] pt-5">
                {[
                  ["1769", "YEAR OF BIRTH"],
                  ["1804", "CROWNED EMPEROR"],
                  ["1815", "WATERLOO"],
                ].map(([number, label]) => (
                  <div
                    key={label}
                    className="border-r border-[#c8a76b25] pl-3 first:pl-0 last:border-0"
                  >
                    <p className="serif text-3xl text-[#e7d6b5]">{number}</p>
                    <p className="mono mt-2 text-[8px] leading-4 tracking-[.1em] text-[#928775]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Portrait composition */}
          <div className="relative mx-auto flex h-[510px] w-full max-w-[550px] items-center justify-center lg:h-[690px]">
            <div className="absolute right-[4%] top-[9%] h-[78%] w-[76%] border border-[#c8a76b35]" />
            <div className="absolute right-[9%] top-[13%] h-[72%] w-[70%] border border-[#c8a76b20]" />

            <motion.div
              className="absolute right-[9%] top-[8%] h-[85%] w-[79%] overflow-hidden bg-[#2b251d]"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
            >
              <img
                src={portrait}
                alt="Napoleon Bonaparte in Jacques-Louis David's equestrian portrait"
                className="hero-image h-full w-full object-cover object-[52%_center] transition duration-[1200ms] hover:scale-[1.045]"
                onError={(event) => {
                  event.currentTarget.style.opacity = "0";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11100e] via-transparent to-[#11100e20]" />
              <div className="absolute inset-0 bg-[#9b7845]/10 mix-blend-color" />
            </motion.div>

            <div className="absolute bottom-[11%] left-[1%] z-10 border-l-2 border-[#c8a76b] bg-[#11100e]/90 py-3 pl-4 pr-7 backdrop-blur-sm">
              <p className="mono text-[8px] tracking-[.24em] text-[#c8a76b]">
                FIGURE NO. 001
              </p>
              <p className="serif mt-1 text-2xl italic">Napoleon I</p>
              <p className="mt-1 text-[9px] text-[#a69a86]">
                Emperor of the French
              </p>
            </div>

            <div className="absolute left-[3%] top-[17%] z-10 flex h-16 w-16 items-center justify-center rounded-full border border-[#c8a76b50] bg-[#11100e]/70 backdrop-blur-sm">
              <div className="orbit">
                <Asterisk
                  size={42}
                  strokeWidth={0.6}
                  className="text-[#c8a76b]"
                />
              </div>
            </div>

            <div className="absolute right-[3%] top-[5%] z-10 hidden text-right sm:block">
              <p className="mono text-[8px] tracking-[.2em] text-[#c8a76b]">
                PARIS
              </p>
              <p className="serif text-sm italic text-[#9d917d]">
                France, 1804
              </p>
            </div>

            <div className="absolute bottom-[8%] right-[2%] z-10 flex items-center gap-2 text-[#a69a86]">
              <span className="mono text-[8px] tracking-[.18em]">
                PORTRAIT ARCHIVE
              </span>
              <ArrowDownRight size={14} />
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-between border-t border-[#c8a76b25] py-5">
          <p className="mono text-[8px] tracking-[.2em] text-[#887e6e] sm:text-[9px]">
            LIBERTÉ · ORDRE · AMBITION
          </p>
          <a
            href="#campaigns"
            className="group flex items-center gap-3 text-[9px] tracking-[.15em] text-[#b9ad98]"
          >
            SCROLL TO EXPLORE
            <ArrowDown
              size={14}
              className="text-[#c8a76b] transition-transform group-hover:translate-y-1"
            />
          </a>
          <p className="mono hidden text-[9px] tracking-[.12em] text-[#887e6e] sm:block">
            EST. HISTORICAL ARCHIVE
          </p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="border-y border-[#c8a76b20] bg-[#191713]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:px-14 lg:py-24">
          <Reveal>
            <SectionLabel>THE THESIS</SectionLabel>
            <p className="serif mt-6 text-4xl leading-[1.08] sm:text-5xl">
              A man who
              <br />
              <span className="italic text-[#c8a76b]">changed</span> a
              continent.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex h-full flex-col justify-between gap-8">
              <p className="max-w-[720px] text-base leading-8 text-[#bdb4a4] sm:text-lg sm:leading-9">
                His legacy cannot be reduced to the battlefield. Napoleon's rule
                transformed administration, law, education, and the political
                map of Europe. It also expanded war on an enormous scale and
                concentrated power in one ruler.
              </p>
              <div className="flex items-center gap-3 text-[10px] tracking-[.18em] text-[#c8a76b]">
                <ScrollText size={17} />
                HISTORY WITHOUT THE HALO
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Campaigns */}
      <section
        id="campaigns"
        className="scroll-mt-16 px-5 py-24 sm:px-8 lg:px-14 lg:py-32"
      >
        <div className="mx-auto max-w-[1312px]">
          <Reveal>
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <SectionLabel>FIELD REPORTS · 1805—1815</SectionLabel>
                <h2 className="serif mt-6 text-5xl leading-none sm:text-7xl">
                  The art of <span className="italic text-[#c8a76b]">war.</span>
                </h2>
              </div>
              <p className="max-w-[350px] text-sm leading-7 text-[#a89d8b]">
                Four campaigns. Different outcomes. A closer look at the
                decisions that shaped Napoleon's rise and fall.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 flex flex-wrap gap-2 border-b border-[#c8a76b25] pb-5">
            {["All", "Victory", "Defeat"].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setFilter(item)}
                className={`relative px-5 py-3 text-[10px] tracking-[.15em] transition duration-300 ${
                  filter === item
                    ? "bg-[#c8a76b] text-[#17130d]"
                    : "border border-[#c8a76b25] text-[#b9ad98] hover:border-[#c8a76b70]"
                }`}
              >
                {item.toUpperCase()}
                {filter === item && (
                  <motion.span
                    layoutId="campaign-filter"
                    className="absolute inset-0 -z-10 bg-[#c8a76b]"
                  />
                )}
              </button>
            ))}
            <span className="mono ml-auto self-center text-[9px] text-[#887e6e]">
              {filteredCampaigns.length.toString().padStart(2, "0")} RECORDS
            </span>
          </div>

          <motion.div
            layout
            className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredCampaigns.map((campaign) => (
                <motion.article
                  layout
                  key={campaign.number}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="group flex flex-col border border-[#c8a76b22] bg-[#171512] transition-colors duration-500 hover:border-[#c8a76b80]"
                >
                  <div className="relative h-[230px] overflow-hidden bg-[#252018]">
                    <img
                      src={campaign.image}
                      alt={`Landscape representing the ${campaign.title} campaign`}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-60 grayscale transition duration-700 group-hover:scale-110 group-hover:opacity-80 group-hover:grayscale-[30%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171512] via-transparent to-[#17151220]" />
                    <div className="absolute left-4 top-4 border border-[#c8a76b50] bg-[#11100e]/80 px-3 py-2 backdrop-blur-sm">
                      <p className="mono text-[9px] tracking-[.15em] text-[#c8a76b]">
                        {campaign.year}
                      </p>
                    </div>
                    <p className="serif absolute bottom-1 right-4 text-7xl text-white/[.12]">
                      {campaign.number}
                    </p>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${campaign.category === "Victory" ? "bg-[#b4a26d]" : "bg-[#a24a41]"}`}
                      />
                      <span className="mono text-[8px] tracking-[.15em]">
                        {campaign.result.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="mono text-[8px] tracking-[.13em] text-[#948772]">
                      {campaign.location.toUpperCase()}
                    </p>
                    <h3 className="serif mt-3 text-3xl">{campaign.title}</h3>
                    <p className="mt-3 flex-1 text-xs leading-6 text-[#a99f8e]">
                      {campaign.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelected(campaign)}
                      className="mt-6 flex w-full items-center justify-between border-t border-[#c8a76b25] pt-4 text-[9px] tracking-[.13em] text-[#c8a76b] transition-colors hover:text-[#f1d9a9]"
                    >
                      READ FIELD REPORT
                      <MoveUpRight size={15} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Campaign modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.article
              role="dialog"
              aria-modal="true"
              aria-labelledby="report-title"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
              className="my-auto w-full max-w-2xl border border-[#c8a76b55] bg-[#171512] shadow-2xl shadow-black"
            >
              <div className="flex items-center justify-between border-b border-[#c8a76b30] px-6 py-5">
                <span className="mono text-[9px] tracking-[.2em] text-[#c8a76b]">
                  FIELD REPORT · {selected.year}
                </span>
                <button
                  type="button"
                  aria-label="Close field report"
                  onClick={() => setSelected(null)}
                  className="border border-[#c8a76b30] p-2 hover:bg-[#c8a76b15]"
                >
                  <X size={17} />
                </button>
              </div>
              <div className="p-7 sm:p-10">
                <p className="mono text-[9px] tracking-[.2em] text-[#948772]">
                  {selected.location.toUpperCase()}
                </p>
                <h2
                  id="report-title"
                  className="serif mt-4 text-5xl sm:text-6xl"
                >
                  {selected.title}
                </h2>
                <div className="gold-line my-6" />
                <p className="text-sm leading-8 text-[#c0b5a2]">
                  {selected.description}
                </p>
                <div className="mt-8 flex items-center justify-between border-t border-[#c8a76b25] pt-5">
                  <span className="mono text-[9px] tracking-[.15em] text-[#c8a76b]">
                    OUTCOME: {selected.result.toUpperCase()}
                  </span>
                  <span className="serif text-xl italic text-[#948772]">
                    Imperium Archive
                  </span>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline */}
      <section
        id="chronicle"
        className="scroll-mt-16 bg-[#191713] px-5 py-24 sm:px-8 lg:px-14 lg:py-32"
      >
        <div className="mx-auto max-w-[1312px]">
          <Reveal>
            <SectionLabel>THE CHRONICLE · 1769—1815</SectionLabel>
            <div className="mt-6 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <h2 className="serif text-5xl leading-none sm:text-7xl">
                The rise.
                <br />
                <span className="italic text-[#c8a76b]">The fall.</span>
              </h2>
              <p className="max-w-[350px] text-sm leading-7 text-[#a89d8b]">
                An empire built in years, tested by war, and ultimately lost.
                Follow the milestones that define the Napoleonic era.
              </p>
            </div>
          </Reveal>

          <div className="relative mt-16">
            <div className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-[#c8a76b] via-[#c8a76b40] to-transparent sm:left-[110px]" />
            <div className="space-y-0">
              {timeline.map((item, index) => (
                <Reveal key={item.year} delay={index * 0.06}>
                  <div className="group relative grid grid-cols-[40px_1fr] gap-5 border-b border-[#c8a76b15] py-8 sm:grid-cols-[110px_1fr] sm:gap-8">
                    <div className="relative z-10 flex items-start justify-center pt-2 sm:justify-start sm:pl-[99px]">
                      <div className="h-[9px] w-[9px] rotate-45 border border-[#c8a76b] bg-[#191713] transition duration-500 group-hover:rotate-90 group-hover:scale-150 group-hover:bg-[#c8a76b]" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-[100px_1fr_120px] sm:items-start sm:gap-8">
                      <span className="serif text-3xl text-[#c8a76b] sm:text-4xl">
                        {item.year}
                      </span>
                      <div>
                        <h3 className="serif text-3xl transition-colors group-hover:text-[#e6c88f] sm:text-4xl">
                          {item.title}
                        </h3>
                        <p className="mt-3 max-w-[600px] text-sm leading-7 text-[#a89d8b]">
                          {item.text}
                        </p>
                      </div>
                      <span className="mono pt-1 text-[8px] tracking-[.15em] text-[#887e6e] sm:text-right">
                        {item.type}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legacy */}
      <section
        id="legacy"
        className="scroll-mt-16 px-5 py-24 sm:px-8 lg:px-14 lg:py-32"
      >
        <div className="mx-auto max-w-[1312px]">
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <Reveal>
              <div className="relative flex min-h-[390px] items-center justify-center overflow-hidden border border-[#c8a76b25] bg-[#191713]">
                <div className="map-grid absolute inset-0 opacity-70" />
                <div className="absolute h-[310px] w-[310px] rounded-full border border-dashed border-[#c8a76b30]" />
                <div className="absolute h-[230px] w-[230px] rounded-full border border-[#c8a76b35]" />
                <div className="pulse-ring absolute h-[160px] w-[160px] rounded-full border border-[#c8a76b55]" />
                <div className="drift relative z-10 flex h-28 w-28 items-center justify-center border border-[#c8a76b90] bg-[#11100e] shadow-[0_0_80px_#c8a76b10]">
                  <Crown
                    size={46}
                    strokeWidth={0.8}
                    className="text-[#c8a76b]"
                  />
                </div>
                <span className="mono absolute left-5 top-5 text-[8px] tracking-[.2em] text-[#c8a76b]">
                  LEGACY / 01
                </span>
                <span className="mono absolute bottom-5 right-5 text-[8px] tracking-[.15em] text-[#887e6e]">
                  EUROPE · XIX CENTURY
                </span>
                <span className="absolute left-[15%] top-[35%] text-[#c8a76b50]">
                  <Asterisk size={22} />
                </span>
                <span className="absolute bottom-[28%] right-[17%] text-[#c8a76b60]">
                  <Sparkles size={19} />
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <SectionLabel>BEYOND THE BATTLEFIELD</SectionLabel>
              <h2 className="serif mt-7 text-5xl leading-[.98] sm:text-7xl">
                An empire.
                <br />
                <span className="italic text-[#c8a76b]">An inheritance.</span>
              </h2>
              <p className="mt-7 max-w-[590px] text-sm leading-8 text-[#b6ab99] sm:text-base">
                Napoleon's influence outlasted his reign. The Napoleonic Code
                helped shape civil-law systems, while administrative reforms
                influenced the modern state. His legacy also remains inseparable
                from authoritarian rule, censorship, colonial ambition, and
                devastating wars.
              </p>

              <div className="mt-9 space-y-0">
                {[
                  {
                    icon: BookOpen,
                    title: "The Napoleonic Code",
                    text: "A landmark in the development of modern civil law.",
                  },
                  {
                    icon: Globe2,
                    title: "A reshaped Europe",
                    text: "Borders, governments, and alliances transformed.",
                  },
                  {
                    icon: Shield,
                    title: "Power and its cost",
                    text: "The human and political consequences of imperial war.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="group flex gap-4 border-t border-[#c8a76b25] py-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#c8a76b35] text-[#c8a76b] transition-colors group-hover:bg-[#c8a76b] group-hover:text-[#11100e]">
                      <Icon size={18} strokeWidth={1.3} />
                    </div>
                    <div>
                      <h3 className="serif text-2xl">{title}</h3>
                      <p className="mt-1 text-xs leading-6 text-[#968b79]">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative overflow-hidden border-y border-[#c8a76b25] bg-[#191713] px-5 py-24 text-center sm:px-8 lg:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c8a76b12]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#c8a76b15]" />
        <Reveal className="relative mx-auto max-w-[900px]">
          <Feather
            size={25}
            strokeWidth={1}
            className="mx-auto text-[#c8a76b]"
          />
          <p className="mono mt-6 text-[9px] tracking-[.3em] text-[#c8a76b]">
            THE LAST WORD
          </p>
          <p className="serif mt-8 text-4xl leading-tight sm:text-6xl lg:text-7xl">
            "History is the version
            <br />
            <span className="italic text-[#c8a76b]">of past events</span>
            <br />
            that people have decided to agree upon."
          </p>
          <p className="mt-8 text-[10px] tracking-[.2em] text-[#938773]">
            A SENTIMENT OFTEN ATTRIBUTED TO NAPOLEON
          </p>
          <p className="mx-auto mt-6 max-w-[500px] text-xs leading-7 text-[#887e6e]">
            Attribution of historical quotations is often uncertain. Treat
            famous lines with the same scrutiny as famous men.
          </p>
          <a
            href="#home"
            className="group mx-auto mt-10 inline-flex items-center gap-3 border border-[#c8a76b55] px-6 py-4 text-[10px] tracking-[.16em] transition duration-300 hover:bg-[#c8a76b] hover:text-[#11100e]"
          >
            RETURN TO THE BEGINNING
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="px-5 py-8 sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1312px] flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Crown size={18} className="text-[#c8a76b]" />
            <span className="serif text-lg tracking-[.1em]">IMPERIUM</span>
            <span className="mono text-[8px] text-[#756b5b]">
              / ARCHIVE NO. 001
            </span>
          </div>
          <p className="mono text-[8px] leading-5 tracking-[.1em] text-[#756b5b]">
            AN INDEPENDENT HISTORICAL DESIGN EXPERIMENT
          </p>
          <a
            href="#home"
            className="flex items-center gap-2 text-[9px] tracking-[.1em] text-[#b5a68d] hover:text-[#c8a76b]"
          >
            BACK TO TOP <ArrowDown className="rotate-180" size={13} />
          </a>
        </div>
      </footer>
    </main>
  );
}

export default App;
