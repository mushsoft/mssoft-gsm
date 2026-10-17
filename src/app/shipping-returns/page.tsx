import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Truck, BadgeCheck, MapPin, Clock, Wallet } from 'lucide-react';

export const metadata = {
  title: 'Shipping, Warranty & Returns',
  description:
    'Delivery costs and timelines, our UK-used grading scale, what "tested" means, warranty coverage, and returns at MS Soft GSM.',
  alternates: { canonical: '/shipping-returns' },
};

const sectionClass = 'space-y-3';
const headingClass = 'flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white';
const bodyClass = 'text-sm leading-relaxed text-neutral-600 dark:text-neutral-400';

const GRADES = [
  { grade: 'Grade A: Excellent', detail: 'Light signs of use, battery health 85% or higher, fully functional.' },
  { grade: 'Grade B: Good', detail: 'Visible light wear, battery health 80% or higher, fully functional.' },
  { grade: 'Grade C: Fair', detail: 'Noticeable cosmetic wear, battery health 75% or higher, fully functional.' },
];

const DELIVERY = [
  { area: 'Within Kampala', timing: 'Usually same-day', cost: 'From UGX 10,000 (free on orders above UGX 500,000)' },
  { area: 'Rest of Uganda', timing: '1–3 business days', cost: 'From UGX 15,000, depending on destination' },
  { area: 'Wider East Africa', timing: 'On request', cost: 'Message us on WhatsApp for a delivery quote' },
];

export default function ShippingReturnsPage() {
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
          <h1 className="text-lg font-black text-neutral-900 dark:text-white">Shipping, Warranty &amp; Returns</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            See also our{' '}
            <Link href="/terms" className="font-semibold text-amber-500 hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>

      <div className="space-y-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
        <div className={sectionClass}>
          <h2 className={headingClass}>
            <BadgeCheck className="h-4 w-4 text-amber-500" />
            Warranty coverage
          </h2>
          <p className={bodyClass}>
            Every device and genuine part is tested before dispatch. If something arrives faulty or doesn&apos;t
            match its listing, contact us within 7 days of delivery and we&apos;ll repair, replace, or refund it.
            Repair tools and select spare parts carry the warranty period stated on their own product
            listing instead. Check the Specifications section on that product&apos;s page.
          </p>
          <p className={bodyClass}>
            <strong className="text-neutral-800 dark:text-neutral-200">Covered:</strong> defects present at
            delivery, or a device that doesn&apos;t match its stated specs or condition.
            <br />
            <strong className="text-neutral-800 dark:text-neutral-200">Not covered:</strong> physical or liquid
            damage after delivery, damage from a repair carried out by someone other than MS Soft GSM, or a
            lost/stolen device.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>
            <ShieldCheck className="h-4 w-4 text-amber-500" />
            UK-used condition grades &amp; what &quot;tested&quot; means
          </h2>
          <p className={bodyClass}>
            Every UK-used unit is inspected by our technicians before it&apos;s listed: battery health, display,
            front and rear cameras, charging port, buttons, network/SIM reading, and IMEI status (confirmed clean,
            not blacklisted).
          </p>
          <dl className="space-y-2">
            {GRADES.map((g) => (
              <div key={g.grade} className="flex flex-col gap-0.5 rounded-lg border border-neutral-200 dark:border-neutral-800 p-3">
                <dt className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{g.grade}</dt>
                <dd className="text-xs text-neutral-500 dark:text-neutral-400">{g.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>
            <Truck className="h-4 w-4 text-amber-500" />
            Delivery
          </h2>
          <dl className="space-y-2">
            {DELIVERY.map((d) => (
              <div key={d.area} className="flex flex-col gap-0.5 rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 sm:flex-row sm:items-center sm:justify-between">
                <dt className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{d.area}</dt>
                <dd className="text-xs text-neutral-500 dark:text-neutral-400">
                  {d.timing} · {d.cost}
                </dd>
              </div>
            ))}
          </dl>
          <p className={bodyClass}>
            The exact cost and timing for your order is confirmed by our team via WhatsApp after checkout.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>
            <Wallet className="h-4 w-4 text-amber-500" />
            Payment methods
          </h2>
          <p className={bodyClass}>
            Mobile Money (MTN &amp; Airtel), Visa/Mastercard, and bank cards through our payment partners, or
            cash/in-person for orders arranged directly with our team.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>
            <MapPin className="h-4 w-4 text-amber-500" />
            Visit or contact us
          </h2>
          <p className={bodyClass}>Kampala Centre Point, AC 19, opposite ABSA Bank, Kampala, Uganda.</p>
          <p className={`${bodyClass} flex items-center gap-1.5`}>
            <Clock className="h-3.5 w-3.5 shrink-0" />
            Monday – Saturday, 9:00 AM – 7:00 PM. Closed Sundays.
          </p>
          <p className={bodyClass}>
            WhatsApp{' '}
            <a href="https://wa.me/256773944288" target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-500 hover:underline">
              +256 773 944 288
            </a>{' '}
            · Call{' '}
            <a href="tel:+256755754880" className="font-semibold text-amber-500 hover:underline">
              +256 755 754 880
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
