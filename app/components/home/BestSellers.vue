<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue'

const { t, locale, localePath } = useLocale()

const [emblaRef, emblaApi] = emblaCarouselVue({
  direction: locale.value === 'ar' ? 'rtl' : 'ltr',
  align: 'start',
  dragFree: true,
  containScroll: 'trimSnaps',
})

const canScrollPrev = ref(false)
const canScrollNext = ref(false)

const updateScrollState = () => {
  if (!emblaApi.value) return
  canScrollPrev.value = emblaApi.value.canScrollPrev()
  canScrollNext.value = emblaApi.value.canScrollNext()
}

const scrollPrev = () => emblaApi.value?.scrollPrev()
const scrollNext = () => emblaApi.value?.scrollNext()

watch(emblaApi, (api) => {
  if (!api) return
  updateScrollState()
  api.on('select', updateScrollState)
  api.on('reInit', updateScrollState)
})

onBeforeUnmount(() => {
  emblaApi.value?.off('select', updateScrollState)
  emblaApi.value?.off('reInit', updateScrollState)
})

const currency = { id: 1, name: 'SAR', prefix: 'ر.س', exchange_rate: 1, delivery_days: null }
const brand = { id: 1, name: { en: 'Tozlu', ar: 'توزلو' }, translated_name: 'توزلو', image: null }

// Mock following the Shop Products API shape (most_sold products); will be API-driven.
// `extra_colors` is an additional field for the color-count chip.
const products = [3, 5, 7, 9, 12, 14, 16, 18, 2, 4, 6, 11, 13, 15, 17, 19].map((img, i) => ({
  id: i + 1,
  name_en: 'Sway casual hooded T-shirt with burn print for men',
  name_ar: 'سوي تيشيرت كاجول بغطاء رأس ونقشة حروق للرجال',
  name_tr: null,
  slug: `sway-casual-hooded-t-shirt-bs-${i + 1}`,
  image: `/images/p${img}.${[8, 10].includes(img) ? 'gif' : 'png'}`,
  old_price: '95.00',
  final_selling_price: 200,
  discount_percentage: 30,
  most_sold: 1,
  brand,
  currency,
  extra_colors: 2,
}))

const columns = computed(() => {
  const cols = []
  for (let i = 0; i < products.length; i += 2) {
    cols.push(products.slice(i, i + 2))
  }
  return cols
})
</script>

<template>
  <section class="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 my-10">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <h2 class="m-0 text-[18px] lg:text-[20px] font-bold text-[#091019]">
        {{ t.home.bestSellersTitle }}
      </h2>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="hidden lg:flex w-9 h-9 rounded-full bg-[#F6F6F6] items-center justify-center text-slate-900 hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-default disabled:hover:bg-[#F6F6F6]"
          :disabled="!canScrollPrev"
          aria-label="Previous"
          @click="scrollPrev"
        >
          <i :class="locale === 'ar' ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'" class="text-xl" />
        </button>
        <button
          type="button"
          class="hidden lg:flex w-9 h-9 rounded-full bg-[#F6F6F6] items-center justify-center text-slate-900 hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-default disabled:hover:bg-[#F6F6F6]"
          :disabled="!canScrollNext"
          aria-label="Next"
          @click="scrollNext"
        >
          <i :class="locale === 'ar' ? 'ri-arrow-left-s-line' : 'ri-arrow-right-s-line'" class="text-xl" />
        </button>
        <NuxtLink
          :to="localePath('/shop')"
          class="border border-navbar text-navbar text-[13px] font-semibold px-5 py-1.5 rounded-[8px] hover:bg-navbar/5 transition-colors"
        >
          {{ t.home.viewAll }}
        </NuxtLink>
      </div>
    </div>

    <!-- Draggable two-row slider -->
    <div ref="emblaRef" class="overflow-hidden cursor-grab active:cursor-grabbing">
      <div class="flex gap-5">
        <div v-for="(column, i) in columns" :key="i" class="flex-none flex flex-col gap-5">
          <ProductCard v-for="product in column" :key="product.id" :product="product" />
        </div>
      </div>
    </div>
  </section>
</template>
