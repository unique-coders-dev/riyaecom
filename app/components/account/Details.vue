<script setup lang="ts">
const { t, locale, localePath } = useLocale()
const { open } = useAccountNav()

const user = {
  name: 'Mostafa samy',
  email: 'mjihad84@gmail.com',
  balance: '0.00',
  avatar: '/images/user.jpg',
}

const name = ref('')
const email = ref('')
const phone = ref('')
const gender = ref('male')

const backIcon = computed(() => locale.value === 'ar' ? 'ri-arrow-right-line' : 'ri-arrow-left-line')
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
        <span class="text-[#091019]">{{ t.account.myAccount }}</span>
      </nav>

      <div class="mt-6 grid gap-6 lg:grid-cols-[260px_1fr] items-start">
        <AccountSidebar active="details" />

        <section class="bg-white border border-gray-100 rounded-[12px] shadow-[0px_4px_20px_0px_#6464640D] p-6">
          <div class="flex items-center gap-3">
            <NuxtLink :to="localePath('/account')" class="mt-0.5 text-[#091019] hover:text-navbar transition-colors" aria-label="Back">
              <i :class="backIcon" class="text-xl" />
            </NuxtLink>
            <div>
              <h1 class="m-0 text-[16px] font-bold text-[#091019]">{{ t.account.myAccount }}</h1>
              <p class="m-0 mt-1 text-[12px] text-[#64768C]">{{ t.account.accountSubtitle }}</p>
            </div>
          </div>

          <div class="mt-5 flex flex-col gap-4">
            <div>
              <label class="block text-[13px] font-bold text-[#091019] mb-2">{{ t.account.nameLabel }}</label>
              <input v-model="name" type="text" placeholder="حاتم احمد" class="w-full h-11 px-4 rounded-[8px] bg-[#F6F6F7] text-[13px] text-[#091019] placeholder:text-[#64768C]" />
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-[13px] font-bold text-[#091019] mb-2">{{ t.account.emailLabel }}</label>
                <input v-model="email" type="email" placeholder="mostafa65@gmail.com" class="w-full h-11 px-4 rounded-[8px] bg-[#F6F6F7] text-[13px] text-[#091019] placeholder:text-[#64768C]" />
              </div>
              <div>
                <label class="block text-[13px] font-bold text-[#091019] mb-2">{{ t.account.phoneLabel }}</label>
                <div class="flex gap-2">
                  <input v-model="phone" type="text" :placeholder="t.checkout.phonePlaceholder" class="flex-1 min-w-0 h-11 px-4 rounded-[8px] bg-[#F6F6F7] text-[13px] text-[#091019] placeholder:text-[#64768C]" />
                  <button class="shrink-0 h-11 px-3 rounded-[8px] bg-[#F6F6F7] flex items-center gap-1.5 text-[12px] text-[#091019]">
                    <span>🇸🇦</span><span dir="ltr">+965</span><i class="ri-arrow-down-s-line text-base" />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-[13px] font-bold text-[#091019] mb-2.5">{{ t.account.countryLabel }}</label>
              <div class="flex items-center gap-6 flex-wrap">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input v-model="gender" type="radio" value="male" name="gender-d" class="w-4 h-4 accent-navbar" />
                  <span class="text-[13px] font-bold text-[#091019]">{{ t.account.male }}</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input v-model="gender" type="radio" value="female" name="gender-d" class="w-4 h-4 accent-navbar" />
                  <span class="text-[13px] text-[#091019]">{{ t.account.female }}</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input v-model="gender" type="radio" value="none" name="gender-d" class="w-4 h-4 accent-navbar" />
                  <span class="text-[13px] text-[#091019]">{{ t.account.preferNotSay }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="mt-8 flex flex-col items-end gap-2.5">
            <button class="w-[145px] h-10 rounded-[8px] bg-navbar text-white text-[13px] font-semibold hover:opacity-95 transition-opacity">{{ t.account.update }}</button>
            <button class="w-[145px] h-10 rounded-[8px] bg-[#D4342A] text-white text-[13px] font-semibold hover:opacity-95 transition-opacity">{{ t.account.deleteAccount }}</button>
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
        <h2 class="m-0 text-[15px] font-bold text-[#091019]">{{ t.account.myAccount }}</h2>
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

      <!-- Form card -->
      <div class="mt-3 mx-4 bg-white rounded-[16px] px-4 pt-5 pb-6 shadow-[0px_4px_20px_0px_#64646412]">
        <!-- Name -->
        <div class="mb-4">
          <label class="block text-[13px] font-bold text-[#091019] mb-2">{{ t.account.nameLabel }}</label>
          <input v-model="name" type="text" placeholder="حاتم احمد" class="w-full h-11 px-4 rounded-[10px] bg-[#F6F6F6] text-[13px] text-[#091019] placeholder:text-[#64768C]" />
        </div>

        <!-- Phone -->
        <div class="mb-4">
          <label class="block text-[13px] font-bold text-[#091019] mb-2">{{ t.account.phoneLabel }}</label>
          <div class="flex gap-2">
            <!-- phone input first (right in RTL), dropdown second (left in RTL) -->
            <input v-model="phone" type="text" placeholder="مثال xxxxxxxx5" class="flex-1 min-w-0 h-11 px-4 rounded-[10px] bg-[#F6F6F6] text-[13px] text-[#091019] placeholder:text-[#64768C]" />
            <button class="shrink-0 h-11 px-3 rounded-[10px] bg-[#F6F6F6] flex items-center gap-1.5 text-[12px] text-[#091019]">
              <i class="ri-arrow-down-s-line text-base" /><span>🇸🇦</span><span dir="ltr">+965</span>
            </button>
          </div>
        </div>

        <!-- Gender (under countryLabel as per design) -->
        <div class="mb-6">
          <label class="block text-[13px] font-bold text-[#091019] mb-3">{{ t.account.countryLabel }}</label>
          <div class="flex items-center gap-5 flex-wrap">
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="gender" type="radio" value="male" name="gender-m" class="w-4 h-4 accent-navbar" />
              <span class="text-[13px] font-bold text-[#091019]">{{ t.account.male }}</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="gender" type="radio" value="female" name="gender-m" class="w-4 h-4 accent-navbar" />
              <span class="text-[13px] text-[#091019]">{{ t.account.female }}</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="gender" type="radio" value="none" name="gender-m" class="w-4 h-4 accent-navbar" />
              <span class="text-[13px] text-[#091019]">{{ t.account.preferNotSay }}</span>
            </label>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="flex flex-col gap-2.5">
          <button class="w-full h-12 rounded-[10px] bg-navbar text-white text-[14px] font-semibold">
            {{ t.account.update }}
          </button>
          <button class="w-full h-12 rounded-[10px] bg-[#FF3F3F] text-white text-[14px] font-semibold">
            {{ t.account.deleteAccount }}
          </button>
        </div>
      </div>
    </div>

    <AccountNavDrawer />
  </div>
</template>
