<script setup lang="ts">
const props = defineProps<{ active: string }>()

const { t, localePath } = useLocale()

// Mock user; will be API-driven (auth)
const user = {
  name: 'Mostafa samy',
  email: 'mjihad84@gmail.com',
  balance: '0.00',
  avatar: '/images/user.jpg',
  initials: 'MA',
}

const items = computed(() => [
  { key: 'profile', circle: true, icon: null, label: t.value.account.profile, path: '/account' },
  { key: 'details', circle: false, icon: 'ri-user-3-line', label: t.value.account.myAccount, path: '/account/details' },
  { key: 'orders', circle: false, icon: 'ri-inbox-archive-line', label: t.value.account.myOrders, path: '/account/orders' },
  { key: 'track-orders', circle: false, icon: 'ri-truck-line', label: t.value.account.trackOrders, path: '/account/track-orders' },
  { key: 'wallet', circle: false, icon: 'ri-wallet-3-line', label: t.value.account.walletHistory, path: '/account/wallet' },
  { key: 'points', circle: false, icon: 'ri-coins-line', label: t.value.account.pointsHistory, path: '/account/points' },
  { key: 'addresses', circle: false, icon: 'ri-map-pin-line', label: t.value.account.myAddresses, path: '/account/addresses' },
  { key: 'notifications', circle: false, icon: 'ri-notification-3-line', label: t.value.account.notifications, path: '/account/notifications' },
])
</script>

<template>
  <aside class="bg-white border border-gray-100 rounded-[12px] shadow-[0px_4px_20px_0px_#6464640D] py-5 overflow-hidden">
    <!-- User -->
    <div class="flex flex-col items-center px-4">
      <div class="relative">
        <img :src="user.avatar" :alt="user.name" class="w-16 h-16 rounded-full object-cover" />
        <button
          class="absolute bottom-0 start-0 w-5 h-5 rounded-full bg-icon-circle text-white flex items-center justify-center"
          aria-label="Edit avatar"
        >
          <i class="ri-pencil-line text-[10px]" />
        </button>
      </div>
      <p class="m-0 mt-2.5 text-[14px] font-bold text-[#091019]" dir="ltr">{{ user.name }}</p>
      <p class="m-0 mt-0.5 text-[12px] text-[#64768C]" dir="ltr">{{ user.email }}</p>
      <p class="m-0 mt-1.5 text-[13px] font-bold text-[#FF3F3F]">
        {{ t.account.balance }} : <span dir="ltr">{{ user.balance }}</span>
      </p>
    </div>

    <!-- Menu -->
    <nav class="mt-4 flex flex-col">
      <NuxtLink
        v-for="item in items"
        :key="item.key"
        :to="localePath(item.path)"
        class="flex items-center gap-2.5 px-4 py-2.5 text-[13px] transition-colors"
        :class="props.active === item.key ? 'bg-navbar text-white font-semibold' : 'text-[#091019] hover:bg-[#F6F6F7]'"
      >
        <span
          v-if="item.circle"
          class="w-6 h-6 rounded-full text-[9px] font-bold flex items-center justify-center shrink-0"
          :class="props.active === item.key ? 'bg-white text-navbar' : 'bg-icon-circle text-white'"
        >
          {{ user.initials }}
        </span>
        <i v-else :class="item.icon" class="text-lg shrink-0" />
        {{ item.label }}
      </NuxtLink>

      <button class="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-semibold text-[#FF3F3F] hover:bg-red-50 transition-colors">
        <i class="ri-logout-box-r-line text-lg shrink-0" />
        {{ t.account.logout }}
      </button>
    </nav>
  </aside>
</template>
