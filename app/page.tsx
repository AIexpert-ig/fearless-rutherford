export default function Home() {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-obsidian">
      {/* Fallback structural gradient (shows if video is missing or loading) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-obsidian via-[#14120E] to-obsidian" />
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center px-4">
        <h1 className="text-alabaster font-heading text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none">
          Private Journeys. Zero Compromises.
        </h1>
        <p className="mt-6 text-alabaster font-body text-lg sm:text-xl max-w-2xl mx-auto">
          10+ years curating ultra‑exclusive experiences between Dubai &amp; Hurghada for discerning HNWIs.
        </p>
        <a
          href="/apply"
          className="mt-10 inline-block border-2 border-champagne text-champagne font-body text-lg px-8 py-4 rounded-full hover:bg-champagne hover:text-obsidian transition-colors"
        >
          Apply for Consultation
        </a>
      </div>
      {/* Scroll prompt */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-alabaster"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
