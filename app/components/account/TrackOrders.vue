<script setup lang="ts">
const { t, locale, localePath } = useLocale()
const { open } = useAccountNav()

const user = {
  name: 'Mostafa samy',
  email: 'mjihad84@gmail.com',
  balance: '0.00',
  avatar: '/images/user.jpg',
}

const trackingInput = ref('')

const productName = {
  ar: 'قميص رجالي منقوش بأكمام طويلة وقصة عادية وتفاصيل جيب',
  en: 'Men patterned shirt with long sleeves, regular fit and pocket details',
}

const shipmentMoney = {
  subtotal: '57.49',
  subtotal_before_tax: '57.49',
  vat: '57.49',
  shipping_fees: 0,
  total_before_discount: 0,
  discount: 0,
  total: '57.49',
}

const shipments = [
  { id: 1, status: 'processing', completed: 2, images: ['p3.png', 'p4.png', 'p6.png'] },
  { id: 2, status: 'shipped', completed: 3, images: ['p11.png', 'p16.png', 'p17.png'] },
  { id: 3, status: 'preparing', completed: 1, images: ['p12.png', 'p15.png', 'p18.png'] },
].map((s) => ({
  ...s,
  number: '#123456789',
  money: shipmentMoney,
  products: s.images.map((img, i) => ({
    id: i + 1,
    image: `/images/${img}`,
    name: productName,
    price: '200 SR',
    quantity: 2,
    size: 'xl',
    color: { ar: 'أسود', en: 'Black' },
    brand: { ar: 'توزلو', en: 'Tozlu' },
  })),
}))

const steps = computed(() => [
  t.value.account.placed,
  t.value.account.processing,
  t.value.account.shipped,
  t.value.account.delivering,
])

const mobileSteps = computed(() => [
  { icon: 'ri-list-check-2', label: t.value.account.preparing, sub: t.value.account.prepSub },
  { icon: 'ri-truck-line', label: t.value.account.shipped, sub: t.value.account.shippedSub },
  { icon: 'ri-home-2-line', label: t.value.account.delivered, sub: t.value.account.deliveredSub },
])

const statusBadge = (status: string) => {
  if (status === 'shipped') return { label: t.value.account.shipped, classes: 'bg-[#ECFDF3] border-[#DEEBDD] text-[#32B828]' }
  if (status === 'preparing') return { label: t.value.account.preparing, classes: 'bg-[#FFF8E5] border-[#D9AA68] text-[#D9AA68]' }
  return { label: t.value.account.processing, classes: 'bg-[#FFF8E5] border-[#D9AA68] text-[#D9AA68]' }
}

