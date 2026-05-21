import ApplyForm from "../components/ApplyForm";

export default function ApplyPage() {
  return (
    <section className="min-h-screen bg-obsidian flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-alabaster text-obsidian rounded-xl shadow-2xl p-6">
        <h1 className="text-4xl md:text-5xl font-heading text-center mb-4">Apply for Access</h1>
        <ApplyForm />
      </div>
    </section>
  );
}
