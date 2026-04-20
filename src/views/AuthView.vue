<script setup lang="ts">

</script>

<template>
  <main class="w-auth-view">
    <article class="card">
      <RouterView #default="{ Component, route }">
        <Transition :name="`w-transition-${route.meta.transition}`">
          <component class="form" :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </article>
  </main>
</template>

<style>
@layer source {
  .w-auth-view {
    align-content: center;
    justify-items: center;

    &>.card {
      --_margin: 1rem;

      display: grid;
      grid-template-columns: [form-start] 1fr [form-end];
      grid-template-rows: [form-start] auto [form-end];
      inline-size: calc(100% - var(--_margin) * 2);
      isolation: isolate;
      margin-inline: var(--_margin);
      max-inline-size: 28rem;

      &>.form {
        align-self: center;
        background-color: var(--color-surface);
        border: 0.0625rem solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
        grid-area: form;
        inline-size: 100%;
        padding: 1.5rem;
      }
    }
  }
}
</style>
