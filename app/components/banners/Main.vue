<script setup lang="ts">
const { localePath } = useLocale()

// Mock following the HomeSection (layout: 'banner') shape; will be API-driven
const section1 = [
  { id: 1, image: '/images/banner1.png', link: '/shop' },
  { id: 2, image: '/images/banner2.png', link: '/shop' },
  { id: 3, image: '/images/banner3.png', link: '/shop' },
  { id: 4, image: '/images/banner1.png', link: '/shop' },
]

const section2 = [
  { id: 1, image: '/images/banner2.png', link: '/shop' },
  { id: 2, image: '/images/banner3.png', link: '/shop' },
]

const section3 = [
  { id: 1, image: '/images/banner1.png', link: '/shop' },
  { id: 2, image: '/images/banner2.png', link: '/shop' },
  { id: 3, image: '/images/banner3.png', link: '/shop' },
]
</script>

<template>
  <div>
    <main class="max-w-[1536px] mx-auto px-4 lg:px-12 py-6 lg:py-10">
      <!-- Section 1: 2 columns x 2 rows -->
      <div class="grid grid-cols-2 gap-3 lg:gap-5">
        <NuxtLink
          v-for="banner in section1"
          :key="banner.id"
          :to="localePath(banner.link)"
          class="block overflow-hidden rounded-[8px]"
        >
          <img
            :src="banner.image"
            alt="banner"
            class="w-full h-[180px] sm:h-[280px] lg:h-[465px] object-cover"
          />
        </NuxtLink>
      </div>

      <hr class="my-6 lg:my-8 border-t-[4px] border-[#091019]" />

      <!-- Section 2: 1 row x 2 columns -->
      <div class="grid grid-cols-2 gap-3 lg:gap-5">
        <NuxtLink
          v-for="banner in section2"
          :key="banner.id"
          :to="localePath(banner.link)"
          class="block overflow-hidden rounded-[8px]"
        >
          <img
            :src="banner.image"
            alt="banner"
            class="w-full h-[180px] sm:h-[280px] lg:h-[465px] object-cover"
          />
        </NuxtLink>
      </div>

      <hr class="my-6 lg:my-8 border-t-[4px] border-[#091019]" />

      <!-- Section 3: 1 row x 3 columns -->
      <div class="grid grid-cols-3 gap-3 lg:gap-5">
        <NuxtLink
          v-for="banner in section3"
          :key="banner.id"
          :to="localePath(banner.link)"
          class="block overflow-hidden rounded-[8px]"
        >
          <img
            :src="banner.image"
            alt="banner"
            class="w-full h-[120px] sm:h-[200px] lg:h-[465px] object-cover"
          />
        </NuxtLink>
      </div>
      
      <hr class="my-6 lg:my-8 border-t-[4px] border-[#091019]" />
    </main>
    <HomeCollections hide-title no-margin-top />
    <div class="max-w-[1536px] mx-auto px-4 lg:px-12">
      <hr class="my-6 lg:my-8 border-t-[4px] border-[#091019]" />
    </div>
    <HomeCollections hide-title no-margin-top grid-cols8 />
  </div>
</template>
