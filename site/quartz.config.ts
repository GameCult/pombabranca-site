import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import PombaFolderContent from "./quartz/components/PombaFolderContent"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Pomba Branca",
    pageTitleSuffix: "",
    enableSPA: false,
    enablePopovers: true,
    analytics: null,
    locale: "pt-BR",
    baseUrl: "www.pombabranca.org",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: {
          name: "Cormorant Garamond",
          weights: [400, 500, 600, 700],
        },
        title: {
          name: "Cormorant Garamond",
          weights: [500, 600, 700],
        },
        body: {
          name: "Inter",
          weights: [300, 400, 500, 600, 700],
          includeItalic: true,
        },
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f7f7f1",
          lightgray: "#e5e1d5",
          gray: "#817b70",
          darkgray: "#4a463e",
          dark: "#171a36",
          secondary: "#323dff",
          tertiary: "#7a5cff",
          highlight: "rgba(50, 61, 255, 0.12)",
          textHighlight: "#dad7ff",
        },
        darkMode: {
          light: "#f7f7f1",
          lightgray: "#e5e1d5",
          gray: "#817b70",
          darkgray: "#4a463e",
          dark: "#171a36",
          secondary: "#323dff",
          tertiary: "#7a5cff",
          highlight: "rgba(50, 61, 255, 0.12)",
          textHighlight: "#dad7ff",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem", "git"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown({ linkHeadings: false }),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage({
        pageBody: PombaFolderContent(),
      }),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.CNAME(),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
