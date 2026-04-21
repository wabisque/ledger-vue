<script setup lang="ts">
import { useTemplateRef, watch } from 'vue';

interface Props {
  label?: string,
  length?: number,
}

const props = withDefaults(defineProps<Props>(), { length: 6 });
const emit = defineEmits(['update:modelValue']);
const model = defineModel<string>({ default: '' });
const inputRefs = useTemplateRef('inputs');

function adjust(value = model.value) {
  if (!inputRefs.value)
    return;

  for (let index = 0; index < inputRefs.value.length; index++)
    inputRefs.value[index]!.value = value[index] ?? '';
}

function backspace() {
  const value = model.value.slice(0, -1);

  emit('update:modelValue', value);
  adjust(value);
}

function focus() {
  const index = Math.max(Math.min(model.value.length, props.length - 1), 0);

  inputRefs.value?.[index]?.focus();
}

function input() {
  const value = inputRefs.value
    ?.map(el => el.value.replace(/\s+/g, ''))
    .join('')
    .slice(0, props.length)
    ?? '';

  emit('update:modelValue', value);
  adjust(value);
}

watch(model, () => {
  if (inputRefs.value?.includes((document.activeElement as HTMLInputElement)))
    focus();
});
</script>

<template>
  <div class="w-token-field" :style="{ '--_value-length': length }">
    <label class="label" @click="focus" v-if="label">{{ label }}</label>
    <input type="text" class="input" ref="inputs" :key="index" autocomplete="one-time-code webauthn"
      :value="model[index]" @focus.prevent="focus" @input.prevent="input" @keydown.backspace.delete="backspace"
      v-for="(,index) in length">
  </div>
</template>

<style>
@layer source {
  .w-token-field {
    block-size: min-content;
    display: inline grid;
    grid-template-columns: [input-start label-start] repeat(var(--_value-length), 1fr) [input-end label-end];
    grid-template-rows: [label-start] auto [label-end input-start] auto;
    column-gap: 0.5rem;

    &>.label {
      font-size: 0.75em;
      font-weight: 500;
      grid-area: label;
      justify-self: start;
      margin-block-end: 0.25em;
      margin-inline-start: 0.75em;
      overflow: hidden;
      text-overflow: ellipsis;
      user-select: none;
    }

    &>.input {
      --_padding-inline-start: 0.5em;
      --_padding-inline-end: 0.5em;
      --_outline-alpha: 0;

      background-color: transparent;
      border: 0.0625rem solid var(--color-border);
      border-radius: var(--radius-md);
      font-weight: 300;
      grid-row: 2;
      inline-size: 100%;
      min-inline-size: calc(var(--_padding-inline-start) + var(--_padding-inline-end) + 0.125rem + 1ch);
      outline: 0.125rem solid rgb(from var(--color-accent) r g b / var(--_outline-alpha));
      outline-offset: 0;
      padding-block: 0.5em;
      padding-inline: var(--_padding-inline-start) var(--_padding-inline-end);
      text-align: center;
      transition-property: box-shadow, outline-color, outline-offset;

      &:focus-visible,
      &:has(~.input:focus-visible) {
        --_outline-alpha: 1;

        box-shadow: var(--shadow-sm);
        outline-offset: 0.125rem;
      }
    }
  }
}
</style>
