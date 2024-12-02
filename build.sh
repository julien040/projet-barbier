#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1

# Ensure ffmpeg is installed
if ! command -v ffmpeg &>/dev/null; then
    echo "ffmpeg n'est pas installé. Installez-le dans le PATH pour que le programme fonctionne correctement."
    exit 1
fi

echo "Building the frontend..."
cd cv && npm install && npm run build && cd ..

echo "Building the backend..."
cd api && npm install && npm run build && cd ..
