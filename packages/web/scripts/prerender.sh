#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

cd ../dist

(cd .. && node ./node_modules/.bin/prep ./dist)

node ../scripts/fix-prerender-pages.js
