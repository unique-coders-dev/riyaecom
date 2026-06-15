<script setup lang="ts">
const { t, locale, localePath } = useLocale()

const backIcon = computed(() => (locale.value === 'ar' ? 'ri-arrow-right-line' : 'ri-arrow-left-line'))

const trackSteps = computed(() => [
  { icon: 'ri-archive-2-line', title: t.value.account.preparing, sub: t.value.account.prepSub },
  { icon: 'ri-truck-line', title: t.value.account.shipped, sub: t.value.account.shippedSub },
  { icon: 'ri-home-4-line', title: t.value.account.delivered, sub: t.value.account.deliveredSub },
])

// Mock order; will be API-driven
const products = [
  { id: 1, image: '/images/p3.png' },
  { id: 2, image: '/images/p4.png' },
].map((p) => ({
  ...p,
  name: {
    ar: 'قميص رجالي منقوش بأكمام طويلة وقصة عادية وتفاصيل جيب',
    en: 'Men patterned shirt with long sleeves, regular fit and pocket details',
  },
  price: '200',
  brand: { ar: 'توزلو', en: 'Tozlu' },
  quantity: 2,
  size: 'xl',
  color: { ar: 'أسود', en: 'Black' },
}))

const address = {
  name: { ar: 'نورة أحمد', en: 'Noura Ahmed' },
  phone: '+966 50 123 4567',
  street: { ar: 'شارع التحلية, الرياض 12345', en: 'Tahlia St, Riyadh 12345' },
  city: { ar: 'الرياض, المملكة العربية السعودية', en: 'Riyadh, Saudi Arabia' },
}
</script>

