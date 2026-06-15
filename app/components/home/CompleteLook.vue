<script setup lang="ts">
const { t, locale, localePath } = useLocale()

// Mock data; will be API-driven (complete-the-look bundle)
const lookItems = [
  {
    id: 1,
    category: { en: 'Dress - Current Product', ar: 'الفستان - المنتج الحالي' },
    name: { en: 'Embroidered Turkish Dress', ar: 'فستان تركي مطرز' },
    image: '/images/p18.png',
    price: 200,
    old_price: '95.00',
    badge: null,
    in_cart: true,
  },
  {
    id: 2,
    category: { en: 'Shoes - Completes the Look', ar: 'الأحذية - يكمل اللوك' },
    name: { en: 'Soft Leather Heels - Beige', ar: 'حذاء كعب جلد نعم - بيج' },
    image: '/images/p21.png',
    price: 200,
    old_price: null,
    badge: { en: 'Perfectly completes this look', ar: 'يكمل هذا اللوك تماما' },
    in_cart: true,
  },
  {
    id: 3,
    category: { en: 'Bags', ar: 'الحقائب' },
    name: { en: 'Small Gold Evening Bag', ar: 'حقيبة سهرة ذهبية صغيرة' },
    image: '/images/p22.png',
    price: 200,
    old_price: null,
    badge: { en: 'The final touch', ar: 'اللمسة الاخيرة' },
    in_cart: false,
  },
]

const look = {
  image: '/images/p20.png',
  formula: { en: 'Dress + Shoes + Bag = The Complete Look', ar: 'فستان + حذاء + حقيبة = اللوك الكامل' },
  name: { en: 'The Complete Eid Look', ar: 'إطلالة العيد الكاملة' },
  meta: { en: '3 pieces · from 683 SAR', ar: '3 قطع . من 683 ريال' },
  link: '/shop/eid-look',
}
</script>

