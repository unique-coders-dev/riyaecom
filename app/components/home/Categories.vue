<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue'

const { locale, localePath } = useLocale();

const [mobileEmblaRef] = emblaCarouselVue({
  direction: locale.value === 'ar' ? 'rtl' : 'ltr',
  align: 'start',
  dragFree: true,
  containScroll: 'trimSnaps',
})

// Mock following the Home Page Builder API shape (HomeSection, layout: 'categories'); will be API-driven.
// `is_new` is an additional flag for the NEW sticker.
const categoriesSection = {
  id: 2,
  title: { en: "Categories", ar: "الأقسام" },
  layout: "categories",
  items: [
    {
      id: 1,
      image: "/images/p1.png",
      link: "/shop/women",
      title: { en: "Women", ar: "نسائي" },
      sort_order: 1,
      is_new: false,
    },
    {
      id: 2,
      image: "/images/p2.png",
      link: "/shop/men",
      title: { en: "Men", ar: "رجالي" },
      sort_order: 2,
      is_new: false,
    },
    {
      id: 3,
      image: "/images/p3.png",
      link: "/shop/kids",
      title: { en: "Kids", ar: "أطفال" },
      sort_order: 3,
      is_new: false,
    },
    {
      id: 4,
      image: "/images/p4.png",
      link: "/shop/t-shirts",
      title: { en: "T-Shirts", ar: "تيشيرتات" },
      sort_order: 4,
      is_new: false,
    },
    {
      id: 5,
      image: "/images/p5.png",
      link: "/shop/bags",
      title: { en: "Bags", ar: "حقائب" },
      sort_order: 5,
      is_new: false,
    },
    {
      id: 6,
      image: "/images/p6.png",
      link: "/shop/sets",
      title: { en: "Sets", ar: "أطقم" },
      sort_order: 6,
      is_new: true,
    },
    {
      id: 7,
      image: "/images/p7.png",
      link: "/shop/leggings",
      title: { en: "Leggings", ar: "ليقنز" },
      sort_order: 7,
      is_new: false,
    },
    {
      id: 8,
      image: "/images/p8.gif",
      link: "/shop/swimwear",
      title: { en: "Swimwear", ar: "ملابس سباحة" },
      sort_order: 8,
      is_new: false,
    },
    {
      id: 9,
      image: "/images/p9.png",
      link: "/shop/modest-wear",
      title: { en: "Modest Wear", ar: "ملابس محتشمة" },
      sort_order: 9,
      is_new: false,
    },
    {
      id: 10,
      image: "/images/p10.gif",
      link: "/shop/dresses",
      title: { en: "Dresses", ar: "فساتين" },
      sort_order: 10,
      is_new: false,
    },
    {
      id: 11,
      image: "/images/p11.png",
      link: "/shop/shorts",
      title: { en: "Shorts", ar: "شورتات" },
      sort_order: 11,
      is_new: false,
    },
    {
      id: 12,
      image: "/images/p12.png",
      link: "/shop/jeans",
      title: { en: "Jeans", ar: "جينز" },
      sort_order: 12,
      is_new: true,
    },
    {
      id: 13,
      image: "/images/p13.png",
      link: "/shop/shirts",
      title: { en: "Shirts", ar: "قمصان" },
      sort_order: 13,
      is_new: false,
    },
    {
      id: 14,
      image: "/images/p14.png",
      link: "/shop/t-shirts-2",
      title: { en: "T-Shirts", ar: "تيشيرتات" },
      sort_order: 14,
      is_new: false,
    },
    {
      id: 15,
      image: "/images/p15.png",
      link: "/shop/shoes",
      title: { en: "Shoes", ar: "أحذية" },
      sort_order: 15,
      is_new: false,
    },
    {
      id: 16,
      image: "/images/p16.png",
      link: "/shop/accessories",
      title: { en: "Accessories", ar: "اكسسوارات" },
      sort_order: 16,
      is_new: false,
    },
  ],
};

const PAGE_SIZE = 14;

const pages = computed(() => {
  const sorted = [...categoriesSection.items].sort(
    (a, b) => a.sort_order - b.sort_order,
  );
  const chunks = [];
  for (let i = 0; i < sorted.length; i += PAGE_SIZE) {
    chunks.push(sorted.slice(i, i + PAGE_SIZE));
  }
  return chunks;
});

const currentPage = ref(0);

// Mobile: two stacked rows, columns scroll horizontally
const mobileColumns = computed(() => {
  const sorted = [...categoriesSection.items].sort((a, b) => a.sort_order - b.sort_order);
  const half = Math.ceil(sorted.length / 2);
  return Array.from({ length: half }, (_, i) =>
    [sorted[i], sorted[i + half]].filter(
      (item): item is NonNullable<typeof item> => Boolean(item),
    ),
  );
});
</script>

<template>
  <section class="max-w-[1536px] mx-auto px-4 lg:px-12 my-6 lg:my-10 relative">
    <!-- Mobile: two-row draggable carousel -->
    <div ref="mobileEmblaRef" class="lg:hidden overflow-hidden cursor-grab active:cursor-grabbing">
      <div class="flex gap-2.5">
        <div v-for="(column, ci) in mobileColumns" :key="ci" class="flex-none flex flex-col gap-3">
          <NuxtLink
            v-for="item in column"
            :key="item.id"
            :to="localePath(item.link)"
            class="block w-[88px]"
          >
            <div class="relative w-[88px] h-[88px] rounded-[12px] overflow-hidden">
              <img
                :src="item.image"
                :alt="item.title[locale]"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <img v-if="item.is_new" src="/images/new.gif" alt="NEW" class="absolute top-1.5 start-1.5 w-6 h-6" />
            </div>
            <p class="m-0 mt-1.5 text-center text-[12px] font-semibold text-slate-900">
              {{ item.title[locale] }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="hidden lg:block">
    <!-- Cards (fade-in on page change) -->
    <Transition
      mode="out-in"
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        :key="currentPage"
        class="flex flex-wrap justify-center gap-x-3 gap-y-4 lg:gap-x-6 lg:gap-y-7"
      >
        <NuxtLink
          v-for="item in pages[currentPage]"
          :key="item.id"
          :to="localePath(item.link)"
          class="block w-[85px] lg:w-[185px] group"
        >
          <div
            class="relative w-[85px] h-[85px] lg:w-[185px] lg:h-[200px] rounded-[12px] lg:rounded-[16px] overflow-hidden"
          >
            <img
              :src="item.image"
              :alt="item.title[locale]"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <!-- NEW sticker -->
            <img
              v-if="item.is_new"
              src="/images/new.gif"
              alt="NEW"
              class="absolute top-1.5 start-1.5 w-6 h-6 lg:w-9 lg:h-9"
            />
          </div>
          <p
            class="m-0 mt-1.5 lg:mt-2.5 text-center text-[12px] lg:text-[15px] font-semibold text-slate-900"
          >
            {{ item.title[locale] }}
          </p>
        </NuxtLink>
      </div>
    </Transition>

    <!-- Dots -->
    <div
      v-if="pages.length > 1"
      dir="ltr"
      class="mt-6 flex items-center justify-center gap-1.5"
    >
      <button
        v-for="(_, i) in pages"
        :key="i"
        class="h-2.5 rounded-full transition-all duration-200"
        :class="
          i === currentPage
            ? 'w-5 bg-slate-900'
            : 'w-2.5 bg-gray-300 hover:bg-gray-400'
        "
        :aria-label="`Page ${i + 1}`"
        @click="currentPage = i"
      />
    </div>
    </div>
  </section>
</template>
