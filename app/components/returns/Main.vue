<script setup lang="ts">
const { locale, localePath } = useLocale()
const router = useRouter()

type Section = 'reason' | 'method' | 'upload'

const expanded = ref<Record<Section, boolean>>({ reason: true, method: true, upload: true })
const toggle = (k: Section) => { expanded.value[k] = !expanded.value[k] }

const products = ref([
  { id: 1, image: '/images/p4.png', price: 200, quantity: 1, selected: true },
  { id: 2, image: '/images/p4.png', price: 200, quantity: 1, selected: false },
])

const selectedReason = ref<number>(0)
const refundMethod = ref<'bank' | 'wallet'>('bank')

const isReasonModalOpen = ref(false)
const reasonText = ref('')

const openReasonModal = () => {
  isReasonModalOpen.value = true
  if (import.meta.client) document.body.style.overflow = 'hidden'
}
const closeReasonModal = () => {
  isReasonModalOpen.value = false
  if (import.meta.client) document.body.style.overflow = ''
}
const confirmReason = () => {
  closeReasonModal()
}

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})

const copy = computed(() =>
  locale.value === 'ar'
    ? {
        productTitle: 'اختر المنتج',
        reasonTitle: 'سبب الإرجاع',
        methodTitle: 'طريقة الاسترداد',
        uploadTitle: 'رفع ملف أو صورة',
        qty: 'الكمية',
        sar: 'ريال',
        confirm: 'تأكيد',
        submit: 'إرسال',
        trackOrder: 'مسار الطلب',
        dragHint: 'اسحب الملف للرفع',
        bank: 'حساب بنكي',
        wallet: 'المحفظة',
        name: 'قميص رجالي بنقوش بأكمام طويلة، مقاس عادي، وتفاصيل الجيب',
        reasons: [
          'المقاس غير مناسب',
          'اللون أو التصميم يختلف عن الصور',
          'الجودة لا تلبي التوقعات',
          'عيوب أو تلف في المنتج',
          'استلمت منتجاً خاطئاً',
          'الشعور بعدم الراحة',
          'تغير في الاحتياجات',
          'سبب آخر',
        ],
        reasonModalTitle: 'سبب الاسترجاع',
        reasonPlaceholder: 'اكتب سبب الاسترجاع',
      }
    : {
        productTitle: 'Select Product',
        reasonTitle: 'Return Reason',
        methodTitle: 'Refund Method',
        uploadTitle: 'Upload File or Image',
        qty: 'Quantity',
        sar: 'SAR',
        confirm: 'Confirm',
        submit: 'Submit',
        trackOrder: 'Order Tracking',
        dragHint: 'Drag file to upload',
        bank: 'Bank Account',
        wallet: 'Wallet',
        name: "Men's shirt with patterned long sleeves, regular fit, and pocket details",
        reasons: [
          'Size not suitable',
          'Color or design differs from images',
          'Quality does not meet expectations',
          'Defects or damage in the product',
          'Received the wrong product',
          'Feeling of discomfort',
          'Changed needs',
          'Other reason',
        ],
        reasonModalTitle: 'Return Reason',
        reasonPlaceholder: 'Write the return reason',
      },
)

const submit = () => router.push(localePath('/returns/success'))
</script>

