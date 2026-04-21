<script setup lang="ts">
import { reactive } from 'vue';
import Button from '@/components/Button.vue';
import Link from '@/components/Link.vue';
import TextField from '@/components/TextField.vue';

const form = reactive({
  email: '',
  password: '',
});
</script>

<template>
  <form class="w-login-view" @submit.prevent>
    <h1 class="heading">Login</h1>

    <TextField class="field" label="Email Address*" type="email" v-model="form.email" />
    <TextField class="field" label="Password*" type="password" v-model="form.password" />

    <Link class="forgot" :to="{ name: 'auth:reset_password' }">Forgot your password?</Link>

    <Button class="submit" text="Login" submit />

    <span class="rule"></span>

    <div class="register">
      Don't have an account? <Link class="link" :to="{ name: 'auth:register' }">Register</Link>
    </div>
  </form>
</template>

<style>
@layer source {
  .w-login-view {
    display: flex;
    flex-direction: column;

    &>.heading {
      text-align: center;
    }

    &>.field+.field {
      margin-block-start: 0.5rem;
    }

    &>.forgot {
      align-self: end;
      color: var(--color-mute);
      font-size: 0.875rem;
      font-weight: 500;
      margin-block-start: 0.25rem;
      transition-property: color;

      &:hover {
        color: var(--color-accent);
      }
    }

    &>.submit {
      margin-block-start: 1.5rem;
    }

    &>.rule {
      border-block-end: 0.0625rem solid var(--color-border);
      display: inline-block;
      margin-block: 1rem;
    }

    &>.register {
      color: var(--color-mute);
      font-size: 0.875rem;
      font-weight: 300;
      text-align: center;

      &>.link {
        font-weight: 500;
        transition-property: color;

        &:hover {
          color: var(--color-accent);
        }
      }
    }
  }
}
</style>
