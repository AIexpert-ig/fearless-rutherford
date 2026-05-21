import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-obsidian bg-opacity-90 backdrop-filter backdrop-blur-lg border-b border-champagne/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-alabaster text-2xl font-heading">
          Axc Concierge
        </Link>
        <div className="space-x-6">
          <Link href="/vault" className="text-alabaster hover:text-champagne transition-colors font-body">
            The Vault
          </Link>
          <Link href="/apply" className="text-alabaster hover:text-champagne transition-colors font-body">
            Apply for Access
          </Link>
        </div>
      </div>
    </nav>
  );
}
