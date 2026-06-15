<script setup lang="ts">
const { t, locale, localePath } = useLocale()
const { open } = useAccountNav()

const user = {
  name: 'Mostafa samy',
  email: 'mjihad84@gmail.com',
  balance: '0.00',
  avatar: '/images/user.jpg',
}

const menu = computed(() => [
  { key: 'details', icon: 'ri-user-3-line', label: t.value.account.myAccount, path: '/account/details', subtitle: t.value.account.editInfo },
  { key: 'orders', icon: 'ri-inbox-archive-line', label: t.value.account.myOrders, path: '/account/orders', subtitle: null },
  { key: 'track-orders', icon: 'ri-truck-line', label: t.value.account.trackOrders, path: '/account/track-orders', subtitle: null },
  { key: 'wallet', icon: 'ri-wallet-3-line', label: t.value.account.walletHistory, path: '/account/wallet', subtitle: null },
  { key: 'points', icon: 'ri-coins-line', label: t.value.account.pointsHistory, path: '/account/points', subtitle: null },
  { key: 'addresses', icon: 'ri-map-pin-line', label: t.value.account.myAddresses, path: '/account/addresses', subtitle: null },
  { key: 'notifications', icon: 'ri-notification-3-line', label: t.value.account.notifications, path: '/account/notifications', subtitle: null },
])

const chevronIcon = computed(() => t.value.dir === 'rtl' ? 'ri-arrow-left-s-line' : 'ri-arrow-right-s-line')
</script>

<template>
  <div>
    <!-- ═══════════════════════════════════════
         DESKTOP LAYOUT
    ═══════════════════════════════════════ -->
    <main class="hidden lg:block max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 py-6 min-h-[60vh]">
      <nav class="flex items-center gap-1.5 text-[12px]">
        <NuxtLink :to="localePath('/')" class="text-[#64768C] hover:underline">{{ t.shop.home }}</NuxtLink>
        <span class="text-[#64768C]">/</span>
        <span class="text-[#091019]">{{ t.account.profile }}</span>
      </nav>

      <div class="mt-6 grid gap-6 lg:grid-cols-[260px_1fr] items-start">
        <AccountSidebar active="profile" />

        <section class="bg-white border border-gray-100 rounded-[12px] shadow-[0px_4px_20px_0px_#6464640D] p-6">
          <h1 class="m-0 text-[16px] font-bold text-[#091019]">{{ t.account.profile }}</h1>
          <p class="m-0 mt-1 text-[12px] text-[#64768C]">{{ t.account.editInfo }}</p>
          <div class="mt-5 flex flex-col gap-3">
            <NuxtLink
              v-for="item in menu"
              :key="item.path"
              :to="localePath(item.path)"
              class="flex items-center justify-between gap-3 bg-[#F6F6F7] rounded-[12px] px-5 py-4 hover:bg-gray-100 transition-colors"
            >
              <span class="flex items-center gap-3 min-w-0">
                <i :class="item.icon" class="text-xl text-[#091019] shrink-0" />
                <span class="min-w-0">
                  <span class="block text-[13px] font-bold text-[#091019]">{{ item.label }}</span>
                  <span v-if="item.subtitle" class="block mt-0.5 text-[12px] text-[#64768C]">{{ item.subtitle }}</span>
                </span>
              </span>
              <i :class="chevronIcon" class="text-lg text-slate-400 shrink-0" />
            </NuxtLink>
          </div>
        </section>
      </div>
    </main>

    <!-- ═══════════════════════════════════════
         MOBILE LAYOUT
    ═══════════════════════════════════════ -->
    <div class="lg:hidden bg-[#F6F6F6]" :dir="t.dir">
      <!-- Page header -->
      <div class="bg-white px-4 h-14 flex items-center justify-between">
        <button class="w-8 h-8 flex items-center justify-center" @click="open">
          <i class="ri-menu-line text-xl text-[#091019]" />
        </button>
        <h1 class="m-0 text-[15px] font-bold text-[#091019]">{{ t.account.profile }}</h1>
        <div class="w-8" />
      </div>

      <!-- Profile card -->
      <div class="bg-white mt-3 mx-4 rounded-[16px] px-4 py-5 flex flex-col items-center shadow-[0px_4px_20px_0px_#64646412]">
        <div class="relative">
          <img :src="user.avatar" :alt="user.name" class="w-[80px] h-[80px] rounded-full object-cover" />
          <button class="absolute bottom-0 start-0 w-6 h-6 rounded-full bg-icon-circle text-white flex items-center justify-center">
            <i class="ri-pencil-line text-[11px]" />
          </button>
        </div>
        <p class="m-0 mt-3 text-[15px] font-bold text-[#091019]" dir="ltr">{{ user.name }}</p>
        <p class="m-0 mt-0.5 text-[12px] text-[#64768C]" dir="ltr">{{ user.email }}</p>
        <p class="m-0 mt-2 text-[13px] font-bold text-[#FF3F3F]">
          {{ t.account.balance }} : <span dir="ltr">{{ user.balance }}</span>
        </p>
      </div>

      <!-- Menu list -->
      <div class="mt-3 mx-4 flex flex-col gap-2.5 pb-4">
        <NuxtLink
          v-for="item in menu"
          :key="item.key"
          :to="localePath(item.path)"
          class="w-full bg-white rounded-[12px] px-4 py-4 flex items-center gap-3 shadow-[0px_2px_8px_0px_#64646410]"
        >
          <span class="w-10 h-10 rounded-[10px] border border-[#E8E8E8] bg-[#F6F6F6] flex items-center justify-center shrink-0">
            <i :class="item.icon" class="text-[18px] text-[#091019]" />
          </span>
          <span class="flex-1 text-start">
            <span class="block text-[14px] font-bold text-[#091019]">{{ item.label }}</span>
            <span v-if="item.subtitle" class="block mt-0.5 text-[12px] text-[#64768C]">{{ item.subtitle }}</span>
          </span>
          <i :class="chevronIcon" class="text-xl text-[#B0B8C1] shrink-0" />
        </NuxtLink>
      </div>
    </div>

    <AccountNavDrawer />
  </div>
</template>
