<script setup lang="ts">
// Auth control for the hs.com nav. Always surfaces a "My HearthShelf" link into
// app.hearthshelf.com. When signed in, the account avatar is shown alongside it.
//
// @clerk/vue gates content with <Show when="signed-in|signed-out">. Clerk is
// client-only, so the whole thing renders inside <ClientOnly> (a VitePress
// global) and waits for <ClerkLoaded> to avoid a flash before hydration.
//
// The Clerk plugin is only installed when a publishable key is configured
// (see theme/index.ts). Without it, the Clerk components call useClerk() with
// no plugin and crash the nav - so we gate the live UI on `clerkReady` and
// fall back to a plain "My HearthShelf" link when Clerk isn't available.
import { defineAsyncComponent } from 'vue'

const APP_URL = 'https://app.hearthshelf.com'
const clerkReady = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// Async so the @clerk/vue bundle is only pulled in when a key exists.
const ClerkNav = clerkReady
  ? defineAsyncComponent(() => import('./ClerkNav.vue'))
  : null
</script>

<template>
  <ClientOnly>
    <component :is="ClerkNav" v-if="ClerkNav" />
    <div v-else class="auth-nav">
      <a class="auth-cta" :href="APP_URL">My HearthShelf</a>
    </div>
  </ClientOnly>
</template>

<style scoped>
.auth-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 4px;
}
.auth-cta {
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  padding: 6px 14px;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}
.auth-cta:hover {
  background: var(--vp-c-brand-2);
}
</style>
