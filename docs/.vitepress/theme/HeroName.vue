<script setup lang="ts">
// The default hero renders the site name as a single text node
// (<span class="name clip">HearthShelf</span>). The brand wordmark is two-tone:
// "Hearth" regular gold, "Shelf" bold cream (see NavLogo.vue). Split the text
// node into two styled spans on mount so the home page heading matches the nav
// lockup exactly. Renders nothing itself.
import { onMounted, onUnmounted } from 'vue'

function splitWordmark() {
  const name = document.querySelector('.VPHero .name')
  if (!name || name.querySelector('.hs-hearth')) return
  if (name.textContent?.trim() !== 'HearthShelf') return
  name.textContent = ''
  const hearth = document.createElement('span')
  hearth.className = 'hs-hearth'
  hearth.textContent = 'Hearth'
  const shelf = document.createElement('span')
  shelf.className = 'hs-shelf'
  shelf.textContent = 'Shelf'
  name.append(hearth, shelf)
}

let observer: MutationObserver | undefined

onMounted(() => {
  splitWordmark()
  // The hero can re-render on client-side navigation back to home; re-apply.
  observer = new MutationObserver(() => splitWordmark())
  observer.observe(document.body, { childList: true, subtree: true })
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <span style="display: none" />
</template>
