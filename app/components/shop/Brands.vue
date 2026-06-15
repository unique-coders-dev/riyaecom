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

// Mock following the shop filters brands shape; will be API-driven
const brandImages = ['br1.png', 'br2.png', 'br3.png', 'br4.png']
const brands = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  image: `/images/${brandImages[i % 4]}`,
  slug: `brand-${(i % 4) + 1}`,
}))
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="m-0 text-[16px] font-bold text-[#091019]">{{ t.shop.shopByBrand }}</h2>
      <div class="hidden lg:flex items-center gap-2">
        <button
          type="button"
          class="w-9 h-9 rounded-full bg-[#F6F6F6] flex items-center justify-center text-[#091019] hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-default disabled:hover:bg-[#F6F6F6]"
          :disabled="!canScrollPrev"
          aria-label="Previous"
          @click="scrollPrev"
        >
          <i :class="locale === 'ar' ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'" class="text-xl" />
        </button>
        <button
          type="button"
          class="w-9 h-9 rounded-full bg-[#F6F6F6] flex items-center justify-center text-[#091019] hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-default disabled:hover:bg-[#F6F6F6]"
          :disabled="!canScrollNext"
          aria-label="Next"
          @click="scrollNext"
        >
          <i :class="locale === 'ar' ? 'ri-arrow-left-s-line' : 'ri-arrow-right-s-line'" class="text-xl" />
        </button>
      </div>
    </div>
    <div ref="emblaRef" class="overflow-hidden cursor-grab active:cursor-grabbing">
      <div class="flex gap-4">
        <NuxtLink
          v-for="brand in brands"
          :key="brand.id"
          :to="localePath(`/shop/${brand.slug}`)"
          class="flex-none"
        >
          <img :src="brand.image" alt="Brand" class="w-[160px] h-[250px] object-cover" loading="lazy" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
