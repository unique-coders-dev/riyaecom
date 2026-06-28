<script setup lang="ts">
const { locale, localePath } = useLocale()
const router = useRouter()

const goBack = () => router.push(localePath('/returns/review'))

const isSuccessOpen = ref(false)
const openSuccess = () => {
  isSuccessOpen.value = true
  if (import.meta.client) document.body.style.overflow = 'hidden'
}
const closeSuccess = () => {
  isSuccessOpen.value = false
  if (import.meta.client) document.body.style.overflow = ''
}
const continueShopping = () => {
  closeSuccess()
  router.push(localePath('/'))
}

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})

const hideBottomBar = useState<boolean>('hideBottomBar', () => false)

const copy = computed(() =>
  locale.value === 'ar'
    ? {
        warning: 'تحذير: إذا قمت بإلغاء طلب الإرجاع، فلن تتمكن من إعادة المنتج أو استرداد المبلغ.',
        orderDetails: 'تفاصيل الطلب',
        orderNumber: 'رقم الطلب',
        orderNumberValue: '#123456789',
        orderStatus: 'حالة الطلب',
        orderStatusValue: 'قيد المعالجة',
        subtotal: 'المجموع الفرعي',
        subtotalBeforeTax: 'المجموع الفرعي قبل الضريبة',
        vat: 'ضريبة القيمة المضافة',
        shipping: 'رسوم الشحن (شاملة ضريبة القيمة المضافة)',
        totalBefore: 'الإجمالي قبل الخصم',
        discount: 'الخصم',
        total: 'المبلغ الإجمالي:',
        price: '57.49 ريال',
        zero: '0',
        back: 'عودة',
        confirmCancel: 'تأكيد الإلغاء',
        successTitle: 'تم إلغاء طلب الإرجاع بنجاح',
        successDesc: 'استمر في استكشاف أفضل المنتجات والعروض واستمتع بتجربتك الفريدة',
        continueShopping: 'تابع التسوق',
      }
    : {
        warning: 'Warning: If you cancel the return request, you will not be able to return the product or refund the amount.',
        orderDetails: 'Order Details',
        orderNumber: 'Order Number',
        orderNumberValue: '#123456789',
        orderStatus: 'Order Status',
        orderStatusValue: 'Processing',
        subtotal: 'Subtotal',
        subtotalBeforeTax: 'Subtotal before tax',
        vat: 'VAT',
        shipping: 'Shipping fees (including VAT)',
        totalBefore: 'Total before discount',
        discount: 'Discount',
        total: 'Total Amount:',
        price: '57.49 SAR',
        zero: '0',
        back: 'Back',
        confirmCancel: 'Confirm Cancellation',
        successTitle: 'Return request cancelled successfully',
        successDesc: 'Continue exploring the best products and offers and enjoy your unique experience',
        continueShopping: 'Continue Shopping',
      },
)

const rows = computed(() => [
  { label: copy.value.subtotal, value: copy.value.price },
  { label: copy.value.subtotalBeforeTax, value: copy.value.price },
  { label: copy.value.vat, value: copy.value.price },
  { label: copy.value.shipping, value: copy.value.zero },
])
</script>

<template>
  <main class="min-h-[80vh] pt-6 pb-[140px] lg:pb-6 px-4 bg-[#FAFAFA]">
    <div class="max-w-[504px] mx-auto flex flex-col gap-6">
      <p class="m-0 text-[13px] lg:text-[16px] font-medium text-[#FF3F3F] leading-relaxed">
        {{ copy.warning }}
      </p>

      <div class="bg-white shadow-[0px_4px_20px_0px_#64646426] p-6 rounded-[8px]">
        <h3 class="m-0 mb-5 text-[16px] font-semibold text-[#091019]">{{ copy.orderDetails }}</h3>

        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between gap-3">
            <span class="text-[14px] text-[#6F7B8B]">{{ copy.orderNumber }}</span>
            <span class="text-[14px] font-medium text-[#091019]" dir="ltr">{{ copy.orderNumberValue }}</span>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span class="text-[14px] text-[#6F7B8B]">{{ copy.orderStatus }}</span>
            <span class="text-[14px] font-medium text-[#C1B41C]">{{ copy.orderStatusValue }}</span>
          </div>
          <div v-for="row in rows" :key="row.label" class="flex items-center justify-between gap-3">
            <span class="text-[14px] text-[#6F7B8B]">{{ row.label }}</span>
            <span class="text-[14px] font-medium text-[#091019]">{{ row.value }}</span>
          </div>
        </div>

        <div class="border-t border-[#E8E8E8] my-4" />

        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between gap-3">
            <span class="text-[14px] text-[#6F7B8B]">{{ copy.totalBefore }}</span>
            <span class="text-[14px] font-medium text-[#091019]">{{ copy.zero }}</span>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span class="text-[14px] text-[#6F7B8B]">{{ copy.discount }}</span>
            <span class="text-[14px] font-medium text-[#091019]">{{ copy.zero }}</span>
          </div>
        </div>

        <div class="border-t border-[#E8E8E8] my-4" />

        <div class="flex items-center justify-between gap-3">
          <span class="text-[14px] text-[#6F7B8B]">{{ copy.total }}</span>
          <span class="text-[14px] font-bold text-[#091019]">{{ copy.price }}</span>
        </div>

        <div class="hidden lg:flex justify-end gap-3 mt-6">
          <button type="button" class="h-12 px-6 bg-white border border-navbar text-navbar text-[14px] rounded-[8px] hover:bg-navbar/5 transition-colors" @click="goBack">
            {{ copy.back }}
          </button>
          <button type="button" class="h-12 px-6 bg-navbar text-white text-[14px] rounded-[8px] hover:opacity-90 transition-opacity" @click="openSuccess">
            {{ copy.confirmCancel }}
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile action bar -->
    <Teleport to="body">
      <div
        class="lg:hidden fixed bottom-[62px] inset-x-0 z-40 bg-white border-t border-[#E8E8E8] px-3 py-3 flex gap-3 transition-transform duration-300 ease-out"
        :class="hideBottomBar ? 'translate-y-[62px]' : 'translate-y-0'"
      >
        <button type="button" class="flex-1 h-10 bg-navbar text-white text-[14px] rounded-[8px] hover:opacity-90 transition-opacity" @click="openSuccess">
          {{ copy.confirmCancel }}
        </button>
        <button type="button" class="flex-1 h-10 bg-white border border-navbar text-navbar text-[14px] rounded-[8px] hover:bg-navbar/5 transition-colors" @click="goBack">
          {{ copy.back }}
        </button>
      </div>
    </Teleport>

    <!-- Confirmation modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isSuccessOpen"
          class="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
          @click.self="closeSuccess"
        >
          <div class="bg-white w-full max-w-[382px] rounded-[12px] flex flex-col items-center text-center px-6 py-8">
            <img src="/images/party-popper.png" alt="" class="w-[80px] h-[80px] object-contain" />
            <h3 class="m-0 mt-4 text-[16px] font-semibold text-[#091019]">{{ copy.successTitle }}</h3>
            <p class="m-0 mt-3 text-[14px] text-[#6F7B8B] leading-relaxed">{{ copy.successDesc }}</p>
            <button type="button" class="mt-5 h-12 px-10 bg-navbar text-white text-[14px] rounded-[8px] hover:opacity-90 transition-opacity" @click="continueShopping">
              {{ copy.continueShopping }}
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>
