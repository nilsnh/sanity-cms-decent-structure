# Sanity hierarchical structure implementation

> "One does not simply build a tree of pages."

The goal of this project is to be a reference implementation of a decent hierarchical page-of-pages tree structure in Sanity CMS. Sanity has a lot of freedom in how to implement this type of structure, which we can change again and again over time. Nonetheless, it's great to do a bit of :sparkles: up-front-design :sparkles: to lessen work down the road.

## Features

- [x] Ability to create an infinitely deep tree structure of pages
- [x] Ability to define page type as a reference to a pageType document. This is to be able to show different templates in the frontend based on the type of content. Yes, we shouldn't tailor content for presentation but I think we at least need something like this.
- [x] Users should be able to edit the page, and any sub-pages in the tree structure.
- [ ] The slug of child-pages should automatically be prefixed with the slug of parent page(s).
- [ ] Updating a parent-page slug should update the slugs of any children.
- [x] Use initialValue template to ensure that any documents created in the dynamic tree-structure is connected to the correct parent page.
- [ ] When clicking on a given page in the desk structure, if the page does not have children it should just give us the document editor.
- [ ] The document editor there should have a custom action for creating a sub-page connected to that page. This is required if we implement the previous point.
- [ ] Ability to extend any page with extra "meta-blocks". It's not a must but we should show how we can open for extra meta-data on certain pages, as an alternative to adding extra fields on the page type.

## Usage

1. Install Sanity's command-line tool with `npm install -g @sanity/cli`.
1. Create a new project in https://manage.sanity.io/ for this repository and copy it's project id.
1. Copy env-example into a file called .env.development and fill out the Sanity project id you just created.
1. Run `sanity install`
1. Run `sanity start` and goto http://localhost:3333 to start hacking away.

## Contributing

This project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

Pull requests that suddenly suggest a lot of changes might not get merged in. The goal of this codebase is to be a decent example, not a infinitely configurable implementation. If you're unsure open an issue to suggest changes first, before coding. The answer to a suggestion might be yes, or it might be no.

## License

This repository is licensed under the [AGPLv3 license](LICENSE.md).

Copyright © 2020 Nils Norman Haukås
