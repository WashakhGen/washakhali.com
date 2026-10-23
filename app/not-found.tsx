import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found | Washakh Ali",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 text-center"
    >
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-70" />
      <div>
        <p className="kicker">error 404</p>
        <h1 className="mt-5 font-serif text-[clamp(3rem,10vw,6rem)] leading-none">
          This page <span className="text-grad italic">doesn&apos;t exist.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-muted">
          The link may be broken, or the page may have moved.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-grad px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
        >
          <ArrowLeft size={16} aria-hidden /> Back to home
        </Link>
      </div>
    </main>
  );
}
