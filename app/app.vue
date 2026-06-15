<script setup lang="ts">
const { locale, t } = useLocale()
const route = useRoute()

const isProductPage = computed(() => route.path.includes('/product/'))
const isCheckoutPage = computed(() => route.path.includes('/checkout'))
const isCartPage = computed(() => route.path.endsWith('/cart'))
const isAccountPage = computed(() => route.path.includes('/account'))
const isStylePage = computed(() => route.path.includes('/style'))

const hideTopBar = ref(false)
const hideBottomBar = useState<boolean>('hideBottomBar', () => false)
let lastScrollY = 0
let ticking = false
const SCROLL_DELTA = 8
const TOPBAR_HEIGHT = 96 // matches max-h-24; keep topbar shown within this zone

const update = () => {
  const currentY = Math.max(0, window.scrollY)

  if (currentY <= TOPBAR_HEIGHT) {
    // Near the top: always show. This "show zone" prevents the collapse/expand
    // layout shift from oscillating the state right at the boundary.
    hideTopBar.value = false
    hideBottomBar.value = false
    lastScrollY = currentY
  } else if (Math.abs(currentY - lastScrollY) > SCROLL_DELTA) {
    const goingDown = currentY > lastScrollY
    hideTopBar.value = goingDown
    hideBottomBar.value = goingDown
    lastScrollY = currentY
  }
  ticking = false
}

const handleScroll = () => {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(update)
  }
}

onMounted(() => {
  lastScrollY = Math.max(0, window.scrollY)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

useHead({
  htmlAttrs: {
    dir: computed(() => t.value.dir),
    lang: computed(() => locale.value),
  },
})
</script>

<template>
  <div>
    <div class="sticky top-0 z-50" :class="(isProductPage || isStylePage) ? 'hidden lg:block' : ''">
      <div
        class="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        :class="hideTopBar ? 'max-h-0' : 'max-h-24'"
      >
        <LayoutTopBar />
      </div>
      <div :class="isAccountPage ? 'hidden lg:block' : ''">
        <LayoutNavbar />
      </div>
    </div>
    <div :class="isStylePage ? 'lg:pb-0' : isProductPage ? 'pb-[130px] lg:pb-0' : isCheckoutPage ? 'pb-[260px] lg:pb-0' : isCartPage ? 'pb-[220px] lg:pb-0' : 'pb-[62px] lg:pb-0'">
      <NuxtPage />
    </div>
    <div class="hidden lg:block">
      <LayoutFooter />
    </div>
    <LayoutMobileBottomNav :hidden="hideBottomBar" />
  </div>
</template>
