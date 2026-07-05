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
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'auto', label: 'System' },
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
      <svg
        v-if="opt.value === 'light'"
        class="hs-theme-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
        />
      </svg>
      <svg
        v-else-if="opt.value === 'dark'"
        class="hs-theme-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <svg
        v-else
        class="hs-theme-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
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

.hs-theme-opt .hs-theme-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
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
