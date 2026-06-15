<script setup lang="ts">
const { t, locale, localePath } = useLocale()

const currency = { id: 1, name: 'SAR', prefix: 'ر.س', exchange_rate: 1, delivery_days: null }
const brand = { id: 1, name: { en: 'Tozlu', ar: 'توزلو' }, translated_name: 'توزلو', image: null }

const POOL_SIZE = 16
const PAGE_SIZE = 15
const MAX_BATCHES = 5

const imageFor = (i: number) => {
  const n = (i % POOL_SIZE) + 1
  return `/images/pn${n}.png`
}

// Mock following the Shop Products API shape; will be API-driven.
// `extra_colors` is an additional field for the color-count chip.
const makeProduct = (i: number) => ({
  id: i,
  name_en: 'Sway casual hooded T-shirt with burn print for men',
  name_ar: 'سوي تيشيرت كاجول بغطاء رأس ونقشة حروق للرجال',
  name_tr: null,
  slug: `our-product-${i}`,
  image: imageFor(i),
  old_price: '95.00',
  final_selling_price: 200,
  discount_percentage: 30,
  brand,
  currency,
  extra_colors: 2,
})

const products = ref(Array.from({ length: PAGE_SIZE }, (_, i) => makeProduct(i + 1)))
const batchesLoaded = ref(1)
const isLoading = ref(false)
const hasMore = computed(() => batchesLoaded.value < MAX_BATCHES)

const sentinelRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const loadMore = async () => {
  if (isLoading.value || !hasMore.value) return
  isLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 600))
  const start = products.value.length
  const next = Array.from({ length: PAGE_SIZE }, (_, i) => makeProduct(start + i + 1))
  products.value.push(...next)
  batchesLoaded.value++
  isLoading.value = false
}

onMounted(() => {
  if (!sentinelRef.value || typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) loadMore()
      }
    },
    { rootMargin: '300px 0px' },
  )
  observer.observe(sentinelRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <section class="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 my-10">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <h2 class="m-0 text-[18px] lg:text-[20px] font-bold text-[#091019]">
        {{ t.home.productsTitle }}
      </h2>
      <NuxtLink
        :to="localePath('/shop')"
        class="border border-navbar text-navbar text-[13px] font-semibold px-5 py-1.5 rounded-[8px] hover:bg-navbar/5 transition-colors"
      >
        {{ t.home.viewAll }}
      </NuxtLink>
    </div>

    <!-- Vertical grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 lg:gap-x-4 gap-y-6 justify-items-center">
      <ProductCard v-for="p in products" :key="p.id" :product="p" class="!w-full max-w-[185px] lg:max-w-[280px]" />
    </div>

    <!-- Load-more sentinel + status -->
    <div ref="sentinelRef" class="mt-8 flex items-center justify-center min-h-[40px]">
      <div
        v-if="isLoading"
        class="flex items-center gap-2 text-[#64768C] text-sm"
      >
        <i class="ri-loader-4-line animate-spin text-lg" />
        <span>{{ t.home.loadingMore }}</span>
      </div>
      <p
        v-else-if="!hasMore"
        class="m-0 text-[#6F7B8B] text-sm"
      >
        {{ t.home.noMoreProducts }}
      </p>
    </div>
  </section>
</template>
