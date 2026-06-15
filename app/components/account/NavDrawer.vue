<script setup lang="ts">
const { t, locale, localePath } = useLocale()
const { navOpen, close } = useAccountNav()
const route = useRoute()

const user = { initials: 'MA' }

const menu = computed(() => [
  { key: 'details', icon: 'ri-user-3-line', label: t.value.account.myAccount, path: '/account/details' },
  { key: 'orders', icon: 'ri-inbox-archive-line', label: t.value.account.myOrders, path: '/account/orders' },
  { key: 'track-orders', icon: 'ri-truck-line', label: t.value.account.trackOrders, path: '/account/track-orders' },
  { key: 'wallet', icon: 'ri-wallet-3-line', label: t.value.account.walletHistory, path: '/account/wallet' },
  { key: 'points', icon: 'ri-coins-line', label: t.value.account.pointsHistory, path: '/account/points' },
  { key: 'addresses', icon: 'ri-map-pin-line', label: t.value.account.myAddresses, path: '/account/addresses' },
  { key: 'notifications', icon: 'ri-notification-3-line', label: t.value.account.notifications, path: '/account/notifications' },
])

const activeKey = computed(() => {
  const p = route.path
  if (p.includes('/account/details')) return 'details'
  if (p.includes('/account/orders')) return 'orders'
  if (p.includes('/account/track-orders')) return 'track-orders'
  if (p.includes('/account/wallet')) return 'wallet'
  if (p.includes('/account/points')) return 'points'
  if (p.includes('/account/addresses')) return 'addresses'
  if (p.includes('/account/notifications')) return 'notifications'
  return null
})

const logoutIcon = computed(() => locale.value === 'ar' ? 'ri-logout-box-line' : 'ri-logout-box-r-line')

const goTo = (path: string) => {
  close()
  navigateTo(localePath(path))
}

watch(navOpen, (val) => {
  if (import.meta.client) document.body.style.overflow = val ? 'hidden' : ''
})
</script>

<template>
  <Teleport to="body">
    <!-- Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="navOpen" class="fixed inset-0 bg-black/40 z-[200] lg:hidden" @click="close" />
    </Transition>

    <!-- Panel: 70% from inline-start (right in RTL, left in LTR) -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      :enter-from-class="locale === 'ar' ? 'translate-x-full' : '-translate-x-full'"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-250 ease-in"
      leave-from-class="translate-x-0"
      :leave-to-class="locale === 'ar' ? 'translate-x-full' : '-translate-x-full'"
    >
      <div
        v-if="navOpen"
        class="fixed inset-y-0 start-0 w-[70%] bg-white z-[210] overflow-y-auto lg:hidden"
        :style="locale === 'ar' ? 'box-shadow: -8px 0 24px 0 rgba(0,0,0,0.12)' : 'box-shadow: 8px 0 24px 0 rgba(0,0,0,0.12)'"
        :dir="t.dir"
      >
        <!-- Header: initials + title -->
        <button class="flex items-center gap-3 px-5 pt-7 pb-5 w-full" @click="goTo('/account')">
          <span class="w-10 h-10 rounded-full bg-icon-circle text-white text-[13px] font-bold flex items-center justify-center shrink-0 select-none">
            {{ user.initials }}
          </span>
          <span class="text-[16px] font-bold text-[#091019]">{{ t.account.profile }}</span>
        </button>

        <!-- Menu items -->
        <nav class="flex flex-col gap-1 px-3">
          <button
            v-for="item in menu"
            :key="item.key"
            class="flex items-center gap-1.5 px-3 py-2.5 w-full rounded-[8px] transition-colors"
            :class="activeKey === item.key ? 'bg-navbar text-white' : 'text-[#4A5568]'"
            @click="goTo(item.path)"
          >
            <i :class="[item.icon, 'text-[18px] shrink-0', activeKey === item.key ? 'text-white' : 'text-[#6F7B8B]']" />
            <span class="text-[14px] font-semibold">{{ item.label }}</span>
          </button>
        </nav>

        <!-- Logout -->
        <div class="px-3 mt-2">
          <button class="flex items-center gap-1.5 px-3 py-2.5 w-full text-[#FF3F3F]">
            <i :class="[logoutIcon, 'text-[18px] shrink-0']" />
            <span class="text-[14px] font-semibold">{{ t.account.logout }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
