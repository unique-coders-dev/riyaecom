<script setup lang="ts">
const { localePath } = useLocale()

const baseBrands = [
  { id: 1, name: 'moda yakamoz', image: '/images/brand1.png', link: '/shop' },
  { id: 2, name: 'YAKE STORE', image: '/images/brand2.png', link: '/shop' },
  { id: 3, name: 'RAYS', image: '/images/brand3.png', link: '/shop' },
  { id: 4, name: 'tozlu', image: '/images/brand4.png', link: '/shop' },
  { id: 5, name: 'BIG DART', image: '/images/brand5.png', link: '/shop' },
  { id: 6, name: 'Armonica', image: '/images/brand6.png', link: '/shop' },
  { id: 7, name: 'B@OIL', image: '/images/brand7.png', link: '/shop' },
]

// Repeat for 3 lines (21 items total)
const brands = Array.from({ length: 3 }, (_, i) => {
  return baseBrands.map(b => ({ ...b, id: b.id + i * 7 }))
}).flat()
</script>

<template>
  <main class="max-w-[1536px] mx-auto px-4 lg:px-12 py-10">
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-x-4 lg:gap-x-6 gap-y-10">
      <NuxtLink
        v-for="brand in brands"
        :key="brand.id"
        :to="localePath(brand.link)"
        class="block group"
      >
        <!-- Card -->
        <div class="h-[200px] w-full bg-[#F9F9F9] rounded-[16px] grid place-items-center p-6 border border-transparent transition-colors group-hover:border-gray-200">
          <img
            :src="brand.image"
            :alt="brand.name"
            class="max-w-full max-h-full object-contain mix-blend-multiply m-auto"
          />
        </div>
        <!-- Name -->
        <h3 class="mt-4 text-center font-bold text-[13px] text-[#091019]">
          {{ brand.name }}
        </h3>
      </NuxtLink>
    </div>
  </main>
</template>
