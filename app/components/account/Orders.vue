<script setup lang="ts">
const { t, locale, localePath } = useLocale()
const { open } = useAccountNav()

const user = {
  name: 'Mostafa samy',
  email: 'mjihad84@gmail.com',
  balance: '0.00',
  avatar: '/images/user.jpg',
}

const orders = [1, 2, 3, 4].map((i) => ({
  id: i,
  number: '#123456789',
  status: 'processing',
  subtotal: '57.49',
  subtotal_before_tax: '57.49',
  vat: '57.49',
  shipping_fees: 0,
  total_before_discount: 0,
  discount: 0,
  total: '57.49',
}))
</script>

<template>
  <div>
    <!-- ═══════════════════════════════════════
         DESKTOP LAYOUT
    ═══════════════════════════════════════ -->
    <main class="hidden lg:block max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 py-6 min-h-[60vh]">
      <nav class="flex items-center gap-1.5 text-[12px]">
        <NuxtLink :to="localePath('/')" class="text-[#64768C] hover:underline">{{ t.shop.home }}</NuxtLink>
        <span class="text-[#64768C]">/</span>
        <span class="text-[#091019]">{{ t.account.myOrders }}</span>
      </nav>

      <div class="mt-6 grid gap-6 lg:grid-cols-[260px_1fr] items-start">
        <AccountSidebar active="orders" />

        <section class="bg-white border border-gray-100 rounded-[12px] shadow-[0px_4px_20px_0px_#6464640D] p-6">
          <h1 class="m-0 text-[16px] font-bold text-[#091019]">{{ t.account.myOrders }}</h1>
          <p class="m-0 mt-1 text-[12px] text-[#64768C]">{{ t.account.ordersSubtitle }}</p>

          <div class="mt-5 grid md:grid-cols-2 gap-5">
            <div v-for="order in orders" :key="order.id" class="bg-white rounded-[12px] shadow-[0px_4px_20px_0px_#64646426] p-5">
              <h3 class="m-0 text-[14px] font-bold text-[#091019]">{{ t.account.orderDetails }}</h3>
              <div class="mt-4 flex flex-col gap-3 text-[12px]">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[#64768C]">{{ t.account.orderNumber }}</span>
                  <span class="font-bold text-[#091019]" dir="ltr">{{ order.number }}</span>
                </div>
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[#64768C]">{{ t.account.orderStatus }}</span>
                  <span class="bg-[#FFF8E5] border border-[#D9AA68] text-[#D9AA68] text-[11px] font-semibold px-3 py-0.5 rounded-[16px]">{{ t.account.processing }}</span>
                </div>
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[#64768C]">{{ t.account.subtotal }}</span>
                  <span dir="ltr" class="font-bold text-[#091019] inline-flex items-center gap-0.5"><UiRiyalSymbol /> {{ order.subtotal }}</span>
                </div>
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[#64768C]">{{ t.account.subtotalBeforeTax }}</span>
                  <span dir="ltr" class="font-bold text-[#091019] inline-flex items-center gap-0.5"><UiRiyalSymbol /> {{ order.subtotal_before_tax }}</span>
                </div>
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[#64768C]">{{ t.account.vat }}</span>
                  <span dir="ltr" class="font-bold text-[#091019] inline-flex items-center gap-0.5"><UiRiyalSymbol /> {{ order.vat }}</span>
                </div>
                <div class="flex items-center justify-between gap-2 pb-3 border-b border-gray-100">
                  <span class="text-[#64768C]">{{ t.account.shippingFees }}</span>
                  <span class="font-bold text-[#091019]" dir="ltr">{{ order.shipping_fees }}</span>
                </div>
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[#64768C]">{{ t.account.totalBeforeDiscount }}</span>
                  <span class="font-bold text-[#091019]" dir="ltr">{{ order.total_before_discount }}</span>
                </div>
                <div class="flex items-center justify-between gap-2 pb-3 border-b border-gray-100">
                  <span class="text-[#64768C]">{{ t.account.discount }}</span>
                  <span class="font-bold text-[#091019]" dir="ltr">{{ order.discount }}</span>
                </div>
                <div class="flex items-center justify-between gap-2">
                  <span class="font-semibold text-[#64768C]">{{ t.account.totalAmount }}</span>
                  <span dir="ltr" class="font-bold text-[#091019] inline-flex items-center gap-0.5"><UiRiyalSymbol /> {{ order.total }}</span>
                </div>
              </div>
              <NuxtLink
                :to="localePath('/account/orders/RY2024-1235')"
                class="mt-4 w-full h-10 rounded-[8px] bg-navbar text-white text-[12px] font-semibold flex items-center justify-center hover:opacity-95 transition-opacity"
              >
                {{ t.account.orderDetails }}
              </NuxtLink>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- ═══════════════════════════════════════
         MOBILE LAYOUT
    ═══════════════════════════════════════ -->
    <div class="lg:hidden bg-[#F6F6F6]" :dir="t.dir">
      <!-- Page header -->
      <div class="bg-white px-4 h-14 flex items-center justify-between">
        <button class="w-8 h-8 flex items-center justify-center" @click="open">
          <i class="ri-menu-line text-xl text-[#091019]" />
        </button>
        <h1 class="m-0 text-[15px] font-bold text-[#091019]">{{ t.account.myOrders }}</h1>
        <div class="w-8" />
      </div>

      <!-- Profile card -->
      <div class="bg-white mt-3 mx-4 rounded-[16px] px-4 py-5 flex flex-col items-center shadow-[0px_4px_20px_0px_#64646412]">
        <div class="relative">
          <img :src="user.avatar" :alt="user.name" class="w-[80px] h-[80px] rounded-full object-cover" />
          <button class="absolute bottom-0 start-0 w-6 h-6 rounded-full bg-icon-circle text-white flex items-center justify-center">
            <i class="ri-pencil-line text-[11px]" />
          </button>
        </div>
        <p class="m-0 mt-3 text-[15px] font-bold text-[#091019]" dir="ltr">{{ user.name }}</p>
        <p class="m-0 mt-0.5 text-[12px] text-[#64768C]" dir="ltr">{{ user.email }}</p>
        <p class="m-0 mt-2 text-[13px] font-bold text-[#FF3F3F]">
          {{ t.account.balance }} : <span dir="ltr">{{ user.balance }}</span>
        </p>
      </div>

      <!-- Order cards -->
      <div class="mt-3 mx-4 flex flex-col gap-3 pb-4">
        <div v-for="order in orders" :key="order.id" class="bg-white rounded-[16px] px-4 py-4 shadow-[0px_4px_20px_0px_#64646412]">
          <!-- Card title -->
          <h3 class="m-0 text-[14px] font-bold text-[#091019] mb-3">{{ t.account.orderDetails }}</h3>

          <!-- Rows -->
          <div class="flex flex-col gap-2.5 text-[12px]">
            <div class="flex items-center justify-between gap-2">
              <span class="font-semibold text-[#091019]" dir="ltr">{{ order.number }}</span>
              <span class="text-[#64768C]">{{ t.account.orderNumber }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="bg-[#FFF8E5] border border-[#D9AA68] text-[#D9AA68] text-[11px] font-semibold px-3 py-0.5 rounded-[16px]">{{ t.account.processing }}</span>
              <span class="text-[#64768C]">{{ t.account.orderStatus }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span dir="ltr" class="font-bold text-[#091019] inline-flex items-center gap-0.5"><UiRiyalSymbol />{{ order.subtotal }}</span>
              <span class="text-[#64768C]">{{ t.account.subtotal }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span dir="ltr" class="font-bold text-[#091019] inline-flex items-center gap-0.5"><UiRiyalSymbol />{{ order.subtotal_before_tax }}</span>
              <span class="text-[#64768C]">{{ t.account.subtotalBeforeTax }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span dir="ltr" class="font-bold text-[#091019] inline-flex items-center gap-0.5"><UiRiyalSymbol />{{ order.vat }}</span>
              <span class="text-[#64768C]">{{ t.account.vat }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold text-[#091019]">{{ order.shipping_fees }}</span>
              <span class="text-[#64768C]">{{ t.account.shippingFees }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold text-[#091019]">{{ order.total_before_discount }}</span>
              <span class="text-[#64768C]">{{ t.account.totalBeforeDiscount }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold text-[#091019]">{{ order.discount }}</span>
              <span class="text-[#64768C]">{{ t.account.discount }}</span>
            </div>
            <div class="flex items-center justify-between gap-2 pt-1">
              <span dir="ltr" class="font-bold text-[#091019] inline-flex items-center gap-0.5"><UiRiyalSymbol />{{ order.total }}</span>
              <span class="font-semibold text-[#64768C]">{{ t.account.totalAmount }}</span>
            </div>
          </div>

          <!-- Details button -->
          <NuxtLink
            :to="localePath('/account/orders/RY2024-1235')"
            class="mt-4 w-full h-11 rounded-[8px] bg-navbar text-white text-[13px] font-semibold flex items-center justify-center"
          >
            {{ t.account.orderDetails }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <AccountNavDrawer />
  </div>
</template>
