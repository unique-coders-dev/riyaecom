<script setup lang="ts">
const { locale, localePath } = useLocale()
const router = useRouter()

const products = ref([
  { id: 1, image: '/images/p4.png', price: 200, quantity: 1, selected: true },
  { id: 2, image: '/images/p4.png', price: 200, quantity: 1, selected: false },
])

const refundTo = ref<'wallet' | 'bank'>('bank')
const shipping = ref<'store' | 'company'>('company')

const goBack = () => router.push(localePath('/returns/success'))
const goCancel = () => router.push(localePath('/returns/cancel'))

const hideBottomBar = useState<boolean>('hideBottomBar', () => false)

const copy = computed(() =>
  locale.value === 'ar'
    ? {
        productDetails: 'تفاصيل المنتج',
        returnReasons: 'سبب الإرجاع',
        orderDetails: 'تفاصيل الطلب',
        orderNumber: 'رقم الطلب',
        orderNumberValue: '#123456789',
        purchaseDate: 'تاريخ الشراء',
        purchaseDateValue: '23 فبراير 2024، 08:00 مساءً',
        productNameLabel: 'اسم المنتج',
        productNameValue: 'قميص رجالي بأكمام طويلة مطبوع بقصة عادية...',
        orderStatusLabel: 'حالة الطلب',
        orderStatusValue: 'قيد المعالجة',
        refundOptions: 'خيارات إرجاع المنتج',
        walletBalance: 'رصيد المحفظة',
        bankBalance: 'رصيد الحساب البنكي',
        shippingTitle: 'طريقة الشحن والإرجاع',
        returnToStore: 'إرجاع المنتج إلى المتجر',
        shippingCompany: 'شركة الشحن',
        contactTitle: 'معلومات الاتصال',
        phone: '+966 123 456 789 10',
        email: 'Mostafa.95@gmail.com',
        back: 'عودة',
        confirmCancel: 'تأكيد الإلغاء',
        qty: 'الكمية',
        sar: 'ريال سعودي',
        name: 'قميص رجالي بأكمام طويلة مطبوع بقصة عادية وتفاصيل جيب',
        reasons: ['المقاس غير مناسب', 'اللون أو التصميم يختلف عن الصور'],
      }
    : {
        productDetails: 'Product Details',
        returnReasons: 'Return Reason',
        orderDetails: 'Order Details',
        orderNumber: 'Order Number',
        orderNumberValue: '#123456789',
        purchaseDate: 'Purchase Date',
        purchaseDateValue: '23 February 2024, 08:00 PM',
        productNameLabel: 'Product Name',
        productNameValue: "Men's long-sleeve printed shirt with regular fit...",
        orderStatusLabel: 'Order Status',
        orderStatusValue: 'Processing',
        refundOptions: 'Product Return Options',
        walletBalance: 'Wallet Balance',
        bankBalance: 'Bank Account Balance',
        shippingTitle: 'Shipping and Return Method',
        returnToStore: 'Return product to store',
        shippingCompany: 'Shipping Company',
        contactTitle: 'Contact Information',
        phone: '+966 123 456 789 10',
        email: 'Mostafa.95@gmail.com',
        back: 'Back',
        confirmCancel: 'Confirm Cancellation',
        qty: 'Quantity',
        sar: 'SAR',
        name: "Men's long-sleeve printed shirt with regular fit and pocket details",
        reasons: ['Size not suitable', 'Color or design differs from images'],
      },
)
</script>

