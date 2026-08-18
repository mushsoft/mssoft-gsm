import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service',
  description: 'The terms that apply when you buy from or use the Phone Hub website.',
};

const sectionClass = 'space-y-2';
const headingClass = 'text-sm font-bold text-neutral-900 dark:text-white';
const bodyClass = 'text-sm leading-relaxed text-neutral-600 dark:text-neutral-400';

export default function TermsOfServicePage() {
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
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-black text-neutral-900 dark:text-white">Terms of Service</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Last updated August 2026</p>
        </div>
      </div>

      <div className="space-y-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
        <div className={sectionClass}>
          <p className={bodyClass}>
            These terms apply whenever you browse, order from, or otherwise use the Phone Hub website. By placing
            an order or creating an account, you agree to them.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Products & pricing</h2>
          <p className={bodyClass}>
            All prices are listed in Ugandan Shillings (UGX) and may change without notice. Stock levels shown on
            the site are updated regularly but are not a guarantee of availability if an item you ordered is
            no longer in stock, we&apos;ll contact you before fulfilling the rest of your order.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Orders & payment</h2>
          <p className={bodyClass}>
            Orders are paid for via Mobile Money or card through our payment partner, Flutterwave. An order is
            only confirmed once payment has been verified you&apos;ll receive an email and can check status on
            the order confirmation page. We also accept cash/in-person payment for orders arranged directly with
            our team.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Delivery</h2>
          <p className={bodyClass}>
            We deliver across Kampala and the wider East Africa region. Delivery timelines vary by location and
            are communicated at checkout or by our team via WhatsApp. Risk in the goods passes to you once
            delivery is completed.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Returns & warranty</h2>
          <p className={bodyClass}>
            Genuine parts and devices are tested before dispatch. If an item arrives faulty or not as described,
            contact us within 7 days of delivery to arrange a repair, replacement, or refund. Repair tools and
            select spare parts carry the warranty period stated on their individual product listing. UK-used
            devices are sold as-used and inspected for working condition, not as brand-new.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Accounts</h2>
          <p className={bodyClass}>
            If you create a customer account, you&apos;re responsible for keeping your login credentials secure
            and for all activity under your account.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Acceptable use</h2>
          <p className={bodyClass}>
            Don&apos;t use the site to submit false reviews, attempt to circumvent pricing or stock controls, or
            interfere with its normal operation.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Limitation of liability</h2>
          <p className={bodyClass}>
            We aren&apos;t liable for indirect or consequential losses arising from use of products purchased
            through the site, beyond the value of the order itself, except where liability cannot be excluded by
            Ugandan law.
          </p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Governing law</h2>
          <p className={bodyClass}>These terms are governed by the laws of Uganda.</p>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Contact us</h2>
          <p className={bodyClass}>
            Questions about these terms? Message us on WhatsApp at{' '}
            <a href="https://wa.me/256773944288" target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-500 hover:underline">
              +256 773 944 288
            </a>{' '}
            or call{' '}
            <a href="tel:+256755754880" className="font-semibold text-amber-500 hover:underline">
              +256 755 754 880
            </a>
            , or find us in Kampala, Uganda.
          </p>
        </div>
      </div>
    </main>
  );
}