const summary = computed(() => [
  { icon: 'ri-shopping-cart-2-line', label: t.value.account.totalProducts, value: '1,129,69' },
  { icon: 'ri-truck-line', label: t.value.account.totalShipping, value: '114,99' },
  { icon: 'ri-receipt-line', label: t.value.account.taxLabel, value: '21,29' },
  { icon: 'ri-file-list-3-line', label: t.value.account.grandTotal, value: '1,266,24' },
])
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
        <span class="text-[#091019]">{{ t.account.trackOrders }}</span>
      </nav>

      <div class="mt-6 grid gap-6 lg:grid-cols-[260px_1fr] items-start">
        <AccountSidebar active="track-orders" />

        <section class="bg-white border border-gray-100 rounded-[12px] shadow-[0px_4px_20px_0px_#6464640D] p-6">
          <div class="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h1 class="m-0 text-[16px] font-bold text-[#091019]">{{ t.account.orderDetails }}</h1>
              <p class="m-0 mt-1 text-[12px] text-[#64768C]">{{ t.account.orderedOn }}</p>
              <p class="m-0 mt-1 text-[12px] text-[#091019]">{{ t.account.orderNumber }}: <span class="font-bold" dir="ltr">#5489472</span></p>
            </div>
            <button class="flex items-center gap-2 border border-gray-200 rounded-[10px] px-4 py-2 text-[13px] font-semibold text-[#091019] hover:bg-gray-50 transition-colors">
              <i class="ri-printer-line text-base text-navbar" />{{ t.account.printInvoice }}
            </button>
          </div>

          <div class="mt-5 bg-[#F6F6F7] rounded-[12px] px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <p class="m-0 text-[14px] font-bold text-[#091019]">{{ t.account.splitTitle }}</p>
              <p class="m-0 mt-1 text-[12px] text-[#64768C]">{{ t.account.splitSub }}</p>
            </div>
            <img src="/images/vehical.png" alt="RIYA delivery" class="h-12 w-auto shrink-0" />
          </div>

          <div class="mt-4 bg-[#F6F6F7] rounded-[12px] px-5 py-4">
            <p class="m-0 text-[13px] font-bold text-[#091019]">{{ t.account.trackingNumber }}</p>
            <input v-model="trackingInput" type="text" placeholder="#123456789" class="mt-3 w-full h-11 px-4 rounded-[8px] bg-white text-[13px] text-[#091019] placeholder:text-gray-400" />
            <button class="mt-3 w-full h-11 rounded-[8px] bg-navbar text-white text-[13px] font-semibold hover:opacity-95 transition-opacity">{{ t.account.trackOrder }}</button>
          </div>

          <div v-for="shipment in shipments" :key="shipment.id" class="mt-5 bg-white border border-gray-100 rounded-[12px] shadow-[0px_4px_20px_0px_#6464640D] p-5">
            <span class="inline-block bg-[#ECFDF3] text-[#32B828] text-[11px] font-semibold px-2.5 py-1 rounded-[6px]">{{ t.account.shipmentNo }} {{ shipment.id }}</span>

            <div class="mt-4 grid lg:grid-cols-2 gap-4 items-start">
              <div class="border border-gray-100 rounded-[10px] p-4">
                <h3 class="m-0 text-[13px] font-bold text-[#091019]">{{ t.account.shipmentDetails }}</h3>
                <div class="mt-3 flex flex-col gap-2.5 text-[12px]">
                  <div class="flex items-center justify-between gap-2"><span class="text-[#64768C]">{{ t.account.shipmentNumber }}</span><span class="font-bold text-[#091019]" dir="ltr">{{ shipment.number }}</span></div>
                  <div class="flex items-center justify-between gap-2"><span class="text-[#64768C]">{{ t.account.shipmentStatus }}</span><span class="border text-[11px] font-semibold px-3 py-0.5 rounded-[16px]" :class="statusBadge(shipment.status).classes">{{ statusBadge(shipment.status).label }}</span></div>
                  <div class="flex items-center justify-between gap-2"><span class="text-[#64768C]">{{ t.account.subtotal }}</span><span dir="ltr" class="font-bold text-[#091019] inline-flex items-center gap-0.5"><UiRiyalSymbol /> {{ shipment.money.subtotal }}</span></div>
                  <div class="flex items-center justify-between gap-2"><span class="text-[#64768C]">{{ t.account.subtotalBeforeTax }}</span><span dir="ltr" class="font-bold text-[#091019] inline-flex items-center gap-0.5"><UiRiyalSymbol /> {{ shipment.money.subtotal_before_tax }}</span></div>
                  <div class="flex items-center justify-between gap-2"><span class="text-[#64768C]">{{ t.account.vat }}</span><span dir="ltr" class="font-bold text-[#091019] inline-flex items-center gap-0.5"><UiRiyalSymbol /> {{ shipment.money.vat }}</span></div>
                  <div class="flex items-center justify-between gap-2 pb-2.5 border-b border-gray-100"><span class="text-[#64768C]">{{ t.account.shippingFees }}</span><span class="font-bold text-[#091019]" dir="ltr">{{ shipment.money.shipping_fees }}</span></div>
                  <div class="flex items-center justify-between gap-2"><span class="text-[#64768C]">{{ t.account.totalBeforeDiscount }}</span><span class="font-bold text-[#091019]" dir="ltr">{{ shipment.money.total_before_discount }}</span></div>
                  <div class="flex items-center justify-between gap-2 pb-2.5 border-b border-gray-100"><span class="text-[#64768C]">{{ t.account.discount }}</span><span class="font-bold text-[#091019]" dir="ltr">{{ shipment.money.discount }}</span></div>
                  <div class="flex items-center justify-between gap-2"><span class="font-semibold text-[#64768C]">{{ t.account.totalAmount }}</span><span dir="ltr" class="font-bold text-[#091019] inline-flex items-center gap-0.5"><UiRiyalSymbol /> {{ shipment.money.total }}</span></div>
                </div>
              </div>

              <div class="border border-gray-100 rounded-[10px] p-4">
                <h3 class="m-0 text-[13px] font-bold text-[#091019]">{{ t.account.productsInShipment }}</h3>
                <div class="mt-3 flex flex-col gap-3">
                  <div v-for="product in shipment.products" :key="product.id" class="flex items-start gap-3">
                    <img :src="product.image" :alt="product.name[locale]" class="w-[100px] h-[100px] rounded-[8px] object-cover bg-gray-100 shrink-0" />
                    <div class="min-w-0">
                      <p class="m-0 text-[12px] font-semibold text-[#091019] leading-snug">{{ product.name[locale] }}</p>
                      <p class="m-0 mt-0.5 text-[13px] font-bold text-[#091019]" dir="ltr">{{ product.price }}</p>
                      <p class="m-0 mt-0.5 text-[11px] text-[#64768C]">{{ t.cart.quantity }} : <span dir="ltr">{{ product.quantity }}</span> <span class="mx-1">|</span> {{ t.cart.size }} : <span dir="ltr">{{ product.size }}</span> <span class="mx-1">|</span> {{ t.cart.color }}: {{ product.color[locale] }}</p>
                      <p class="m-0 mt-0.5 text-[11px] text-[#64768C]">{{ t.account.brandLabel }} : {{ product.brand[locale] }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-5 flex items-start">
              <template v-for="(step, i) in steps" :key="step">
                <div class="flex flex-col items-center w-[80px] shrink-0">
                  <span class="w-6 h-6 rounded-full flex items-center justify-center" :class="i < shipment.completed ? 'bg-[#22B14C] text-white' : 'bg-gray-200 text-gray-400'">
                    <i class="ri-check-line text-sm" />
                  </span>
                  <span class="mt-2 text-[11px]" :class="i < shipment.completed ? 'text-[#091019] font-semibold' : 'text-[#64768C]'">{{ step }}</span>
                </div>
                <span v-if="i < steps.length - 1" class="flex-1 h-[3px] rounded-full mt-[10px]" :class="i + 1 < shipment.completed ? 'bg-[#22B14C]' : 'bg-gray-200'" />
              </template>
            </div>
          </div>

          <div class="mt-5 bg-[#F6F6F7] border border-gray-100 rounded-[12px] overflow-hidden">
            <p class="m-0 px-5 py-3 text-[13px] font-bold text-[#091019] border-b border-gray-200">{{ t.account.orderSummary }}</p>
            <div class="grid grid-cols-2 lg:grid-cols-4">
              <div v-for="(stat, i) in summary" :key="stat.label" class="px-5 py-4 flex items-center gap-2.5 border-gray-200" :class="i < summary.length - 1 ? 'lg:border-e' : ''">
                <i :class="stat.icon" class="text-lg text-navbar shrink-0" />
                <span class="min-w-0">
                  <span class="block text-[12px] text-[#091019]">{{ stat.label }}</span>
                  <span class="block mt-0.5 text-[14px] font-bold text-[#091019]"><span dir="ltr">{{ stat.value }}</span></span>
                </span>
              </div>
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
        <h1 class="m-0 text-[15px] font-bold text-[#091019]">{{ t.account.trackOrders }}</h1>
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

      <!-- Order info card -->
      <div class="mt-3 mx-4 bg-white rounded-[16px] px-4 py-4 shadow-[0px_4px_20px_0px_#64646412]">
        <!-- Title + print button -->
        <div class="flex items-center justify-between gap-2 mb-2">
          <h2 class="m-0 text-[14px] font-bold text-[#091019]">{{ t.account.orderDetails }}</h2>
          <button class="flex items-center gap-1.5 border border-[#E8E8E8] rounded-[20px] px-3 py-1.5 text-[11px] font-semibold text-[#091019]">
            <i class="ri-printer-line text-sm text-navbar" />{{ t.account.printInvoice }}
          </button>
        </div>
        <p class="m-0 text-[11px] text-[#64768C]">{{ t.account.orderedOn }}</p>
        <p class="m-0 mt-1 text-[12px] font-semibold text-[#091019]">
          {{ t.account.orderNumber }}: <span class="font-bold" dir="ltr">#5489472</span>
        </p>
      </div>

      <!-- Split banner -->
      <div class="mt-3 mx-4 bg-white rounded-[16px] px-4 py-4 flex items-center gap-3 shadow-[0px_4px_20px_0px_#64646412]">
        <div class="flex-1 min-w-0">
          <p class="m-0 text-[13px] font-bold text-[#091019]">{{ t.account.splitTitle }}</p>
          <p class="m-0 mt-1 text-[11px] text-[#64768C]">{{ t.account.splitSub }}</p>
        </div>
        <img src="/images/vehical.png" alt="delivery" class="h-14 w-auto shrink-0" />
      </div>

      <!-- Tracking input -->
      <div class="mt-3 mx-4 bg-white rounded-[16px] px-4 py-4 shadow-[0px_4px_20px_0px_#64646412]">
        <p class="m-0 text-[13px] font-bold text-[#091019] mb-3">{{ t.account.trackingNumber }}</p>
        <input v-model="trackingInput" type="text" placeholder="#123456789" class="w-full h-11 px-4 rounded-[10px] bg-[#F6F6F6] text-[13px] text-[#091019] placeholder:text-gray-400 mb-3" />
        <button class="w-full h-11 rounded-[10px] bg-navbar text-white text-[13px] font-semibold">
          {{ t.account.trackOrder }}
        </button>
      </div>

      <!-- Shipments -->
      <div v-for="shipment in shipments" :key="shipment.id" class="mt-3 mx-4 flex flex-col gap-3">
        <!-- Shipment badge -->
        <div class="flex items-center">
          <span class="bg-[#ECFDF3] text-[#32B828] text-[12px] font-bold px-4 py-1.5 rounded-[20px]">
            {{ t.account.shipmentNo }} {{ shipment.id }}
          </span>
        </div>

        <!-- Shipment details card -->
        <div class="bg-white rounded-[16px] px-4 py-4 shadow-[0px_4px_20px_0px_#64646412]">
          <h3 class="m-0 text-[14px] font-bold text-[#091019] mb-3">{{ t.account.shipmentDetails }}</h3>
          <div class="flex flex-col gap-2.5 text-[12px]">
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold text-[#091019]" dir="ltr">{{ shipment.number }}</span>
              <span class="text-[#64768C]">{{ t.account.shipmentNumber }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="border text-[11px] font-semibold px-3 py-0.5 rounded-[16px]" :class="statusBadge(shipment.status).classes">{{ statusBadge(shipment.status).label }}</span>
              <span class="text-[#64768C]">{{ t.account.shipmentStatus }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span dir="ltr" class="font-bold text-[#091019] inline-flex items-center gap-0.5"><UiRiyalSymbol />{{ shipment.money.subtotal }}</span>
              <span class="text-[#64768C]">{{ t.account.subtotal }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span dir="ltr" class="font-bold text-[#091019] inline-flex items-center gap-0.5"><UiRiyalSymbol />{{ shipment.money.subtotal_before_tax }}</span>
              <span class="text-[#64768C]">{{ t.account.subtotalBeforeTax }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span dir="ltr" class="font-bold text-[#091019] inline-flex items-center gap-0.5"><UiRiyalSymbol />{{ shipment.money.vat }}</span>
              <span class="text-[#64768C]">{{ t.account.vat }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold text-[#091019]">{{ shipment.money.shipping_fees }}</span>
              <span class="text-[#64768C]">{{ t.account.shippingFees }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold text-[#091019]">{{ shipment.money.total_before_discount }}</span>
              <span class="text-[#64768C]">{{ t.account.totalBeforeDiscount }}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold text-[#091019]">{{ shipment.money.discount }}</span>
              <span class="text-[#64768C]">{{ t.account.discount }}</span>
            </div>
            <div class="flex items-center justify-between gap-2 pt-1">
              <span dir="ltr" class="font-bold text-[#091019] inline-flex items-center gap-0.5"><UiRiyalSymbol />{{ shipment.money.total }}</span>
              <span class="font-semibold text-[#64768C]">{{ t.account.totalAmount }}</span>
            </div>
          </div>
          <NuxtLink
            :to="localePath('/account/orders/RY2024-1235')"
            class="mt-4 w-full h-11 rounded-[8px] bg-navbar text-white text-[13px] font-semibold flex items-center justify-center"
          >
            {{ t.account.orderDetails }}
          </NuxtLink>
        </div>

        <!-- Products in shipment -->
        <div class="bg-white rounded-[16px] px-4 py-4 shadow-[0px_4px_20px_0px_#64646412]">
          <h3 class="m-0 text-[14px] font-bold text-[#091019] mb-3">{{ t.account.productsInShipment }}</h3>
          <div class="flex flex-col gap-4">
            <div v-for="product in shipment.products" :key="product.id" class="flex items-start gap-3">
              <!-- image inline-start (right in RTL) -->
              <img :src="product.image" :alt="product.name[locale]" class="w-[70px] h-[70px] rounded-[8px] object-cover bg-gray-100 shrink-0" />
              <div class="flex-1 min-w-0">
                <p class="m-0 text-[12px] font-semibold text-[#091019] leading-snug line-clamp-2">{{ product.name[locale] }}</p>
                <p class="m-0 mt-1 text-[13px] font-bold text-[#091019]">{{ product.price }}</p>
                <p class="m-0 mt-0.5 text-[11px] text-[#64768C]">{{ t.account.brandLabel }} : {{ product.brand[locale] }}</p>
                <p class="m-0 mt-0.5 text-[11px] text-[#64768C]">
                  {{ t.cart.quantity }} <span dir="ltr">{{ product.quantity }}</span>
                  <span class="mx-1">|</span>
                  {{ t.cart.size }} <span dir="ltr">{{ product.size }}</span>
                  <span class="mx-1">|</span>
                  {{ t.cart.color }} {{ product.color[locale] }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Status tracker -->
        <div class="bg-white rounded-[16px] px-4 py-4 shadow-[0px_4px_20px_0px_#64646412]">
          <div class="flex items-start gap-0">
            <template v-for="(step, i) in mobileSteps" :key="step.label">
              <div class="flex flex-col items-center flex-1">
                <!-- Icon circle -->
                <span
                  class="w-11 h-11 rounded-full flex items-center justify-center mb-2"
                  :class="i < shipment.completed ? 'bg-[#32B828] text-white' : 'bg-[#F6F6F6] text-[#B0B8C1]'"
                >
                  <i :class="step.icon" class="text-[20px]" />
                </span>
                <!-- Label -->
                <span class="text-[11px] font-bold text-center leading-tight" :class="i < shipment.completed ? 'text-[#091019]' : 'text-[#B0B8C1]'">
                  {{ step.label }}
                </span>
                <!-- Subtitle -->
                <span class="mt-1 text-[10px] text-[#64768C] text-center leading-tight px-1">{{ step.sub }}</span>
              </div>
              <!-- Connector line -->
              <span
                v-if="i < mobileSteps.length - 1"
                class="h-[2px] w-6 mt-[22px] shrink-0 rounded-full"
                :class="i + 1 < shipment.completed ? 'bg-[#32B828]' : 'bg-[#E8E8E8]'"
              />
            </template>
          </div>
        </div>
      </div>

      <!-- Bottom spacer -->
      <div class="h-4" />
    </div>

    <AccountNavDrawer />
  </div>
</template>
