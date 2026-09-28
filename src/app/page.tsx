export default function Home() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center gap-4 px-6 py-16">
      <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
        nextjs-supabase-template
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
        Next.js + Supabase agent starter
      </h1>
      <p className="text-lg leading-relaxed text-zinc-600">
        Thin App Router scaffold plus Cursor rules, skills, and agents for MVP
        shipping. Open{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm">
          README.md
        </code>{" "}
        then run{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm">
          /setup-project
        </code>{" "}
        in Cursor.
      </p>
    </main>
  );
}
