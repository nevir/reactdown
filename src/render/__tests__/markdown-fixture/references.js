import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as elements from "reactdown/lib/elements";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Heading, {
    "level": 1
  }, "References"), React.createElement(elements.Paragraph, null, "Entities contains some serious entity tests relating to titles and links\nin definitions."), React.createElement(elements.Paragraph, null, "However, the ", React.createElement(elements.Link, {
    "href": "",
    "title": undefined
  }, "missing"), ", ", React.createElement(elements.Link, {
    "href": "",
    "title": undefined
  }, "missing"), ", and ", React.createElement(elements.Link, {
    "href": "",
    "title": undefined
  }, "missing"), " are omitted."), React.createElement(elements.Paragraph, null, "However, the ", React.createElement(elements.Image, {
    "src": "",
    "alt": "missing",
    "title": undefined
  }), ", ", React.createElement(elements.Image, {
    "src": "",
    "alt": "missing",
    "title": undefined
  }), ", and ", React.createElement(elements.Image, {
    "src": "",
    "alt": "missing",
    "title": undefined
  }), " are omitted."), React.createElement(elements.Paragraph, null, "Same goes for ", React.createElement(elements.Link, {
    "href": "",
    "title": undefined
  }), " and ", React.createElement(elements.Image, {
    "src": "",
    "alt": "",
    "title": undefined
  }), "."), null));
}
export let metadata = null;
