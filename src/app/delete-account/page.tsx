// Explains Puck Buddy account deletion from the app or through a verified support request.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete your Puck Buddy account",
  description: "Request deletion of your Puck Buddy account and associated data.",
  alternates: { canonical: "/delete-account" },
};

export default function DeleteAccountPage() {
  return (
    <main className="container mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Delete your Puck Buddy account</h1>
      <p className="mb-6">Puck Buddy is operated by Buddy Tech LLC. You can delete your account in the app or contact us if you cannot access it.</p>
      <h2 className="text-2xl font-bold mb-3">Delete from the app</h2>
      <ol className="list-decimal list-inside space-y-2 mb-6">
        <li>Sign in to the Puck Buddy account you want to delete.</li>
        <li>Open Profile and select Delete Account.</li>
        <li>Read the confirmation and confirm deletion. Sign in again if asked to verify your identity.</li>
      </ol>
      <h2 className="text-2xl font-bold mb-3">Request deletion without the app</h2>
      <p className="mb-4">Email us from the address associated with your account and ask to delete your Puck Buddy account. If you cannot use that address, explain that in your request so we can help verify ownership. Parents or guardians can also contact us about a child&apos;s account.</p>
      <a className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white mb-6" href="mailto:jake@buddyllc.app?subject=Puck%20Buddy%20account%20deletion">Email an account deletion request</a>
      <p className="mb-6">Contact: jake@buddyllc.app. Do not send a password, payment card, identity document or private practice video. We verify the request before deleting an account.</p>
      <h2 className="text-2xl font-bold mb-3">What happens to your data</h2>
      <p className="mb-4">Account deletion removes your app profile and associated private results, statistics, preferences, account-linked conversations and owned media through our cleanup process. Team and public-leaderboard access is removed. Deletion is permanent.</p>
      <p className="mb-4">Limited billing, promotion-redemption, security and fraud-prevention records may be retained to meet recordkeeping obligations and prevent duplicate benefits. Third-party providers may retain records under their own policies. Account deletion is distinct from the scheduled retention of individual results.</p>
      <h2 className="text-2xl font-bold mb-3">Cancel your subscription separately</h2>
      <p className="mb-4">Deleting your Puck Buddy account does not cancel a subscription managed by Google Play or the Apple App Store. Cancel it through the store to prevent future renewals.</p>
      <p><a className="underline" href="/privacy">Privacy policy</a> · <a className="underline" href="/refund">Subscription and refund instructions</a></p>
    </main>
  );
}
