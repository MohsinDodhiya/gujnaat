import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params promise to extract the slug
  const { slug } = await params;

  // Map of category slugs to their names
  const categoryNames: { [key: string]: string } = {
    aaka: "આકા",
    duaa: "દુઆ",
    gaush: "ગૌસ-એ-પાક",
    hamd: "હમ્દ",
    imam: "ઈમામ-એ-હુસૈન",
    khwaja: "ખ્વાજા ગરીબ નવાઝ",
    mnqabat: "મનકબત",
    moula: "મૌલા અલી",
    naat: "નાત",
    salami: "સલામી",
  };

  // Retrieve the category name based on the slug
  const categoryName = categoryNames[slug];

  // If the category is not found, show a 404 page
  if (!categoryName) {
    notFound();
  }

  return (
    <div>
      <h1>{categoryName} નાત શરીફ</h1>
      {/* Render the list of posts for this category here */}
    </div>
  );
}
