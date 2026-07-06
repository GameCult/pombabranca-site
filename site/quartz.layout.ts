import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import PombaMasthead from "./quartz/components/PombaMasthead"

const isHome = (page: any) => page.fileData.slug === "index" || page.fileData.slug === "en/index"

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [PombaMasthead()],
  afterBody: [],
  footer: Component.Footer({
    links: {
      Facebook: "https://www.facebook.com/profile.php?id=61558470755430&locale=pt_PT",
      Email: "mailto:geral@pombabranca.org",
    },
  }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => !isHome(page),
    }),
  ],
  left: [],
  right: [],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [],
  left: [],
  right: [],
}
