import RedirectClient from "./components/RedirectClient";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const displayUrl = params.url || "Url";

  return <RedirectClient url={displayUrl} />;
}
