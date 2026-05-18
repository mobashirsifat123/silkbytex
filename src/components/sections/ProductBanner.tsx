import Link from 'next/link';

export default function ProductBanner() {
  return (
    <section className="hm-product">
      <div className="hm-product__text">
        <h2>A booster rocket<br />for digital product teams</h2>
        <p>
          We partner with ambitious companies to design, build, and ship
          exceptional digital products — from strategy to launch and beyond.
        </p>
      </div>
      <Link href="/services" className="hm-product__link">
        Discover more
      </Link>
    </section>
  );
}
