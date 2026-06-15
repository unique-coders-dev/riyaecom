<script setup lang="ts">
const { t, locale } = useLocale();

// Shared with app.vue — bottom nav slides away on scroll down; keep the bottom bar in sync
const hideBottomBar = useState<boolean>('hideBottomBar', () => false);

const headerPayments = [
  "/images/pay5.png",
  "/images/pay7.png",
  "/images/pay3.png",
  "/images/pay2.png",
  "/images/pay4.png",
  "/images/pay1.png",
];

const cartItems = ref(
  [1, 2].map((i) => ({
    id: `guest_20810${i}_xl`,
    quantity: 2,
    size: "xl",
    color: "black",
    selected: true,
    price: 200,
    old_price: "95.00",
    product: {
      name_en: "Women basic short blouse with long sleeves and round neck",
      name_ar: "بلوزة قصيرة أساسية بأكمام طويلة و ياقة دائرية للنساء",
      image: "/images/p1.png",
      brand: { name: { en: "Tommy Life", ar: "تومي لايف" } },
      sizes: ["xl", "l", "m"],
      colors: [
        { key: "black", name: { en: "Black", ar: "أسود" } },
        { key: "white", name: { en: "White", ar: "أبيض" } },
      ],
    },
  })),
);

const selectAll = ref(true);
const isLoginOpen = ref(false);
const isLoggedIn = ref(false);
const selectedAddress = ref("AAAA4586");

const addresses = [
  {
    code: "ASMM16398",
    type: { ar: "المنزل", en: "Home" },
    address: {
      ar: "شارع الملك عبدالله,حي الورود, مدينة الرياض",
      en: "King Abdullah St, Al Wurud, Riyadh",
    },
  },
  {
    code: "MSMM2004",
    type: { ar: "المكتب", en: "Office" },
    address: {
      ar: "شارع الملك عبدالله,حي الورود, مدينة الرياض",
      en: "King Abdullah St, Al Wurud, Riyadh",
    },
  },
  {
    code: "AAAA4586",
    type: { ar: "المصنع", en: "Factory" },
    address: {
      ar: "شارع الملك عبدالله,حي الورود, مدينة الرياض",
      en: "King Abdullah St, Al Wurud, Riyadh",
    },
  },
  {
    code: "MSMT21895",
    type: { ar: "المزرعة", en: "Farm" },
    address: {
      ar: "شارع الملك عبدالله,حي الورود, مدينة الرياض",
      en: "King Abdullah St, Al Wurud, Riyadh",
    },
  },
];

const onVerified = () => {
  isLoginOpen.value = false;
  isLoggedIn.value = true;
};
const showNewAddressForm = ref(false);
const showDeliveryForm = computed(
  () => !isLoggedIn.value || !selectedAddress.value || showNewAddressForm.value,
);
const coupon = ref("");
const paymentMethod = ref("applepay");
const billing = ref("same");
const saveInfo = ref(false);
const sendNews = ref(false);

const paymentOptions = computed(() => [
  {
    key: "applepay",
    label: t.value.checkout.applePay,
    icons: ["/images/pay2.png"],
  },
  {
    key: "card",
    label: t.value.checkout.creditCard,
    icons: ["/images/pay1.png", "/images/pay3.png", "/images/pay4.png"],
  },
  {
    key: "tamara",
    label: t.value.checkout.tamara,
    icons: ["/images/pay5.png"],
  },
  { key: "tabby", label: t.value.checkout.tabby, icons: ["/images/pay7.png"] },
]);
</script>

