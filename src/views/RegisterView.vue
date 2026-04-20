<script setup lang="ts">
import { reactive } from 'vue';
import Button from '@/components/Button.vue';
import Link from '@/components/Link.vue';
import TextField from '@/components/TextField.vue';

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
});
</script>

<template>
  <form class="w-register-view" @submit.prevent>
    <h1 class="heading">Sign Up</h1>

    <TextField class="field" label="First Name*" pointer="first_name" autocomplete="off" v-model="form.first_name" />
    <TextField class="field" label="Last Name*" pointer="last_name" autocomplete="off" v-model="form.last_name" />
    <TextField class="field" label="Email Address*" pointer="email" type="email" autocomplete="off"
      v-model="form.email" />
    <TextField class="field" label="Password*" pointer="password" type="password" autocomplete="off"
      v-model="form.password" />
    <TextField class="field" label="Confirm Password*" pointer="password_confirmation" type="password"
      autocomplete="off" v-model="form.password_confirmation" />

    <Button class="submit" text="Register" submit />

    <span class="rule"></span>

    <div class="login">
      Already have an account? <Link class="link" :to="{ name: 'auth:login' }">Login</Link>
    </div>
  </form>
</template>

<style>
@layer source {
  .w-register-view {
    display: flex;
    flex-direction: column;

    &>.heading {
      text-align: center;
    }

    &>.field+.field {
      margin-block-start: 0.5rem;
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
