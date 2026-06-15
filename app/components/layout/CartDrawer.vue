<script setup lang="ts">
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const { t, locale, localePath } = useLocale()

// Mock data following the mini cart API shape (NavbarCartResponse); will be API-driven
const cartItems = ref([
  {
    id: 'guest_208100_xl',
    product_id: 208100,
    quantity: 1,
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

const total = computed(() => (locale.value === 'ar' ? '189,00$' : '$189.00'))

const increment = (item: (typeof cartItems.value)[number]) => {
  item.quantity++
}
const decrement = (item: (typeof cartItems.value)[number]) => {
  if (item.quantity > 1) item.quantity--
}
const removeItem = (id: string | number) => {
  cartItems.value = cartItems.value.filter((i) => i.id !== id)
}

watch(
  () => props.open,
  (open) => {
    if (import.meta.client) document.body.style.overflow = open ? 'hidden' : ''
  },
)
</script>

<template>
  <Teleport to="body">
    <!-- Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 bg-black/40 z-[99]" @click="emit('close')" />
    </Transition>

    <!-- Drawer panel (slides from inline-end: left in RTL, right in LTR) -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="rtl:-translate-x-full ltr:translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-250 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="rtl:-translate-x-full ltr:translate-x-full"
    >
      <aside
        v-if="open"
        class="fixed inset-y-0 end-0 w-full max-w-[470px] bg-white z-[100] flex flex-col"
        :dir="t.dir"
      >
        <!-- Header -->
        <div class="flex items-center justify-between bg-white px-5 py-4 shrink-0">
          <h2 class="m-0 text-[15px] font-bold text-slate-900">
            {{ t.cart.title }} ({{ cartItems.length }})
          </h2>
          <button
            class="w-9 h-9 rounded-full bg-[#F6F6F6] flex items-center justify-center text-slate-700 hover:bg-gray-200 transition-colors"
            aria-label="Close"
            @click="emit('close')"
          >
            <i class="ri-close-line text-xl" />
          </button>
        </div>

        <!-- Scrollable content -->
        <div class="flex-1 overflow-y-auto">
          <!-- Cart items -->
          <div v-for="item in cartItems" :key="item.id" class="px-5 pt-5">
            <div class="flex gap-3">
              <!-- Product image -->
              <img
                :src="item.product.image"
                :alt="productName(item.product)"
                class="w-[100px] h-[100px] rounded-lg object-cover shrink-0"
              />

              <!-- Details -->
              <div class="flex-1 min-w-0">
                <p class="m-0 text-[13px] font-semibold text-slate-900 leading-snug">
                  {{ productName(item.product) }}
                </p>
                <p class="m-0 mt-1 text-[12px] text-gray-400">{{ brandName(item.product.brand) }}</p>
                <div class="mt-1 flex items-center gap-2">
                  <span class="text-[14px] font-bold text-slate-900">{{ item.price }} {{ t.cart.currency }}</span>
                  <span class="text-[12px] text-gray-400 line-through">{{ item.old_price }} {{ t.cart.currency }}</span>
                </div>

                <!-- Variant controls -->
                <div class="mt-2 flex items-end gap-2">
                  <div class="flex flex-col items-center gap-1">
                    <span class="text-[11px] text-gray-500">{{ t.cart.quantity }}</span>
                    <div dir="ltr" class="h-9 flex items-center bg-[#F6F6F6] rounded-[8px] px-1">
                      <button class="w-7 h-7 flex items-center justify-center text-slate-700 hover:text-slate-900" aria-label="-" @click="decrement(item)">
                        <i class="ri-subtract-line" />
                      </button>
                      <span class="w-6 text-center text-[13px] font-medium text-slate-900">{{ item.quantity }}</span>
                      <button class="w-7 h-7 flex items-center justify-center text-slate-700 hover:text-slate-900" aria-label="+" @click="increment(item)">
                        <i class="ri-add-line" />
                      </button>
                    </div>
                  </div>

                  <div class="flex flex-col items-center gap-1">
                    <span class="text-[11px] text-gray-500">{{ t.cart.size }}</span>
                    <select v-model="item.size" class="h-9 px-2 rounded-[8px] border border-gray-200 bg-white text-[12px] text-slate-900">
                      <option v-for="s in item.product.sizes" :key="s.id" :value="s.name.en">
                        {{ s.name[locale] }}
                      </option>
                    </select>
                  </div>

                  <div class="flex flex-col items-center gap-1">
                    <span class="text-[11px] text-gray-500">{{ t.cart.color }}</span>
                    <select v-model="item.color" class="h-9 px-2 rounded-[8px] border border-gray-200 bg-white text-[12px] text-slate-900">
                      <option v-for="c in item.product.colors" :key="c.id" :value="c.key">
                        {{ c.name[locale] }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Shipping estimate + remove -->
            <div class="mt-3 flex items-center gap-3">
              <div class="flex-1 h-9 flex items-center gap-2 bg-[#F6F6F6] rounded-[8px] px-3 text-slate-700">
                <i class="ri-truck-line text-base shrink-0" />
                <span class="text-[11px]">{{ t.cart.deliveryBy }}</span>
              </div>
              <button class="text-red-500 hover:text-red-600 transition-colors shrink-0" :aria-label="t.cart.remove" @click="removeItem(item.id)">
                <i class="ri-delete-bin-line text-xl" />
              </button>
            </div>
          </div>

          <!-- Free shipping success banner -->
          <div class="mx-5 mt-5 p-4 bg-[#ECFDF3] border border-[#DEEBDD] rounded-[16px]">
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

        <!-- Footer -->
        <div class="shrink-0 border-t border-gray-100 px-5 py-4">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[14px] font-semibold text-slate-900">{{ t.cart.total }}</span>
            <span class="text-[16px] font-bold text-slate-900">{{ total }}</span>
          </div>
          <NuxtLink
            :to="localePath('/cart')"
            class="w-full h-11 mb-2.5 rounded-[8px] bg-[#F6F6F6] border border-[#E8E8E8] text-[13px] font-semibold text-slate-900 flex items-center justify-center hover:bg-gray-100 transition-colors"
            @click="emit('close')"
          >
            {{ t.cart.viewCart }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/checkout')"
            class="w-full h-11 rounded-[8px] bg-navbar text-white text-[13px] font-semibold flex items-center justify-center hover:opacity-95 transition-opacity"
            @click="emit('close')"
          >
            {{ t.cart.checkout }}
          </NuxtLink>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>
