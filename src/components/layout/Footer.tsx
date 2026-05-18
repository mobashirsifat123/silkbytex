import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-32 rounded-t-[40px] bg-black text-white px-8 md:px-[6vw] pt-24 pb-12 pr-[calc(6vw+60px)]">
      <Link href="/" className="mb-16 block h-24 w-24 overflow-hidden rounded-full border border-white/20" aria-label="SilkByteX home">
        <Image
          src="/brand/silkbytex-logo.jpeg"
          alt="SilkByteX"
          width={96}
          height={96}
          className="h-full w-full object-cover"
        />
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
        <div>
          <div className="font-sans text-[11px] text-[#999] uppercase tracking-widest font-bold mb-8">Want to collaborate?</div>
          <div className="font-serif italic text-[#999] text-xl mb-4">Work with us</div>
          <a href="mailto:newbusiness@silkbytex.com" className="font-serif text-[clamp(24px,4vw,40px)] hover:opacity-60 transition-opacity">newbusiness@silkbytex.com</a>
        </div>
        <div>
          <div className="font-sans text-[11px] text-[#999] uppercase tracking-widest font-bold mb-8">Want to say hi?</div>
          <div className="font-serif italic text-[#999] text-xl mb-4">General inquiries</div>
          <a href="mailto:hello@silkbytex.com" className="font-serif text-[clamp(24px,4vw,40px)] hover:opacity-60 transition-opacity">hello@silkbytex.com</a>
        </div>
      </div>
      
      <div className="border-t border-white/20 pt-8 flex justify-between items-center font-sans text-[11px] font-bold uppercase tracking-widest text-[#999]">
        <div>New York</div>
        <div className="cursor-pointer hover:text-white transition-colors" >Back to top</div>
      </div>
    </footer>
  );
}
