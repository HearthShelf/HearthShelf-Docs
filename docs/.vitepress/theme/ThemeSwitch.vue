<script setup lang="ts">
import { useStorage } from '@vueuse/core'

// VitePress drives the `.dark` class from this exact localStorage key via
// VueUse's `useDark` (see vitepress/dist/client/app/data.js). `useDark` stores
// one of 'auto' | 'light' | 'dark' and, when the value is 'auto', it already
// live-follows the OS `prefers-color-scheme`. The stock toggle only flips
// dark<->light and never restores 'auto', so there's no way back to "System".
//
// We bind the SAME key here. Writing 'auto'/'light'/'dark' updates VitePress's
// own `isDark` (they share the store), so it keeps managing the `.dark` class
// and we don't touch the DOM ourselves — no class fight, no flash.
const mode = useStorage<'auto' | 'light' | 'dark'>('vitepress-theme-appearance', 'auto')

const options = [
  { value: 'light', label: 'Light', icon: 'light_mode' },
  { value: 'dark', label: 'Dark', icon: 'dark_mode' },
  { value: 'auto', label: 'System', icon: 'desktop_windows' },
] as const
</script>

<template>
  <div class="hs-theme-switch" role="radiogroup" aria-label="Color theme">
    <button
      v-for="opt in options"
      :key="opt.value"
      class="hs-theme-opt"
      :class="{ 'is-active': mode === opt.value }"
      role="radio"
      :aria-checked="mode === opt.value"
      :title="opt.label"
      @click="mode = opt.value"
    >
      <span class="ms" aria-hidden="true">{{ opt.icon }}</span>
      <span class="hs-theme-opt-label">{{ opt.label }}</span>
    </button>
  </div>
</template>

<style scoped>
.hs-theme-switch {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--hs-border);
  border-radius: 999px;
  background: var(--hs-surface-2);
}

.hs-theme-opt {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 999px;
  background: none;
  color: var(--hs-text-muted);
  font-family: 'DM Sans', sans-serif;
  font-size: 12.5px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  transition:
    color 0.15s ease,
    background 0.15s ease;
}

.hs-theme-opt .ms {
  font-size: 17px;
}

.hs-theme-opt:hover {
  color: var(--hs-text);
}

.hs-theme-opt.is-active {
  color: #fff;
  background: var(--hs-ember);
}

/* On the tight nav bar, show icons only; labels return in the mobile menu. */
@media (min-width: 768px) {
  .hs-theme-opt-label {
    display: none;
  }
}
</style>
