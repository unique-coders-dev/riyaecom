<script setup lang="ts">
defineProps<{ hidden?: boolean }>()

const { t, localePath } = useLocale()
const route = useRoute()

const cartCount = ref(1)

const items = computed(() => [
  {
    key: 'cart',
    label: t.value.navbar.cart,
    icon: 'ri-shopping-cart-line',
    activeIcon: 'ri-shopping-cart-fill',
    path: '/cart',
    badge: cartCount.value,
  },
  {
    key: 'wishlist',
    label: t.value.navbar.wishlist,
    icon: 'ri-heart-line',
    activeIcon: 'ri-heart-fill',
    path: '/wishlist',
  },
  {
    key: 'shop',
    label: t.value.navbar.style,
    icon: 'ri-play-circle-line',
    activeIcon: 'ri-play-circle-fill',
    path: '/style',
  },
  {
    key: 'account',
    label: t.value.navbar.accountMobile,
    icon: 'ri-user-line',
    activeIcon: 'ri-user-fill',
    path: '/account',
  },
])

function isActive(path: string) {
  const resolved = localePath(path)
  return route.path.startsWith(resolved)
}
</script>

<template>
  <nav
    class="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-[#E8E8E8] transition-transform duration-300 ease-out"
    :class="hidden ? 'translate-y-full' : 'translate-y-0'"
  >
    <div class="flex items-center h-[62px]">
      <NuxtLink
        v-for="item in items"
        :key="item.key"
        :to="localePath(item.path)"
        class="flex flex-col items-center justify-center gap-1 flex-1 h-full"
        :class="isActive(item.path) ? 'text-navbar' : 'text-[#6F7B8B]'"
      >
        <!-- Icon with active pill bg -->
        <span
          class="relative flex items-center justify-center h-[28px] px-4 rounded-[16px] transition-colors"
          :class="isActive(item.path) ? 'bg-navbar' : 'bg-transparent'"
        >
          <i
            :class="isActive(item.path) ? item.activeIcon : item.icon"
            class="text-[22px] leading-none transition-colors"
            :style="isActive(item.path) ? 'color: white' : ''"
          />
          <!-- Badge -->
          <span
            v-if="item.badge"
            class="absolute -top-1 -end-1 min-w-[15px] h-[15px] flex items-center justify-center rounded-full bg-[#D4342A] text-white text-[9px] font-bold px-0.5 leading-none"
          >
            {{ item.badge }}
          </span>
        </span>
        <span class="text-[11px] font-medium leading-none">{{ item.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>
