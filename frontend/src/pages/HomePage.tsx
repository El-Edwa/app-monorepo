import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center text-center justify-center min-h-screen">
      <Helmet>
        <title>X</title>
        <meta name="description" content="Welcome to the X clone homepage" />
      </Helmet>
      <h1 className="text-4xl font-bold mb-4">Welcome to the X clone</h1>
      <p className="text-lg mb-6">
        This page is made by tailwindcss and shadcn UI.
      </p>
      <Button variant="default" size="lg">
        Get Started
      </Button>
    </section>
  );
}
