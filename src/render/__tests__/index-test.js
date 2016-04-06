/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import generate from 'babel-generator';
import * as build from 'babel-types';
import render from '../index';

declare function describe(description: string, body: any): void;
declare function it(description: string, body: any): void;

function expectedOutput(name) {
  return fs
    .readFileSync(fixtureFilename(name, 'js'), 'utf8')
    .trim();
}

function fixtureFilename(name, ext) {
  return path.join(__dirname, name) + '.' + ext;
}

function readFixtures(dir) {
  return fs
    .readdirSync(path.join(__dirname, dir))
    .filter(name => /\.json$/.exec(name))
    .map(name => path.join(dir, name.replace(/\.json$/, '')));
}

let config = {
  blockComponents: {
    Block: build.identifier('Block'),
    SubBlock: build.identifier('SubBlock'),
  }
};

function generateCases(dir) {
  let fixtures = readFixtures(dir);
  fixtures.forEach(fixture => {
    it(`renders ${fixture}`, function() {
      let src = fs.readFileSync(fixtureFilename(fixture, 'json'), 'utf8');
      let node = JSON.parse(src);
      let jsnode = render(node, config).expression;
      let {code} = generate(jsnode);
      assert.equal(code, expectedOutput(fixture));
    });
  });
}

describe('reactdown/render', function() {
  describe('markdown', function() {
    generateCases('markdown-fixture');
  });
  describe('customBlock', function() {
    generateCases('customBlock-fixture');
  });
});