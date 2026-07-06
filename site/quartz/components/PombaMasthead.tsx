import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"

const portugueseRoutes = [
  { label: "Início", slug: "index" as FullSlug },
  { label: "Sobre", slug: "sobre" as FullSlug },
  { label: "Período Final", slug: "periodo-final-da-vida" as FullSlug },
  { label: "Serviços", slug: "servicos" as FullSlug },
  { label: "Notícias", slug: "Noticias/index" as FullSlug },
  { label: "Contacto", slug: "contacto" as FullSlug },
]

const englishRoutes = [
  { label: "Home", slug: "en/index" as FullSlug },
  { label: "About", slug: "en/about" as FullSlug },
  { label: "End of Life", slug: "en/end-of-life" as FullSlug },
  { label: "Services", slug: "en/services" as FullSlug },
  { label: "News", slug: "en/News/index" as FullSlug },
  { label: "Contact", slug: "en/contact" as FullSlug },
]

const ptToEn = new Map<string, FullSlug>([
  ["index", "en/index" as FullSlug],
  ["sobre", "en/about" as FullSlug],
  ["periodo-final-da-vida", "en/end-of-life" as FullSlug],
  ["servicos", "en/services" as FullSlug],
  ["cafes-de-luto", "en/grief-cafes" as FullSlug],
  ["doula", "en/doula" as FullSlug],
  ["apoio-na-solidao", "en/loneliness-support" as FullSlug],
  ["mais", "en/get-involved" as FullSlug],
  ["contacto", "en/contact" as FullSlug],
  ["Noticias/index", "en/News/index" as FullSlug],
])

const enToPt = new Map<string, FullSlug>(
  [...ptToEn.entries()].map(([pt, en]) => [en, pt as FullSlug]),
)

export default (() => {
  const PombaMasthead: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    const currentSlug = fileData.slug ?? ("index" as FullSlug)
    const isEnglish = currentSlug === "en/index" || currentSlug.startsWith("en/")
    const routes = isEnglish ? englishRoutes : portugueseRoutes
    const languageTarget = isEnglish
      ? (enToPt.get(currentSlug) ?? ("index" as FullSlug))
      : (ptToEn.get(currentSlug) ?? ("en/index" as FullSlug))
    const languageLabel = isEnglish ? "Português" : "English"
    const navLabel = isEnglish ? "Main navigation" : "Navegação principal"

    return (
      <header class="pomba-masthead">
        <div class="pomba-brand-row">
          <a class="pomba-brand" href={resolveRelative(currentSlug, (isEnglish ? "en/index" : "index") as FullSlug)}>
            <img src={resolveRelative(currentSlug, "static/images/dove-mark.png" as FullSlug)} alt="" />
          </a>
          <div class="pomba-brand-copy">
            <strong>Pomba Branca</strong>
          </div>
        </div>
        <div class="pomba-nav-group">
          <nav class="pomba-nav" aria-label={navLabel}>
            {routes.map((route) => (
              <a href={resolveRelative(currentSlug, route.slug)}>{route.label}</a>
            ))}
          </nav>
          <a class="pomba-language-link" href={resolveRelative(currentSlug, languageTarget)}>
            {languageLabel}
          </a>
        </div>
      </header>
    )
  }

  return PombaMasthead
}) satisfies QuartzComponentConstructor
