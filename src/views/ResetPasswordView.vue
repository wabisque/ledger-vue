<script setup lang="ts">
import { reactive } from 'vue';
import TextField from '@/components/TextField.vue';
import TokenField from '@/components/TokenField.vue';
import Button from '@/components/Button.vue';
import Link from '@/components/Link.vue';

const form = reactive({
  email: '',
  token: 'abc',
  password: '',
  password_confirmation: '',
});
</script>

<template>
  <form class="w-reset-password-view" @submit.prevent>
    <h1 class="heading">Reset Password</h1>

    <TextField class="field" label="Email Address*" type="email" autocomplete="off" v-model="form.email" />

    <TokenField class="field" label="Token*" v-model="form.token" />

    <span class="resend">
      You can request for another token:
      <a href="javascript:void(0);" class="action">Now</a>
    </span>

    <span class="rule"></span>

    <TextField class="field" label="Password*" type="password" autocomplete="off" v-model="form.password" />
    <TextField class="field" label="Confirm Password*" type="password" autocomplete="off"
      v-model="form.password_confirmation" />

    <Button class="submit" text="Reset Password" submit />

    <span class="rule"></span>

    <div class="login">
      <Link class="link" :to="{ name: 'auth:login' }">Login with your existing password!</Link>
    </div>
  </form>
</template>

<style>
@layer source {
  .w-reset-password-view {
    display: flex;
    flex-direction: column;

    &>.heading {
      text-align: center;
    }

    &>.field+.field {
      margin-block-start: 0.5rem;
    }

    &>.resend {
      color: var(--color-mute);
      font-size: 0.875rem;
      font-weight: 300;
      margin-block-start: 0.25rem;
      text-align: end;

      &>.action {
        font-weight: 500;
        transition-property: color;

        &:hover {
          color: var(--color-accent);
        }
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

    &>.login {
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
