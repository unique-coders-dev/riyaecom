<script setup lang="ts">
defineProps<{ hideBrands?: boolean; hideBreadcrumbs?: boolean; sidebarPosition?: 'start' | 'end'; hideTopBar?: boolean; hideSuggestedTitle?: boolean }>()

const { t, locale, localePath } = useLocale()

const breadcrumbs = computed(() => [
  { label: t.value.shop.home, path: '/' },
  { label: locale.value === 'ar' ? 'نسائي' : 'Women', path: '/shop/women' },
  { label: locale.value === 'ar' ? 'ملابس' : 'Clothing', path: '/shop/clothing' },
])
const currentCrumb = computed(() => (locale.value === 'ar' ? 'فساتين' : 'Dresses'))

const resultsCount = '24,094'

const isSortOpen = ref(false)
const selectedSort = ref(0)
const sortRef = ref<HTMLElement | null>(null)
const isFilterOpen = ref(false)

const handleOutsideClick = (e: MouseEvent) => {
  if (sortRef.value && !sortRef.value.contains(e.target as Node)) {
    isSortOpen.value = false
  }
}

watch(isFilterOpen, (open) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})

const selectedChips = ref([{ id: 1, label: { ar: 'فساتين', en: 'Dresses' } }])
const removeChip = (id: number) => {
  selectedChips.value = selectedChips.value.filter((c) => c.id !== id)
}

const currency = { id: 1, name: 'SAR', prefix: 'ر.س', exchange_rate: 1, delivery_days: null }
const brand = { id: 1, name: { en: 'Tozlu', ar: 'توزلو' }, translated_name: 'توزلو', image: null }

// Mock following the Shop Products API shape (ShopProductsResponse.products); will be API-driven
const products = Array.from({ length: 20 }, (_, i) => {
  const img = (i % 20) + 1
  return {
    id: i + 1,
    name_en: 'Sway casual hooded T-shirt with burn print for men',
    name_ar: 'سوي تيشيرت كاجول بغطاء رأس ونقشة حروق للرجال',
    name_tr: null,
    slug: `shop-product-${i + 1}`,
    image: `/images/p${img}.${[8, 10].includes(img) ? 'gif' : 'png'}`,
    old_price: '95.00',
    final_selling_price: 200,
    discount_percentage: i % 2 === 0 ? 50 : 30,
    brand,
    currency,
    extra_colors: 2,
  }
})
</script>

