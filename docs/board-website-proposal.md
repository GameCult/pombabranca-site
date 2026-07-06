# Proposal: Move Pomba Branca From Wix to a Static Website on GitHub Pages

## Summary

Pomba Branca can replace the current Wix website with a modern static website hosted through GitHub Pages.

This means the public website is made from simple files: text pages, images, and design settings. GitHub stores those files, keeps a record of changes, and can publish the finished website online.

For a small charity website, this is a good fit. The site does not need bookings, payments, private member accounts, or a complicated database. It mainly needs clear public information, bilingual support, news updates, contact details, and a stable place to live.

## Why Move Away From Wix?

Wix is useful when someone needs a visual website builder and does not want to touch files. The tradeoff is dependence on Wix:

- The site is tied to Wix's editor and hosting.
- Costs can continue even for a small public-information site.
- Moving away later can be awkward.
- Access depends on knowing who owns the Wix account.
- Design and structure are limited by the platform.

For Pomba Branca, the website is mostly public information. That makes a static site simpler, cheaper, and easier to preserve.

## What GitHub Pages Gives Us

GitHub Pages can host static websites at no hosting cost when the repository is public.

For a charity site, keeping the website code public is usually acceptable because the website content is already public. There is no private client data, payment information, or confidential internal system in the repository.

The advantages are:

- No normal hosting bill for the public website.
- The site files are owned and controlled directly.
- Every change has a history.
- Updates can be reviewed before publication.
- The site can be moved to another host later if needed.
- The website is not locked into Wix.

## Open Source Ownership

The website repository is published under the MIT License, a common free and open source software license.

In practical terms, this means Pomba Branca does not need GameCult's permission to copy the site, move it to another GitHub organisation, give it to another developer, change it, or publish it somewhere else. The fact that the repository may currently live under the GameCult organisation is a hosting and maintenance arrangement, not a lock-in.

Open source here does not mean giving away private information. It means the public website files are available in a way that preserves Pomba Branca's freedom to use and move them.

## Governance Benefits

This approach is well suited to an organisation that does not want one person making unilateral decisions.

Instead of changing a live website directly, changes can be proposed, reviewed, and then published. This gives the board or trusted volunteers a clearer process:

1. Someone proposes a content or design change.
2. The change can be reviewed before it goes live.
3. The change is approved and merged.
4. GitHub publishes the updated website.

This creates a written record of what changed, when it changed, and who approved it.

## Ongoing Support

GameCult is willing to maintain the website repository for Pomba Branca. This can include fixing issues, making content updates, adding new pages, improving the design, or adding small features as the charity's needs change.

This gives Pomba Branca a practical support path without giving up future control. GameCult can handle the technical maintenance now, and the repository can still be moved to a Pomba Branca GitHub organisation later if the board wants direct ownership.

## Practical Benefits

The new site supports:

- Portuguese and English pages.
- A simple news/microblog feed.
- Static image assets.
- Fast page loading.
- Low maintenance.
- No dependency on Wix hosting.
- Future hosting flexibility.

Because the site is static, there is less that can break. There is no database to maintain and no plugin stack to keep patched.

## Cost Position

The current situation includes paying for a hosted website platform for a small public-information site.

With GitHub Pages, GitHub handles the hosting for a public static site. The main ongoing cost should be the domain name itself, not a separate website hosting subscription.

The domain and email can remain separate. Moving the website does not require moving Google Workspace email.

There is also no need to move the domain away from GoDaddy as part of this project. A different registrar may be cheaper, but transferring the domain is a separate administrative task and not required for the website launch. The practical plan is to keep the domain at GoDaddy and update GoDaddy DNS so `www.pombabranca.org` points to the GitHub Pages host, currently `gamecult.github.io`.

If Pomba Branca wants to take direct charge of the repository later, the site can be moved into a Pomba Branca GitHub organisation. That would give the charity direct ownership of the repo and publishing settings. The DNS target would then be updated to the GitHub Pages host for that organisation instead of GameCult's.

## Risks and Mitigations

There is a learning curve. Editing files is different from using Wix. This can be mitigated by having a technical maintainer or volunteer handle publishing, while board members review content in plain language.

GitHub Pages is best for static public sites. If Pomba Branca later needs private accounts, payments, bookings, or a full CRM, those should be handled by dedicated services rather than bolted onto the website.

The repository is public. This is acceptable for public website content, but private documents, private contact lists, or sensitive internal materials should not be stored here.

## Recommendation

Move the public Pomba Branca website from Wix to the static GitHub Pages site.

This gives Pomba Branca more control, reduces avoidable hosting dependence, supports bilingual public communication, and creates a clearer review process for future changes.

The result is a website that is simpler, cheaper to host, easier to preserve, and not locked to a single website-builder platform.

For the domain, keep the current GoDaddy registration for now. The only required DNS change is to point the website address at GitHub Pages while leaving email records untouched. This can point either to GameCult's GitHub Pages host for managed support, or to Pomba Branca's own GitHub organisation if the board wants direct technical ownership.
