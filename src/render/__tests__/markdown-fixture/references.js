import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultComponents from "reactdown/lib/components";
import * as customComponents from "reactdown/lib/components";
let components = { ...defaultComponents, ...customComponents };
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(components.Root, null, React.createElement(components.Heading, {
    "level": 1
  }, "References"), React.createElement(components.Paragraph, null, "Entities contains some serious entity tests relating to titles and links\nin definitions."), React.createElement(components.Paragraph, null, "However, the ", React.createElement(components.Link, {
    "href": "",
    "title": undefined
  }, "missing"), ", ", React.createElement(components.Link, {
    "href": "",
    "title": undefined
  }, "missing"), ", and ", React.createElement(components.Link, {
    "href": "",
    "title": undefined
  }, "missing"), " are omitted."), React.createElement(components.Paragraph, null, "However, the ", React.createElement(components.Image, {
    "src": "",
    "alt": "missing",
    "title": undefined
  }), ", ", React.createElement(components.Image, {
    "src": "",
    "alt": "missing",
    "title": undefined
  }), ", and ", React.createElement(components.Image, {
    "src": "",
    "alt": "missing",
    "title": undefined
  }), " are omitted."), React.createElement(components.Paragraph, null, "Same goes for ", React.createElement(components.Link, {
    "href": "",
    "title": undefined
  }), " and ", React.createElement(components.Image, {
    "src": "",
    "alt": "",
    "title": undefined
  }), "."), null));
}
export let metadata = {};
export let model = {
  "toc": [{
    "value": "References",
    "depth": 1
  }],
  "title": "References"
};
