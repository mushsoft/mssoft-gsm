import Link from 'next/link';
import { ArrowLeft, MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with MS Soft GSM — phone, WhatsApp, email, and our shop location in Kampala, Uganda.',
  alternates: { canonical: '/contact' },
};

const whatsappUrl = `https://wa.me/256773944288?text=${encodeURIComponent('Hello MS Soft GSM, I would like to get in touch.')}`;

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-8 px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <div>
        <h1 className="text-lg font-black text-neutral-900 dark:text-white">Contact Us</h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Questions about an order, wholesale pricing, or a repair? Reach us any of these ways.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 transition-colors hover:border-emerald-500/40 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white">WhatsApp</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">+256 773 944 288</p>
          </div>
        </a>

        <a
          href="tel:+256755754880"
          className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 transition-colors hover:border-amber-500/40 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Call</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">+256 755 754 880</p>
          </div>
        </a>

        <a
          href="mailto:mushsoft4@gmail.com"
          className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 transition-colors hover:border-amber-500/40 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Email</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">mushsoft4@gmail.com</p>
          </div>
        </a>

        <div className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Location</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Kampala Centre Point, AC 19, opposite ABSA Bank</p>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-400">
        <Clock className="h-4 w-4 shrink-0 text-neutral-400" />
        <p>For fastest response, message us on WhatsApp — that&apos;s where our team replies quickest.</p>
      </div>
    </main>
  );
}
