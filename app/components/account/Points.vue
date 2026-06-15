<script setup lang="ts">
const { t, localePath } = useLocale()
const { open } = useAccountNav()

const user = {
  name: 'Mostafa samy',
  email: 'mjihad84@gmail.com',
  balance: '0.00',
  avatar: '/images/user.jpg',
}

const rows = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  date: 'May21 2026. 12:52PM',
  points: '+20',
  balance_after: '1175',
  description: 'Points added for ord...',
}))
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
        <span class="text-[#091019]">{{ t.account.myAccount }}</span>
      </nav>

      <div class="mt-6 grid gap-6 lg:grid-cols-[260px_1fr] items-start">
        <AccountSidebar active="points" />

        <section class="bg-white border border-gray-100 rounded-[12px] shadow-[0px_4px_20px_0px_#6464640D] p-6 min-w-0">
          <h1 class="m-0 text-[16px] font-bold text-[#091019]">{{ t.account.pointsHistory }}</h1>

          <div class="mt-4 rounded-[10px] px-5 py-4 text-white flex items-center gap-3" style="background: linear-gradient(90deg, #390049 0%, #A10BCC 100%)">
            <i class="ri-sparkling-2-line text-2xl shrink-0" />
            <div>
              <p class="m-0 text-[14px] font-bold">{{ t.account.currentPoints }}</p>
              <p class="m-0 mt-1 text-[18px] font-bold" dir="ltr">0</p>
            </div>
          </div>

          <div class="mt-4 overflow-x-auto">
            <table class="w-full text-[12px] border-collapse">
              <thead>
                <tr class="bg-[#F6F6F7]">
                  <th class="text-start font-bold text-[#091019] px-4 py-3 whitespace-nowrap">{{ t.account.colDate }}</th>
                  <th class="text-start font-bold text-[#091019] px-4 py-3 whitespace-nowrap">{{ t.account.colPointsType }}</th>
                  <th class="text-start font-bold text-[#091019] px-4 py-3 whitespace-nowrap">{{ t.account.pointsKey }}</th>
                  <th class="text-start font-bold text-[#091019] px-4 py-3 whitespace-nowrap">{{ t.account.colPoints }}</th>
                  <th class="text-start font-bold text-[#091019] px-4 py-3 whitespace-nowrap">{{ t.account.colBalanceAfter }}</th>
                  <th class="text-start font-bold text-[#091019] px-4 py-3 whitespace-nowrap">{{ t.account.colDesc }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in rows" :key="row.id" class="border-b border-gray-100">
                  <td class="px-4 py-3.5 text-[#091019] whitespace-nowrap"><span dir="ltr">{{ row.date }}</span></td>
                  <td class="px-4 py-3.5 whitespace-nowrap">
                    <span class="inline-flex items-center justify-center gap-1.5 min-w-[125px] text-white text-[11px] font-semibold px-4 py-1.5 rounded-[6px] bg-[#32B828]">
                      {{ t.account.typeAdd }}
                      <i class="ri-arrow-up-line text-xs" />
                    </span>
                  </td>
                  <td class="px-4 py-3.5 whitespace-nowrap">
                    <span class="inline-block min-w-[125px] text-center text-white text-[11px] font-semibold px-4 py-1.5 rounded-[6px] bg-[#2774CC]">
                      {{ t.account.keyOrder }}
                    </span>
                  </td>
                  <td class="px-4 py-3.5 font-semibold text-[#32B828] whitespace-nowrap"><span dir="ltr">{{ row.points }}</span></td>
                  <td class="px-4 py-3.5 text-[#091019] whitespace-nowrap"><span dir="ltr">{{ row.balance_after }}</span></td>
                  <td class="px-4 py-3.5 text-[#091019] whitespace-nowrap"><span dir="ltr">{{ row.description }}</span></td>
                </tr>
              </tbody>
            </table>
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
        <h1 class="m-0 text-[15px] font-bold text-[#091019]">{{ t.account.pointsHistory }}</h1>
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

      <!-- Points balance banner -->
      <div class="mt-3 mx-4 rounded-[16px] px-5 py-4 text-white flex items-center gap-3" style="background: linear-gradient(90deg, #390049 0%, #A10BCC 100%)">
        <i class="ri-sparkling-2-line text-2xl shrink-0" />
        <div>
          <p class="m-0 text-[13px] font-bold">{{ t.account.currentPoints }}</p>
          <p class="m-0 mt-1 text-[17px] font-bold" dir="ltr">0</p>
        </div>
      </div>

      <!-- Points history cards -->
      <div class="mt-3 mx-4 flex flex-col gap-3 pb-4">
        <div v-for="row in rows" :key="row.id" class="bg-white rounded-[16px] px-4 py-4 shadow-[0px_4px_20px_0px_#64646412]">
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="inline-flex items-center gap-1 text-white text-[11px] font-semibold px-3 py-1 rounded-[6px] bg-[#32B828]">
              {{ t.account.typeAdd }} <i class="ri-arrow-up-line text-xs" />
            </span>
            <span class="inline-block text-white text-[11px] font-semibold px-3 py-1 rounded-[6px] bg-[#2774CC]">
              {{ t.account.keyOrder }}
            </span>
          </div>
          <div class="flex flex-col gap-2 text-[12px]">
            <div class="flex items-center justify-between gap-2">
              <span class="text-[#64768C]">{{ t.account.colDate }}</span>
              <span class="font-bold text-[#091019]" dir="ltr">{{ row.date }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-[#64768C]">{{ t.account.colPoints }}</span>
              <span class="font-bold text-[#32B828]" dir="ltr">{{ row.points }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-[#64768C]">{{ t.account.colBalanceAfter }}</span>
              <span class="font-bold text-[#091019]" dir="ltr">{{ row.balance_after }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-[#64768C]">{{ t.account.colDesc }}</span>
              <span class="font-bold text-[#091019]" dir="ltr">{{ row.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AccountNavDrawer />
  </div>
</template>
