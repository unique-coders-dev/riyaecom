<script setup lang="ts">
const { t } = useLocale()
useHead({ title: `Brands | ${t.value.siteName}` })
</script>

<template>
  <BrandsMain />
</template>
