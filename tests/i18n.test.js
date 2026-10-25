"use strict";

var assert = require("assert");
var fs = require("fs");
var path = require("path");
var i18n = require("../public/assets/i18n.js");

var en = Object.keys(i18n.dict.en).sort();
var tr = Object.keys(i18n.dict.tr).sort();
assert.deepStrictEqual(tr, en, "en and tr must have the same keys");

var root = path.join(__dirname, "..", "public");
var used = {};
fs.readdirSync(root).concat(fs.readdirSync(path.join(root, "assets")).map(function (name) {
  return path.join("assets", name);
})).forEach(function (name) {
  if (!/\.(html|js)$/.test(name) || /i18n\.js$/.test(name)) return;
  var text = fs.readFileSync(path.join(root, name), "utf8");
  var patterns = [/data-i18n(?:-html)?="([\w.]+)"/g, /\bt\("([\w.]+)"\)/g, /[\w-]+:([a-z]+\.[\w]+)/g];
  patterns.forEach(function (pattern) {
    var match;
    while ((match = pattern.exec(text))) {
      if (pattern === patterns[2] && !/data-i18n-attr/.test(text.slice(Math.max(0, match.index - 200), match.index))) continue;
      used[match[1]] = name;
    }
  });
});
assert.ok(Object.keys(used).length > 40, "expected to find i18n keys in markup");
Object.keys(used).forEach(function (key) {
  if (!/^[a-z]+\.\w+$/.test(key)) return;
  assert.ok(key in i18n.dict.en, "missing i18n key " + key + " (" + used[key] + ")");
});

var repos = JSON.parse(fs.readFileSync(path.join(root, "assets", "repos.json"), "utf8"));
repos.forEach(function (repo) {
  assert.ok(repo.description && repo.description.en && repo.description.tr, repo.name + " needs en and tr descriptions");
});

assert.strictEqual(i18n.lang, "en", "default language is English");
assert.strictEqual(i18n.pick({ en: "A", tr: "B" }), "A");
assert.strictEqual(i18n.t("nav.repos"), "Repos");

console.log("i18n.test.js passed");
