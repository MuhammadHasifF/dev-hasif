export type OrgEntry = {
  key: string;
  name: string;
  short?: string;
  domain?: string;
  /** Local logo path under /public if available — preferred over Clearbit. */
  localLogo?: string;
  /** Whether the logo should be inverted in dark mode (for dark-on-white marks) */
  invertOnDark?: boolean;
};

export const orgs: Record<string, OrgEntry> = {
  sit: { key: "sit", name: "Singapore Institute of Technology", short: "SIT", domain: "singaporetech.edu.sg", localLogo: "/orgs/sit.png" },
  spf: { key: "spf", name: "Singapore Police Force", short: "SPF", domain: "police.gov.sg", localLogo: "/orgs/spf.png" },
  htx: { key: "htx", name: "HTX (Home Team Science & Technology Agency)", short: "HTX", domain: "htx.gov.sg", localLogo: "/orgs/htx.png" },
  mom: { key: "mom", name: "Ministry of Manpower", short: "MOM", domain: "mom.gov.sg", localLogo: "/orgs/mom.jpeg" },
  deloitte: { key: "deloitte", name: "Deloitte", short: "Deloitte", domain: "deloitte.com", localLogo: "/orgs/deloitte.png" },
  hitachi: { key: "hitachi", name: "Hitachi", short: "Hitachi", domain: "hitachi.com" },
  "temasek-poly": { key: "temasek-poly", name: "Temasek Polytechnic", short: "TP", domain: "tp.edu.sg", localLogo: "/orgs/tp.jpg" },
  "al-arabiah": { key: "al-arabiah", name: "Al-Arabiah Institution", short: "AAI", domain: "al-arabiah.edu.sg" },
  "eunos-primary": { key: "eunos-primary", name: "Eunos Primary School", short: "EPS", domain: "eunospri.moe.edu.sg" },
  uipath: { key: "uipath", name: "UiPath", short: "UiPath", domain: "uipath.com" },
  simplifynext: { key: "simplifynext", name: "SimplifyNext", short: "SN", domain: "simplifynext.com" },
  harvard: { key: "harvard", name: "Harvard University", short: "Harvard", domain: "harvard.edu" },
  udemy: { key: "udemy", name: "Udemy", short: "Udemy", domain: "udemy.com" },
  linkedin: { key: "linkedin", name: "LinkedIn", short: "LI", domain: "linkedin.com" },
  "great-eastern": { key: "great-eastern", name: "Great Eastern", short: "GE", domain: "greateasternlife.com" },
  muis: { key: "muis", name: "MUIS", short: "MUIS", domain: "muis.gov.sg" },
  govtech: { key: "govtech", name: "GovTech Singapore", short: "GovTech", domain: "tech.gov.sg" },
  github: { key: "github", name: "GitHub", short: "GH", domain: "github.com" },
  sfa: { key: "sfa", name: "Singapore Food Agency", short: "SFA", domain: "sfa.gov.sg" },
};

// Deterministic hue from a string (HSL)
export function hueFromString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 360;
}

export function monogramFor(entry: OrgEntry) {
  const base = entry.short ?? entry.name;
  const parts = base.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return base.slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getOrg(key: string): OrgEntry | undefined {
  return orgs[key];
}
