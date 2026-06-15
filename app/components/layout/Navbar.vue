<script setup lang="ts">
const { t, locale, localePath } = useLocale()

const isMobileMenuOpen = ref(false)
const searchQuery = ref('')
const showSearchDrop = ref(false)

const recentSearches = computed(() =>
  locale.value === 'ar'
    ? ['طقم', 'سف', 'BY', 'فستان', 'سف', 'طق', 'سف']
    : ['Set', 'Dress', 'BY', 'Jeans', 'Top', 'Skirt', 'Blouse']
)

const searchCategories = computed(() => [
  { label: locale.value === 'ar' ? 'أطقم'      : 'Sets',       img: '/images/pn1.png' },
  { label: locale.value === 'ar' ? 'بناطيل'    : 'Pants',      img: '/images/pn3.png' },
  { label: locale.value === 'ar' ? 'تنانير'    : 'Skirts',     img: '/images/pn5.png' },
  { label: locale.value === 'ar' ? 'ملابس نوم' : 'Sleepwear',  img: '/images/pn7.png' },
  { label: locale.value === 'ar' ? 'جينز'      : 'Jeans',      img: '/images/pn9.png' },
])

const recentTitle     = computed(() => locale.value === 'ar' ? 'عمليات البحث الرائجة' : 'Recent Searches')
const categoriesTitle = computed(() => locale.value === 'ar' ? 'الأقسام الشائعة'      : 'Popular Categories')

// Static counts/user for now; will be API-driven (mini cart / notifications / auth)
const cartCount = ref(2)
const notificationsCount = ref(3)
const userName = computed(() => (locale.value === 'ar' ? 'مصطفى' : 'Mostafa'))
const userHandle = 'motafa.45example'
const userInitials = 'MA'

const isAccountOpen = ref(false)
const isCartOpen = ref(false)
const isCategoriesOpen = ref(false)
const accountRef = ref<HTMLElement | null>(null)
const categoriesRef = ref<HTMLElement | null>(null)
const categoriesMenuRef = ref<HTMLElement | null>(null)

const chevronIcon = computed(() =>
  t.value.dir === 'rtl' ? 'ri-arrow-left-s-line' : 'ri-arrow-right-s-line',
)

const accountMenu = computed(() => [
  { icon: 'ri-user-3-line', label: t.value.account.myAccount, path: '/account' },
  { icon: 'ri-inbox-archive-line', label: t.value.account.myOrders, path: '/account/orders' },
  { icon: 'ri-truck-line', label: t.value.account.trackOrders, path: '/account/track-orders' },
  { icon: 'ri-wallet-3-line', label: t.value.account.walletHistory, path: '/account/wallet' },
  { icon: 'ri-coins-line', label: t.value.account.pointsHistory, path: '/account/points' },
  { icon: 'ri-map-pin-line', label: t.value.account.myAddresses, path: '/account/addresses' },
  { icon: 'ri-notification-3-line', label: t.value.account.notifications, path: '/account/notifications' },
])

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleOutsideClick = (e: MouseEvent) => {
  if (accountRef.value && !accountRef.value.contains(e.target as Node)) {
    isAccountOpen.value = false
  }
  if (
    categoriesRef.value && !categoriesRef.value.contains(e.target as Node) &&
    categoriesMenuRef.value && !categoriesMenuRef.value.contains(e.target as Node)
  ) {
    isCategoriesOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))
</script>

