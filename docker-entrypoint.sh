#!/bin/sh
set -e

if [ ! -d node_modules ]; then
  yarn install --frozen-lockfile
fi

exec "$@"
