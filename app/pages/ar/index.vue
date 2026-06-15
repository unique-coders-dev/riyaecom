<script setup lang="ts">
import ar from '~/locales/ar'

useHead({
  title: ar.home.title,
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