<template>
  <section class="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 my-10">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <h2 class="m-0 text-[18px] lg:text-[20px] font-bold text-[#091019]">
        {{ t.home.alsoLikeTitle }}
      </h2>
      <NuxtLink
        :to="localePath('/shop')"
        class="border border-navbar text-navbar text-[13px] font-semibold px-5 py-1.5 rounded-[8px] hover:bg-navbar/5 transition-colors"
      >
        {{ t.home.viewAll }}
      </NuxtLink>
    </div>

    <!-- Mobile -->
    <div class="lg:hidden grid grid-cols-2 gap-3 items-stretch">
      <!-- Bundle card -->
      <div class="bg-[#F6F6F6] rounded-[16px] p-3 flex flex-col h-[315px]">
        <div class="bg-white rounded-[8px] h-[120px] flex items-center justify-center overflow-hidden shrink-0">
          <img :src="look.image" :alt="look.name[locale]" class="h-full w-auto object-contain" />
        </div>
        <div class="bg-white rounded-[8px] mt-2 px-3 py-1 text-[10px] text-[#091019] leading-snug">
          {{ look.formula[locale] }}
        </div>
        <p class="m-0 mt-2 text-[12px] font-bold text-[#091019] truncate">{{ look.name[locale] }}</p>
        <p class="m-0 mt-1 text-[10px] text-gray-400 truncate">{{ look.meta[locale] }}</p>
        <NuxtLink
          :to="localePath(look.link)"
          class="mt-auto pt-3"
        >
          <span class="w-full h-10 flex items-center justify-center rounded-[8px] bg-navbar text-white text-[12px] font-semibold">
            {{ t.home.shopFullLook }}
          </span>
        </NuxtLink>
      </div>

      <!-- Item cards -->
      <div class="flex flex-col gap-3">
        <div
          v-for="item in [lookItems[1], lookItems[2]]"
          :key="item!.id"
          class="h-[153px] overflow-hidden bg-[#F6F6F6] border border-[#E8E8E8] rounded-[16px] p-2 flex flex-col"
        >
          <div class="relative h-[60px] bg-white rounded-[8px] flex items-center justify-center overflow-hidden shrink-0">
            <img :src="item!.image" :alt="item!.name[locale]" class="h-[50px] w-auto object-contain" />
            <span v-if="item!.in_cart" class="absolute top-1 end-1 bg-[#ECFDF3] border border-[#DEEBDD] text-[#32B828] text-[9px] font-semibold px-2 leading-snug rounded-full">
              {{ t.home.inCart }}
            </span>
            <button v-else class="absolute top-1 end-1 text-navbar leading-none" :aria-label="t.home.addItem">
              <i class="ri-shopping-cart-2-line text-base" />
            </button>
          </div>
          <p class="m-0 mt-1 text-[9px] text-gray-400 truncate leading-tight">{{ item!.category[locale] }}</p>
          <p class="m-0 mt-0.5 text-[11px] font-bold text-[#091019] truncate leading-tight">{{ item!.name[locale] }}</p>
          <span
            v-if="item!.badge"
            class="self-start inline-block mt-0.5 max-w-full truncate bg-[#ECFDF3] text-[#32B828] border border-[#DEEBDD] rounded-[24px] text-[9px] px-1.5 leading-snug"
          >
            {{ item!.badge[locale] }}
          </span>
          <div class="mt-auto pt-0.5">
            <span dir="ltr" class="inline-flex items-center gap-1.5">
              <span class="text-[12px] font-bold text-navbar inline-flex items-center gap-0.5">
                <UiRiyalSymbol /> {{ item!.price }}
              </span>
              <span class="text-[10px] text-[#6F7B8B] line-through inline-flex items-center gap-0.5">
                <UiRiyalSymbol /> 95.00
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop -->
    <div class="hidden lg:grid lg:grid-cols-2 gap-10 items-start">
      <!-- Look bundle card -->
      <div class="bg-[#F6F6F6] rounded-[16px] p-5">
        <div class="bg-white rounded-[8px] h-[240px] flex items-center justify-center overflow-hidden">
          <img :src="look.image" :alt="look.name[locale]" class="h-full w-auto object-contain" />
        </div>
        <div class="bg-white rounded-[8px] mt-3 px-4 py-2 text-[12px] text-[#091019]">
          {{ look.formula[locale] }}
        </div>
        <p class="m-0 mt-3 text-[15px] font-bold text-[#091019]">{{ look.name[locale] }}</p>
        <p class="m-0 mt-1 text-[12px] text-gray-400">{{ look.meta[locale] }}</p>
        <NuxtLink
          :to="localePath(look.link)"
          class="mt-4 w-full h-11 flex items-center justify-center rounded-[8px] bg-navbar text-white text-[13px] font-semibold hover:bg-[#F3DCFA] hover:text-[#091019] transition-colors"
        >
          {{ t.home.shopFullLook }}
        </NuxtLink>
      </div>

      <!-- Items list -->
      <div class="flex flex-col gap-4">
        <div
          v-for="item in lookItems"
          :key="item.id"
          class="bg-[#F6F6F6] border border-[#E8E8E8] rounded-[16px] p-4 flex items-start justify-between gap-3"
        >
          <div class="flex items-start gap-3 min-w-0">
            <div class="w-[70px] h-[70px] rounded-[8px] bg-white shrink-0 overflow-hidden flex items-center justify-center">
              <img :src="item.image" :alt="item.name[locale]" class="w-full h-full object-contain" />
            </div>
            <div class="min-w-0">
              <p class="m-0 text-[11px] text-gray-400">{{ item.category[locale] }}</p>
              <p class="m-0 mt-0.5 text-[14px] font-bold text-[#091019]">{{ item.name[locale] }}</p>
              <span
                v-if="item.badge"
                class="inline-block mt-1.5 bg-[#ECFDF3] text-[#32B828] border border-[#DEEBDD] rounded-[24px] text-[11px] px-2.5 py-0.5"
              >
                {{ item.badge[locale] }}
              </span>
              <div class="mt-1.5">
                <span v-if="item.old_price" dir="ltr" class="inline-flex items-center gap-2">
                  <span class="text-[14px] font-bold text-navbar inline-flex items-center gap-1">
                    <UiRiyalSymbol /> {{ item.price }}
                  </span>
                  <span class="text-[12px] text-[#6F7B8B] line-through inline-flex items-center gap-0.5">
                    <UiRiyalSymbol /> {{ item.old_price }}
                  </span>
                </span>
                <span v-else dir="ltr" class="text-[14px] font-bold text-[#091019] inline-flex items-center gap-1">
                  <UiRiyalSymbol /> {{ item.price }}
                </span>
              </div>
            </div>
          </div>

          <!-- Action -->
          <span v-if="item.in_cart" class="shrink-0 flex items-center gap-1 text-[12px] font-semibold text-[#32B828]">
            <i class="ri-check-line text-base" />
            {{ t.home.inCart }}
          </span>
          <button v-else class="shrink-0 flex items-center gap-1 text-[12px] font-semibold text-[#091019] hover:text-navbar transition-colors">
            <i class="ri-add-line text-base" />
            {{ t.home.addItem }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
