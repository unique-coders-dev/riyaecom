<script setup lang="ts">
const { t, locale, localePath } = useLocale()
const { open } = useAccountNav()

const user = {
  name: 'Mostafa samy',
  email: 'mjihad84@gmail.com',
  balance: '0.00',
  avatar: '/images/user.jpg',
}

const search = ref('')

const isFilterOpen = ref(false)
const selectedFilter = ref(0)
const filterRef = ref<HTMLElement | null>(null)

const handleOutsideClick = (e: MouseEvent) => {
  if (filterRef.value && !filterRef.value.contains(e.target as Node)) {
    isFilterOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))

const stats = computed(() => [
  { label: t.value.account.totalDeposits, value: '2500' },
  { label: t.value.account.totalSpent, value: '6300' },
  { label: t.value.account.totalRefunds, value: '350' },
])

const statusClasses: Record<string, string> = {
  completed: 'bg-[#2774CC]',
  pending: 'bg-[#C1B41C]',
  review: 'bg-[#32B828]',
  cancelled: 'bg-[#D4342A]',
}

const transactions = computed(() => {
  const a = t.value.account
  return [
    { id: 1, type: a.txDeposit, order: '#661', status: 'completed', statusLabel: a.stCompleted, source: 'تحويل بنكي', source_en: 'Bank Transfer' },
    { id: 2, type: a.txRefund, order: '#8921', status: 'pending', statusLabel: a.stPending, source: 'Apple Pay', source_en: 'Apple Pay' },
    { id: 3, type: a.txPoints, order: '#661', status: 'review', statusLabel: a.stReview, source: 'Mada', source_en: 'Mada' },
    { id: 4, type: a.txPurchase, order: '#8921', status: 'cancelled', statusLabel: a.stCancelled, source: 'Visa', source_en: 'Visa' },
    { id: 5, type: a.txPurchase, order: '#8921', status: 'cancelled', statusLabel: a.stCancelled, source: 'MasterCard', source_en: 'MasterCard' },
    { id: 6, type: a.txPurchase, order: '#8921', status: 'cancelled', statusLabel: a.stCancelled, source: 'استرداد من طلب', source_en: 'Refund from order' },
  ].map((tx) => ({
    ...tx,
    balance_before: a.balanceBeforeValue,
    reference: 'WLT-20260603-1...',
    reason: a.reasonText,
  }))
})
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
        <AccountSidebar active="wallet" />

        <section class="bg-white border border-gray-100 rounded-[12px] shadow-[0px_4px_20px_0px_#6464640D] p-6 min-w-0">
          <h1 class="m-0 text-[16px] font-bold text-[#091019]">{{ t.account.walletHistory }}</h1>

          <div class="mt-4 rounded-[10px] px-5 py-4 text-white flex items-center gap-3" style="background: linear-gradient(90deg, #390049 0%, #A10BCC 100%)">
            <i class="ri-wallet-3-line text-2xl shrink-0" />
            <div>
              <p class="m-0 text-[14px] font-bold">{{ t.account.currentBalance }}</p>
              <p class="m-0 mt-1 text-[18px] font-bold">
                <span dir="ltr" class="inline-flex items-center gap-0.5"><UiRiyalSymbol /> 57.49</span>
              </p>
            </div>
          </div>

          <div class="mt-4 flex items-center gap-3 flex-wrap">
            <div class="flex-1 min-w-[220px] flex items-center gap-2 bg-[#F6F6F7] rounded-[8px] px-4 h-11 text-[#64768C]">
              <i class="ri-search-line text-base shrink-0" />
              <input
                v-model="search"
                type="text"
                :placeholder="t.account.walletSearch"
                class="flex-1 min-w-0 bg-transparent border-0 text-[12px] text-[#091019] placeholder:text-[#64768C]"
              />
            </div>
            <div ref="filterRef" class="relative">
              <button
                class="flex items-center gap-2 rtl:flex-row-reverse bg-[#F6F6F7] border border-[#64768C] rounded-[8px] px-4 h-11 text-[12px] font-semibold text-[#091019] hover:bg-gray-100 transition-colors"
                @click="isFilterOpen = !isFilterOpen"
              >
                <i class="ri-filter-3-line text-base" />
                {{ t.account.filterBy }}
              </button>

              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <div
                  v-if="isFilterOpen"
                  class="absolute top-[calc(100%+6px)] start-0 min-w-[185px] bg-white rounded-[12px] shadow-[0px_4px_20px_0px_#64646426] border border-gray-100 py-2 z-50"
                >
                  <button
                    v-for="(option, i) in t.account.filterOptions"
                    :key="option"
                    class="w-full text-start px-5 py-2 text-[13px] transition-colors"
                    :class="selectedFilter === i ? 'font-bold text-[#091019]' : 'text-[#091019] hover:bg-[#F6F6F7]'"
                    @click="selectedFilter = i; isFilterOpen = false"
                  >
                    {{ option }}
                  </button>
                </div>
              </Transition>
            </div>
            <button class="flex items-center gap-2 rtl:flex-row-reverse bg-[#F6F6F7] border border-[#64768C] rounded-[8px] px-4 h-11 text-[12px] font-semibold text-[#091019] hover:bg-gray-100 transition-colors">
              <i class="ri-download-2-line text-base" />
              {{ t.account.exportPdf }}
            </button>
            <button class="flex items-center gap-2 rtl:flex-row-reverse bg-[#F6F6F7] border border-[#64768C] rounded-[8px] px-4 h-11 text-[12px] font-semibold text-[#091019] hover:bg-gray-100 transition-colors">
              <i class="ri-download-2-line text-base" />
              {{ t.account.exportExcel }}
            </button>
          </div>

          <div class="mt-4 flex items-center gap-5 flex-wrap">
            <div v-for="stat in stats" :key="stat.label" class="flex items-center gap-2.5">
              <span class="text-[13px] font-bold text-[#091019]">{{ stat.label }}</span>
              <span class="border border-[#E8E8E8] rounded-[8px] px-3 py-1.5 text-[13px] font-bold text-navbar bg-white">
                <span dir="ltr" class="inline-flex items-center gap-0.5"><UiRiyalSymbol /> {{ stat.value }}</span>
              </span>
            </div>
          </div>

          <div class="mt-4 overflow-x-auto">
            <table class="w-full text-[12px] border-collapse">
              <thead>
                <tr class="bg-[#F6F6F7]">
                  <th class="text-start font-bold text-[#091019] px-4 py-3 whitespace-nowrap">{{ t.account.colType }}</th>
                  <th class="text-start font-bold text-[#091019] px-4 py-3 whitespace-nowrap">{{ t.account.orderNumber }}</th>
                  <th class="text-start font-bold text-[#091019] px-4 py-3 whitespace-nowrap">{{ t.account.colBalanceBefore }}</th>
                  <th class="text-start font-bold text-[#091019] px-4 py-3 whitespace-nowrap">{{ t.account.colStatus }}</th>
                  <th class="text-start font-bold text-[#091019] px-4 py-3 whitespace-nowrap">{{ t.account.colSource }}</th>
                  <th class="text-start font-bold text-[#091019] px-4 py-3 whitespace-nowrap">{{ t.account.colRef }}</th>
                  <th class="text-start font-bold text-[#091019] px-4 py-3 whitespace-nowrap">{{ t.account.colReason }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tx in transactions" :key="tx.id" class="border-b border-gray-100">
                  <td class="px-4 py-3.5 text-[#091019] whitespace-nowrap">{{ tx.type }}</td>
                  <td class="px-4 py-3.5 text-[#091019] whitespace-nowrap"><span dir="ltr">{{ tx.order }}</span></td>
                  <td class="px-4 py-3.5 text-[#091019] whitespace-nowrap">{{ tx.balance_before }}</td>
                  <td class="px-4 py-3.5 whitespace-nowrap">
                    <span class="inline-block min-w-[125px] text-center text-white text-[11px] font-semibold px-4 py-1.5 rounded-[6px]" :class="statusClasses[tx.status]">
                      {{ tx.statusLabel }}
                    </span>
                  </td>
                  <td class="px-4 py-3.5 text-[#091019] whitespace-nowrap">{{ locale === 'ar' ? tx.source : tx.source_en }}</td>
                  <td class="px-4 py-3.5 text-[#091019] whitespace-nowrap"><span dir="ltr">{{ tx.reference }}</span></td>
                  <td class="px-4 py-3.5 text-[#091019] whitespace-nowrap">{{ tx.reason }}</td>
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
        <h1 class="m-0 text-[15px] font-bold text-[#091019]">{{ t.account.walletHistory }}</h1>
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

      <!-- Balance banner -->
      <div class="mt-3 mx-4 rounded-[16px] px-5 py-4 text-white flex items-center gap-3" style="background: linear-gradient(90deg, #390049 0%, #A10BCC 100%)">
        <i class="ri-wallet-3-line text-2xl shrink-0" />
        <div>
          <p class="m-0 text-[13px] font-bold">{{ t.account.currentBalance }}</p>
          <p class="m-0 mt-1 text-[17px] font-bold">
            <span dir="ltr" class="inline-flex items-center gap-0.5"><UiRiyalSymbol /> 57.49</span>
          </p>
        </div>
      </div>

      <!-- Stats row -->
      <div class="mt-3 mx-4 flex gap-3">
        <div v-for="stat in stats" :key="stat.label" class="flex-1 bg-white rounded-[12px] px-3 py-3 shadow-[0px_4px_20px_0px_#64646412] flex flex-col items-center gap-1.5">
          <span dir="ltr" class="text-[13px] font-bold text-navbar inline-flex items-center gap-0.5"><UiRiyalSymbol /> {{ stat.value }}</span>
          <span class="text-[10px] text-[#64768C] text-center leading-tight">{{ stat.label }}</span>
        </div>
      </div>

      <!-- Transaction cards -->
      <div class="mt-3 mx-4 flex flex-col gap-3 pb-4">
        <div v-for="tx in transactions" :key="tx.id" class="bg-white rounded-[16px] px-4 py-4 shadow-[0px_4px_20px_0px_#64646412]">
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="text-[13px] font-bold text-[#091019]">{{ tx.type }}</span>
            <span class="text-[11px] font-semibold text-white px-3 py-1 rounded-[6px]" :class="statusClasses[tx.status]">{{ tx.statusLabel }}</span>
          </div>
          <div class="flex flex-col gap-2 text-[12px]">
            <div class="flex items-center justify-between gap-2">
              <span class="text-[#64768C]">{{ t.account.orderNumber }}</span>
              <span class="font-bold text-[#091019]" dir="ltr">{{ tx.order }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-[#64768C]">{{ t.account.colSource }}</span>
              <span class="font-bold text-[#091019]">{{ locale === 'ar' ? tx.source : tx.source_en }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-[#64768C]">{{ t.account.colRef }}</span>
              <span class="font-bold text-[#091019]" dir="ltr">{{ tx.reference }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-[#64768C]">{{ t.account.colBalanceBefore }}</span>
              <span class="font-bold text-[#091019]">{{ tx.balance_before }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-[#64768C]">{{ t.account.colReason }}</span>
              <span class="font-bold text-[#091019]">{{ tx.reason }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AccountNavDrawer />
  </div>
</template>
