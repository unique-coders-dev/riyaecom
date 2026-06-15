<script setup lang="ts">
import en from '~/locales/en'

useHead({
  title: en.home.title,
})
</script>

<template>
  <main class="min-h-[60vh]">
    <HomeBanner />
    <HomeSiteFeatures />
    <HomeCategories />
    <HomeRecommended />
    <HomeBestSellers />
    <HomeCollections />
    <HomeCompleteLook />
    <HomeOurProducts />
  </main>
</template>
