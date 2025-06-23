import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-screen">
      <Helmet>
        <title>Error 404 - Page Not Found</title>
        <meta name="description" content="Error 404 - The requested page could not be found." />
      </Helmet>
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </section>
  );
}
