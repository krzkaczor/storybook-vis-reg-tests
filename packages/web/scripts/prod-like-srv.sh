#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

openssl req -x509 -nodes -subj "/C=US/ST=FL/L=Ocala/O=Home/CN=example.com" -newkey rsa:2048 -keyout key.pem -out cert.pem

node http-server.js
