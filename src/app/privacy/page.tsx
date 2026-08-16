import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Phone Hub collects, uses, and protects your personal information.',
};

const sectionClass = 'space-y-2';
const headingClass = 'text-sm font-bold text-neutral-900 dark:text-white';
const bodyClass = 'text-sm leading-relaxed text-neutral-600 dark:text-neutral-400';

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-black text-neutral-900 dark:text-white">Privacy Policy</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Last updated August 2026</p>
        </div>
      </div>

      <div className="space-y-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
        <div className={sectionClass}>
          <p className={bodyClass}>
            Phone Hub (&quot;we&quot;, &quot;us&quot;) operates this website to sell phones, spare parts,
            accessories, and repair tools, and to support technicians and customers across Uganda and East
            Africa. This policy explains what information we collect, why, and how we protect it.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Information we collect</h2>
          <p className={bodyClass}>
            When you place an order, create an account, or message us, we collect the information you provide
            directly: your name, phone number, email address, and delivery details. If you create a customer
            account, we also store your order history, wishlist, and any reviews you post. We do not collect or
            store your card or mobile money details payments are processed directly by our payment partner,
            described below.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>How we use it</h2>
          <p className={bodyClass}>
            We use your information to process and deliver orders, send order and payment confirmation emails,
            respond to support requests (including via WhatsApp), and improve the products and services we
            offer. We do not sell your personal information to third parties.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Who we share it with</h2>
          <p className={bodyClass}>
            A small number of trusted service providers process data on our behalf, only for the purpose of
            running the site:
          </p>
          <ul className="ml-4 list-disc space-y-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            <li><strong>Flutterwave</strong> — processes mobile money and card payments; we never see or store your full card details.</li>
            <li><strong>Supabase</strong> — hosts customer accounts and authentication, and stores uploaded images.</li>
            <li><strong>Resend</strong> — delivers order and payment confirmation emails.</li>
          </ul>
          <p className={bodyClass}>
            These providers are contractually restricted to using your data only to provide their service to us.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Cookies</h2>
          <p className={bodyClass}>
            We use essential cookies to keep you signed in and to remember your cart and site preferences (such
            as light/dark mode). We do not use third-party advertising or tracking cookies.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Data retention</h2>
          <p className={bodyClass}>
            We keep order records as long as needed for accounting, warranty, and legal purposes. If you close
            your account, we delete your profile, wishlist, and review data; order records are retained as
            required by law.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Your rights</h2>
          <p className={bodyClass}>
            You can ask us to access, correct, or delete the personal information we hold about you at any time
            by contacting us via WhatsApp or email below.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Changes to this policy</h2>
          <p className={bodyClass}>
            We may update this policy from time to time as our services change. Significant changes will be
            reflected by an updated date at the top of this page.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Contact us</h2>
          <p className={bodyClass}>
            Questions about this policy or your data? Message us on WhatsApp at{' '}
            <a href="https://wa.me/256755754880" target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-500 hover:underline">
              +256 755 754 880 , +256 773 944 288
            </a>{' '}
            or email us at{' '}
            <a href="mailto:mushsoft4@gmail.com" className="font-semibold text-amber-500 hover:underline">
              mushsoft4@gmail.com
            </a>{' '}
            or find us in Kampala, Uganda.
          </p>
        </div>
      </div>
    </main>
  );
}
