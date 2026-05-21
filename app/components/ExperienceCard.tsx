import Image from 'next/image';
import Link from 'next/link';

export interface ExperienceCardProps {
  title: string;
  imageUrl: string;
  price: string;
  link?: string;
}

export default function ExperienceCard({ title, imageUrl, price, link }: ExperienceCardProps) {
  return (
    <div className="relative group overflow-hidden rounded-xl shadow-lg">
      <Image
        src={imageUrl}
        alt={title}
        width={600}
        height={400}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-alabaster">
        <h3 className="font-heading text-2xl md:text-3xl tracking-tight drop-shadow-md">{title}</h3>
        <p className="mt-2 font-body text-lg drop-shadow-md">Starting from <span className="text-champagne font-semibold">{price}</span></p>
        {link && (
          <Link
            href={link}
            className="mt-4 inline-block border-2 border-champagne text-champagne font-body px-5 py-2 rounded-full hover:bg-champagne hover:text-obsidian transition-colors"
          >
            Request Access
          </Link>
        )}
      </div>
    </div>
  );
}
