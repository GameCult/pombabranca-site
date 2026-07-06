# Pomba Branca Site

Static Quartz site for `pombabranca.org`, built with the shared `GameCult-Quartz` engine.

## Domain Notes

- Registrar: GoDaddy.com, LLC
- Authoritative DNS: `ns43.domaincontrol.com`, `ns44.domaincontrol.com`
- Current web target: `www.pombabranca.org` CNAMEs through Wix (`pointing.wixdns.net`)
- Mail: Google Workspace MX records
- Domain expiry seen in RDAP: 2026-07-29

## Repo Shape

- `PombaBranca/`: published Markdown content and static assets
- `site/`: site-specific Quartz overlay
- `quartz-site/public/`: generated static output
- `scripts/quartz/quartz.ps1`: local build/dev launcher

## Local Development

Install dependencies in the sibling engine first:

```powershell
cd E:\Projects\GameCult-Quartz
npm ci
```

Then run this site:

```powershell
cd E:\Projects\pombabranca-site
.\scripts\quartz\quartz.ps1 dev
```

For a production build:

```powershell
.\scripts\quartz\quartz.ps1 build
```

