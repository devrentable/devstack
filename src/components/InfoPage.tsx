import type { ReactNode } from "react";

type InfoPageProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function InfoPage({ title, description, children }: InfoPageProps) {
  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="tool-surface rounded-lg p-5 sm:p-8">
        <h1 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">{title}</h1>
        <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
        <div className="info-content mt-8 space-y-7 text-slate-300">{children}</div>
      </section>
    </div>
  );
}
