import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { clerkPlugin } from '@clerk/vue'
import NavAuth from './NavAuth.vue'
import NavLogo from './NavLogo.vue'
import HeroName from './HeroName.vue'
import NotFound from './NotFound.vue'
import ThemeSwitch from './ThemeSwitch.vue'
import './custom.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export default {
  ...DefaultTheme,
  Layout() {
    // Inject the auth control into the nav. NavAuth wraps its Clerk UI in
    // <ClientOnly> itself, so SSR is safe.
    return h(DefaultTheme.Layout, null, {
      'nav-bar-title-before': () => h(NavLogo),
      'nav-bar-content-after': () => [h(ThemeSwitch), h(NavAuth)],
      'home-hero-info-before': () => h(HeroName),
      'not-found': () => h(NotFound),
    })
  },
  enhanceApp({ app }) {
    // Clerk plugin. Guarded: only initialise in the browser and only when a key
    // is configured, so SSR/builds without the key don't crash.
    if (PUBLISHABLE_KEY && typeof window !== 'undefined') {
      app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY })
    }
  },
}
