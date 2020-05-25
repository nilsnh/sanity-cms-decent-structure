import S from '@sanity/desk-tool/structure-builder'
import { GiFruitTree, GiLemon } from 'react-icons/gi'

async function pageChildResolver(pageId) {
  return S.list()
    .title('Pages')
    .initialValueTemplates([
      S.initialValueTemplateItem('sub-page', { parentPageId: pageId }),
    ])
    .items([
      S.listItem()
        .title('Edit page')
        .child(S.document().schemaType('page').documentId(pageId)),
      S.listItem()
        .title('Sub-pages')
        .child(
          S.documentList()
            .title('Pages')
            .schemaType('page')
            .filter('_type == "page" && $pageId == parent._ref')
            .params({ pageId })
            .child(pageChildResolver)
            .initialValueTemplates([
              S.initialValueTemplateItem('sub-page', {
                parentPageId: pageId,
              }),
            ])
        ),
    ])
}

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Page')
        .icon(GiFruitTree)
        .child(
          S.documentList()
            .title('Top pages')
            .menuItems(S.documentTypeList('page').getMenuItems())
            .filter('_type == $type && !defined(parent)')
            .params({ type: 'page' })
            .child(pageChildResolver)
        ),
      S.documentTypeListItem('pageType').icon(GiLemon),
    ])
