<script setup>
const props = defineProps({
  src: {
    required: true,
    type: String,
    default: "344060",
  },
})

const cmsSources = {
  NPR: "npr",
  PUBLISHER: "publisher",
  WAGTAIL: "wagtail",
  IPX: "ipx",
}

const NPRIMAGEDOMAINSOURCES = ["media.npr.org", "npr.brightspotcdn.com"]

// determines the CMS source of an image
const getCmsSource = (src) => {
  // if src is all just numbers, it's a wagtail image. using the domain for the others
  if (/^\d+$/.test(src)) {
    return cmsSources.WAGTAIL
  } else if (src.includes("media.wnyc.org")) {
    return cmsSources.PUBLISHER
  } else if (NPRIMAGEDOMAINSOURCES.some((domain) => src.includes(domain))) {
    return cmsSources.NPR
  } else {
    return null
  }
}
</script>

<template>
  hello world!
  <NuxtImg :src="props.src" v-bind="{ ...$props, ...$attrs }" />
  <!-- <NuxtImg :placeholder="img(`/nuxt.svg`, { h: 10, f: 'png', blur: 2, q: 50 })" src="/nuxt.svg`" /> -->
</template>

<style lang="scss" scopped></style>
