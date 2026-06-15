<script setup lang="ts">
const { t, locale, localePath } = useLocale()

const cartItems = ref([
  {
    id: 'guest_208100_xl',
    product_id: 208100,
    quantity: 2,
    size: 'xl',
    color: 'black',
    selected: true,
    price: 200,
    old_price: 240,
    product: {
      id: 208100,
      name_en: 'Women basic short blouse with long sleeves and round neck',
      name_ar: 'بلوزة قصيرة أساسية بأكمام طويلة و ياقة دائرية للنساء',
      name_tr: null,
      slug: 'women-basic-short-blouse',
      image: '/images/p1.png',
      brand: { id: 1, name: { en: 'Tommy Life', ar: 'تومي لايف' }, image: null, translated_name: 'تومي لايف' },
      sizes: [
        { id: 1, name: { en: 'xl', ar: 'xl' } },
        { id: 2, name: { en: 'l', ar: 'l' } },
        { id: 3, name: { en: 'm', ar: 'm' } },
      ],
      colors: [
        { id: 1, key: 'black', name: { en: 'Black', ar: 'أسود' }, color_code: '#000000' },
        { id: 2, key: 'white', name: { en: 'White', ar: 'أبيض' }, color_code: '#ffffff' },
      ],
      currency: { id: 1, name: 'SAR', prefix: 'ريال', exchange_rate: 1, delivery_days: null },
    },
  },
  {
    id: 'guest_208100_l',
    product_id: 208100,
    quantity: 2,
    size: 'xl',
    color: 'black',
    selected: true,
    price: 200,
    old_price: 240,
    product: {
      id: 208100,
      name_en: 'Women basic short blouse with long sleeves and round neck',
      name_ar: 'بلوزة قصيرة أساسية بأكمام طويلة و ياقة دائرية للنساء',
      name_tr: null,
      slug: 'women-basic-short-blouse',
      image: '/images/p1.png',
      brand: { id: 1, name: { en: 'Tommy Life', ar: 'تومي لايف' }, image: null, translated_name: 'تومي لايف' },
      sizes: [
        { id: 1, name: { en: 'xl', ar: 'xl' } },
        { id: 2, name: { en: 'l', ar: 'l' } },
        { id: 3, name: { en: 'm', ar: 'm' } },
      ],
      colors: [
        { id: 1, key: 'black', name: { en: 'Black', ar: 'أسود' }, color_code: '#000000' },
        { id: 2, key: 'white', name: { en: 'White', ar: 'أبيض' }, color_code: '#ffffff' },
      ],
      currency: { id: 1, name: 'SAR', prefix: 'ريال', exchange_rate: 1, delivery_days: null },
    },
  },
])

const productName = (p: { name_ar: string | null; name_en: string | null; name_tr: string | null }) => {
  const current = locale.value === 'ar' ? p.name_ar : p.name_en
  return current ?? p.name_en ?? p.name_ar ?? p.name_tr ?? ''
}

const brandName = (b: { name: { en: string; ar: string } } | null) => b?.name?.[locale.value] ?? ''

const total = '189.00'

// Shared with app.vue — bottom nav slides away on scroll down; keep the bottom bar in sync
const hideBottomBar = useState<boolean>('hideBottomBar', () => false)

const increment = (item: (typeof cartItems.value)[number]) => { item.quantity++ }
const decrement = (item: (typeof cartItems.value)[number]) => { if (item.quantity > 1) item.quantity-- }
const removeItem = (id: string | number) => { cartItems.value = cartItems.value.filter(i => i.id !== id) }
</script>