<template>
  <main class="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 py-6 min-h-[60vh]">
    <template v-if="!hideBreadcrumbs">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-1.5 text-[12px]">
        <template v-for="crumb in breadcrumbs" :key="crumb.path">
          <NuxtLink :to="localePath(crumb.path)" class="text-[#64768C] hover:underline">{{ crumb.label }}</NuxtLink>
          <span class="text-[#64768C]">/</span>
        </template>
        <span class="text-[#091019]">{{ currentCrumb }}</span>
      </nav>

      <!-- Title -->
      <h1 class="m-0 mt-4 text-[16px] font-bold text-[#091019]">
        {{ t.shop.resultsTitle }} -
        <span class="text-navbar font-normal text-[13px]">{{ resultsCount }} {{ t.shop.results }}</span>
      </h1>
    </template>

    <!-- Content grid: sidebar at inline-start -->
    <div class="mt-5 grid gap-6 items-start" :class="sidebarPosition === 'end' ? 'lg:grid-cols-[1fr_280px]' : 'lg:grid-cols-[280px_1fr]'">
      <div class="hidden lg:block sticky top-[90px] h-fit" :class="sidebarPosition === 'end' ? 'order-2' : 'order-1'">
        <slot name="sidebar-header" />
        <ShopFilters class="mt-2 lg:mt-0" />
      </div>

      <div class="min-w-0" :class="sidebarPosition === 'end' ? 'order-1' : 'order-2'">
        <slot name="main-header" />
        <!-- Mobile filter button + sort row -->
        <div class="flex items-center justify-between gap-3" :class="hideTopBar ? 'lg:hidden mb-4' : ''">
          <button
            class="lg:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-[8px] px-4 py-2 text-[13px] font-semibold text-[#091019] hover:bg-gray-50 transition-colors"
            @click="isFilterOpen = true"
          >
            <i class="ri-equalizer-line text-base" />
            <span>{{ t.shop.filter }}</span>
          </button>
          
          <div class="flex items-center gap-3 ms-auto" v-if="!hideTopBar">
            <div ref="sortRef" class="relative">
              <button class="flex items-center gap-1.5 text-[13px]" @click="isSortOpen = !isSortOpen">
                <span class="font-bold text-[#091019]">{{ t.shop.sortBy }}</span>
                <span class="text-gray-400">{{ t.shop.sortOptions[selectedSort] }}</span>
                <i class="ri-arrow-down-s-line text-lg text-navbar transition-transform duration-200" :class="isSortOpen ? 'rotate-180' : ''" />
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
                  v-if="isSortOpen"
                  class="absolute top-[calc(100%+6px)] end-0 min-w-[150px] bg-white rounded-[12px] shadow-[0px_4px_20px_0px_#64646426] border border-gray-100 py-2 z-50"
                >
                  <button
                    v-for="(option, i) in t.shop.sortOptions"
                    :key="option"
                    class="w-full text-start px-4 py-2 text-[13px] transition-colors"
                    :class="selectedSort === i ? 'font-bold text-[#091019]' : 'text-[#091019] hover:bg-[#F6F6F7]'"
                    @click="selectedSort = i; isSortOpen = false"
                  >
                    {{ option }}
                  </button>
                </div>
              </Transition>
            </div>
            
            <button class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#091019] hover:bg-gray-50 transition-colors" aria-label="Share">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[18px] h-[18px]">
                <path d="M12 15V4" />
                <path d="M8 7l4-4 4 4" />
                <path d="M8 11H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Selected filter chips -->
        <div v-if="selectedChips.length && !hideTopBar" class="mt-3 flex items-center gap-2 flex-wrap">
          <span
            v-for="chip in selectedChips"
            :key="chip.id"
            class="flex items-center gap-2 bg-[#F6F6F6] border border-[#E8E8E8] rounded-full px-3.5 py-1.5 text-[12px] text-[#091019]"
          >
            {{ chip.label[locale] }}
            <button class="text-slate-500 hover:text-red-500 transition-colors" aria-label="Remove" @click="removeChip(chip.id)">
              <i class="ri-close-line text-sm" />
            </button>
          </span>
        </div>

        <!-- Brands carousel -->
        <ShopBrands v-if="!hideBrands" class="mt-6" />

        <!-- Products -->
        <div class="mt-8">
          <h2 v-if="!hideSuggestedTitle" class="m-0 mb-4 text-[16px] font-bold text-[#091019]">{{ t.shop.suggested }}</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 justify-items-center">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile filter drawer -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isFilterOpen"
          class="lg:hidden fixed inset-0 bg-black/40 z-[99]"
          @click="isFilterOpen = false"
        />
      </Transition>

      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="rtl:translate-x-full ltr:-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-300 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="rtl:translate-x-full ltr:-translate-x-full"
      >
        <div
          v-if="isFilterOpen"
          class="lg:hidden fixed inset-y-0 start-0 w-[85%] max-w-[360px] bg-white z-[100] flex flex-col shadow-[0px_0px_30px_0px_#00000033]"
        >
          <div class="flex items-center justify-between px-4 h-14 border-b border-gray-100 shrink-0">
            <h3 class="m-0 text-[15px] font-bold text-[#091019]">{{ t.shop.filter }}</h3>
            <button
              class="w-9 h-9 rounded-full flex items-center justify-center text-[#091019] hover:bg-gray-100 transition-colors"
              aria-label="Close"
              @click="isFilterOpen = false"
            >
              <i class="ri-close-line text-xl" />
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-4">
            <ShopFilters class="!border-0 !shadow-none !p-0 [&_h3]:hidden" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>
