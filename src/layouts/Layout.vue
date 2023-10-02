<template>
  <component :is="layout"></component>
</template>

<script>
import { computed } from 'vue'
import DefaultLayout from './DefaultLayout.vue'
import EmptyLayout from './EmptyLayout.vue'
import { useRoute } from 'vue-router'

export default {
  components: {
    DefaultLayout,
    EmptyLayout,
  },
  setup() {
    const route = useRoute()
    const layout = computed(() => route.meta.layout || 'DefaultLayout')

    return {
      layout
    }
  },
}
</script>

<style lang="scss" scoped></style>
