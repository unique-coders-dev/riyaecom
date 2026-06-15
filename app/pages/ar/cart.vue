<script setup lang="ts">
const { t } = useLocale()
useHead({ title: `${t.value.navbar.cart} | ${t.value.siteName}` })
</script>

<template>
  <CartMobilePage />
</template>
