<script setup lang="ts">
interface Props {
  submit?: boolean,
  text?: string,
}

withDefaults(defineProps<Props>(), { submit: false, text: 'Button' });
</script>

<template>
  <button class="w-button" :type="submit ? 'submit' : 'button'">
    <span class="text">{{ text }}</span>
  </button>
</template>

<style>
@layer source {
  .w-button {
    --_outline-alpha: 0;

    background-color: var(--color-accent);
    border: none;
    border-radius: var(--radius-md);
    color: var(--color-complement);
    cursor: pointer;
    outline: 0.125rem solid rgb(from var(--color-accent) r g b / var(--_outline-alpha));
    outline-offset: 0;
    padding-block: 0.5rem;
    padding-inline: 1.25rem;
    transition-property: box-shadow, outline-color, outline-offset;

    &>.text {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &:focus-visible {
      --_outline-alpha: 1;

      box-shadow: var(--shadow-sm);
      outline-offset: 0.125rem;
    }
  }
}
</style>
