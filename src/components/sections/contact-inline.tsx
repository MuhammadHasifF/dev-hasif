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
      title={<>Open a channel.</>}
      intro="Drop a packet — I'll respond from my actual inbox, usually within a few days."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="hud-panel grid gap-4 p-6 md:grid-cols-2 md:p-8"
        aria-live="polite"
      >
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
        <Field id="company" label="Org (optional)" error={errors.company?.message}>
          <input id="company" autoComplete="organization" {...register("company")} className={inputCls(!!errors.company)} />
        </Field>
        <div className="md:col-span-2">
          <Field id="message" label="Message" error={errors.message?.message}>
            <textarea id="message" rows={6} {...register("message")} className={inputCls(!!errors.message)} />
          </Field>
        </div>

        <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-2)]">
            <span className="text-[var(--color-accent)]">›</span> direct{" "}
            <a href="mailto:muhammad.hasif.faisal@gmail.com" className="text-[var(--color-text-1)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline">
              muhammad.hasif.faisal@gmail.com
            </a>
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className={cn(
              "group inline-flex h-10 items-center gap-2 rounded-sm border px-5 font-mono text-[11px] uppercase tracking-[0.18em] transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[var(--ease-apple)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
              status === "success"
                ? "border-[var(--color-success)] bg-[var(--color-success)] text-black"
                : "border-[var(--color-accent)] bg-[var(--color-accent)] text-black hover:shadow-[0_0_24px_-4px_var(--color-accent)]"
            )}
          >
            {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === "success" && <Check className="h-4 w-4" />}
            {(status === "idle" || status === "error") && <Send className="h-4 w-4" />}
            {status === "loading"
              ? "Transmitting..."
              : status === "success"
              ? "Sent · standby"
              : "Transmit"}
          </button>
        </div>
        {status === "error" && error && (
          <div
            role="alert"
            className="md:col-span-2 border border-[var(--color-warning)]/40 bg-[color:color-mix(in_oklab,var(--color-warning)_10%,transparent)] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-warning)]"
          >
            ! {error}
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
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-2)]">
        <span className="text-[var(--color-accent)]">›</span> {label}
      </span>
      {children}
      {error && (
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-warning)]">
          ! {error}
        </span>
      )}
    </label>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full rounded-sm border bg-[var(--color-bg-2)] px-3 py-2.5 text-sm text-[var(--color-text-0)] placeholder:text-[var(--color-text-2)] outline-none transition-[border-color,box-shadow] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_1px_var(--color-accent),0_0_16px_-4px_var(--color-accent)]",
    hasError ? "border-[var(--color-warning)]" : "border-[var(--color-border)]"
  );
}
