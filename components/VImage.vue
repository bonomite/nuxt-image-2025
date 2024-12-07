<script setup>
const props = defineProps({
  src: {
    required: true,
    type: [Object, String],
    default: "344060",
  },
})
</script>

<template>
  <NuxtImg
    :key="props.src.id"
    v-bind:provider="props.provider"
    :src="props.src.src"
    style="width: 100%; height: auto"
    v-bind="{ ...$props, ...$attrs }"
  >
    <template v-for="(value, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </NuxtImg>
  <!-- <NuxtImg :placeholder="img(`/nuxt.svg`, { h: 10, f: 'png', blur: 2, q: 50 })" src="/nuxt.svg`" /> -->
</template>

<style lang="scss" scoped></style>
