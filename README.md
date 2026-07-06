# Pomba Branca Website

This repository contains the Pomba Branca website for `pombabranca.org`.

In plain terms: the website is now a folder of ordinary text files, images, and design settings. GitHub stores those files, keeps a history of changes, and can publish the finished site as static web pages. There is no Wix editor, database, plugin marketplace, or monthly hosting platform required for the public site.

## Why This Exists

The previous website was hosted through Wix. Wix is convenient, but it means the site is tied to Wix's hosting, editor, pricing, and account access.

This version is a static website:

- It is simple HTML, CSS, images, and generated pages.
- It can be hosted on GitHub Pages at no hosting cost while the repository is public.
- It can also be moved to another host later without rebuilding the whole site.
- The charity owns the content and the deployment process instead of depending on one website builder.
- Changes can be reviewed before they go live, which is useful for a group that prefers shared decisions.

## Open Source License

This repository is licensed under the MIT License.

In plain terms, this is free and open source software. Pomba Branca can copy it, move it, change it, publish it somewhere else, or ask someone else to work on it without needing permission from GameCult.

GameCult may currently host and help maintain the repository, but that does not mean GameCult controls the website. The license is intentionally permissive so Pomba Branca can take the site elsewhere whenever it wants.

## What Is In This Repository

- `PombaBranca/` contains the actual website content: Portuguese pages, English pages, news posts, and images.
- `PombaBranca/en/` contains the English version of the site.
- `PombaBranca/Noticias/` and `PombaBranca/en/News/` contain the microblog/news posts.
- `site/` contains the Pomba Branca design and configuration.
- `scripts/` contains helper scripts for building or previewing the site.
- `quartz-site/public/` is the generated website output. It is created by the build and is not edited by hand.

## How Publishing Works

The site is built with the shared `GameCult-Quartz` static-site engine. That engine turns the Markdown files and images in this repository into normal website files.

When changes are pushed to GitHub, the deploy workflow in `.github/workflows/deploy-quartz.yml` can build the site and publish it to GitHub Pages.

## Editing Content

Most content edits happen in `PombaBranca/`.

Examples:

- Portuguese homepage: `PombaBranca/index.md`
- English homepage: `PombaBranca/en/index.md`
- Portuguese services page: `PombaBranca/servicos.md`
- English services page: `PombaBranca/en/services.md`
- Portuguese news feed: `PombaBranca/Noticias/`
- English news feed: `PombaBranca/en/News/`

News posts can be very small. A simple Markdown file in the news folder will appear directly in the feed as a microblog-style post. Longer articles can use frontmatter such as `description` and `article: true` so the feed shows a summary and a read-more link.

## Domain Notes

These were the domain records observed during the migration work:

- Registrar: GoDaddy.com, LLC
- Authoritative DNS: `ns43.domaincontrol.com`, `ns44.domaincontrol.com`
- Previous web target: `www.pombabranca.org` pointed to Wix through `pointing.wixdns.net`
- Planned web target: configure GoDaddy DNS so `www.pombabranca.org` CNAMEs to the GitHub Pages host, currently `gamecult.github.io`
- Mail: Google Workspace MX records
- Domain expiry seen in RDAP: 2026-07-29

Do not change the mail records when moving the website. The website and email are separate services.

The registrar can stay with GoDaddy for now. Moving registrars may save some money, but it is not necessary for launching the new website and is not worth adding extra process risk to this migration.

If Pomba Branca later wants direct ownership of the repository and publishing setup, the site can move to a Pomba Branca GitHub organisation instead. In that case the DNS target would change from `gamecult.github.io` to the GitHub Pages host for their own organisation.

## Local Development

This is only needed for people working on the site design or previewing changes locally.

Install dependencies in the sibling engine first:

```powershell
cd E:\Projects\GameCult-Quartz
npm ci
```

Run a local preview:

```powershell
cd E:\Projects\pombabranca-site
.\scripts\quartz\quartz.ps1 dev
```

Build the production site:

```powershell
.\scripts\quartz\quartz.ps1 build
```

## Board-Friendly Summary

There is a fuller explanation in `docs/board-website-proposal.md`.

The short version: this move reduces recurring hosting dependence, gives Pomba Branca more control over its website, keeps changes reviewable, and still allows the site to be moved elsewhere later if needed.
