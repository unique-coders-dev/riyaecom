<script setup lang="ts">
const props = defineProps<{ hideTitle?: boolean; noMarginTop?: boolean; gridCols8?: boolean }>()
const { t, locale, localePath } = useLocale()

// Mock following the Home Page Builder API shape (HomeSection items); will be API-driven
const collections = [
  { id: 1, image: '/images/c4.png', link: '/shop/home-essentials', title: { en: 'Home Essentials', ar: 'لوازم منزلية' }, sort_order: 1 },
  { id: 2, image: '/images/c3.png', link: '/shop/daily-care', title: { en: 'Daily Care', ar: 'العناية اليومية' }, sort_order: 2 },
  { id: 3, image: '/images/c2.png', link: '/shop/best-sellers', title: { en: 'Best Sellers', ar: 'الأكثر مبيعا' }, sort_order: 3 },
  { id: 4, image: '/images/c1.png', link: '/shop/instant-glow', title: { en: 'Instant Glow', ar: 'تألق فورى' }, sort_order: 4 },
  { id: 5, image: '/images/c1.png', link: '/shop/instant-glow', title: { en: 'Instant Glow', ar: 'تألق فورى' }, sort_order: 5 },
  { id: 6, image: '/images/c2.png', link: '/shop/best-sellers', title: { en: 'Best Sellers', ar: 'الأكثر مبيعا' }, sort_order: 6 },
  { id: 7, image: '/images/c3.png', link: '/shop/daily-care', title: { en: 'Daily Care', ar: 'العناية اليومية' }, sort_order: 7 },
  { id: 8, image: '/images/c4.png', link: '/shop/home-essentials', title: { en: 'Home Essentials', ar: 'لوازم منزلية' }, sort_order: 8 },
]

const displayCollections = computed(() => {
  if (props.gridCols8) {
    // Return 16 items by duplicating the 8 items
    return [...collections, ...collections.map(c => ({ ...c, id: c.id + 8 }))]
  }
  return collections
})
</script>

<template>
  <section class="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 mb-10" :class="noMarginTop ? 'mt-0' : 'mt-10'">
    <h2 v-if="!hideTitle" class="m-0 mb-5 text-[18px] lg:text-[20px] font-bold text-[#091019]">
      {{ t.home.collectionsTitle }}
    </h2>

    <div
      v-if="gridCols8"
      class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 lg:gap-3"
    >
      <NuxtLink
        v-for="item in displayCollections"
        :key="item.id"
        :to="localePath(item.link)"
        class="relative block w-full h-[150px] lg:h-[220px] overflow-hidden group"
      >
        <img
          :src="item.image"
          :alt="item.title[locale]"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div
          class="absolute bottom-0 inset-x-0 h-[30px] flex items-center justify-center bg-[#00000080] backdrop-blur-[2px] group-hover:bg-icon-circle group-hover:backdrop-blur-0 transition-colors duration-300"
        >
          <span class="text-white text-[11px] lg:text-[13px] font-semibold">{{ item.title[locale] }}</span>
        </div>
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-2 gap-3 lg:flex lg:flex-wrap lg:justify-center lg:gap-x-3 lg:gap-y-5">
      <NuxtLink
        v-for="(item, index) in displayCollections"
        :key="item.id"
        :to="localePath(item.link)"
        class="relative block w-full h-[230px] lg:w-[350px] lg:h-[400px] overflow-hidden group"
        :class="index > 3 ? 'hidden lg:block' : ''"
      >
        <img
          :src="item.image"
          :alt="item.title[locale]"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div
          class="absolute bottom-0 inset-x-0 h-[40px] flex items-center justify-center bg-[#00000080] backdrop-blur-[2px] group-hover:bg-icon-circle group-hover:backdrop-blur-0 transition-colors duration-300"
        >
          <span class="text-white text-[14px] font-semibold">{{ item.title[locale] }}</span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
