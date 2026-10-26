import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ICL Group" },
      { name: "description", content: "ICL Group is a consulting, recruitment and corporate services firm helping businesses grow." },
      { property: "og:title", content: "About — ICL Group" },
      { property: "og:description", content: "Who we are and how ICL Group works with clients and candidates." },
    ],
  }),
  component: About,
});

const values = [
  ["Integrity", "Confidential, honest advice — even when it isn't the easy answer."],
  ["Precision", "Rigorous processes in every search, audit and engagement."],
  ["Partnership", "We measure success by our clients' and candidates' outcomes."],
];

function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="eyebrow">About ICL Group</p>
      <h1 className="mt-3 text-5xl">A trusted partner for people and organisations.</h1>
      <p className="mt-8 text-lg text-muted-foreground">
        ICL Group brings together business consulting, recruitment, outsourcing and corporate support under one roof.
        We help leadership teams make better decisions, build stronger teams, and run efficient operations — while
        connecting talented professionals with organisations where they can thrive.
      </p>
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {values.map(([t, d]) => (
          <div key={t} className="border-t-2 border-brass pt-5">
            <h2 className="text-2xl">{t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