<template>
  <main class="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 py-6 min-h-[60vh]">
    <!-- Breadcrumbs -->
    <nav class="flex items-center gap-1.5 text-[12px] flex-wrap">
      <NuxtLink :to="localePath('/')" class="text-[#64768C] hover:underline">{{ t.shop.home }}</NuxtLink>
      <span class="text-[#64768C]">/</span>
      <NuxtLink :to="localePath('/account')" class="text-[#64768C] hover:underline">{{ t.account.myAccount }}</NuxtLink>
      <span class="text-[#64768C]">/</span>
      <NuxtLink :to="localePath('/account/orders')" class="text-[#64768C] hover:underline">{{ t.account.myOrders }}</NuxtLink>
      <span class="text-[#64768C]">/</span>
      <span class="font-bold text-[#091019]">{{ t.account.orderDetails }}</span>
    </nav>

    <!-- Back link -->
    <NuxtLink :to="localePath('/account/orders')" class="mt-5 inline-flex items-center gap-2 text-[14px] font-bold text-[#091019] hover:text-navbar transition-colors">
      <i :class="backIcon" class="text-lg" />
      {{ t.account.backToOrders }}
    </NuxtLink>

    <!-- Order header card -->
    <div class="mt-4 bg-white rounded-[12px] shadow-[0px_4px_20px_0px_#64646426] px-5 py-4 flex items-center justify-between gap-3 flex-wrap">
      <div>
        <p class="m-0 text-[15px] font-bold text-[#091019]">
          {{ t.account.orderNoTitle }} <span dir="ltr">#RY2024-1235</span>
        </p>
        <p class="m-0 mt-1 text-[12px] text-[#64768C]">{{ t.account.orderDate }}</p>
      </div>
      <span class="bg-[#2774CC] text-white text-[12px] font-semibold px-4 py-1.5 rounded-[8px]">
        {{ t.account.delivered }}
      </span>
    </div>

    <div class="mt-4 grid gap-4 lg:grid-cols-2 items-start">
      <!-- Tracking + products + payment/address -->
      <div class="flex flex-col gap-4">
        <!-- Track shipment -->
        <div class="bg-white rounded-[12px] shadow-[0px_4px_20px_0px_#64646426] p-5">
          <h2 class="m-0 text-[14px] font-bold text-[#091019]">{{ t.account.trackShipment }}</h2>
          <div class="mt-4">
            <template v-for="(step, i) in trackSteps" :key="step.title">
              <div class="flex items-center gap-3">
                <span class="w-10 h-10 rounded-full bg-[#32B828] text-white flex items-center justify-center shrink-0">
                  <i :class="step.icon" class="text-lg" />
                </span>
                <div>
                  <p class="m-0 text-[13px] font-bold text-[#091019]">{{ step.title }}</p>
                  <p class="m-0 mt-0.5 text-[12px] text-[#64768C]">{{ step.sub }}</p>
                </div>
              </div>
              <span v-if="i < trackSteps.length - 1" class="block w-px h-4 bg-gray-200 ms-5" />
            </template>
          </div>
          <div class="mt-4 pt-3 border-t border-gray-100 text-[12px] flex items-center gap-1.5">
            <span class="text-[#64768C]">{{ t.account.trackingNo }}</span>
            <span class="font-bold text-[#541676]" dir="ltr">SA123456789</span>
          </div>
        </div>

        <!-- Products -->
        <div class="bg-white rounded-[12px] shadow-[0px_4px_20px_0px_#64646426] p-5">
          <h2 class="m-0 text-[14px] font-bold text-[#091019]">{{ t.account.productsCount }}</h2>
          <div class="mt-4 flex flex-col gap-4">
            <div
              v-for="(product, i) in products"
              :key="product.id"
              class="flex items-start gap-3"
              :class="i < products.length - 1 ? 'pb-4 border-b border-gray-100' : ''"
            >
              <img :src="product.image" :alt="product.name[locale]" class="w-[100px] h-[100px] rounded-[8px] object-cover bg-gray-100 shrink-0" />
              <div class="min-w-0">
                <p class="m-0 text-[12px] font-semibold text-[#091019] leading-snug">{{ product.name[locale] }}</p>
                <p class="m-0 mt-1 text-[13px] font-bold text-[#091019]">
                  <span dir="ltr" class="inline-flex items-center gap-0.5"><UiRiyalSymbol /> {{ product.price }}</span>
                </p>
                <p class="m-0 mt-1 text-[11px] text-[#64768C]">{{ t.account.brandLabel }} : {{ product.brand[locale] }}</p>
                <p class="m-0 mt-1.5 text-[11px] text-[#64768C] flex items-center gap-3 flex-wrap">
                  <span>{{ t.cart.quantity }} <span class="text-[#091019] font-semibold" dir="ltr">{{ product.quantity }}</span></span>
                  <span class="text-gray-300">|</span>
                  <span>{{ t.cart.size }} <span class="text-[#091019] font-semibold" dir="ltr">{{ product.size }}</span></span>
                  <span class="text-gray-300">|</span>
                  <span>{{ t.cart.color }}: <span class="text-[#091019] font-semibold">{{ product.color[locale] }}</span></span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Address + payment -->
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="bg-white rounded-[12px] shadow-[0px_4px_20px_0px_#64646426] p-5 h-full">
            <h2 class="m-0 flex items-center gap-2 text-[14px] font-bold text-[#091019]">
              <i class="ri-map-pin-line text-lg" />
              {{ t.account.shippingAddress }}
            </h2>
            <p class="m-0 mt-3 text-[13px] text-[#64768C]">{{ address.name[locale] }}</p>
            <p class="m-0 mt-1.5 text-[13px] text-[#64768C]"><span dir="ltr">{{ address.phone }}</span></p>
            <p class="m-0 mt-1.5 text-[13px] text-[#64768C]">{{ address.street[locale] }}</p>
            <p class="m-0 mt-1.5 text-[13px] text-[#64768C]">{{ address.city[locale] }}</p>
          </div>
          <div class="bg-white rounded-[12px] shadow-[0px_4px_20px_0px_#64646426] p-5 h-full">
            <h2 class="m-0 flex items-center gap-2 text-[14px] font-bold text-[#091019]">
              <i class="ri-bank-card-line text-lg" />
              {{ t.account.paymentMethod }}
            </h2>
            <p class="m-0 mt-3 text-[13px] text-[#64768C]">{{ t.account.creditCardShort }}</p>
            <p class="m-0 mt-1.5 text-[13px] text-[#64768C]"><span dir="ltr">4242 •••• •••• ••••</span></p>
          </div>
        </div>
      </div>

      <!-- Invoice summary + actions -->
      <div>
        <div class="bg-white rounded-[12px] shadow-[0px_4px_20px_0px_#64646426] p-5">
          <h2 class="m-0 text-[14px] font-bold text-[#091019]">{{ t.account.invoiceSummary }}</h2>
          <div class="mt-4 flex flex-col gap-3 text-[13px]">
            <div class="flex items-center justify-between gap-2">
              <span class="text-[#64768C]">{{ t.account.subtotal }}</span>
              <span class="text-[#091019]">520 {{ t.cart.currency }}</span>
            </div>
            <div class="flex items-center justify-between gap-2 pb-3 border-b border-gray-100">
              <span class="text-[#64768C]">{{ t.checkout.shippingLabel }}</span>
              <span class="text-[#091019]">30 {{ t.cart.currency }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold text-[#091019]">{{ t.checkout.total }}</span>
              <span class="font-bold text-navbar">550 {{ t.cart.currency }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-4 grid grid-cols-2 gap-3">
          <button class="h-10 rounded-[10px] bg-navbar text-white text-[12px] font-semibold flex items-center justify-center gap-2 hover:bg-[#EFD0FF] hover:text-[#390049] transition-colors">
            <i class="ri-download-2-line text-base" />
            {{ t.account.downloadInvoice }}
          </button>
          <button class="h-10 rounded-[10px] bg-[#EFD0FF] text-[#390049] text-[12px] font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <i class="ri-refresh-line text-base" />
            {{ t.account.reorder }}
          </button>
          <button class="h-10 rounded-[10px] bg-white border border-[#64768C] text-[#091019] text-[12px] font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <i class="ri-truck-line text-base" />
            {{ t.account.trackShipment }}
          </button>
          <button class="h-10 rounded-[10px] bg-white border border-[#EBD5D3] text-[#D4342A] text-[12px] font-semibold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
            <i class="ri-refresh-line text-base" />
            {{ t.account.returnRequest }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
