// Explains upload help, store billing, restore purchases and verified account deletion support.
import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "../lib/constants";

export const metadata: Metadata = {
  title: "Puck Buddy Support | Uploads, Subscriptions and Account Help",
  description:
    "Get help with Puck Buddy video uploads, analysis, subscriptions, restoring purchases and deleting your account.",
  alternates: { canonical: "/support" },
};

const linkStyle = "font-medium text-blue-700 underline underline-offset-4 hover:text-blue-900";

export default function SupportPage() {
  return (
    <div className="bg-white text-gray-950">
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-700">Buddy Tech LLC</p>
      <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">Puck Buddy support</h1>
      <p className="mt-5 text-lg leading-relaxed text-gray-700">
        Get help with training videos, your subscription or your account.
        Email <a className={linkStyle} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <nav aria-label="Support topics" className="my-9 flex flex-wrap gap-x-6 gap-y-3 rounded-2xl bg-blue-50 p-5 text-sm">
        <a className={linkStyle} href="#uploads">Uploads and analysis</a>
        <a className={linkStyle} href="#subscriptions">Subscriptions</a>
        <a className={linkStyle} href="#restore">Restore purchases</a>
        <a className={linkStyle} href="#delete-account">Delete your account</a>
      </nav>

      <section id="uploads" className="scroll-mt-24 border-t border-gray-200 py-8">
        <h2 className="text-2xl font-bold text-gray-950">Uploads and analysis</h2>
        <p className="mt-4 leading-relaxed text-gray-700">
          Choose a supported drill and follow its filming instructions. Keep the player, stick and relevant movement visible.
          Uploads and analysis need an internet connection. Camera angle, lighting, clip length and connection quality can affect results and processing time.
        </p>
        <p className="mt-4 leading-relaxed text-gray-700">
          If progress stops, return to the app and check your connection and the current result before starting another upload.
          If an upload or analysis fails, note the error, drill and approximate time, then contact us.
          Past Results keeps saved scorecards and coaching notes; video playback is available for your current result.
        </p>
      </section>

      <section id="subscriptions" className="scroll-mt-24 border-t border-gray-200 py-8">
        <h2 className="text-2xl font-bold text-gray-950">Manage or cancel a subscription</h2>
        <p className="mt-4 leading-relaxed text-gray-700">
          Apple or Google manages purchases made through its store. Use the same store account you used to subscribe.
          Current plans, prices and any eligible offers appear in the app before you confirm a purchase.
        </p>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-gray-700">
          <li><a className={linkStyle} href="https://apps.apple.com/account/subscriptions">Manage Apple subscriptions</a>: select Puck Buddy to view or cancel your plan.</li>
          <li><a className={linkStyle} href="https://play.google.com/store/account/subscriptions">Manage Google Play subscriptions</a>: select Puck Buddy to view or cancel your plan.</li>
        </ul>
        <p className="mt-4 leading-relaxed text-gray-700">Deleting the app or your Puck Buddy account does not cancel a store subscription.</p>
        <p className="mt-4 leading-relaxed text-gray-700">
          For a refund request, use <a className={linkStyle} href="https://reportaproblem.apple.com/">Apple Report a Problem</a> or the <a className={linkStyle} href="https://support.google.com/googleplay/answer/2479637">Google Play refund help page</a>.
          The store determines eligibility. See our <Link className={linkStyle} href="/refund">subscription and refund policy</Link> for more information.
        </p>
      </section>

      <section id="restore" className="scroll-mt-24 border-t border-gray-200 py-8">
        <h2 className="text-2xl font-bold text-gray-950">Restore purchases</h2>
        <p className="mt-4 leading-relaxed text-gray-700">
          Sign in to Puck Buddy and use the Apple or Google account that made the purchase.
          On the premium purchase screen, tap Restore Purchases. If premium is already active, that screen may return you to Home.
          A purchase in one store does not create a purchase receipt in the other store.
        </p>
        <p className="mt-4 leading-relaxed text-gray-700">
          If your store shows an active subscription but Puck Buddy does not, email us with your platform, app version and the message you see.
        </p>
      </section>

      <section id="delete-account" className="scroll-mt-24 border-t border-gray-200 py-8">
        <h2 className="text-2xl font-bold text-gray-950">Delete your Puck Buddy account</h2>
        <p className="mt-4 leading-relaxed text-gray-700">
          In the app, open Profile, scroll to Delete Account and follow the confirmation prompts.
          This permanently deletes your account and associated training data. Review the <Link className={linkStyle} href="/privacy">privacy policy</Link> for data retention details.
          Manage any Apple or Google subscription separately before deleting your account if you want to stop future renewals.
        </p>
        <p className="mt-4 leading-relaxed text-gray-700">
          If you cannot access the app, <a className={linkStyle} href={`mailto:${CONTACT_EMAIL}?subject=Puck%20Buddy%20account%20deletion%20request`}>email an account deletion request</a> from the email address associated with your Puck Buddy account.
          Tell us that you want your Puck Buddy account and associated data deleted. We may need to verify account ownership before processing the request.
          Parents or guardians can also contact us about their child&apos;s data.
        </p>
      </section>

      <section className="rounded-2xl bg-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-950">What to include when you contact us</h2>
        <p className="mt-3 leading-relaxed text-gray-700">
          Include iOS or Android, the app version, what you were trying to do, the error message and approximately when it happened.
          Do not send passwords or payment-card details. You can ask about sharing a training clip if we need one to investigate.
        </p>
        <a className={`${linkStyle} mt-4 inline-block`} href={`mailto:${CONTACT_EMAIL}?subject=Puck%20Buddy%20support`}>Email Puck Buddy support</a>
      </section>
    </div>
    </div>
  );
}
