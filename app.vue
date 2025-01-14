<script setup>
import { imageNormalizer } from "~/utils/imageNormalizer"
import { wagtailImage, publisherImage, nprImage } from "~/utils/imageData"
const wagtailImageNormalized = imageNormalizer(wagtailImage)
const publisherImageNormalized = imageNormalizer(publisherImage)
const nprImageNormalized = imageNormalizer(nprImage)
const nprImageNormalizedSq = imageNormalizer(nprImage, "square")
const nprImageNormalizedWd = imageNormalizer(nprImage, "wide")
</script>
<template>
  <div>
    <p>local:</p>
    <VImage
      src="/raven_phoenix_mix.jpg"
      credit="Photo by Thomas Bono"
      alt="two birds"
      caption="This is a sample caption"
    >
      <template #above>slot above the image</template>
      <template #below>slot below the image</template>
    </VImage>
    <p>wagtail:</p>
    <VImage :src="wagtailImageNormalized" width="600" height="100" />
    <p>wagtail raw:</p>
    <VImage :src="wagtailImageNormalized" />
    <p>publisher:</p>
    <VImage :src="publisherImageNormalized" width="600" height="100" />
    <p>publisher raw:</p>
    <VImage :src="publisherImageNormalized" />
    <p>npr W:</p>
    <VImage :src="nprImageNormalized" width="300" />
    <p>npr W & H (can't have a custom ratio):</p>
    <VImage :src="nprImageNormalized" width="300" height="50" />
    <p>npr raw:</p>
    <VImage :src="nprImageNormalized" />
    <p>npr square:</p>
    <VImage :src="nprImageNormalizedSq" width="300" />
    <p>npr wide:</p>
    <VImage :src="nprImageNormalizedWd" width="300" />
  </div>
</template>
