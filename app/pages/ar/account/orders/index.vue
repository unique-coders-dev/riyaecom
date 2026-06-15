<script setup lang="ts">
import ar from '~/locales/ar'

useHead({
  title: `${ar.account.myOrders} - ${ar.siteName}`,
})
</script>

<template>
  <AccountOrders />
</template>
