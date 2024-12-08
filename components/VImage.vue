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
  hideCredit: { type: Boolean, default: false },
})
</script>

<template>
  <div>
    <!-- <pre>{{ props.src }}</pre> -->
    <slot class="slot above" name="above"></slot>
    <NuxtImg
      v-bind:provider="props.src?.provider"
      :src="typeof props.src === 'string' ? props.src : props.src.src"
      style="width: 100%; height: auto"
      v-bind="{ ...$attrs }"
    />
    <span
      v-if="!props.hideCredit"
      class="credit"
      v-html="$attrs.credit || props.src.credit"
    />
    <slot class="slot caption" name="caption">
      <span
        class="caption"
        v-if="$attrs.caption || props.src.caption"
        v-html="$attrs.caption || props.src.caption"
      />
    </slot>
    <slot class="slot below" name="below"></slot>
    <!-- <template v-for="(_, name) in $slots" :key="name">
      <slot class="slot" :name="name"></slot>
    </template> -->
    <!-- <NuxtImg :placeholder="img(`/nuxt.svg`, { h: 10, f: 'png', blur: 2, q: 50 })" src="/nuxt.svg`" /> -->
  </div>
</template>

<style lang="scss" scoped>
pre {
  white-space: pre-wrap; /* CSS 3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
  overflow-x: auto;
}
slot {
  margin: 0;
}
.credit {
  display: block;
  font-size: 0.75rem;
}
.caption {
  display: block;
}
</style>
