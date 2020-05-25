import T from '@sanity/base/initial-value-template-builder'

export default [
  ...T.defaults(),
  T.template({
    id: 'sub-page',
    title: 'Sub-page',
    schemaType: 'page',
    parameters: [
      {
        name: 'parentPageId',
        title: 'Parent page id',
        type: 'string',
      },
    ],
    value: (parameters) => ({
      parent: { _ref: parameters.parentPageId },
    }),
  }),
]