<template>
  <main class="min-h-[80vh] py-6 px-4 bg-[#FAFAFA]">
    <div class="max-w-[562px] mx-auto flex flex-col gap-4">
      <!-- 1. Pick product -->
      <section class="bg-white p-4 rounded-[8px]">
        <h2 class="m-0 mb-4 text-[14px] font-semibold text-[#091019]">
          1- {{ copy.productTitle }}
        </h2>
        <div class="flex flex-col gap-3">
          <label v-for="p in products" :key="p.id" class="flex items-center gap-3 cursor-pointer">
            <input v-model="p.selected" type="checkbox" class="chk" />
            <img :src="p.image" :alt="copy.name" class="w-[100px] h-[100px] rounded-[8px] object-cover bg-[#F6F6F6] shrink-0" />
            <div class="flex-1 min-w-0 flex flex-col gap-1">
              <p class="m-0 text-[13px] text-[#6F7B8B] leading-snug line-clamp-2">{{ copy.name }}</p>
              <p class="m-0 text-[13px] font-bold text-[#6F7B8B]">{{ p.price }} {{ copy.sar }}</p>
              <p class="m-0 text-[12px] text-[#6F7B8B]">{{ copy.qty }}: {{ p.quantity }}</p>
            </div>
          </label>
        </div>
      </section>

      <!-- 2. Reason -->
      <section class="bg-white rounded-[8px] overflow-hidden">
        <button type="button" class="w-full flex items-center justify-between bg-[#F6F6F6] px-4 py-3" @click="toggle('reason')">
          <span class="text-[14px] font-semibold text-[#091019]">2- {{ copy.reasonTitle }}</span>
          <i class="ri-arrow-up-s-line text-[20px] text-[#6F7B8B] transition-transform" :class="{ 'rotate-180': !expanded.reason }" />
        </button>
        <div v-show="expanded.reason" class="px-4 py-3 flex flex-col gap-1">
          <label v-for="(reason, idx) in copy.reasons" :key="idx" class="flex items-center gap-3 py-1.5 cursor-pointer">
            <input type="checkbox" :checked="selectedReason === idx" class="chk" @change="selectedReason = idx" />
            <span class="text-[13px] text-[#6F7B8B]">{{ reason }}</span>
          </label>
          <div class="flex justify-end mt-3">
            <button type="button" class="bg-navbar text-white text-[13px] font-bold px-8 py-2 rounded-[8px] hover:opacity-90 transition-opacity" @click="openReasonModal">
              {{ copy.confirm }}
            </button>
          </div>
        </div>
      </section>

      <!-- 3. Refund method -->
      <section class="bg-white rounded-[8px] overflow-hidden">
        <button type="button" class="w-full flex items-center justify-between bg-[#F6F6F6] px-4 py-3" @click="toggle('method')">
          <span class="text-[14px] font-semibold text-[#091019]">3- {{ copy.methodTitle }}</span>
          <i class="ri-arrow-up-s-line text-[20px] text-[#6F7B8B] transition-transform" :class="{ 'rotate-180': !expanded.method }" />
        </button>
        <div v-show="expanded.method" class="px-4 py-3 flex flex-col gap-1">
          <label class="flex items-center justify-between gap-3 py-2 cursor-pointer">
            <span class="flex items-center gap-2 text-[13px] text-[#6F7B8B]">
              <img src="/images/pay1.png" alt="Bank" class="h-[16px] object-contain" />
              <span>{{ copy.bank }}</span>
            </span>
            <input type="checkbox" :checked="refundMethod === 'bank'" class="chk" @change="refundMethod = 'bank'" />
          </label>
          <label class="flex items-center justify-between gap-3 py-2 cursor-pointer">
            <span class="flex items-center gap-2 text-[13px] text-[#6F7B8B]">
              <i class="ri-wallet-3-line text-[18px] text-[#6F7B8B]" />
              <span>{{ copy.wallet }}</span>
            </span>
            <input type="checkbox" :checked="refundMethod === 'wallet'" class="chk" @change="refundMethod = 'wallet'" />
          </label>
        </div>
      </section>

      <!-- 4. Upload -->
      <section class="bg-white rounded-[8px] overflow-hidden">
        <button type="button" class="w-full flex items-center justify-between bg-[#F6F6F6] px-4 py-3" @click="toggle('upload')">
          <span class="text-[14px] font-semibold text-[#091019]">4- {{ copy.uploadTitle }}</span>
          <i class="ri-arrow-up-s-line text-[20px] text-[#6F7B8B] transition-transform" :class="{ 'rotate-180': !expanded.upload }" />
        </button>
        <div v-show="expanded.upload" class="px-4 py-4">
          <div class="border-2 border-dashed border-navbar rounded-[8px] h-[284px] flex flex-col items-center justify-center gap-2">
            <i class="ri-upload-2-line text-[28px] text-navbar" />
            <p class="m-0 text-[12px] text-[#6F7B8B]">{{ copy.dragHint }}</p>
          </div>
        </div>
      </section>

      <!-- Actions -->
      <div class="grid grid-cols-2 gap-3 mt-1">
        <button type="button" class="h-12 bg-navbar text-white text-[14px] rounded-[8px] hover:opacity-90 transition-opacity" @click="submit">
          {{ copy.submit }}
        </button>
        <button type="button" class="h-12 bg-white border border-navbar text-navbar text-[14px] rounded-[8px] hover:bg-navbar/5 transition-colors">
          {{ copy.trackOrder }}
        </button>
      </div>
    </div>

    <!-- Reason text modal -->
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
          v-if="isReasonModalOpen"
          class="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
          @click.self="closeReasonModal"
        >
          <div class="bg-white w-full max-w-[560px] rounded-[10px] border border-[#E8E8E8] p-5 lg:p-6">
            <!-- Header: title on start, X on end -->
            <div class="flex items-center justify-between mb-5">
              <h3 class="m-0 text-[16px] lg:text-[18px] font-bold text-[#091019]">
                {{ copy.reasonModalTitle }}
              </h3>
              <button
                type="button"
                class="w-8 h-8 rounded-[6px] border border-[#E8E8E8] flex items-center justify-center text-[#091019] hover:bg-[#F6F6F6] transition-colors"
                aria-label="Close"
                @click="closeReasonModal"
              >
                <i class="ri-close-line text-[18px]" />
              </button>
            </div>

            <!-- Textarea -->
            <textarea
              v-model="reasonText"
              :placeholder="copy.reasonPlaceholder"
              rows="6"
              class="w-full resize-none border border-[#E8E8E8] rounded-[10px] px-4 py-3 text-[14px] text-[#091019] placeholder:text-[#A0A8B5] focus:outline-none focus:border-navbar transition-colors min-h-[180px]"
            />

            <!-- Confirm -->
            <button
              type="button"
              class="mt-4 w-full h-12 bg-navbar text-white text-[14px] font-bold rounded-[8px] hover:opacity-90 transition-opacity"
              @click="confirmReason"
            >
              {{ copy.confirm }}
            </button>
          </div>
        </div>
      </Transition>
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
</style>
