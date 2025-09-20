import { getMaids } from "@/lib/data";
import { MaidCard } from "@/components/maid-card";

export default function MaidsPage() {
  const maids = getMaids();

  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">Find Your Perfect Maid</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Browse our list of trusted and verified maids. Select the one that best fits your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {maids.map((maid) => (
          <MaidCard key={maid.id} maid={maid} />
        ))}
      </div>
    </div>
  );
}
