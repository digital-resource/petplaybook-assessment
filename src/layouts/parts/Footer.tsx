export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
        </div>
          <p className="text-sm text-muted-foreground">© {currentYear} PetPlaybook</p>
      </div>
    </footer>
  );
}
