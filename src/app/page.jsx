export default function Home({ searchParams }) {
  const displayName = searchParams.name || "carlos";
  return (
    <div className="page-container">
      <div>{displayName}</div>
    </div>
  );
}
