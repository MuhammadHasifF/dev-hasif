import type { Metadata } from "next";
import { Section } from "@/components/primitives/section";
import { ContactInline } from "@/components/sections/contact-inline";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/../site.config";
import { PageBackground } from "@/components/layout/page-background";

export const metadata: Metadata = {
  title: "Contact",
  description: "Drop a note — collaborations, roles, research, or the merely curious.",
};

export default function ContactPage() {
  return (
    <>
      <PageBackground variant="contact" />
      <Section
        eyebrow="Contact"
        title={<>Say hello.</>}
        intro="For roles, research collaborations, or interesting problems."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Card icon={<Mail className="h-4 w-4" />} title="Email" body={siteConfig.email} href={`mailto:${siteConfig.email}`} />
          <Card icon={<Phone className="h-4 w-4" />} title="Phone" body={siteConfig.phone} />
          <Card icon={<MapPin className="h-4 w-4" />} title="Location" body={siteConfig.location} />
        </div>
      </Section>
      <ContactInline />
    </>
  );
}

function Card({ icon, title, body, href }: { icon: React.ReactNode; title: string; body: string; href?: string }) {
  const content = (
    <div className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-1)] p-6 transition-colors hover:border-[var(--color-accent)]/60">
      <div className="flex items-center gap-2 text-[var(--color-accent)]">{icon}<span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-2)]">{title}</span></div>
      <div className="mt-3 text-lg text-[var(--color-text-0)]">{body}</div>
    </div>
  );
  if (href) return <a href={href}>{content}</a>;
  return content;
}
