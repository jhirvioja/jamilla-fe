#!/bin/bash

set -e

echo "Setting environment variables"

eval $(printenv | sed -n "s/^\([^=]\+\)=\(.*\)$/export \1=\2/p" | sed 's/"/\\\"/g' | sed '/=/s//="/' | sed 's/$/"/' >> /etc/profile)

echo "Starting Jamilla Recipes Next app frontend"

node_modules/.bin/next start -p 3000