#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

source ~/.bashrc

echo "Installing Chrome Browser"
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - 
sudo sh -c 'echo "deb https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
sudo apt update && sudo apt install google-chrome-stable
