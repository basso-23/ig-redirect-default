export default async function Home({ searchParams }) {
  const params = await searchParams;
  const displayUrl = params.url || "Url";
  return (
    <div className="page-container">
      <div>{displayUrl}</div>
    </div>
  );
}
