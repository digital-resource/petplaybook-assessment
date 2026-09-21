import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - PetPlaybook.ai</title>
        <meta name="description" content="Privacy Policy for PetPlaybook.ai - how we collect, use, and protect your information." />
      </Helmet>

      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              Legal
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-foreground mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-sm mb-10">Last updated: June 2026</p>

            <div className="space-y-10 text-muted-foreground leading-relaxed">

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>1. Who We Are</h2>
                <p>PetPlaybook.ai is a product developed by Michelle Rosen and the PetPlaybook team. We are building an app that helps pet owners capture and share important information about their pets with caregivers. Our website is located at petplaybook.ai.</p>
                <p className="mt-3">If you have any questions about this Privacy Policy, you can contact us at <a href="mailto:michelle@petplaybook.ai" className="text-primary underline">michelle@petplaybook.ai</a>.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>2. Information We Collect</h2>
                <p>We currently collect the following information:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><strong className="text-foreground">Email address</strong> — when you join our waitlist, we collect your email address so we can notify you when the PetPlaybook App launches and share updates about early access.</li>
                  <li><strong className="text-foreground">Contact form submissions</strong> — if you reach out to us via our contact form, we collect your name, email address, and the content of your message.</li>
                  <li><strong className="text-foreground">Usage data</strong> — we may collect basic information about how you interact with our website, such as pages visited and time spent, to help us improve the experience.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Notify you when the PetPlaybook App is available and ready for early access</li>
                  <li>Send you updates about the product, including founding member offers and launch announcements</li>
                  <li>Respond to your questions and messages submitted through our contact form</li>
                  <li>Improve our website and understand how visitors engage with our content</li>
                </ul>
                <p className="mt-3">We will never sell your personal information to third parties.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>4. How We Store Your Information</h2>
                <p>Your email address and any information you submit through our website is stored securely in our database. We take reasonable technical and organizational measures to protect your data from unauthorized access, loss, or misuse.</p>
                <p className="mt-3">We retain your information for as long as necessary to fulfill the purposes described in this policy, or until you request that we delete it.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>5. Email Communications</h2>
                <p>By joining our waitlist, you agree to receive email communications from PetPlaybook.ai related to the app launch, early access, and founding member offers. You can unsubscribe at any time by replying to any email with "unsubscribe" in the subject line, or by contacting us directly at <a href="mailto:michelle@petplaybook.ai" className="text-primary underline">michelle@petplaybook.ai</a>.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>6. Cookies</h2>
                <p>Our website may use basic cookies or local storage to improve your browsing experience. We do not use cookies for advertising or tracking purposes. You can disable cookies in your browser settings at any time, though this may affect how some parts of the site function.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>7. Third-Party Services</h2>
                <p>We may use trusted third-party services to help operate our website and communicate with you (such as email delivery services). These providers only have access to the information necessary to perform their specific functions and are not permitted to use it for any other purpose.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>8. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Request access to the personal information we hold about you</li>
                  <li>Request that we correct or update your information</li>
                  <li>Request that we delete your information from our records</li>
                  <li>Opt out of email communications at any time</li>
                </ul>
                <p className="mt-3">To exercise any of these rights, please contact us at <a href="mailto:michelle@petplaybook.ai" className="text-primary underline">michelle@petplaybook.ai</a>.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>9. Children's Privacy</h2>
                <p>PetPlaybook.ai is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with their information, please contact us and we will promptly delete it.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>10. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time as our product and practices evolve. When we make changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>11. Contact Us</h2>
                <p>If you have any questions, concerns, or requests related to this Privacy Policy, please reach out to us:</p>
                <div className="mt-3">
                  <p><strong className="text-foreground">PetPlaybook.ai</strong></p>
                  <p>Email: <a href="mailto:michelle@petplaybook.ai" className="text-primary underline">michelle@petplaybook.ai</a></p>
                  <p>Website: <a href="https://petplaybook.ai" className="text-primary underline">petplaybook.ai</a></p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
