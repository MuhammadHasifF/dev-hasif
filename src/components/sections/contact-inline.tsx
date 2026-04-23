"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Your name, please").max(80),
  email: z.string().email("Not a valid email"),
  company: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(10, "A little more to go on?").max(5000),
  honeypot: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function ContactInline() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Something broke on send");
      }
      setStatus("success");
      reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something broke on send");
      setStatus("error");
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={<>Start a conversation.</>}
      intro="Drop a note and I'll reply from my actual inbox — typically within a few days."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-1)] p-6 md:grid-cols-2 md:p-8"
        aria-live="polite"
      >
        {/* Honeypot */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
          {...register("honeypot")}
        />

        <Field id="name" label="Name" error={errors.name?.message}>
          <input id="name" autoComplete="name" {...register("name")} className={inputCls(!!errors.name)} />
        </Field>
        <Field id="email" label="Email" error={errors.email?.message}>
          <input id="email" type="email" autoComplete="email" {...register("email")} className={inputCls(!!errors.email)} />
        </Field>
        <Field id="company" label="Company (optional)" error={errors.company?.message}>
          <input id="company" autoComplete="organization" {...register("company")} className={inputCls(!!errors.company)} />
        </Field>
        <div className="md:col-span-2">
          <Field id="message" label="Message" error={errors.message?.message}>
            <textarea id="message" rows={6} {...register("message")} className={inputCls(!!errors.message)} />
          </Field>
        </div>

        <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-[var(--color-text-2)]">
            Or email directly at{" "}
            <a href="mailto:muhammad.hasif.faisal@gmail.com" className="underline underline-offset-4">
              muhammad.hasif.faisal@gmail.com
            </a>
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className={cn(
              "group inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition",
              status === "success"
                ? "bg-[var(--color-success)] text-white"
                : "bg-[var(--color-text-0)] text-[var(--color-bg-0)] hover:opacity-90"
            )}
          >
            {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === "success" && <Check className="h-4 w-4" />}
            {(status === "idle" || status === "error") && <Send className="h-4 w-4" />}
            {status === "loading"
              ? "Sending..."
              : status === "success"
              ? "Sent — I'll reply soon"
              : "Send message"}
          </button>
        </div>
        {status === "error" && error && (
          <div
            role="alert"
            className="md:col-span-2 rounded-lg border border-[var(--color-warning)]/40 bg-[color:color-mix(in_oklab,var(--color-warning)_10%,transparent)] px-3 py-2 text-sm text-[var(--color-warning)]"
          >
            {error}
          </div>
        )}
      </form>
    </Section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-2)]">
        {label}
      </span>
      {children}
      {error && <span className="text-xs text-[var(--color-warning)]">{error}</span>}
    </label>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full rounded-lg border bg-[var(--color-bg-2)] px-3 py-2.5 text-sm text-[var(--color-text-0)] placeholder:text-[var(--color-text-2)] outline-none transition focus:border-[var(--color-accent)]",
    hasError ? "border-[var(--color-warning)]" : "border-[var(--color-border)]"
  );
}
