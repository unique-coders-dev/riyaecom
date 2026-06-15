<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue'

const { locale, localePath } = useLocale()

// Mock following the Home Page Builder API shape (HomeSection, layout: 'banner'); will be API-driven
const bannerSection = {
  id: 1,
  title: { en: 'Eid Al-Adha Countdown', ar: 'العد التنازلي لعيد الأضحى' },
  layout: 'banner',
  items: [
    {
      id: 1,
      image: '/images/banner1.png',
      mobile_image: '/images/banner1.png',
      link: '/shop',
      sort_order: 1,
    },
    {
      id: 2,
      image: '/images/banner2.png',
      mobile_image: '/images/banner2.png',
      link: '/shop',
      sort_order: 2,
    },
    {
      id: 3,
      image: '/images/banner3.png',
      mobile_image: '/images/banner3.png',
      link: '/shop',
      sort_order: 3,
    },
  ],
}

const banners = computed(() =>
  [...bannerSection.items].sort((a, b) => a.sort_order - b.sort_order),
)

const [emblaRef, emblaApi] = emblaCarouselVue({
  direction: locale.value === 'ar' ? 'rtl' : 'ltr',
  loop: true,
  align: 'start',
  containScroll: false,
})

const selectedIndex = ref(0)
const scrollSnaps = ref<number[]>([])

const onSelect = () => {
  if (!emblaApi.value) return
  selectedIndex.value = emblaApi.value.selectedScrollSnap()
}

const scrollTo = (index: number) => {
  emblaApi.value?.scrollTo(index)
}

const scrollPrev = () => emblaApi.value?.scrollPrev()
const scrollNext = () => emblaApi.value?.scrollNext()

let autoplayTimer: ReturnType<typeof setInterval> | null = null
const AUTOPLAY_DELAY = 4500

const startAutoplay = () => {
  stopAutoplay()
  autoplayTimer = setInterval(() => {
    emblaApi.value?.scrollNext()
  }, AUTOPLAY_DELAY)
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

watch(emblaApi, (api) => {
  if (!api) return
  scrollSnaps.value = api.scrollSnapList()
  selectedIndex.value = api.selectedScrollSnap()
  api.on('select', onSelect)
  api.on('reInit', onSelect)
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
  emblaApi.value?.off('select', onSelect)
  emblaApi.value?.off('reInit', onSelect)
})
</script>

<template>
  <section class="mt-5 px-4 lg:px-0">
    <div
      class="relative group"
      @mouseenter="stopAutoplay"
      @mouseleave="startAutoplay"
    >
      <div ref="emblaRef" class="overflow-hidden lg:rounded-none rounded-t-[12px]">
        <div class="flex">
          <NuxtLink
            v-for="banner in banners"
            :key="banner.id"
            :to="banner.link ? localePath(banner.link) : undefined"
            class="flex-[0_0_100%] min-w-0 block"
          >
            <img
              :src="banner.mobile_image ?? banner.image ?? undefined"
              :alt="bannerSection.title[locale]"
              class="lg:hidden w-full h-[90px] object-cover rounded-t-[12px]"
            />
            <img
              :src="banner.image ?? undefined"
              :alt="bannerSection.title[locale]"
              class="hidden lg:block w-full h-[465px] object-cover"
            />
          </NuxtLink>
        </div>
      </div>

      <!-- Arrows (desktop only) -->
      <button
        type="button"
        class="hidden lg:flex absolute start-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 hover:bg-white items-center justify-center text-slate-900 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="Previous slide"
        @click="scrollPrev"
      >
        <i
          :class="locale === 'ar' ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'"
          class="text-2xl"
        />
      </button>
      <button
        type="button"
        class="hidden lg:flex absolute end-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 hover:bg-white items-center justify-center text-slate-900 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="Next slide"
        @click="scrollNext"
      >
        <i
          :class="locale === 'ar' ? 'ri-arrow-left-s-line' : 'ri-arrow-right-s-line'"
          class="text-2xl"
        />
      </button>

      <!-- Dots -->
      <div
        v-if="scrollSnaps.length > 1"
        dir="ltr"
        class="absolute bottom-2 lg:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10"
      >
        <button
          v-for="(_, i) in scrollSnaps"
          :key="i"
          type="button"
          class="h-2 lg:h-2.5 rounded-full transition-all duration-200"
          :class="
            i === selectedIndex
              ? 'w-5 lg:w-6 bg-white'
              : 'w-2 lg:w-2.5 bg-white/60 hover:bg-white/80'
          "
          :aria-label="`Go to slide ${i + 1}`"
          @click="scrollTo(i)"
        />
      </div>
    </div>
  </section>
</template>
