# AGENTS.md

## Purpose

This repo owns the Pomba Branca public website content and presentation. Keep client-specific content, branding, layout, and assets here; keep generic Quartz engine work in `GameCult-Quartz`.

## Domain Handoff

The current domain is registered at GoDaddy and uses DomainControl DNS. The live Wix site is reached through the `www` CNAME. Before claiming a deployment is live, confirm the GoDaddy DNS records have been changed away from Wix.

## Build

Use `.\scripts\quartz\quartz.ps1 build` from the repo root. The shared engine is expected at `E:\Projects\GameCult-Quartz` unless `GAMECULT_QUARTZ_ROOT` is set.

