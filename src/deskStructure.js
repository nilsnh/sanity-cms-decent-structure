import S from '@sanity/desk-tool/structure-builder'
import documentStore from 'part:@sanity/base/datastore/document'
import { GiFruitTree, GiLemon } from 'react-icons/gi'
import { map } from 'rxjs/operators'

async function pageChildResolver(pageId) {
  return documentStore
    .listenQuery(
      `
        *[_id == $pageId]{
          ...,
          "childPages": *[_type == ^._type && references(^._id)]
        }[0]
      `,
      { pageId }
    )
    .pipe(
      map((result) => {
        const { childPages = [], ...doc } = result
        if (childPages.length === 0) {
          return S.document().schemaType('page').documentId(pageId)
        }
        return S.list()
          .title(doc.title || 'Untitled page')
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
                  .title(`Pages under: ${doc.title || 'Untitled page'}`)
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
      })
    )
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
