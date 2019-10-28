#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

source ~/.bashrc

# setup node version
nvm install 11.14.0
nvm use 11.14.0
nvm alias default 11.14.0

npm install --global yarn