<template>
  <div class="bg-white lg:bg-[#FAFAFA]">
    <div class="max-w-[1280px] mx-auto lg:px-8 lg:py-8 pb-8 lg:pb-16 lg:grid lg:grid-cols-[1fr_360px] lg:gap-8 lg:items-start">
      <div class="min-w-0 lg:bg-white lg:rounded-[16px] lg:border lg:border-[#E8E8E8] lg:p-6">
    <!-- Cart items -->
    <div class="px-4 pt-4 lg:px-0 lg:pt-0 flex flex-col gap-4 lg:gap-6">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex gap-3 lg:gap-5 lg:pb-6 lg:border-b lg:border-[#F0F0F0] lg:last:border-b-0 lg:last:pb-0"
      >
        <!-- Image -->
        <img
          :src="item.product.image"
          :alt="productName(item.product)"
          class="w-[90px] h-[90px] lg:w-[120px] lg:h-[120px] rounded-[8px] object-cover shrink-0"
        />

        <!-- Details -->
        <div class="flex-1 min-w-0">
          <p class="m-0 text-[13px] lg:text-[15px] font-semibold text-[#091019] leading-snug line-clamp-2">
            {{ productName(item.product) }}
          </p>
          <p class="m-0 mt-0.5 text-[11px] lg:text-[12px] text-[#6F7B8B]">{{ brandName(item.product.brand) }}</p>
          <div class="mt-1 lg:mt-2 flex items-center gap-2">
            <span class="text-[14px] lg:text-[16px] font-bold text-[#091019]">{{ item.price }} {{ t.cart.currency }}</span>
            <span class="text-[12px] lg:text-[13px] text-[#6F7B8B] line-through">{{ item.old_price }} {{ t.cart.currency }}</span>
          </div>

          <!-- Variant selects -->
          <div class="mt-2 flex items-center gap-2">
            <div class="flex flex-col items-center gap-0.5">
              <span class="text-[10px] text-[#6F7B8B]">{{ t.cart.quantity }}</span>
              <div dir="ltr" class="h-8 flex items-center bg-[#F6F6F6] rounded-[8px] px-1 gap-0.5">
                <button class="w-6 h-6 flex items-center justify-center text-[#091019]" @click="decrement(item)">
                  <i class="ri-subtract-line text-sm" />
                </button>
                <span class="w-5 text-center text-[12px] font-medium text-[#091019]">{{ item.quantity }}</span>
                <button class="w-6 h-6 flex items-center justify-center text-[#091019]" @click="increment(item)">
                  <i class="ri-add-line text-sm" />
                </button>
              </div>
            </div>

            <div class="flex flex-col items-center gap-0.5">
              <span class="text-[10px] text-[#6F7B8B]">{{ t.cart.size }}</span>
              <select v-model="item.size" class="h-8 px-2 rounded-[8px] border border-[#E8E8E8] bg-white text-[11px] text-[#091019] min-w-[52px]">
                <option v-for="s in item.product.sizes" :key="s.id" :value="s.name.en">{{ s.name[locale] }}</option>
              </select>
            </div>

            <div class="flex flex-col items-center gap-0.5">
              <span class="text-[10px] text-[#6F7B8B]">{{ t.cart.color }}</span>
              <select v-model="item.color" class="h-8 px-2 rounded-[8px] border border-[#E8E8E8] bg-white text-[11px] text-[#091019] min-w-[64px]">
                <option v-for="c in item.product.colors" :key="c.id" :value="c.key">{{ c.name[locale] }}</option>
              </select>
            </div>
          </div>

          <!-- Delivery row -->
          <div class="mt-2 flex items-center gap-2">
            <div class="flex-1 h-8 flex items-center gap-1.5 bg-[#F6F6F6] rounded-[8px] px-2.5 text-[#091019]">
              <i class="ri-truck-line text-sm shrink-0" />
              <span class="text-[10px]">{{ t.cart.deliveryBy }}</span>
            </div>
            <button class="text-[#FF3F3F] shrink-0" :aria-label="t.cart.remove" @click="removeItem(item.id)">
              <i class="ri-delete-bin-line text-[20px]" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Free shipping success banner (matches CartDrawer) -->
    <div class="mx-4 mt-5 lg:mx-0 lg:mt-6 p-4 bg-[#ECFDF3] border border-[#DEEBDD] rounded-[16px]">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-2 min-w-0">
          <i class="ri-checkbox-circle-line text-xl text-[#32B828] shrink-0" />
          <p class="m-0 text-[12px] font-semibold text-slate-800">
            {{ t.cart.congratsPrefix }}
            <span class="text-[#32B828]">{{ t.cart.freeShipping }}</span>
            {{ t.cart.congratsSuffix }}
          </p>
        </div>
        <span class="shrink-0 bg-[#32B828] text-white text-[11px] font-semibold px-3 py-1 rounded-[24px]">
          {{ t.cart.limitedTime }}
        </span>
      </div>
      <div class="mt-3 relative h-[5px] rounded-full bg-[#DFF0E2] overflow-hidden">
        <div class="absolute inset-y-0 start-0 w-[62%] bg-[#32B828] rounded-full" />
      </div>
    </div>
      </div>

      <!-- Desktop summary sidebar -->
      <aside class="hidden lg:block lg:sticky lg:top-[110px] bg-white border border-[#E8E8E8] rounded-[16px] p-6">
        <h2 class="m-0 mb-4 text-[16px] font-bold text-[#091019]">{{ t.cart.total }}</h2>
        <div class="flex items-center justify-between pb-4 border-b border-[#F0F0F0]">
          <span class="text-[14px] text-[#091019]">{{ t.cart.total }}</span>
          <span dir="ltr" class="text-[18px] font-bold text-[#091019] inline-flex items-center gap-0.5">
            <UiRiyalSymbol v-if="locale === 'ar'" />
            <span v-else class="text-[14px]">SAR</span>
            {{ total }}
          </span>
        </div>
        <NuxtLink
          :to="localePath('/checkout')"
          class="mt-5 w-full h-12 flex items-center justify-center rounded-[8px] bg-navbar text-white text-[14px] font-semibold hover:opacity-90 transition-opacity"
        >
          {{ t.cart.checkout }}
        </NuxtLink>
      </aside>
    </div>
  </div>

  <!-- Mobile fixed bottom bar -->
  <Teleport to="body">
    <div
      class="lg:hidden fixed bottom-[62px] inset-x-0 z-40 bg-white border-t border-[#E8E8E8] px-4 pt-3 pb-3 transition-transform duration-300 ease-out"
      :class="hideBottomBar ? 'translate-y-[62px]' : 'translate-y-0'"
    >
      <!-- Total -->
      <div class="flex items-center justify-between mb-3">
        <span class="text-[14px] font-bold text-[#091019]">{{ t.cart.total }}</span>
        <span dir="ltr" class="text-[15px] font-bold text-[#091019] inline-flex items-center gap-0.5">
          <UiRiyalSymbol v-if="locale === 'ar'" />
          <span v-else class="text-[13px]">SAR</span>
          {{ total }}
        </span>
      </div>
      <!-- Checkout button -->
      <div class="flex flex-col gap-2.5">
        <NuxtLink
          :to="localePath('/checkout')"
          class="w-full h-11 flex items-center justify-center rounded-[8px] bg-navbar text-white text-[14px] font-semibold"
        >
          {{ t.cart.checkout }}
        </NuxtLink>
      </div>
    </div>
  </Teleport>
</template>
