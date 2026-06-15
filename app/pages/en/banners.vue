<script setup lang="ts">
const { t } = useLocale()
useHead({ title: `Banners | ${t.value.siteName}` })
</script>

<template>
  <BannersMain />
</template>
