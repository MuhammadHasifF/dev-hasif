"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Copy,
  Download,
  FileText,
  Github,
  Home,
  Info,
  Linkedin,
  Mail,
  Moon,
  Rocket,
  Sun,
  Terminal,
  Wrench,
} from "lucide-react";
import { siteConfig } from "@/../site.config";
import { projects } from "@/content/projects";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("cmdk:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cmdk:open", onOpen);
    };
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
    } catch {}
    setOpen(false);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      className="fixed inset-0 z-[90] flex items-start justify-center pt-[15vh]"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-[min(92vw,640px)] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-1)] shadow-2xl">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4">
          <Terminal className="h-4 w-4 text-[var(--color-text-2)]" />
          <Command.Input
            placeholder="Type to search · navigate · copy..."
            className="h-12 w-full bg-transparent text-sm text-[var(--color-text-0)] placeholder:text-[var(--color-text-2)] focus:outline-none"
          />
        </div>
        <Command.List className="max-h-[50vh] overflow-auto p-2">
          <Command.Empty className="px-3 py-8 text-center text-sm text-[var(--color-text-2)]">
            No matches.
          </Command.Empty>

          <Command.Group heading="Navigate" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-[var(--color-text-2)]">
            <Item icon={<Home />} label="Home" onSelect={() => go("/")} />
            <Item icon={<Info />} label="About" onSelect={() => go("/about")} />
            <Item icon={<Rocket />} label="Work" onSelect={() => go("/work")} />
            <Item icon={<Wrench />} label="Experience" onSelect={() => go("/experience")} />
            <Item icon={<FileText />} label="Resume" onSelect={() => go("/resume")} />
            <Item icon={<Mail />} label="Contact" onSelect={() => go("/contact")} />
          </Command.Group>

          <Command.Group heading="Projects" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-[var(--color-text-2)]">
            {projects.map((p) => (
              <Item
                key={p.slug}
                icon={<ArrowUpRight />}
                label={p.title}
                hint={p.category}
                onSelect={() => go(`/work/${p.slug}`)}
              />
            ))}
          </Command.Group>

          <Command.Group heading="Actions" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-[var(--color-text-2)]">
            <Item
              icon={resolvedTheme === "dark" ? <Sun /> : <Moon />}
              label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
              onSelect={() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
                setOpen(false);
              }}
            />
            <Item icon={<Copy />} label="Copy email" hint={siteConfig.email} onSelect={copyEmail} />
            <Item
              icon={<Download />}
              label="Download resume"
              onSelect={() => {
                const a = document.createElement("a");
                a.href = "/resume.pdf";
                a.download = "muhammad-hasif-resume.pdf";
                a.click();
                setOpen(false);
              }}
            />
          </Command.Group>

          <Command.Group heading="Elsewhere" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-[var(--color-text-2)]">
            <Item
              icon={<Github />}
              label="GitHub"
              onSelect={() => {
                window.open(siteConfig.links.github, "_blank");
                setOpen(false);
              }}
            />
            <Item
              icon={<Linkedin />}
              label="LinkedIn"
              onSelect={() => {
                window.open(siteConfig.links.linkedin, "_blank");
                setOpen(false);
              }}
            />
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}

function Item({
  icon,
  label,
  hint,
  onSelect,
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[var(--color-text-0)] aria-selected:bg-[var(--color-bg-2)] data-[selected=true]:bg-[var(--color-bg-2)]"
    >
      <span className="flex h-6 w-6 items-center justify-center text-[var(--color-text-1)] [&>svg]:h-3.5 [&>svg]:w-3.5">
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {hint && <span className="font-mono text-[10px] text-[var(--color-text-2)]">{hint}</span>}
    </Command.Item>
  );
}
