import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - PetPlaybook.ai</title>
        <meta name="description" content="Terms of Service for PetPlaybook.ai - the rules and guidelines for using our website and services." />
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
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-sm mb-10">Last updated: June 2026</p>

            <div className="space-y-10 text-muted-foreground leading-relaxed">

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>1. Agreement to Terms</h2>
                <p>By accessing or using the PetPlaybook.ai website (petplaybook.ai), joining our waitlist, or submitting any information through our site, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>
                <p className="mt-3">These terms apply to all visitors, users, and anyone who accesses or uses our website.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>2. About PetPlaybook.ai</h2>
                <p>PetPlaybook.ai is a pre-launch product currently in development. Our website serves as an informational platform and waitlist registration service. The PetPlaybook App — which will allow pet owners to capture and share important information about their pets with caregivers — has not yet been released.</p>
                <p className="mt-3">By joining our waitlist, you are expressing interest in the product and agreeing to receive communications about its development and launch. Joining the waitlist does not guarantee access to the app, a specific launch date, or any particular features.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>3. Waitlist and Early Access</h2>
                <p>When you join our waitlist, you agree to the following:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>You are providing your email address voluntarily and consent to receive communications from PetPlaybook.ai</li>
                  <li>Waitlist membership does not constitute a purchase, contract, or guarantee of any product or service</li>
                  <li>Early access and founding member pricing are offered at our discretion and may change at any time prior to launch</li>
                  <li>We reserve the right to limit, close, or modify the waitlist at any time without notice</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>4. Intellectual Property</h2>
                <p>All content on this website — including but not limited to text, graphics, logos, images, and the overall design — is the property of PetPlaybook.ai and is protected by applicable intellectual property laws.</p>
                <p className="mt-3">You may not reproduce, distribute, modify, or create derivative works from any content on this site without our express written permission.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>5. Acceptable Use</h2>
                <p>You agree not to use this website to:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Submit false, misleading, or fraudulent information</li>
                  <li>Attempt to gain unauthorized access to any part of our systems or infrastructure</li>
                  <li>Transmit spam, malware, or any harmful or disruptive content</li>
                  <li>Scrape, crawl, or harvest data from our website without permission</li>
                  <li>Violate any applicable local, state, national, or international law or regulation</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>6. Disclaimer of Warranties</h2>
                <p>This website and all content on it are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. PetPlaybook.ai makes no representations or warranties regarding the accuracy, completeness, or reliability of any content on this site.</p>
                <p className="mt-3">We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>7. Limitation of Liability</h2>
                <p>To the fullest extent permitted by law, PetPlaybook.ai and its founders, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of — or inability to use — this website or its content.</p>
                <p className="mt-3">Our total liability to you for any claim arising out of or relating to these terms or your use of the website shall not exceed the amount you have paid to us, if any.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>8. Third-Party Links</h2>
                <p>Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>9. Privacy</h2>
                <p>Your use of this website is also governed by our <a href="/privacy" className="text-primary underline">Privacy Policy</a>, which is incorporated into these Terms of Service by reference. Please review our Privacy Policy to understand our practices.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>10. Changes to These Terms</h2>
                <p>We reserve the right to update or modify these Terms of Service at any time. When we do, we will update the "Last updated" date at the top of this page. Your continued use of the website after any changes constitutes your acceptance of the new terms.</p>
                <p className="mt-3">We encourage you to review these terms periodically.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>11. Governing Law</h2>
                <p>These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in the United States.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>12. Contact Us</h2>
                <p>If you have any questions about these Terms of Service, please contact us:</p>
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
