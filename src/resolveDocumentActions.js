// resolveDocumentActions.js

// import the default document actions
import defaultResolve from "part:@sanity/base/document-actions";

import { AddChildPageAction } from "./addChildPage";

export default function resolveDocumentActions(props) {
  if (props.type !== "page") {
    return defaultResolve(props);
  }
  return [...defaultResolve(props), AddChildPageAction];
}
