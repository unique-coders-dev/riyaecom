<script setup lang="ts">
const { t } = useLocale()
useHead({ title: `Return Submitted | ${t.value.siteName}` })
</script>

<template>
  <ReturnsSuccessPage />
</template>