<template>
  <main class="min-h-[80vh] pt-6 pb-[140px] lg:pb-6 px-4 bg-[#FAFAFA]">
    <div class="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 items-start">
      <!-- Start column -->
      <div class="flex flex-col gap-4">
        <div class="bg-white p-4 rounded-[8px]">
          <h3 class="m-0 text-[16px] font-semibold text-[#091019] mb-4">{{ copy.productDetails }}</h3>
          <div class="flex flex-col gap-3">
            <label v-for="p in products" :key="p.id" class="flex items-center gap-3 cursor-pointer">
              <input v-model="p.selected" type="checkbox" class="chk" />
              <img :src="p.image" :alt="copy.name" class="w-[100px] h-[100px] rounded-[8px] object-cover bg-[#F6F6F6] shrink-0" />
              <div class="flex-1 min-w-0 flex flex-col gap-1">
                <p class="m-0 text-[14px] text-[#6F7B8B] leading-snug line-clamp-2">{{ copy.name }}</p>
                <p class="m-0 text-[14px] text-[#6F7B8B]">{{ p.price }} {{ copy.sar }}</p>
                <p class="m-0 text-[14px] text-[#6F7B8B]">{{ copy.qty }}: {{ p.quantity }}</p>
              </div>
            </label>
          </div>
        </div>

        <div class="bg-white p-4 rounded-[8px]">
          <h3 class="m-0 text-[16px] font-semibold text-[#091019] mb-3">{{ copy.returnReasons }}</h3>
          <ul class="m-0 p-0 list-none flex flex-col gap-2">
            <li v-for="r in copy.reasons" :key="r" class="flex items-start gap-2">
              <span class="w-1 h-1 rounded-full bg-[#6F7B8B] mt-2.5 shrink-0" />
              <span class="text-[14px] text-[#6F7B8B]">{{ r }}</span>
            </li>
          </ul>
        </div>

        <div class="hidden lg:flex gap-3 mt-1">
          <button type="button" class="h-12 px-8 bg-navbar text-white text-[14px] rounded-[8px] hover:opacity-90 transition-opacity" @click="goCancel">
            {{ copy.confirmCancel }}
          </button>
          <button type="button" class="h-12 px-8 bg-white border border-navbar text-navbar text-[14px] rounded-[8px] hover:bg-navbar/5 transition-colors" @click="goBack">
            {{ copy.back }}
          </button>
        </div>
      </div>

      <!-- End column -->
      <div class="flex flex-col gap-4">
        <div class="bg-white p-4 rounded-[8px]">
          <h3 class="m-0 text-[16px] font-semibold text-[#091019] mb-4">{{ copy.orderDetails }}</h3>
          <div class="flex flex-col gap-3">
            <div class="flex items-start gap-13">
              <span class="text-[14px] text-[#6F7B8B] shrink-0">{{ copy.orderNumber }}</span>
              <span class="text-[14px] text-[#091019] text-start flex-1" dir="ltr">{{ copy.orderNumberValue }}</span>
            </div>
            <div class="flex items-start gap-13">
              <span class="text-[14px] text-[#6F7B8B] shrink-0">{{ copy.purchaseDate }}</span>
              <span class="text-[14px] text-[#091019] text-start flex-1">{{ copy.purchaseDateValue }}</span>
            </div>
            <div class="flex items-start gap-13">
              <span class="text-[14px] text-[#6F7B8B] shrink-0">{{ copy.productNameLabel }}</span>
              <span class="text-[14px] text-[#091019] text-start flex-1">{{ copy.productNameValue }}</span>
            </div>
            <div class="flex items-start gap-13">
              <span class="text-[14px] text-[#6F7B8B] shrink-0">{{ copy.orderStatusLabel }}</span>
              <span class="text-[14px] text-[#C1B41C] text-start flex-1">{{ copy.orderStatusValue }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-[8px]">
          <h3 class="m-0 text-[16px] font-semibold text-[#091019] mb-3">{{ copy.refundOptions }}</h3>
          <div class="flex flex-col gap-1">
            <label class="flex items-center gap-3 py-2 cursor-pointer">
              <input v-model="refundTo" type="radio" value="wallet" class="radio" />
              <span class="text-[14px] text-[#6F7B8B]">{{ copy.walletBalance }}</span>
            </label>
            <label class="flex items-center gap-3 py-2 cursor-pointer">
              <input v-model="refundTo" type="radio" value="bank" class="radio" />
              <span class="text-[14px] text-[#6F7B8B]">{{ copy.bankBalance }}</span>
            </label>
          </div>
        </div>

        <div class="bg-white p-4 rounded-[8px]">
          <h3 class="m-0 text-[16px] font-semibold text-[#091019] mb-3">{{ copy.shippingTitle }}</h3>
          <div class="flex flex-col gap-1">
            <label class="flex items-center gap-3 py-2 cursor-pointer">
              <input v-model="shipping" type="radio" value="store" class="radio" />
              <span class="text-[14px] text-[#6F7B8B]">{{ copy.returnToStore }}</span>
            </label>
            <label class="flex items-center gap-3 py-2 cursor-pointer">
              <input v-model="shipping" type="radio" value="company" class="radio" />
              <span class="text-[14px] text-[#6F7B8B]">{{ copy.shippingCompany }}</span>
            </label>
          </div>
        </div>

        <div class="bg-white p-4 rounded-[8px]">
          <h3 class="m-0 text-[16px] font-semibold text-[#091019] mb-4">{{ copy.contactTitle }}</h3>
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-3">
              <i class="ri-phone-line text-[18px] text-[#6F7B8B]" />
              <span class="text-[14px] text-[#6F7B8B]" dir="ltr">{{ copy.phone }}</span>
            </div>
            <div class="flex items-center gap-3">
              <i class="ri-mail-line text-[18px] text-[#6F7B8B]" />
              <span class="text-[14px] text-[#6F7B8B]">{{ copy.email }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile action bar -->
    <Teleport to="body">
      <div
        class="lg:hidden fixed bottom-[62px] inset-x-0 z-40 bg-white border-t border-[#E8E8E8] px-3 py-3 flex gap-3 transition-transform duration-300 ease-out"
        :class="hideBottomBar ? 'translate-y-[62px]' : 'translate-y-0'"
      >
        <button type="button" class="flex-1 h-10 bg-navbar text-white text-[14px] rounded-[8px] hover:opacity-90 transition-opacity" @click="goCancel">
          {{ copy.confirmCancel }}
        </button>
        <button type="button" class="flex-1 h-10 bg-white border border-navbar text-navbar text-[14px] rounded-[8px] hover:bg-navbar/5 transition-colors" @click="goBack">
          {{ copy.back }}
        </button>
      </div>
    </Teleport>
  </main>
</template>

<style scoped>
input[type="checkbox"].chk {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  transition: background-color 0.15s, border-color 0.15s;
}
input[type="checkbox"].chk:checked {
  background-color: #390049;
  border-color: #390049;
}
input[type="checkbox"].chk:checked::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 45%;
  width: 5px;
  height: 9px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -50%) rotate(45deg);
}
input[type="radio"].radio {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #d5d5d5;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  transition: border-color 0.15s;
}
input[type="radio"].radio:checked { border-color: #390049; }
input[type="radio"].radio:checked::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #390049;
  transform: translate(-50%, -50%);
}
</style>
