import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1000px] mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-foreground/60 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="space-y-8 text-foreground/80">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              1. Introduction
            </h2>
            <p className="mb-4">
              Welcome to AgentMint. We respect your privacy and are committed to
              protecting your personal data. This privacy policy will inform you
              about how we look after your personal data when you visit our
              website and tell you about your privacy rights and how the law
              protects you.
            </p>
            <p>
              This privacy policy applies to all users of the AgentMint
              platform, including those who interact with our AI agents,
              participate in our DAO governance, or use any of our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              2. Data We Collect
            </h2>
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of
              personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Identity Data</strong> includes username, blockchain
                wallet address, or similar identifier.
              </li>
              <li>
                <strong>Contact Data</strong> includes email address and other
                contact information you provide.
              </li>
              <li>
                <strong>Technical Data</strong> includes internet protocol (IP)
                address, browser type and version, time zone setting and
                location, browser plug-in types and versions, operating system
                and platform, and other technology on the devices you use to
                access this website.
              </li>
              <li>
                <strong>Usage Data</strong> includes information about how you
                use our website, products, and services, including interactions
                with AI agents.
              </li>
              <li>
                <strong>Content Data</strong> includes information and content
                that you provide to our AI agents for processing.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              3. How We Use Your Data
            </h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to.
              Most commonly, we will use your personal data in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To register you as a new user and create your account.</li>
              <li>
                To process and deliver the services you request, including AI
                agent interactions.
              </li>
              <li>
                To manage our relationship with you, including notifying you
                about changes to our terms or privacy policy.
              </li>
              <li>
                To enable you to participate in DAO governance and other
                community features.
              </li>
              <li>
                To improve our website, products/services, marketing, and user
                relationships.
              </li>
              <li>
                To recommend content, products, or features that may interest
                you.
              </li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              4. Data Security
            </h2>
            <p>
              We have put in place appropriate security measures to prevent your
              personal data from being accidentally lost, used, or accessed in
              an unauthorized way, altered, or disclosed. We limit access to
              your personal data to those employees, agents, contractors, and
              other third parties who have a business need to know. They will
              only process your personal data on our instructions, and they are
              subject to a duty of confidentiality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              5. Data Retention
            </h2>
            <p>
              We will only retain your personal data for as long as necessary to
              fulfill the purposes we collected it for, including for the
              purposes of satisfying any legal, accounting, or reporting
              requirements. To determine the appropriate retention period for
              personal data, we consider the amount, nature, and sensitivity of
              the personal data, the potential risk of harm from unauthorized
              use or disclosure of your personal data, the purposes for which we
              process your personal data, and whether we can achieve those
              purposes through other means, and the applicable legal
              requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              6. Your Legal Rights
            </h2>
            <p className="mb-4">
              Under certain circumstances, you have rights under data protection
              laws in relation to your personal data, including the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              7. Blockchain Data
            </h2>
            <p>
              Please note that due to the nature of blockchain technology,
              transactions on the blockchain are immutable and cannot be
              deleted. While we can delete your personal information from our
              systems, any data that has been recorded on a public blockchain as
              part of your interaction with our platform (such as wallet
              addresses and transaction data) cannot be removed or altered.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              8. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new privacy policy on
              this page and updating the &#34;Last Updated&ldquo; date. You are
              advised to review this privacy policy periodically for any
              changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              9. Contact Us
            </h2>
            <p>
              If you have any questions about this privacy policy or our privacy
              practices, please contact us at privacy@agentmint.io.
            </p>
          </section>

          <div className="pt-8 text-sm text-foreground/60">
            Last Updated: June 15, 2024
          </div>
        </div>
      </main>
    </div>
  );
}
