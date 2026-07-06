import { ComponentChildren } from "preact"
import { Root } from "hast"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import * as Component from "./index"
import { getAutoIndexAuthorLabel } from "./AutoIndexFolder"
import { htmlToJsx } from "../util/jsx"
import { FullSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"

type MicroblogPage = QuartzPluginData & {
  slug: FullSlug
}

const DefaultFolderContent = Component.FolderContent()
const PlainContent: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  const content = htmlToJsx(fileData.filePath!, tree as Root) as ComponentChildren
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  return <article class={["popover-hint", ...classes].join(" ")}>{content}</article>
}

function pageDateValue(file: QuartzPluginData) {
  return file.dates?.published ?? file.dates?.created ?? file.dates?.modified
}

function formatPageDate(date: Date, locale: string) {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}

function isLongformPost(page: QuartzPluginData) {
  return (
    page.frontmatter?.article === true ||
    page.frontmatter?.longform === true ||
    page.frontmatter?.readMore === true ||
    typeof page.frontmatter?.description === "string"
  )
}

function getPageDescription(page: QuartzPluginData, fallback: string) {
  const frontmatterDescription = page.frontmatter?.description
  if (typeof frontmatterDescription === "string" && frontmatterDescription.trim().length > 0) {
    return frontmatterDescription.trim()
  }

  return page.description ?? fallback
}

function isHidden(file: QuartzPluginData) {
  return file.frontmatter?.hideFromNewsFeed === true
}

function collectMicroblogPages(allFiles: QuartzPluginData[], rootSlug: string): MicroblogPage[] {
  const prefix = `${rootSlug}/`
  const indexSlug = `${rootSlug}/index`

  return allFiles
    .filter(
      (file): file is MicroblogPage =>
        typeof file.slug === "string" &&
        file.slug.startsWith(prefix) &&
        file.slug !== indexSlug &&
        !isHidden(file),
    )
    .sort((a, b) => {
      const aDate = pageDateValue(a)
      const bDate = pageDateValue(b)

      if (aDate && bDate) {
        return bDate.getTime() - aDate.getTime()
      }

      if (aDate && !bDate) {
        return -1
      }

      if (!aDate && bDate) {
        return 1
      }

      return b.slug.localeCompare(a.slug)
    })
}

function MicroblogFeed({
  props,
  rootSlug,
  emptyDescription,
  locale,
  readMoreLabel,
}: {
  props: QuartzComponentProps
  rootSlug: string
  emptyDescription: string
  locale: string
  readMoreLabel: string
}) {
  const { fileData, allFiles } = props
  const pages = collectMicroblogPages(allFiles, rootSlug)
  const intro = fileData.description

  return (
    <div class="popover-hint pomba-news-index">
      <header class="pomba-news-header">
        <h1>{fileData.frontmatter?.title ?? "News"}</h1>
      </header>
      {intro && (
        <section class="pomba-news-index-intro">
          <p>{intro}</p>
        </section>
      )}
      <div class="pomba-news-card-list">
        {pages.map((page) => {
          const title = typeof page.frontmatter?.title === "string" ? page.frontmatter.title : undefined
          const href = resolveRelative(fileData.slug!, page.slug as FullSlug)
          const author = getAutoIndexAuthorLabel(page, "Pomba Branca")
          const date = pageDateValue(page)
          const longform = isLongformPost(page)
          const root = page.htmlAst as Root | undefined
          const content =
            !longform && root
              ? (htmlToJsx(page.filePath!, root) as ComponentChildren)
              : getPageDescription(page, emptyDescription)

          return (
            <article class="pomba-news-card">
              <div class="pomba-news-card-head">
                {title && <h2>{title}</h2>}
                <p class="pomba-news-card-meta">
                  <span class="pomba-news-card-author">{author}</span>
                  {date && (
                    <>
                      <span class="pomba-news-card-meta-separator">/</span>
                      <span class="pomba-news-card-date">{formatPageDate(date, locale)}</span>
                    </>
                  )}
                </p>
              </div>
              <div class="pomba-news-card-body">{content}</div>
              {longform && (
                <a class="pomba-news-read-more" href={href}>
                  {readMoreLabel}
                </a>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}

const NewsFeedContent: QuartzComponent = (props) => (
  <MicroblogFeed
    props={props}
    rootSlug="Noticias"
    emptyDescription="Uma breve atualização da Pomba Branca."
    locale="pt-PT"
    readMoreLabel="Ler mais..."
  />
)

const EnglishNewsFeedContent: QuartzComponent = (props) => (
  <MicroblogFeed
    props={props}
    rootSlug="en/News"
    emptyDescription="A brief update from Pomba Branca."
    locale="en-GB"
    readMoreLabel="Read More..."
  />
)

export default (() => {
  const PombaFolderContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { fileData } = props

    if (fileData.slug === "Noticias/index") {
      return <NewsFeedContent {...props} />
    }

    if (fileData.slug === "en/News/index") {
      return <EnglishNewsFeedContent {...props} />
    }

    if (fileData.frontmatter?.showFolderListing === false) {
      return <PlainContent {...props} />
    }

    return <DefaultFolderContent {...props} />
  }

  PombaFolderContent.css = DefaultFolderContent.css
  return PombaFolderContent
}) satisfies QuartzComponentConstructor
