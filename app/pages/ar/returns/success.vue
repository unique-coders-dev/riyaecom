<script setup lang="ts">
const { t } = useLocale()
useHead({ title: `تم الإرجاع | ${t.value.siteName}` })
</script>

<template>
  <ReturnsSuccessPage />
</template>
