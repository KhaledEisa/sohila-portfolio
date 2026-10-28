import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page py-32">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight">
        This page <span className="font-display font-normal italic text-accent-ink">wandered off.</span>
      </h1>
      <p className="mt-4 text-muted">The link may be old or mistyped.</p>
      <Link href="/" className="btn-primary mt-8">Back to the portfolio</Link>
    </section>
  );
}
