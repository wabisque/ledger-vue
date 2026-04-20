<script setup lang="ts">
import { computed, useAttrs, type Attrs } from 'vue';

interface Props {
  label?: string,
  pointer?: string,
  type?: 'text' | 'email' | 'password',
}

const INPUT_ATTR_KEYS = [
  'autocomplete',
];

withDefaults(defineProps<Props>(), { type: 'text' });

const model = defineModel();
const attrs = useAttrs();

const generalAttrs = computed(() => {
  const result: Attrs = {};

  for (const key in attrs) {
    if (!INPUT_ATTR_KEYS.includes(key))
      result[key] = attrs[key];
  }

  return result;
});
const inputAttrs = computed(() => {
  const result: Attrs = {};

  for (const key in attrs) {
    if (INPUT_ATTR_KEYS.includes(key))
      result[key] = attrs[key];
  }

  return result;
});
</script>

<template>
  <div class="w-text-field" v-bind="generalAttrs">
    <label :for="pointer" class="label" v-if="label">{{ label }}</label>
    <input :type="type" class="input" :id="pointer" v-model="model" v-bind="inputAttrs">
  </div>
</template>

<style>
@layer source {
  .w-text-field {
    block-size: min-content;
    display: inline grid;
    grid-template-columns: [input-start label-start] 1fr [input-end label-end];
    grid-template-rows: [label-start] auto [label-end input-start] auto [input-end];

    &>.label {
      font-size: 0.75em;
      font-weight: 500;
      grid-area: label;
      margin-block-end: 0.25em;
      margin-inline-start: 0.75em;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &>.input {
      --_outline-alpha: 0;

      background-color: transparent;
      border: 0.0625rem solid var(--color-border);
      border-radius: var(--radius-md);
      grid-area: input;
      outline: 0.125rem solid rgb(from var(--color-accent) r g b / var(--_outline-alpha));
      outline-offset: 0;
      padding-block: 0.5em;
      padding-inline: 0.75em;
      transition-property: box-shadow, outline-color, outline-offset;

      &:focus-visible {
        --_outline-alpha: 1;

        box-shadow: var(--shadow-sm);
        outline-offset: 0.125rem;
      }
    }
  }
}
</style>
