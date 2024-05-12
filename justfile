serve:
  hugo serve --noHTTPCache --disableFastRender

journey number:
  hugo new content logs/journey-{{number}}


usewebp:
  find ./content -type f -name '*.png' -exec sh -c 'cwebp -q 75 $1 -o "${1%.png}.webp"' _ {} \;
  find ./content -type f -name '*.jpg' -exec sh -c 'cwebp -q 75 $1 -o "${1%.jpg}.webp"' _ {} \;
