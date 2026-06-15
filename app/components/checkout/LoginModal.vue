<script setup lang="ts">
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: []; verified: [] }>()

const { t } = useLocale()

const step = ref<'login' | 'signup' | 'verify' | 'success'>('login')
const verifying = ref(false)
const fromSignup = ref(false)
const phone = ref('')
const fullName = ref('')
const gender = ref<'none' | 'female' | 'male'>('male')
const otp = ref(['', '', '', ''])

watch(
  () => props.open,
  (open) => {
    if (open) {
      step.value = 'login'
      verifying.value = false
      fromSignup.value = false
      otp.value = ['', '', '', '']
    }
    if (import.meta.client) document.body.style.overflow = open ? 'hidden' : ''
  },
)

const goVerify = (isSignup = false) => {
  fromSignup.value = isSignup
  step.value = 'verify'
}

const verify = () => {
  if (verifying.value) return
  verifying.value = true
  setTimeout(() => {
    verifying.value = false
    if (fromSignup.value) {
      step.value = 'success'
    } else {
      emit('verified')
    }
  }, 2000)
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 bg-black/40 z-[200] flex items-center justify-center p-4" @click.self="emit('close')">
        <div class="w-full max-w-[460px] bg-white rounded-[12px] p-6" :dir="t.dir">

          <!-- ── Login step ── -->
          <template v-if="step === 'login'">
            <div class="flex justify-end">
              <button class="text-[#091019] hover:opacity-70 transition-opacity" aria-label="Close" @click="emit('close')">
                <i class="ri-close-line text-2xl" />
              </button>
            </div>

            <h2 class="m-0 mt-1 text-[16px] font-bold text-[#091019]">{{ t.checkout.loginTitle }}</h2>

            <div class="mt-4 flex gap-2">
              <input
                v-model="phone"
                type="text"
                :placeholder="t.checkout.phonePlaceholder"
                class="flex-1 min-w-0 h-11 px-4 rounded-[8px] bg-[#F6F6F6] text-[13px] text-[#091019] placeholder:text-gray-400"
              />
              <button class="shrink-0 h-11 px-3 rounded-[8px] bg-[#F6F6F6] flex items-center gap-1.5 text-[13px] text-[#091019]">
                <span>🇸🇦</span>
                <span dir="ltr">+965</span>
                <i class="ri-arrow-down-s-line text-base" />
              </button>
            </div>

            <button
              class="mt-5 w-full h-11 rounded-[8px] bg-navbar text-white text-[13px] font-semibold hover:opacity-95 transition-opacity"
              @click="goVerify(false)"
            >
              {{ t.checkout.sendCode }}
            </button>
            <button
              class="mt-3 w-full h-11 rounded-[8px] border border-navbar text-navbar text-[13px] font-semibold hover:bg-navbar/5 transition-colors"
              @click="emit('close')"
            >
              {{ t.checkout.continueGuest }}
            </button>

            <div class="mt-5 flex items-center gap-3 text-[12px] text-[#64768C]">
              <span class="flex-1 border-t border-dashed border-gray-200" />
              {{ t.checkout.orSignWith }}
              <span class="flex-1 border-t border-dashed border-gray-200" />
            </div>

            <div dir="ltr" class="mt-4 flex items-center justify-center gap-3">
              <button class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors" aria-label="Google">
                <img src="/images/gLogo.png" alt="Google" class="h-4 w-auto" />
              </button>
              <button class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors" aria-label="Apple">
                <img src="/images/aLogo.png" alt="Apple" class="h-4 w-auto" />
              </button>
            </div>

            <p class="m-0 mt-5 text-center text-[12px] text-[#64768C]">
              {{ t.checkout.noAccount }}
              <button class="text-navbar font-semibold underline" @click="step = 'signup'">{{ t.checkout.createAccount }}</button>
            </p>
          </template>

          <!-- ── Signup step ── -->
          <template v-else-if="step === 'signup'">
            <div class="flex justify-end">
              <button class="text-[#091019] hover:opacity-70 transition-opacity" aria-label="Close" @click="emit('close')">
                <i class="ri-close-line text-2xl" />
              </button>
            </div>

            <h2 class="m-0 mt-1 text-[18px] font-bold text-[#091019]">{{ t.checkout.signupTitle }}</h2>
            <p class="m-0 mt-1.5 text-[13px] text-[#64768C]">{{ t.checkout.signupSubtitle }}</p>

            <!-- Full name -->
            <input
              v-model="fullName"
              type="text"
              :placeholder="t.checkout.fullName"
              class="mt-5 w-full h-11 px-4 rounded-[8px] bg-[#F6F6F6] text-[13px] text-[#091019] placeholder:text-gray-400"
            />

            <!-- Phone row -->
            <div class="mt-3 flex gap-2">
              <input
                v-model="phone"
                type="text"
                :placeholder="t.checkout.phonePlaceholder"
                class="flex-1 min-w-0 h-11 px-4 rounded-[8px] bg-[#F6F6F6] text-[13px] text-[#091019] placeholder:text-gray-400"
              />
              <button class="shrink-0 h-11 px-3 rounded-[8px] bg-[#F6F6F6] flex items-center gap-1.5 text-[13px] text-[#091019]">
                <i class="ri-arrow-down-s-line text-base" />
                <span dir="ltr">+965</span>
                <span>🇸🇦</span>
              </button>
            </div>

            <!-- Gender -->
            <div class="mt-4 flex items-center justify-center gap-5 text-[13px] text-[#091019]">
              <label class="flex items-center gap-2 cursor-pointer">
                <span>{{ t.checkout.preferNotSay }}</span>
                <input type="radio" name="gender" value="none" :checked="gender === 'none'" class="w-4 h-4 accent-navbar cursor-pointer" @change="gender = 'none'" />
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <span>{{ t.checkout.genderFemale }}</span>
                <input type="radio" name="gender" value="female" :checked="gender === 'female'" class="w-4 h-4 accent-navbar cursor-pointer" @change="gender = 'female'" />
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <span>{{ t.checkout.genderMale }}</span>
                <input type="radio" name="gender" value="male" :checked="gender === 'male'" class="w-4 h-4 accent-navbar cursor-pointer" @change="gender = 'male'" />
              </label>
            </div>

            <button
              class="mt-5 w-full h-11 rounded-[8px] bg-navbar text-white text-[13px] font-semibold hover:opacity-95 transition-opacity"
              @click="goVerify(true)"
            >
              {{ t.checkout.sendCode }}
            </button>
            <button
              class="mt-3 w-full h-11 rounded-[8px] border border-navbar text-navbar text-[13px] font-semibold hover:bg-navbar/5 transition-colors"
              @click="emit('close')"
            >
              {{ t.checkout.continueGuest }}
            </button>

            <div class="mt-5 flex items-center gap-3 text-[12px] text-[#64768C]">
              <span class="flex-1 border-t border-dashed border-gray-200" />
              {{ t.checkout.orSignWith }}
              <span class="flex-1 border-t border-dashed border-gray-200" />
            </div>

            <div dir="ltr" class="mt-4 flex items-center justify-center gap-3">
              <button class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors" aria-label="Google">
                <img src="/images/gLogo.png" alt="Google" class="h-4 w-auto" />
              </button>
              <button class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors" aria-label="Apple">
                <img src="/images/aLogo.png" alt="Apple" class="h-4 w-auto" />
              </button>
            </div>

            <p class="m-0 mt-5 text-center text-[12px] text-[#64768C]">
              <button class="text-navbar font-semibold underline" @click="step = 'login'">{{ t.checkout.haveAccount }}</button>
            </p>
          </template>

          <!-- ── Verify step ── -->
          <template v-else-if="step === 'verify'">
            <div class="flex justify-end">
              <button class="text-[#091019] hover:opacity-70 transition-opacity" aria-label="Close" @click="emit('close')">
                <i class="ri-close-line text-2xl" />
              </button>
            </div>

            <h2 class="m-0 mt-1 text-center text-[16px] font-bold text-[#091019]">{{ t.checkout.otpTitle }}</h2>
            <p class="m-0 mt-2 text-center text-[12px] text-[#64768C]">
              {{ t.checkout.otpSent }} <span dir="ltr">••••5678</span>
            </p>
            <p class="m-0 mt-1.5 text-center">
              <a href="#" class="text-[12px] text-navbar underline">{{ t.checkout.change }}</a>
            </p>

            <div dir="ltr" class="mt-5 flex items-center justify-center gap-3">
              <input
                v-for="(_, i) in otp"
                :key="i"
                v-model="otp[i]"
                type="text"
                maxlength="1"
                class="w-12 h-12 rounded-[8px] bg-[#F6F6F6] text-center text-[16px] font-bold text-[#091019]"
              />
            </div>

            <button
              class="mt-6 w-full h-11 rounded-[8px] bg-navbar text-white text-[13px] font-semibold hover:opacity-95 transition-opacity flex items-center justify-center"
              @click="verify"
            >
              <i v-if="verifying" class="ri-loader-4-line text-lg animate-spin" />
              <template v-else>{{ t.checkout.verify }}</template>
            </button>

            <p class="m-0 mt-4 text-center text-[12px] text-[#64768C]">
              {{ t.checkout.noCode }}
              <a href="#" class="text-navbar font-semibold underline">{{ t.checkout.resend }}</a>
            </p>
          </template>

          <!-- ── Success step ── -->
          <template v-else-if="step === 'success'">
            <div class="py-4 flex flex-col items-center text-center">
              <img src="/images/party-popper.png" alt="" class="w-20 h-20 object-contain" />
              <h2 class="m-0 mt-6 text-[17px] font-bold text-[#091019] leading-snug">{{ t.checkout.signupSuccess }}</h2>
              <p class="m-0 mt-3 text-[13px] text-[#64768C] leading-relaxed max-w-[320px]">{{ t.checkout.signupSuccessSub }}</p>
              <button
                class="mt-7 h-11 px-10 rounded-[10px] bg-navbar text-white text-[14px] font-semibold hover:opacity-95 transition-opacity"
                @click="emit('verified')"
              >
                {{ t.checkout.shopNow }}
              </button>
            </div>
          </template>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>
