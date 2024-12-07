<script setup>
const props = defineProps({
  src: {
    required: true,
    type: [Object, String],
    default: {
      src: "344060",
      provider: "wagtail",
      alt: "Fallback image",
    },
  },
})
</script>

<template>
  <pre>{{ props.src }}</pre>
  <NuxtImg
    v-bind:provider="props.src?.provider"
    :src="typeof props.src === 'string' ? props.src : props.src.src"
    style="width: 100%; height: auto"
    v-bind="{ ...$attrs }"
  >
    <template v-for="(value, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </NuxtImg>
  <!-- <NuxtImg :placeholder="img(`/nuxt.svg`, { h: 10, f: 'png', blur: 2, q: 50 })" src="/nuxt.svg`" /> -->
</template>

<style lang="scss" scoped></style>
