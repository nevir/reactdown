import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultComponents from "reactdown/lib/components";
import * as customComponents from "reactdown/lib/components";
let components = { ...defaultComponents, ...customComponents };
import { Block } from "lib";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(components.Root, null, React.createElement(components.Paragraph, null, "Prologue"), React.createElement(Block, {
    "a": 1,
    "b": [1, 2, 3],
    "c": {
      "d": 4
    }
  })));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
