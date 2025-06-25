<script setup lang="ts">
interface Props {
  isFilled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isFilled: false,
});
</script>
<template>
  <svg
    v-if="props.isFilled"
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="11"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M21 20.794H3a1 1 0 0 1-.866-1.5l9-15.588a1.04 1.04 0 0 1 1.732 0l9 15.588a1 1 0 0 1-.866 1.5Z"
    />
  </svg>

  <svg
    v-if="!props.isFilled"
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="11"
    viewBox="0 0 480 448"
  >
    <path
      fill="#43425D"
      d="M473 373q7-11 0-21L259 11q-6-10-18-10t-18 10L10 352q-9 10 0 21q3 11 17 11h426q12 0 20-11zM65 341L240 62l175 279H65z"
    />
  </svg>
</template>

<style scoped>
.filled {
  fill: #43425d;
}
</style>
