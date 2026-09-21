import { Link } from 'react-router';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex h-20 items-center">
          <Link to="/" className="flex min-w-0 shrink items-center" aria-label="PetPlaybook.ai home">
            <img
              src="/assets/petplaybook-header-logo.png"
              alt="PetPlaybook.ai"
              width={210}
              height={56}
              className="block h-auto max-h-10 w-auto max-w-full self-center object-contain md:max-h-14"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
