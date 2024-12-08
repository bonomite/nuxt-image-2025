<script setup>
import { imageNormalizer } from "~/utils/imageNormalizer"
import { wagtailImage, publisherImage, nprImage } from "~/utils/imageData"
</script>
<template>
  <div>
    <p>local:</p>
    <VImage
      src="/raven_phoenix_mix.jpg"
      credit="Photo by Thomas Bono"
      alt="two birds"
      caption="this is a sample caption"
    >
      <template #above>This is a named slot above the image</template>
      <template #below>This is a named slot below the image</template>
    </VImage>
    <p>wagtail:</p>
    <VImage :src="imageNormalizer(wagtailImage)" width="600" height="100" />
    <p>wagtail raw:</p>
    <VImage :src="imageNormalizer(wagtailImage)" />
    <p>publisher:</p>
    <VImage :src="imageNormalizer(publisherImage)" width="600" height="100" />
    <p>publisher raw:</p>
    <VImage :src="imageNormalizer(publisherImage)" />
    <p>npr W:</p>
    <VImage :src="imageNormalizer(nprImage)" width="300" />
    <p>npr W & H (can't have a custom ratio):</p>
    <VImage :src="imageNormalizer(nprImage)" width="300" height="50" />
    <p>npr raw:</p>
    <VImage :src="imageNormalizer(nprImage)" />
    <p>npr square:</p>
    <VImage :src="imageNormalizer(nprImage, 'square')" width="300" />
    <p>npr wide:</p>
    <VImage :src="imageNormalizer(nprImage, 'wide')" width="300" />
  </div>
</template>
