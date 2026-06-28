<script setup lang="ts">
const { locale, localePath } = useLocale()
const router = useRouter()

const goReview = () => router.push(localePath('/returns/review'))

const copy = computed(() =>
  locale.value === 'ar'
    ? {
        summary: 'ملخص الإرجاع',
        productPrice: 'سعر المنتج',
        priceValue: '١٤٠ ريال سعودي',
        manage: 'إدارة الإرجاع الخاص بك',
        cancel: 'إلغاء عملية الإرجاع',
        viewOrder: 'عرض تفاصيل الطلب',
        writeReview: 'كتابة مراجعة للمنتج',
        review: 'مراجعة الطلب',
        started: 'بدء عملية الإرجاع',
        date: 'الخميس، ٢٣ فبراير',
        expressMail: 'تم تسليم الطلب إلى البريد السريع',
        shippingCenter: 'تم تسليم الطلب إلى مركز الشحن',
        orderReceived: 'تم استلام الطلب',
        refundBalance: 'رصيد الاسترداد',
      }
    : {
        summary: 'Return Summary',
        productPrice: 'Product Price',
        priceValue: '140 SAR',
        manage: 'Manage Your Return',
        cancel: 'Cancel return process',
        viewOrder: 'View order details',
        writeReview: 'Write a product review',
        review: 'Review Order',
        started: 'Return process started',
        date: 'Thursday, 23 February',
        expressMail: 'Order delivered to express mail',
        shippingCenter: 'Order delivered to shipping center',
        orderReceived: 'Order received',
        refundBalance: 'Refund balance',
      },
)
</script>

<template>
  <main class="min-h-[80vh] lg:py-6 bg-[#FAFAFA]">
    <!-- Mobile -->
    <div class="lg:hidden flex flex-col gap-4 px-4 py-4">
      <!-- Horizontal step row -->
      <div class="bg-white p-4 rounded-[8px]">
        <div class="relative flex items-center justify-between">
          <div class="absolute top-1/2 inset-x-5 h-px bg-[#E8E8E8] -translate-y-1/2 z-0" />
          <div class="relative z-10 w-[22px] h-[22px] rounded-full bg-[#32B828] flex items-center justify-center">
            <i class="ri-check-line text-white text-[14px]" />
          </div>
          <img src="/images/i3.svg" alt="" class="relative z-10 w-[22px] h-[22px]" />
          <img src="/images/i1.svg" alt="" class="relative z-10 w-[22px] h-[22px]" />
          <img src="/images/i1.svg" alt="" class="relative z-10 w-[22px] h-[22px]" />
          <img src="/images/i2.svg" alt="" class="relative z-10 w-[22px] h-[22px]" />
        </div>
      </div>

      <div class="bg-white p-4 rounded-[8px]">
        <h3 class="m-0 text-[16px] font-semibold text-[#091019]">{{ copy.summary }}</h3>
        <div class="mt-5 flex items-center justify-between">
          <span class="text-[14px] text-[#6F7B8B]">{{ copy.productPrice }}</span>
          <span class="text-[14px] text-[#091019]">{{ copy.priceValue }}</span>
        </div>
      </div>

      <div class="bg-white p-4 rounded-[8px]">
        <h3 class="m-0 text-[16px] font-semibold text-[#091019]">{{ copy.manage }}</h3>
        <ul class="m-0 mt-4 flex flex-col gap-3 list-none p-0">
          <li><a href="#" class="text-[14px] text-[#6F7B8B] hover:text-[#091019] transition-colors">{{ copy.cancel }}</a></li>
          <li><a href="#" class="text-[14px] text-[#6F7B8B] hover:text-[#091019] transition-colors">{{ copy.viewOrder }}</a></li>
          <li><a href="#" class="text-[14px] text-[#6F7B8B] hover:text-[#091019] transition-colors">{{ copy.writeReview }}</a></li>
        </ul>
      </div>

      <button type="button" class="w-full h-12 bg-navbar text-white text-[14px] rounded-[8px] hover:opacity-90 transition-opacity" @click="goReview">
        {{ copy.review }}
      </button>
    </div>

    <!-- Desktop -->
    <div class="hidden lg:block px-4">
      <div class="max-w-[760px] mx-auto grid grid-cols-2 gap-4 items-start">
        <div class="bg-white p-5 rounded-[8px] h-[560px]">
          <div class="relative h-full">
            <div class="absolute top-[11px] bottom-[11px] w-px bg-[#E8E8E8] start-[10px]" />
            <div class="relative h-full flex flex-col justify-between">
              <div class="flex items-start gap-3">
                <div class="w-[22px] h-[22px] flex-shrink-0 z-10 rounded-full bg-navbar flex items-center justify-center">
                  <i class="ri-check-line text-white text-[14px]" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="m-0 text-[16px] text-[#091019]">{{ copy.started }}</p>
                  <p class="m-0 text-[14px] text-[#6F7B8B] mt-1">{{ copy.date }}</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <img src="/images/i3.svg" alt="" class="w-[22px] h-[22px] flex-shrink-0 z-10" />
                <p class="m-0 text-[14px] text-[#6F7B8B] flex-1">{{ copy.expressMail }}</p>
              </div>
              <div class="flex items-start gap-3">
                <img src="/images/i2.svg" alt="" class="w-[22px] h-[22px] flex-shrink-0 z-10" />
                <p class="m-0 text-[14px] text-[#6F7B8B] flex-1">{{ copy.shippingCenter }}</p>
              </div>
              <div class="flex items-start gap-3">
                <img src="/images/i3.svg" alt="" class="w-[22px] h-[22px] flex-shrink-0 z-10" />
                <p class="m-0 text-[14px] text-[#6F7B8B] flex-1">{{ copy.orderReceived }}</p>
              </div>
              <div class="flex items-start gap-3">
                <img src="/images/i2.svg" alt="" class="w-[22px] h-[22px] flex-shrink-0 z-10" />
                <p class="m-0 text-[14px] text-[#6F7B8B] flex-1">{{ copy.refundBalance }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <div class="bg-white p-4 rounded-[8px]">
            <h3 class="m-0 text-[16px] font-semibold text-[#091019]">{{ copy.summary }}</h3>
            <div class="mt-5 flex items-center justify-between">
              <span class="text-[14px] text-[#6F7B8B]">{{ copy.productPrice }}</span>
              <span class="text-[14px] text-[#091019]">{{ copy.priceValue }}</span>
            </div>
          </div>

          <div class="bg-white p-4 rounded-[8px]">
            <h3 class="m-0 text-[16px] font-semibold text-[#091019]">{{ copy.manage }}</h3>
            <ul class="m-0 mt-4 flex flex-col gap-3 list-none p-0">
              <li><a href="#" class="text-[14px] text-[#6F7B8B] hover:text-[#091019] transition-colors">{{ copy.cancel }}</a></li>
              <li><a href="#" class="text-[14px] text-[#6F7B8B] hover:text-[#091019] transition-colors">{{ copy.viewOrder }}</a></li>
              <li><a href="#" class="text-[14px] text-[#6F7B8B] hover:text-[#091019] transition-colors">{{ copy.writeReview }}</a></li>
            </ul>
          </div>

          <button type="button" class="h-12 bg-navbar text-white text-[14px] rounded-[8px] hover:opacity-90 transition-opacity" @click="goReview">
            {{ copy.review }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