<template>
  <header class="bg-white lg:bg-navbar text-[#091019] lg:text-white">
    <div class="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 relative">
      <div class="h-[90px] hidden lg:flex items-center gap-4 lg:gap-8">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="shrink-0 flex items-center" @click="closeMobileMenu">
          <img src="/images/brangLogo.png" :alt="t.siteName" class="h-7 lg:h-8 w-auto" />
        </NuxtLink>

        <!-- Nav links + Search (desktop) -->
        <div class="hidden md:flex flex-1 items-center justify-center gap-6">
          <nav class="hidden lg:flex items-center gap-6 shrink-0">
            <NuxtLink
              v-for="link in t.navbar.links"
              :key="link.label"
              :to="localePath(link.path)"
              class="text-[15px] font-medium hover:opacity-80 transition-opacity"
            >
              {{ link.label }}
            </NuxtLink>
            <div ref="categoriesRef">
              <button
                class="flex items-center gap-1 text-[15px] font-medium hover:opacity-80 transition-opacity"
                @click="isCategoriesOpen = !isCategoriesOpen"
              >
                <span>{{ t.navbar.categories }}</span>
                <i
                  class="ri-arrow-down-s-line text-lg transition-transform duration-200"
                  :class="isCategoriesOpen ? 'rotate-180' : ''"
                />
              </button>
            </div>
          </nav>

          <div class="relative w-full max-w-[430px]">
            <div class="h-[42px] bg-white rounded-[10px] flex items-center px-4 gap-2 text-gray-500">
              <i class="ri-search-line text-lg shrink-0" />
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="t.navbar.searchPlaceholder"
                class="flex-1 min-w-0 bg-transparent border-0 text-[13px] text-gray-800 placeholder:text-gray-400"
                @focus="showSearchDrop = true"
              />
              <button class="shrink-0 w-8 h-8 -me-1.5 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors" aria-label="Search by image">
                <i class="ri-camera-line text-lg" />
              </button>
            </div>

            <!-- Desktop search dropdown -->
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div
                v-if="showSearchDrop"
                class="absolute top-[calc(100%+8px)] inset-x-0 z-[200] bg-white rounded-[12px] shadow-[0px_8px_24px_0px_#64646426] overflow-y-auto px-4 py-4"
                style="height: 265px"
                :dir="t.dir"
              >
                <!-- Backdrop to close -->
                <div class="fixed inset-0 z-[-1]" @click="showSearchDrop = false" />

                <!-- Recent searches -->
                <p class="m-0 text-[13px] font-bold mb-3" style="color: #390049">{{ recentTitle }}</p>
                <div class="flex flex-wrap gap-2 mb-5">
                  <button
                    v-for="term in recentSearches"
                    :key="term"
                    class="flex items-center gap-1.5 h-8 px-3 rounded-[16px] border text-[12px] font-medium text-[#091019]"
                    style="border-color: #E8E8E8"
                  >
                    <i class="ri-arrow-go-back-line text-[12px] text-[#64768C]" />
                    {{ term }}
                  </button>
                </div>

                <!-- Popular categories -->
                <p class="m-0 text-[13px] font-bold mb-3" style="color: #390049">{{ categoriesTitle }}</p>
                <div class="flex gap-4 overflow-x-auto" style="scrollbar-width: none">
                  <div
                    v-for="cat in searchCategories"
                    :key="cat.label"
                    class="flex flex-col items-center gap-1.5 shrink-0"
                  >
                    <img :src="cat.img" :alt="cat.label" class="object-cover" style="width: 55px; height: 55px; border-radius: 8px" />
                    <span class="text-[11px] font-medium text-[#091019]">{{ cat.label }}</span>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Action icons -->
        <div class="flex items-center gap-2 lg:gap-2.5 shrink-0 ms-auto md:ms-0">
          <!-- Play / video → /style page -->
          <NuxtLink :to="localePath('/style')" class="hidden sm:flex w-10 h-10 rounded-full bg-icon-circle items-center justify-center hover:opacity-90 transition-opacity text-white" aria-label="Style">
            <i class="ri-play-circle-line text-xl" />
          </NuxtLink>

          <!-- Cart -->
          <button class="relative w-10 h-10 rounded-full bg-icon-circle flex items-center justify-center hover:opacity-90 transition-opacity" :aria-label="t.navbar.cart" @click="isCartOpen = true">
            <i class="ri-shopping-cart-2-line text-xl" />
            <span
              v-if="cartCount"
              class="absolute -top-1 -end-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center"
            >{{ cartCount }}</span>
          </button>

          <!-- Wishlist -->
          <button class="hidden sm:flex w-10 h-10 rounded-full bg-icon-circle items-center justify-center hover:opacity-90 transition-opacity" :aria-label="t.navbar.wishlist">
            <i class="ri-heart-line text-xl" />
          </button>

          <!-- Notifications -->
          <button class="hidden sm:flex relative w-10 h-10 rounded-full bg-icon-circle items-center justify-center hover:opacity-90 transition-opacity" :aria-label="t.navbar.notifications">
            <i class="ri-notification-3-line text-xl" />
            <span
              v-if="notificationsCount"
              class="absolute -top-1 -end-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center"
            >{{ notificationsCount }}</span>
          </button>

          <!-- Account avatar + dropdown -->
          <div ref="accountRef" class="relative">
            <button
              class="w-10 h-10 rounded-full bg-white text-navbar text-[13px] font-bold flex items-center justify-center hover:opacity-90 transition-opacity"
              :aria-label="t.navbar.account"
              @click="isAccountOpen = !isAccountOpen"
            >
              {{ userInitials }}
            </button>

            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <!-- top offset = (navbar height - avatar 40px) / 2, so the panel starts at the navbar's bottom edge -->
              <div
                v-if="isAccountOpen"
                class="absolute end-0 top-[calc(100%+12px)] lg:top-[calc(100%+25px)] w-60 bg-white rounded-[10px] shadow-[0_12px_35px_rgba(0,0,0,0.15)] overflow-hidden z-50"
              >
                <!-- User header -->
                <div class="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                  <span class="w-9 h-9 rounded-full bg-icon-circle text-white text-[12px] font-bold flex items-center justify-center shrink-0">
                    {{ userInitials }}
                  </span>
                  <div class="leading-tight min-w-0">
                    <p class="m-0 text-[13px] font-bold text-slate-900 truncate">{{ t.account.greeting }} {{ userName }}</p>
                    <p class="m-0 text-[11px] text-gray-400 truncate" dir="ltr">{{ userHandle }}</p>
                  </div>
                </div>

                <!-- Menu items -->
                <ul>
                  <li v-for="item in accountMenu" :key="item.path">
                    <NuxtLink
                      :to="localePath(item.path)"
                      class="flex items-center justify-between px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      @click="isAccountOpen = false"
                    >
                      <span class="flex items-center gap-3 text-[13px] font-medium text-slate-700">
                        <i :class="item.icon" class="text-lg" />
                        {{ item.label }}
                      </span>
                      <i :class="chevronIcon" class="text-lg text-slate-400" />
                    </NuxtLink>
                  </li>
                </ul>

                <!-- Logout -->
                <button
                  class="w-full flex items-center justify-center gap-2 px-4 py-3.5 text-[13px] font-semibold text-red-500 hover:bg-red-50 transition-colors"
                  @click="isAccountOpen = false"
                >
                  <i class="ri-logout-box-r-line text-lg" />
                  {{ t.account.logout }}
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <!-- Categories mega menu (anchored to navbar container, starts at logo end) -->
      <div ref="categoriesMenuRef" class="contents">
        <LayoutCategoriesMenu :open="isCategoriesOpen" />
      </div>

      <!-- Mobile: all-categories button + search -->
      <div class="lg:hidden pt-3 pb-1 relative">
        <div class="flex items-stretch gap-2">
          <div class="flex-1 min-w-0 h-11 bg-white shadow-[0px_4px_20px_0px_#64646426] rounded-[10px] flex items-center px-3 gap-2 text-gray-400">
            <i class="ri-search-line text-lg shrink-0" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t.navbar.searchMobile"
              class="flex-1 min-w-0 bg-transparent border-0 text-[12px] text-gray-800 placeholder:text-gray-400"
              @focus="showSearchDrop = true"
            />
            <span class="w-px h-5 bg-gray-200 shrink-0" />
            <button class="shrink-0 text-gray-500" aria-label="Search by image">
              <i class="ri-camera-line text-lg" />
            </button>
          </div>
          <button
            class="shrink-0 flex items-center gap-2 bg-white shadow-[0px_4px_20px_0px_#64646426] rounded-[10px] px-3 text-[12px] font-semibold text-[#091019]"
            @click="isMobileMenuOpen = true"
          >
            <i class="ri-menu-line text-lg" />
            {{ t.navbar.allCategories }}
          </button>
        </div>

        <!-- Search dropdown — absolute overlay, does not affect flow -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div
            v-if="showSearchDrop"
            class="absolute top-[48px] inset-x-0 z-[200] bg-white rounded-[12px] shadow-[0px_8px_24px_0px_#64646426] overflow-y-auto px-4 py-4"
            style="height: 265px"
            :dir="t.dir"
          >
            <!-- Backdrop to close -->
            <div class="fixed inset-0 z-[-1]" @click="showSearchDrop = false" />

            <!-- Recent searches -->
            <p class="m-0 text-[13px] font-bold mb-3" style="color: #390049">{{ recentTitle }}</p>
            <div class="flex flex-wrap gap-2 mb-5">
              <button
                v-for="term in recentSearches"
                :key="term"
                class="flex items-center gap-1.5 h-8 px-3 rounded-[16px] border text-[12px] font-medium text-[#091019]"
                style="border-color: #E8E8E8"
              >
                <i class="ri-arrow-go-back-line text-[12px] text-[#64768C]" />
                {{ term }}
              </button>
            </div>

            <!-- Popular categories -->
            <p class="m-0 text-[13px] font-bold mb-3" style="color: #390049">{{ categoriesTitle }}</p>
            <div class="flex gap-4 overflow-x-auto" style="scrollbar-width: none">
              <div
                v-for="cat in searchCategories"
                :key="cat.label"
                class="flex flex-col items-center gap-1.5 shrink-0"
              >
                <img :src="cat.img" :alt="cat.label" class="object-cover" style="width: 55px; height: 55px; border-radius: 8px" />
                <span class="text-[11px] font-medium text-[#091019]">{{ cat.label }}</span>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Tabs -->
        <nav class="mt-3 flex items-center justify-between px-1 border-b border-gray-100">
          <NuxtLink
            v-for="link in t.navbar.links"
            :key="link.label"
            :to="localePath(link.path)"
            class="pb-2 text-[13px] font-semibold text-navbar transition-colors"
            :class="$route.path === localePath(link.path) ? 'border-b-2 border-navbar -mb-px' : ''"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>

    <LayoutMobileMenu :open="isMobileMenuOpen" @close="isMobileMenuOpen = false" />

    <LayoutCartDrawer :open="isCartOpen" @close="isCartOpen = false" />
  </header>
</template>
