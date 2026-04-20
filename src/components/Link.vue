<script setup lang="ts">
import { computed } from 'vue';
import { useLink, type RouterLinkProps } from 'vue-router';

interface Props extends RouterLinkProps {
  external?: boolean,
}

const props = withDefaults(defineProps<Props>(), { external: false });

const { href, isActive, isExactActive, navigate } = props.external && typeof props.to == 'string'
  ? {
    href: props.to,
    isActive: computed(() => false),
    isExactActive: computed(() => false),
    navigate: (e?: MouseEvent) => { },
  }
  : useLink(props);
</script>

<template>
  <a :href="href" class="w-link" :class="{ [activeClass ?? '']: isActive, [exactActiveClass ?? '']: isExactActive }"
    @click="navigate">
    <slot />
  </a>
</template>

<style>
@layer source {

  .w-link {
    color: inherit;
  }
}
</style>