<template>
  <main class="bg-white min-h-[60vh] py-0 lg:py-8">
    <!-- ═══════════════════════════════════════
         DESKTOP LAYOUT (hidden on mobile)
    ═══════════════════════════════════════ -->
    <div
      class="hidden lg:grid max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 gap-8 lg:grid-cols-[1.4fr_1fr] items-start"
    >
      <!-- Checkout form card -->
      <div
        class="bg-white rounded-[12px] shadow-[0px_4px_20px_0px_#64646426] p-6"
      >
        <div class="flex flex-col items-center">
          <img src="/images/brandLogo2.png" alt="RIYA" class="h-9 w-auto" />
          <div dir="ltr" class="mt-3 flex items-center gap-1.5">
            <img
              v-for="pay in headerPayments"
              :key="pay"
              :src="pay"
              alt="Payment"
              class="h-[18px] w-auto max-w-[34px] object-contain rounded-[3px]"
            />
          </div>
        </div>

        <template v-if="!isLoggedIn">
          <div class="mt-6 flex items-center justify-between">
            <h2 class="m-0 text-[15px] font-bold text-[#091019]">
              {{ t.checkout.contactMethod }}
            </h2>
            <button
              class="text-[12px] text-[#091019] underline"
              @click="isLoginOpen = true"
            >
              {{ t.checkout.login }}
            </button>
          </div>
          <div class="mt-3 flex gap-2">
            <input
              type="text"
              :placeholder="t.checkout.phonePlaceholder"
              class="flex-1 min-w-0 h-11 px-4 rounded-[10px] border border-[#091019] bg-white text-[13px] placeholder:text-gray-400"
            />
            <button
              class="shrink-0 h-11 px-3 rounded-[10px] border border-[#091019] bg-white flex items-center gap-1.5 text-[13px] text-[#091019]"
            >
              <span>🇸🇦</span><span dir="ltr">+965</span
              ><i class="ri-arrow-down-s-line text-base" />
            </button>
          </div>
        </template>

        <template v-else>
          <h2 class="m-0 mt-6 text-[15px] font-bold text-[#091019]">
            {{ t.checkout.welcome }}
          </h2>
          <p class="m-0 mt-2 text-[13px] text-[#091019]">
            {{ t.checkout.deliverTo }}
          </p>
          <div class="mt-3 grid sm:grid-cols-2 gap-3">
            <div
              v-for="addr in addresses"
              :key="addr.code"
              role="radio"
              tabindex="0"
              :aria-checked="selectedAddress === addr.code"
              class="bg-white border rounded-[8px] p-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-navbar/30"
              :class="
                selectedAddress === addr.code
                  ? 'border-navbar'
                  : 'border-gray-200'
              "
              @click="selectedAddress = addr.code; showNewAddressForm = false"
              @keydown.space.prevent="selectedAddress = addr.code; showNewAddressForm = false"
              @keydown.enter.prevent="selectedAddress = addr.code; showNewAddressForm = false"
            >
              <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] text-[#64768C]"
                  >{{ t.checkout.nationalAddress }}
                  <span dir="ltr">{{ addr.code }}</span></span
                >
                <button class="text-[#091019]" @click.stop>
                  <i class="ri-pencil-line text-base" />
                </button>
              </div>
              <p
                class="m-0 mt-1.5 flex items-center gap-1 text-[12px] font-semibold text-[#32B828]"
              >
                <i class="ri-map-pin-2-line text-sm" />{{ addr.type[locale] }}
              </p>
              <div class="mt-1.5 flex items-center gap-2">
                <input
                  v-model="selectedAddress"
                  type="radio"
                  :value="addr.code"
                  name="address-d"
                  class="w-4 h-4 accent-navbar shrink-0 pointer-events-none"
                  tabindex="-1"
                  aria-hidden="true"
                />
                <span class="text-[12px] text-[#091019]">{{
                  addr.address[locale]
                }}</span>
              </div>
            </div>
          </div>
          <div class="mt-4 flex justify-end">
            <button
              class="border border-navbar text-navbar text-[12px] font-semibold px-4 py-1.5 rounded-[8px]"
              @click="showNewAddressForm = true"
            >
              {{ t.checkout.addNewAddress }}
            </button>
          </div>
        </template>

        <template v-if="showDeliveryForm">
          <h2 class="m-0 mt-6 text-[15px] font-bold text-[#091019]">
            {{ t.checkout.delivery }}
          </h2>
          <p class="m-0 mt-2 text-[12px] text-[#091019]">
            {{ t.checkout.nationalAddressNote }}
          </p>
          <input
            type="text"
            :placeholder="t.checkout.countryRegion"
            class="mt-3 w-full h-11 px-4 rounded-full border border-[#FF3F3F] bg-white text-[13px] text-[#FF3F3F] placeholder:text-[#FF3F3F]"
          />
          <p class="m-0 mt-1.5 text-[11px] text-[#FF3F3F]">
            {{ t.checkout.nationalAddressError }}
          </p>
          <p class="m-0 mt-3 text-[12px] font-semibold text-[#091019]">
            {{ t.checkout.howToGet }}
          </p>
          <div class="mt-4 flex flex-col gap-3">
            <div class="relative">
              <select
                class="w-full h-11 px-4 rounded-full bg-[#F6F6F6] text-[12px] text-[#64768C] appearance-none"
              >
                <option>{{ t.checkout.countryRegion }}</option>
              </select>
              <i
                class="ri-arrow-down-s-line absolute end-4 top-1/2 -translate-y-1/2 text-base text-[#64768C] pointer-events-none"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <input
                type="text"
                :placeholder="t.checkout.lastName"
                class="h-11 px-4 rounded-full bg-[#F6F6F6] text-[12px] placeholder:text-[#64768C]"
              />
              <input
                type="text"
                :placeholder="t.checkout.firstName"
                class="h-11 px-4 rounded-full bg-[#F6F6F6] text-[12px] placeholder:text-[#64768C]"
              />
            </div>
            <div class="relative">
              <input
                type="text"
                :placeholder="t.checkout.searchAddress"
                class="w-full h-11 ps-4 pe-10 rounded-full bg-[#F6F6F6] text-[12px] placeholder:text-[#64768C]"
              />
              <i
                class="ri-search-line absolute end-4 top-1/2 -translate-y-1/2 text-base text-[#64768C]"
              />
            </div>
            <input
              type="text"
              :placeholder="t.checkout.apartment"
              class="h-11 px-4 rounded-full bg-[#F6F6F6] text-[12px] placeholder:text-[#64768C]"
            />
            <div class="grid grid-cols-2 gap-3">
              <input
                type="text"
                :placeholder="t.checkout.city"
                class="h-11 px-4 rounded-full bg-[#F6F6F6] text-[12px] placeholder:text-[#64768C]"
              />
              <input
                type="text"
                :placeholder="t.checkout.postalCode"
                class="h-11 px-4 rounded-full bg-[#F6F6F6] text-[12px] placeholder:text-[#64768C]"
              />
            </div>
          </div>
          <label class="mt-4 flex items-center gap-2.5 cursor-pointer"
            ><input
              v-model="saveInfo"
              type="checkbox"
              class="w-4 h-4 accent-navbar"
            /><span class="text-[12px] text-[#091019]">{{
              t.checkout.saveInfo
            }}</span></label
          >
          <label class="mt-2.5 flex items-center gap-2.5 cursor-pointer"
            ><input
              v-model="sendNews"
              type="checkbox"
              class="w-4 h-4 accent-navbar"
            /><span class="text-[12px] text-[#091019]">{{
              t.checkout.sendNews
            }}</span></label
          >
        </template>

        <h2 class="m-0 mt-6 text-[15px] font-bold text-[#091019]">
          {{ t.checkout.payment }}
        </h2>
        <p class="m-0 mt-1 text-[12px] text-[#64768C]">
          {{ t.checkout.secureNote }}
        </p>
        <div class="mt-3 border border-gray-200 rounded-[10px] overflow-hidden">
          <template v-for="(option, i) in paymentOptions" :key="option.key">
            <label
              class="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer"
              :class="[
                paymentMethod === option.key
                  ? 'border border-[#091019] rounded-[8px] m-1'
                  : '',
                i < paymentOptions.length - 1 && paymentMethod !== option.key
                  ? 'border-b border-gray-100'
                  : '',
              ]"
            >
              <span class="flex items-center gap-2.5"
                ><input
                  v-model="paymentMethod"
                  type="radio"
                  :value="option.key"
                  name="payment-d"
                  class="w-4 h-4 accent-navbar shrink-0"
                /><span class="text-[13px] text-[#091019]">{{
                  option.label
                }}</span></span
              >
              <span dir="ltr" class="flex items-center gap-1"
                ><img
                  v-for="icon in option.icons"
                  :key="icon"
                  :src="icon"
                  alt=""
                  class="h-[16px] w-auto max-w-[30px] object-contain rounded-[3px]"
              /></span>
            </label>
            <p
              v-if="option.key === 'applepay' && paymentMethod === 'applepay'"
              class="m-0 px-4 py-2.5 bg-[#F6F6F6] text-[11px] text-[#64768C] border-b border-gray-100"
            >
              {{ t.checkout.applePayNote }}
            </p>
          </template>
        </div>

        <h2 class="m-0 mt-6 text-[15px] font-bold text-[#091019]">
          {{ t.checkout.billingAddress }}
        </h2>
        <div class="mt-3 border border-gray-200 rounded-[10px] overflow-hidden">
          <label
            class="flex items-center gap-2.5 px-4 py-3 cursor-pointer"
            :class="billing === 'same' ? 'bg-[#F6F6F6]' : ''"
            ><input
              v-model="billing"
              type="radio"
              value="same"
              name="billing-d"
              class="w-4 h-4 accent-navbar shrink-0"
            /><span class="text-[13px] text-[#091019]">{{
              t.checkout.sameAddress
            }}</span></label
          >
          <label
            class="flex items-center gap-2.5 px-4 py-3 cursor-pointer border-t border-gray-100"
            :class="billing === 'different' ? 'bg-[#F6F6F6]' : ''"
            ><input
              v-model="billing"
              type="radio"
              value="different"
              name="billing-d"
              class="w-4 h-4 accent-navbar shrink-0"
            /><span class="text-[13px] text-[#091019]">{{
              t.checkout.differentAddress
            }}</span></label
          >
        </div>
        <button
          class="mt-6 w-full h-12 rounded-[8px] bg-navbar text-white text-[14px] font-semibold hover:opacity-95 transition-opacity"
        >
          {{ t.checkout.payNow }}
        </button>
      </div>

      <!-- Order summary (desktop) -->
      <div>
        <label class="flex items-center gap-2 cursor-pointer"
          ><input
            v-model="selectAll"
            type="checkbox"
            class="w-4 h-4 accent-navbar"
          /><span class="text-[13px] font-semibold text-[#091019]">{{
            t.checkout.selectAll
          }}</span></label
        >
        <div class="mt-3 flex flex-col gap-3">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="bg-[#F9F9F9] rounded-[16px] p-3"
          >
            <div class="flex items-start gap-2.5">
              <input
                v-model="item.selected"
                type="checkbox"
                class="w-4 h-4 accent-navbar shrink-0 mt-1"
              />
              <img
                :src="item.product.image"
                :alt="item.product.name_ar"
                class="w-[52px] h-[64px] rounded-[8px] object-cover bg-white shrink-0"
              />
              <div class="min-w-0 flex-1">
                <p
                  class="m-0 text-[12px] font-semibold text-[#091019] leading-snug line-clamp-2"
                >
                  {{
                    locale === "ar"
                      ? item.product.name_ar
                      : item.product.name_en
                  }}
                </p>
                <p class="m-0 mt-0.5 text-[11px] text-gray-400">
                  {{ item.product.brand.name[locale] }}
                </p>
                <span dir="ltr" class="mt-0.5 flex items-center gap-1.5">
                  <span
                    class="text-[13px] font-bold text-[#091019] inline-flex items-center gap-0.5"
                    ><UiRiyalSymbol /> {{ item.price }}</span
                  >
                  <span
                    class="text-[11px] text-[#6F7B8B] line-through inline-flex items-center gap-0.5"
                    ><UiRiyalSymbol /> {{ item.old_price }}</span
                  >
                </span>
              </div>
            </div>
            <div
              class="mt-2.5 flex items-center gap-2 flex-wrap text-[11px] text-[#64768C]"
            >
              <span>{{ t.cart.quantity }}</span>
              <select
                v-model="item.quantity"
                class="h-7 px-1.5 rounded-[6px] border border-gray-200 bg-white text-[11px] text-[#091019]"
              >
                <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
              </select>
              <span>{{ t.cart.size }}</span>
              <select
                v-model="item.size"
                class="h-7 px-1.5 rounded-[6px] border border-gray-200 bg-white text-[11px] text-[#091019]"
              >
                <option v-for="s in item.product.sizes" :key="s" :value="s">
                  {{ s }}
                </option>
              </select>
              <span>{{ t.cart.color }}</span>
              <select
                v-model="item.color"
                class="h-7 px-1.5 rounded-[6px] border border-gray-200 bg-white text-[11px] text-[#091019]"
              >
                <option
                  v-for="c in item.product.colors"
                  :key="c.key"
                  :value="c.key"
                >
                  {{ c.name[locale] }}
                </option>
              </select>
              <button
                class="ms-auto flex items-center gap-1 text-[#FF3F3F]"
                @click="cartItems = cartItems.filter((i) => i.id !== item.id)"
              >
                <i class="ri-delete-bin-line text-sm" />{{ t.checkout.remove }}
              </button>
            </div>
          </div>
        </div>

        <div
          class="mt-4 h-12 flex items-stretch border border-gray-200 rounded-[8px] overflow-hidden bg-white"
        >
          <button
            class="shrink-0 px-6 bg-navbar text-white text-[13px] font-semibold"
          >
            {{ t.checkout.addCoupon }}
          </button>
          <input
            v-model="coupon"
            type="text"
            :placeholder="t.checkout.couponPlaceholder"
            class="flex-1 min-w-0 px-4 border-0 bg-transparent text-[12px] placeholder:text-[#091019]"
          />
        </div>

        <p class="m-0 mt-4 text-[12px] font-semibold text-[#091019]">
          {{ t.checkout.freeShippingProgress }}
        </p>
        <div
          class="mt-2 h-[5px] rounded-full bg-[#E8E8E8] relative overflow-hidden"
        >
          <div
            class="absolute inset-y-0 start-0 w-[6%] rounded-full bg-navbar"
          />
        </div>

        <div class="mt-4 flex flex-col gap-1.5">
          <div
            v-for="row in [
              t.checkout.subtotal,
              t.checkout.shippingLabel,
              t.checkout.total,
            ]"
            :key="row"
            class="flex items-center justify-between"
          >
            <span class="text-[13px] font-semibold text-[#091019]">{{
              row
            }}</span>
            <span
              dir="ltr"
              class="text-[13px] font-bold text-[#091019] inline-flex items-center gap-0.5"
              ><UiRiyalSymbol /> 57.49</span
            >
          </div>
          <p class="m-0 text-[11px] text-[#64768C]">{{ t.checkout.taxNote }}</p>
        </div>

        <button
          class="mt-4 w-full rounded-[12px] px-4 py-3 flex items-center justify-between text-white"
          style="background: linear-gradient(90deg, #ff3f3f 0%, #ff7c7c 100%)"
        >
          <span class="flex items-center gap-2.5 text-[13px] font-semibold"
            ><span
              class="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0"
              ><img
                src="/images/reward.gif"
                alt=""
                class="w-5 h-5 object-contain" /></span
            >{{ t.checkout.useReward }}</span
          >
          <span
            dir="ltr"
            class="text-[13px] font-bold inline-flex items-center gap-0.5"
            ><UiRiyalSymbol /> 20</span
          >
        </button>
        <button
          class="mt-3 w-full rounded-[12px] px-4 py-3 flex items-center justify-between text-white"
          style="background: linear-gradient(90deg, #ff3f3f 0%, #ff7c7c 100%)"
        >
          <span class="flex items-center gap-2.5 text-[13px] font-semibold"
            ><span
              class="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0"
              ><img
                src="/images/wallet.gif"
                alt=""
                class="w-5 h-5 object-contain" /></span
            >{{ t.checkout.useWallet }}</span
          >
          <span
            dir="ltr"
            class="text-[13px] font-bold inline-flex items-center gap-0.5"
            ><UiRiyalSymbol /> 50</span
          >
        </button>
        <div
          class="mt-3 rounded-[12px] p-[2px]"
          style="background: linear-gradient(270deg, #ffb800 0%, #8900af 100%)"
        >
          <div
            class="rounded-[10px] px-4 py-3 flex items-center justify-between"
            style="background: linear-gradient(90deg, #fff7e3 0%, #f1d8ff 100%)"
          >
            <span class="flex items-center gap-2.5"
              ><span
                class="w-8 h-8 rounded-full bg-icon-circle flex items-center justify-center text-white"
                ><i class="ri-vip-crown-line text-base" /></span
              ><span
                ><span class="block text-[13px] font-bold text-[#091019]">{{
                  t.checkout.walaone
                }}</span
                ><span class="block text-[11px] text-[#64768C]">{{
                  t.checkout.cashback
                }}</span></span
              ></span
            >
            <span class="text-[14px] font-bold text-[#E5A800]">{{
              t.checkout.points
            }}</span>
          </div>
        </div>
        <button
          class="mt-4 w-full h-12 rounded-[8px] bg-navbar text-white text-[14px] font-semibold hover:opacity-95 transition-opacity"
        >
          {{ t.checkout.payNow }}
        </button>
      </div>
    </div>

    <!-- ═══════════════════════════════════════
         MOBILE LAYOUT
    ═══════════════════════════════════════ -->
    <div class="lg:hidden px-4 pt-4">
      <!-- Logo + payments -->
      <div class="flex flex-col items-center pb-4 border-b border-[#E8E8E8]">
        <img src="/images/brandLogo2.png" alt="RIYA" class="h-8 w-auto" />
        <div
          dir="ltr"
          class="mt-2.5 flex items-center gap-1.5 flex-wrap justify-center"
        >
          <img
            v-for="pay in headerPayments"
            :key="pay"
            :src="pay"
            alt=""
            class="h-[18px] w-auto max-w-[32px] object-contain rounded-[3px]"
          />
        </div>
      </div>

      <!-- Cart items -->
      <div class="mt-4">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="selectAll"
            type="checkbox"
            class="w-4 h-4 accent-navbar"
          />
          <span class="text-[13px] font-semibold text-[#091019]">{{
            t.checkout.selectAll
          }}</span>
        </label>
        <div class="mt-3 flex flex-col gap-3">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="bg-[#F9F9F9] rounded-[16px] p-3"
          >
            <div class="flex items-start gap-2.5">
              <input
                v-model="item.selected"
                type="checkbox"
                class="w-4 h-4 accent-navbar shrink-0 mt-1"
              />
              <img
                :src="item.product.image"
                :alt="item.product.name_ar"
                class="w-[52px] h-[64px] rounded-[8px] object-cover bg-white shrink-0"
              />
              <div class="min-w-0 flex-1">
                <p
                  class="m-0 text-[12px] font-semibold text-[#091019] leading-snug line-clamp-2"
                >
                  {{
                    locale === "ar"
                      ? item.product.name_ar
                      : item.product.name_en
                  }}
                </p>
                <p class="m-0 mt-0.5 text-[11px] text-gray-400">
                  {{ item.product.brand.name[locale] }}
                </p>
                <span dir="ltr" class="mt-0.5 flex items-center gap-1.5">
                  <span
                    class="text-[13px] font-bold text-[#091019] inline-flex items-center gap-0.5"
                    ><UiRiyalSymbol /> {{ item.price }}</span
                  >
                  <span
                    class="text-[11px] text-[#6F7B8B] line-through inline-flex items-center gap-0.5"
                    ><UiRiyalSymbol /> {{ item.old_price }}</span
                  >
                </span>
              </div>
            </div>
            <div
              class="mt-2.5 flex items-center gap-2 flex-wrap text-[11px] text-[#64768C]"
            >
              <span>{{ t.cart.quantity }}</span>
              <select
                v-model="item.quantity"
                class="h-7 px-1.5 rounded-[6px] border border-gray-200 bg-white text-[11px] text-[#091019]"
              >
                <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
              </select>
              <span>{{ t.cart.size }}</span>
              <select
                v-model="item.size"
                class="h-7 px-1.5 rounded-[6px] border border-gray-200 bg-white text-[11px] text-[#091019]"
              >
                <option v-for="s in item.product.sizes" :key="s" :value="s">
                  {{ s }}
                </option>
              </select>
              <span>{{ t.cart.color }}</span>
              <select
                v-model="item.color"
                class="h-7 px-1.5 rounded-[6px] border border-gray-200 bg-white text-[11px] text-[#091019]"
              >
                <option
                  v-for="c in item.product.colors"
                  :key="c.key"
                  :value="c.key"
                >
                  {{ c.name[locale] }}
                </option>
              </select>
              <button
                class="ms-auto flex items-center gap-1 text-[#FF3F3F]"
                @click="cartItems = cartItems.filter((i) => i.id !== item.id)"
              >
                <i class="ri-delete-bin-line text-sm" />{{ t.checkout.remove }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact method -->
      <div class="mt-5 pt-5 border-t border-[#E8E8E8]">
        <template v-if="!isLoggedIn">
          <div class="flex items-center justify-between mb-3">
            <h2 class="m-0 text-[14px] font-bold text-[#091019]">
              {{ t.checkout.contactMethod }}
            </h2>
            <button
              class="text-[12px] text-[#091019] underline"
              @click="isLoginOpen = true"
            >
              {{ t.checkout.login }}
            </button>
          </div>
          <div class="flex gap-2">
            <input
              type="text"
              :placeholder="t.checkout.phonePlaceholder"
              class="flex-1 min-w-0 h-11 px-4 rounded-[10px] border border-[#091019] bg-white text-[13px] placeholder:text-gray-400"
            />
            <button
              class="shrink-0 h-11 px-3 rounded-[10px] border border-[#091019] bg-white flex items-center gap-1.5 text-[13px] text-[#091019]"
            >
              <span>🇸🇦</span><span dir="ltr">+965</span
              ><i class="ri-arrow-down-s-line text-base" />
            </button>
          </div>
        </template>
        <template v-else>
          <h2 class="m-0 text-[14px] font-bold text-[#091019]">
            {{ t.checkout.welcome }}
          </h2>
          <p class="m-0 mt-2 text-[12px] text-[#091019]">
            {{ t.checkout.deliverTo }}
          </p>
          <div class="mt-3 flex flex-col gap-2.5">
            <div
              v-for="addr in addresses"
              :key="addr.code"
              role="radio"
              tabindex="0"
              :aria-checked="selectedAddress === addr.code"
              class="bg-white border rounded-[8px] p-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-navbar/30"
              :class="
                selectedAddress === addr.code
                  ? 'border-navbar'
                  : 'border-gray-200'
              "
              @click="selectedAddress = addr.code; showNewAddressForm = false"
              @keydown.space.prevent="selectedAddress = addr.code; showNewAddressForm = false"
              @keydown.enter.prevent="selectedAddress = addr.code; showNewAddressForm = false"
            >
              <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] text-[#64768C]"
                  >{{ t.checkout.nationalAddress }}
                  <span dir="ltr">{{ addr.code }}</span></span
                >
                <button class="text-[#091019]" @click.stop>
                  <i class="ri-pencil-line text-base" />
                </button>
              </div>
              <p
                class="m-0 mt-1 flex items-center gap-1 text-[11px] font-semibold text-[#32B828]"
              >
                <i class="ri-map-pin-2-line text-sm" />{{ addr.type[locale] }}
              </p>
              <div class="mt-1.5 flex items-center gap-2">
                <input
                  v-model="selectedAddress"
                  type="radio"
                  :value="addr.code"
                  name="address-m"
                  class="w-4 h-4 accent-navbar shrink-0 pointer-events-none"
                  tabindex="-1"
                  aria-hidden="true"
                />
                <span class="text-[11px] text-[#091019]">{{
                  addr.address[locale]
                }}</span>
              </div>
            </div>
          </div>
          <div class="mt-3 flex justify-end">
            <button
              class="border border-navbar text-navbar text-[12px] font-semibold px-4 py-1.5 rounded-[8px]"
              @click="showNewAddressForm = true"
            >
              {{ t.checkout.addNewAddress }}
            </button>
          </div>
        </template>
      </div>

      <!-- Delivery form -->
      <template v-if="showDeliveryForm">
        <div class="mt-5 pt-5 border-t border-[#E8E8E8]">
          <h2 class="m-0 text-[14px] font-bold text-[#091019]">
            {{ t.checkout.delivery }}
          </h2>
          <p class="m-0 mt-2 text-[11px] text-[#091019]">
            {{ t.checkout.nationalAddressNote }}
          </p>
          <input
            type="text"
            :placeholder="t.checkout.countryRegion"
            class="mt-3 w-full h-11 px-4 rounded-full border border-[#FF3F3F] bg-white text-[13px] text-[#FF3F3F] placeholder:text-[#FF3F3F]"
          />
          <p class="m-0 mt-1.5 text-[11px] text-[#FF3F3F]">
            {{ t.checkout.nationalAddressError }}
          </p>
          <p
            class="m-0 mt-3 text-[12px] font-semibold text-[#091019] underline"
          >
            {{ t.checkout.howToGet }}
          </p>
          <div class="mt-3 flex flex-col gap-2.5">
            <div class="relative">
              <select
                class="w-full h-11 px-4 rounded-full bg-[#F6F6F6] text-[12px] text-[#64768C] appearance-none"
              >
                <option>{{ t.checkout.countryRegion }}</option>
              </select>
              <i
                class="ri-arrow-down-s-line absolute end-4 top-1/2 -translate-y-1/2 text-base text-[#64768C] pointer-events-none"
              />
            </div>
            <div class="grid grid-cols-2 gap-2.5">
              <input
                type="text"
                :placeholder="t.checkout.lastName"
                class="h-11 px-4 rounded-full bg-[#F6F6F6] text-[12px] placeholder:text-[#64768C]"
              />
              <input
                type="text"
                :placeholder="t.checkout.firstName"
                class="h-11 px-4 rounded-full bg-[#F6F6F6] text-[12px] placeholder:text-[#64768C]"
              />
            </div>
            <div class="relative">
              <input
                type="text"
                :placeholder="t.checkout.searchAddress"
                class="w-full h-11 ps-4 pe-10 rounded-full bg-[#F6F6F6] text-[12px] placeholder:text-[#64768C]"
              />
              <i
                class="ri-search-line absolute end-4 top-1/2 -translate-y-1/2 text-base text-[#64768C]"
              />
            </div>
            <input
              type="text"
              :placeholder="t.checkout.apartment"
              class="h-11 px-4 rounded-full bg-[#F6F6F6] text-[12px] placeholder:text-[#64768C]"
            />
            <div class="grid grid-cols-2 gap-2.5">
              <input
                type="text"
                :placeholder="t.checkout.city"
                class="h-11 px-4 rounded-full bg-[#F6F6F6] text-[12px] placeholder:text-[#64768C]"
              />
              <input
                type="text"
                :placeholder="t.checkout.postalCode"
                class="h-11 px-4 rounded-full bg-[#F6F6F6] text-[12px] placeholder:text-[#64768C]"
              />
            </div>
          </div>
          <label class="mt-3 flex items-center gap-2.5 cursor-pointer"
            ><input
              v-model="saveInfo"
              type="checkbox"
              class="w-4 h-4 accent-navbar"
            /><span class="text-[12px] text-[#091019]">{{
              t.checkout.saveInfo
            }}</span></label
          >
          <label class="mt-2.5 flex items-center gap-2.5 cursor-pointer"
            ><input
              v-model="sendNews"
              type="checkbox"
              class="w-4 h-4 accent-navbar"
            /><span class="text-[12px] text-[#091019]">{{
              t.checkout.sendNews
            }}</span></label
          >
        </div>
      </template>

      <!-- Coupon -->
      <div
        class="mt-4 h-12 flex items-stretch border border-gray-200 rounded-[8px] overflow-hidden bg-white"
      >
        <button
          class="shrink-0 px-5 bg-navbar text-white text-[13px] font-semibold"
        >
          {{ t.checkout.addCoupon }}
        </button>
        <input
          v-model="coupon"
          type="text"
          :placeholder="t.checkout.couponPlaceholder"
          class="flex-1 min-w-0 px-4 border-0 bg-transparent text-[12px] placeholder:text-[#091019]"
        />
      </div>

      <!-- Payment -->
      <div class="mt-5 pt-5 border-t border-[#E8E8E8]">
        <h2 class="m-0 text-[14px] font-bold text-[#091019]">
          {{ t.checkout.payment }}
        </h2>
        <p class="m-0 mt-1 text-[11px] text-[#64768C]">
          {{ t.checkout.secureNote }}
        </p>
        <div class="mt-3 border border-gray-200 rounded-[10px] overflow-hidden">
          <template v-for="(option, i) in paymentOptions" :key="option.key">
            <label
              class="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer"
              :class="[
                paymentMethod === option.key
                  ? 'border border-[#091019] rounded-[8px] m-1'
                  : '',
                i < paymentOptions.length - 1 && paymentMethod !== option.key
                  ? 'border-b border-gray-100'
                  : '',
              ]"
            >
              <span class="flex items-center gap-2.5">
                <input
                  v-model="paymentMethod"
                  type="radio"
                  :value="option.key"
                  name="payment-m"
                  class="w-4 h-4 accent-navbar shrink-0"
                />
                <span class="text-[12px] text-[#091019]">{{
                  option.label
                }}</span>
              </span>
              <span dir="ltr" class="flex items-center gap-1"
                ><img
                  v-for="icon in option.icons"
                  :key="icon"
                  :src="icon"
                  alt=""
                  class="h-[16px] w-auto max-w-[30px] object-contain rounded-[3px]"
              /></span>
            </label>
            <p
              v-if="option.key === 'applepay' && paymentMethod === 'applepay'"
              class="m-0 px-4 py-2.5 bg-[#F6F6F6] text-[11px] text-[#64768C] border-b border-gray-100"
            >
              {{ t.checkout.applePayNote }}
            </p>
          </template>
        </div>
      </div>

      <!-- Billing -->
      <div class="mt-5 pt-5 border-t border-[#E8E8E8]">
        <h2 class="m-0 text-[14px] font-bold text-[#091019]">
          {{ t.checkout.billingAddress }}
        </h2>
        <div class="mt-3 border border-gray-200 rounded-[10px] overflow-hidden">
          <label
            class="flex items-center gap-2.5 px-4 py-3 cursor-pointer"
            :class="billing === 'same' ? 'bg-[#F6F6F6]' : ''"
            ><input
              v-model="billing"
              type="radio"
              value="same"
              name="billing-m"
              class="w-4 h-4 accent-navbar shrink-0"
            /><span class="text-[12px] text-[#091019]">{{
              t.checkout.sameAddress
            }}</span></label
          >
          <label
            class="flex items-center gap-2.5 px-4 py-3 cursor-pointer border-t border-gray-100"
            :class="billing === 'different' ? 'bg-[#F6F6F6]' : ''"
            ><input
              v-model="billing"
              type="radio"
              value="different"
              name="billing-m"
              class="w-4 h-4 accent-navbar shrink-0"
            /><span class="text-[12px] text-[#091019]">{{
              t.checkout.differentAddress
            }}</span></label
          >
        </div>
      </div>

      <!-- Reward + Wallet + Walaone -->
      <div class="mt-4">
        <button
          class="w-full rounded-[12px] px-4 py-3 flex items-center justify-between text-white"
          style="background: linear-gradient(90deg, #ff3f3f 0%, #ff7c7c 100%)"
        >
          <span class="flex items-center gap-2.5 text-[13px] font-semibold"
            ><span
              class="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0"
              ><img
                src="/images/reward.gif"
                alt=""
                class="w-5 h-5 object-contain" /></span
            >{{ t.checkout.useReward }}</span
          >
          <span
            dir="ltr"
            class="text-[13px] font-bold inline-flex items-center gap-0.5"
            ><UiRiyalSymbol /> 20</span
          >
        </button>
        <button
          class="mt-3 w-full rounded-[12px] px-4 py-3 flex items-center justify-between text-white"
          style="background: linear-gradient(90deg, #ff3f3f 0%, #ff7c7c 100%)"
        >
          <span class="flex items-center gap-2.5 text-[13px] font-semibold"
            ><span
              class="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0"
              ><img
                src="/images/wallet.gif"
                alt=""
                class="w-5 h-5 object-contain" /></span
            >{{ t.checkout.useWallet }}</span
          >
          <span
            dir="ltr"
            class="text-[13px] font-bold inline-flex items-center gap-0.5"
            ><UiRiyalSymbol /> 50</span
          >
        </button>
        <div
          class="mt-3 rounded-[12px] p-[2px]"
          style="background: linear-gradient(270deg, #ffb800 0%, #8900af 100%)"
        >
          <div
            class="rounded-[10px] px-4 py-3 flex items-center justify-between"
            style="background: linear-gradient(90deg, #fff7e3 0%, #f1d8ff 100%)"
          >
            <span class="flex items-center gap-2.5"
              ><span
                class="w-8 h-8 rounded-full bg-icon-circle flex items-center justify-center text-white"
                ><i class="ri-vip-crown-line text-base" /></span
              ><span
                ><span class="block text-[13px] font-bold text-[#091019]">{{
                  t.checkout.walaone
                }}</span
                ><span class="block text-[11px] text-[#64768C]">{{
                  t.checkout.cashback
                }}</span></span
              ></span
            >
            <span class="text-[14px] font-bold text-[#E5A800]">{{
              t.checkout.points
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── MOBILE FIXED BOTTOM BAR (totals + pay now) ── -->
    <Teleport to="body">
      <div
        class="lg:hidden fixed bottom-[62px] inset-x-0 z-40 bg-white border-t border-[#E8E8E8] px-4 pt-3 pb-3 transition-transform duration-300 ease-out"
        :class="hideBottomBar ? 'translate-y-[62px]' : 'translate-y-0'"
      >
        <!-- Free shipping progress -->
        <p class="m-0 text-[11px] text-[#091019]">
          {{ t.checkout.freeShippingProgress }}
        </p>
        <div
          class="mt-1.5 h-[4px] rounded-full bg-[#E8E8E8] relative overflow-hidden mb-3"
        >
          <div
            class="absolute inset-y-0 start-0 w-[6%] rounded-full bg-navbar"
          />
        </div>
        <!-- Totals -->
        <div class="flex flex-col gap-1">
          <div
            v-for="(row, label) in {
              [t.checkout.subtotal]: '57.49',
              [t.checkout.shippingLabel]: '57.49',
              [t.checkout.total]: '57.49',
            }"
            :key="label"
            class="flex items-center justify-between"
          >
            <span class="text-[12px] font-semibold text-[#091019]">{{
              label
            }}</span>
            <span
              dir="ltr"
              class="text-[12px] font-bold text-[#091019] inline-flex items-center gap-0.5"
              ><UiRiyalSymbol /> {{ row }}</span
            >
          </div>
          <p class="m-0 text-[10px] text-[#64768C]">{{ t.checkout.taxNote }}</p>
        </div>
        <!-- Pay Now -->
        <button
          class="mt-2.5 w-full h-11 rounded-[8px] bg-navbar text-white text-[14px] font-semibold"
        >
          {{ t.checkout.payNow }}
        </button>
      </div>
    </Teleport>

    <CheckoutLoginModal
      :open="isLoginOpen"
      @close="isLoginOpen = false"
      @verified="onVerified"
    />
  </main>
</template>
