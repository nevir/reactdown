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
  }, React.createElement(components.Root, null, React.createElement(components.Table, null, React.createElement(components.TableHead, null, React.createElement(components.TableRow, null, React.createElement(components.TableHeaderCell, {
    "align": null
  }, "Alpha"), React.createElement(components.TableHeaderCell, {
    "align": "left"
  }, "Bravo"), React.createElement(components.TableHeaderCell, {
    "align": "right"
  }, "Charlie"), React.createElement(components.TableHeaderCell, {
    "align": "center"
  }, "Delta"))), React.createElement(components.TableBody, null, React.createElement(components.TableRow, null, React.createElement(components.TableCell, {
    "align": null
  }, "Echo"), React.createElement(components.TableCell, {
    "align": "left"
  }, "Foxtrot"), React.createElement(components.TableCell, {
    "align": "right"
  }, React.createElement(components.Strong, null, "Golf")), React.createElement(components.TableCell, {
    "align": "center"
  })), React.createElement(components.TableRow, null, React.createElement(components.TableCell, {
    "align": null
  }, "India"), React.createElement(components.TableCell, {
    "align": "left"
  }, "Juliett"), React.createElement(components.TableCell, {
    "align": "right"
  }, "Kilo"), React.createElement(components.TableCell, {
    "align": "center"
  }, "Lima")), React.createElement(components.TableRow, null, React.createElement(components.TableCell, {
    "align": null
  }, "Mike"), React.createElement(components.TableCell, {
    "align": "left"
  }, "November"), React.createElement(components.TableCell, {
    "align": "right"
  }, "Oscar"), React.createElement(components.TableCell, {
    "align": "center"
  }, React.createElement(components.Strikethrough, null, "Papa"))), React.createElement(components.TableRow, null, React.createElement(components.TableCell, {
    "align": null
  }, "Quebec"), React.createElement(components.TableCell, {
    "align": "left"
  }, React.createElement(components.Emphasis, null, "Romeo")), React.createElement(components.TableCell, {
    "align": "right"
  }, "Sierra"), React.createElement(components.TableCell, {
    "align": "center"
  }, "Tango")), React.createElement(components.TableRow, null, React.createElement(components.TableCell, {
    "align": null
  }, "Uniform"), React.createElement(components.TableCell, {
    "align": "left"
  }, "Victor"), React.createElement(components.TableCell, {
    "align": "right"
  }, "Whiskey"), React.createElement(components.TableCell, {
    "align": "center"
  }))))));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
