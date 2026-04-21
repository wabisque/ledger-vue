<script setup lang="ts">
import { useLink, type RouterLinkProps } from 'vue-router';

interface Props extends RouterLinkProps { }

const props = defineProps<Props>();

const { href, isActive, isExactActive, navigate } = useLink(props);
</script>

<template>
  <a :href="href" class="w-link" :class="{ [activeClass ?? '']: isActive, [exactActiveClass ?? '']: isExactActive }"
    @click="navigate">
    <slot />
  </a>
</template>
