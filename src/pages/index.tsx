import { Helmet } from '@dr.pogodin/react-helmet';
import { home } from 'virtual:content';

const siteUrl = 'https://petplaybook.ai';
const pageTitle = 'Pet Care, Kept Personal | PetPlaybook.ai';
const pageDescription = 'Keep your pet\'s routines, comforts, preferences, and care details ready for every trusted caregiver with PetPlaybook.';
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'PetPlaybook.ai',
      url: siteUrl,
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'PetPlaybook.ai',
      url: siteUrl,
      description: pageDescription,
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/#webpage`,
      name: pageTitle,
      url: siteUrl,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`${siteUrl}/`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/`} />
        <meta property="og:image" content="https://petplaybook.ai/airo-assets/images/pages/home/hero" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://petplaybook.ai/airo-assets/images/pages/home/hero" />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>
        <section className="px-6 py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="whitespace-nowrap text-2xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-3xl md:text-5xl">
              {home.hero.title}
            </h1>
            <a
              href={home.hero.websiteButtonUrl}
              className="mt-10 inline-flex rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {home.hero.websiteButtonLabel}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
