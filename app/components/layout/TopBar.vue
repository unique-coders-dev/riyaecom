<script setup lang="ts">
const { t, switchLocalePath, localePath } = useLocale()
</script>

<template>
  <div class="bg-topbar text-white">
    <!-- Mobile topbar -->
    <div class="sm:hidden px-4 py-2.5 flex items-center justify-between">
      <NuxtLink :to="localePath('/')">
        <img src="/images/brangLogo.png" :alt="t.siteName" class="h-5 w-auto" />
      </NuxtLink>
      <NuxtLink
        :to="switchLocalePath"
        class="flex items-center gap-1.5 bg-white text-[#091019] rounded-[8px] px-2.5 py-1 text-[12px] font-semibold"
      >
        <i class="ri-translate-2 text-base" />
        <span dir="ltr">{{ t.otherLocale.toUpperCase() }}</span>
      </NuxtLink>
    </div>

    <!-- Desktop topbar -->
    <div class="hidden sm:flex max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 py-2 items-center justify-between gap-4">
      <!-- Free shipping -->
      <div class="flex items-center gap-2.5">
        <i class="ri-truck-line text-xl sm:text-2xl shrink-0" />
        <div class="leading-tight">
          <p class="text-[12px] sm:text-[13px] font-semibold m-0">{{ t.topbar.freeShipping }}</p>
          <p class="text-[10px] sm:text-[11px] text-white/80 m-0">{{ t.topbar.freeShippingSub }}</p>
        </div>
      </div>

      <!-- Delivery guarantee (hidden on small screens) -->
      <div class="hidden md:flex items-center gap-2.5">
        <i class="ri-checkbox-circle-line text-xl sm:text-2xl shrink-0" />
        <div class="leading-tight">
          <p class="text-[12px] sm:text-[13px] font-semibold m-0">{{ t.topbar.guarantee }}</p>
          <p class="text-[10px] sm:text-[11px] text-white/80 m-0">{{ t.topbar.guaranteeSub }}</p>
        </div>
      </div>

      <!-- Download app + language -->
      <div class="flex items-center gap-4 sm:gap-6">
        <a href="#" dir="ltr" class="hidden sm:flex items-center gap-2 text-[12px] sm:text-[13px] font-medium hover:opacity-80 transition-opacity">
          <i class="ri-smartphone-line text-lg" />
          <span>{{ t.topbar.downloadApp }}</span>
        </a>
        <NuxtLink
          :to="switchLocalePath"
          dir="ltr"
          class="flex items-center gap-2 text-[12px] sm:text-[13px] font-medium hover:opacity-80 transition-opacity"
        >
          <i class="ri-global-line text-lg" />
          <span>{{ t.topbar.language }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
