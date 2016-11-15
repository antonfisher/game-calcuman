#!/usr/bin/env bash

mkdir -p resized;
cd ./raw && mogrify -monitor -path ../resized -resize 250x ss-*.png;

