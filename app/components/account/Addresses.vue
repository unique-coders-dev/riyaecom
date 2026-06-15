<script setup lang="ts">
const { t, locale, localePath } = useLocale()
const { open } = useAccountNav()

const user = {
  name: 'Mostafa samy',
  email: 'mjihad84@gmail.com',
  balance: '0.00',
  avatar: '/images/user.jpg',
}

const showForm = ref(false)

const addresses = [
  { id: 1, type: { ar: 'المنزل', en: 'Home' }, primary: true },
  { id: 2, type: { ar: 'المكتب', en: 'Office' }, primary: false },
  { id: 3, type: { ar: 'المصنع', en: 'Factory' }, primary: false },
  { id: 4, type: { ar: 'المزرعة', en: 'Farm' }, primary: false },
  { id: 5, type: { ar: 'المنزل-2', en: 'Home-2' }, primary: false },
  { id: 6, type: { ar: 'المنزل-3', en: 'Home-3' }, primary: false },
].map((a) => ({
  ...a,
  code: 'ASMM16398',
  address: { ar: 'شارع الملك عبدالله,حي الورود, مدينة الرياض', en: 'King Abdullah St, Al Wurud, Riyadh' },
}))

const formFields = computed(() => [
  [
    { label: t.value.account.firstNameLabel, placeholder: t.value.account.enterFirstName, select: false },
    { label: t.value.account.lastNameLabel, placeholder: t.value.account.enterLastName, select: false },
  ],
  [{ label: t.value.account.nationalAddressLabel, placeholder: t.value.account.enterNationalAddress, select: false }],
  [{ label: t.value.account.addressName, placeholder: t.value.account.enterAddressName, select: false }],
  [
    { label: t.value.account.postalCodeLabel, placeholder: t.value.account.enterPostalCode, select: false },
    { label: t.value.account.streetLabel, placeholder: t.value.account.enterStreet, select: false },
  ],
  [
    { label: t.value.account.countryLabel, placeholder: t.value.account.countryLabel, select: true },
    { label: t.value.account.cityLabel, placeholder: t.value.account.cityLabel, select: true },
  ],
  [
    { label: t.value.account.buildingNo, placeholder: t.value.account.enterBuildingNo, select: false },
    { label: t.value.account.aptNo, placeholder: t.value.account.enterAptNo, select: false },
  ],
  [{ label: t.value.account.addressDetails, placeholder: t.value.account.enterAddressDetails, select: false }],
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
        <span class="text-[#091019]">{{ t.account.myAccount }}</span>
      </nav>

      <div class="mt-6 grid gap-6 lg:grid-cols-[260px_1fr] items-start">
        <AccountSidebar active="addresses" />

        <!-- Content: addresses list -->
        <section v-if="!showForm" class="bg-white border border-gray-100 rounded-[12px] shadow-[0px_4px_20px_0px_#6464640D] p-6">
          <h1 class="m-0 text-[16px] font-bold text-[#091019]">{{ t.account.myAddresses }}</h1>
          <p class="m-0 mt-1 text-[12px] text-[#64768C]">{{ t.account.addressesSubtitle }}</p>

          <div class="mt-5 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <div v-for="addr in addresses" :key="addr.id" class="bg-white rounded-[10px] shadow-[0px_4px_20px_0px_#E7E7E7] p-4">
              <div class="flex items-center justify-between gap-2">
                <span class="text-[12px]" :class="addr.primary ? 'font-bold text-[#091019]' : 'text-[#64768C]'">
                  {{ t.checkout.nationalAddress }} <span dir="ltr">{{ addr.code }}</span>
                </span>
                <button class="text-[#091019] hover:text-navbar transition-colors" aria-label="Edit">
                  <i class="ri-pencil-line text-base" />
                </button>
              </div>
              <p class="m-0 mt-2 text-[12px] text-[#091019]">
                {{ t.account.deliverToLabel }}
                <i class="ri-map-pin-2-line text-sm text-[#32B828]" />
                <span class="font-semibold text-[#32B828]">{{ addr.type[locale] }}</span>
              </p>
              <div class="mt-2 flex items-center gap-2">
                <input type="checkbox" checked class="w-4 h-4 accent-navbar shrink-0" />
                <span class="text-[12px] font-semibold text-[#091019]">{{ addr.address[locale] }}</span>
              </div>
            </div>
          </div>

          <div class="mt-5 flex justify-end">
            <button
              class="flex items-center gap-2 bg-navbar text-white text-[13px] font-semibold px-5 py-2.5 rounded-[10px] hover:opacity-95 transition-opacity"
              @click="showForm = true"
            >
              <i class="ri-add-line text-base" />
              {{ t.checkout.addNewAddress }}
            </button>
          </div>
        </section>

        <!-- Content: create address form -->
        <section v-else class="bg-white border border-gray-100 rounded-[12px] shadow-[0px_4px_20px_0px_#6464640D] p-6">
          <h1 class="m-0 text-[16px] font-bold text-[#091019]">{{ t.account.createAddress }}</h1>
          <p class="m-0 mt-1 text-[12px] text-[#64768C]">{{ t.account.createAddressSub }}</p>

          <div class="mt-5 flex flex-col gap-4">
            <div v-for="(row, i) in formFields" :key="i" class="grid gap-4" :class="row.length > 1 ? 'md:grid-cols-2' : ''">
              <div v-for="field in row" :key="field.label">
                <label class="block text-[13px] font-bold text-[#091019] mb-2">
                  {{ field.label }} <span class="text-[#FF3F3F]">*</span>
                </label>
                <div v-if="field.select" class="relative">
                  <select class="w-full h-11 px-4 rounded-[8px] bg-[#F6F6F7] text-[12px] text-[#64768C] appearance-none">
                    <option>{{ field.placeholder }}</option>
                  </select>
                  <i class="ri-arrow-down-s-line absolute end-4 top-1/2 -translate-y-1/2 text-base text-[#64768C] pointer-events-none" />
                </div>
                <input
                  v-else
                  type="text"
                  :placeholder="field.placeholder"
                  class="w-full h-11 px-4 rounded-[8px] bg-[#F6F6F7] text-[13px] text-[#091019] placeholder:text-[#64768C]"
                />
              </div>
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <button
              class="w-[190px] h-11 rounded-[8px] bg-navbar text-white text-[13px] font-semibold hover:opacity-95 transition-opacity"
              @click="showForm = false"
            >
              {{ t.account.save }}
            </button>
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
        <h1 class="m-0 text-[15px] font-bold text-[#091019]">{{ showForm ? t.account.createAddress : t.account.myAddresses }}</h1>
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

      <!-- Addresses list -->
      <template v-if="!showForm">
        <div class="mt-3 mx-4 flex flex-col gap-3">
          <div v-for="addr in addresses" :key="addr.id" class="bg-white rounded-[16px] px-4 py-4 shadow-[0px_4px_20px_0px_#64646412]">
            <div class="flex items-center justify-between gap-2">
              <span class="text-[12px]" :class="addr.primary ? 'font-bold text-[#091019]' : 'text-[#64768C]'">
                {{ t.checkout.nationalAddress }} <span dir="ltr">{{ addr.code }}</span>
              </span>
              <button class="text-[#091019]" aria-label="Edit">
                <i class="ri-pencil-line text-base" />
              </button>
            </div>
            <p class="m-0 mt-2 text-[12px] text-[#091019]">
              {{ t.account.deliverToLabel }}
              <i class="ri-map-pin-2-line text-sm text-[#32B828]" />
              <span class="font-semibold text-[#32B828]">{{ addr.type[locale] }}</span>
            </p>
            <div class="mt-2 flex items-center gap-2">
              <input type="checkbox" checked class="w-4 h-4 accent-navbar shrink-0" />
              <span class="text-[12px] font-semibold text-[#091019]">{{ addr.address[locale] }}</span>
            </div>
          </div>
        </div>

        <!-- Add new address button -->
        <div class="mt-3 mx-4 pb-4">
          <button
            class="w-full h-12 rounded-[12px] bg-navbar text-white text-[14px] font-semibold flex items-center justify-center gap-2"
            @click="showForm = true"
          >
            <i class="ri-add-line text-lg" />
            {{ t.checkout.addNewAddress }}
          </button>
        </div>
      </template>

      <!-- Create address form -->
      <template v-else>
        <div class="mt-3 mx-4 pb-4">
          <div class="bg-white rounded-[16px] px-4 pt-5 pb-6 shadow-[0px_4px_20px_0px_#64646412]">
            <div class="flex flex-col gap-4">
              <div v-for="(row, i) in formFields" :key="i" class="flex flex-col gap-4">
                <div v-for="field in row" :key="field.label">
                  <label class="block text-[13px] font-bold text-[#091019] mb-2">
                    {{ field.label }} <span class="text-[#FF3F3F]">*</span>
                  </label>
                  <div v-if="field.select" class="relative">
                    <select class="w-full h-11 px-4 rounded-[10px] bg-[#F6F6F6] text-[12px] text-[#64768C] appearance-none">
                      <option>{{ field.placeholder }}</option>
                    </select>
                    <i class="ri-arrow-down-s-line absolute end-4 top-1/2 -translate-y-1/2 text-base text-[#64768C] pointer-events-none" />
                  </div>
                  <input
                    v-else
                    type="text"
                    :placeholder="field.placeholder"
                    class="w-full h-11 px-4 rounded-[10px] bg-[#F6F6F6] text-[13px] text-[#091019] placeholder:text-[#64768C]"
                  />
                </div>
              </div>
            </div>

            <div class="mt-6 flex flex-col gap-2.5">
              <button
                class="w-full h-12 rounded-[10px] bg-navbar text-white text-[14px] font-semibold"
                @click="showForm = false"
              >
                {{ t.account.save }}
              </button>
              <button
                class="w-full h-12 rounded-[10px] border border-[#E8E8E8] text-[14px] font-semibold text-[#091019]"
                @click="showForm = false"
              >
                {{ locale === 'ar' ? 'إلغاء' : 'Cancel' }}
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>

    <AccountNavDrawer />
  </div>
</template>
