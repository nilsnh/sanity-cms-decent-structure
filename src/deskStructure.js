import S from "@sanity/desk-tool/structure-builder";

async function pageChildResolver(pageId) {
  // TODO use observable to show either just the document editor
  // or list sub-pages as well.
  return S.list()
    .title("Pages")
    .items([
      S.listItem()
        .title("Edit page")
        .child(S.document().schemaType("page").documentId(pageId)),
      S.listItem()
        .title("Sub-pages")
        .child(
          S.documentList()
            .title("Pages")
            .schemaType("page")
            .filter('_type == "page" && $pageId == parent._ref')
            .params({ pageId })
            .child(pageChildResolver)
        ),
    ]);
}

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Pages")
        .child(
          S.documentList()
            .title("Top pages")
            .menuItems(S.documentTypeList("page").getMenuItems())
            .filter("_type == $type && !defined(parent)")
            .params({ type: "page" })
            .child(pageChildResolver)
        ),
      S.documentTypeListItem("pageType"),
    ]);
