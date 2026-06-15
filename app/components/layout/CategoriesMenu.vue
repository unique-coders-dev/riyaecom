<script setup lang="ts">
defineProps<{ open: boolean }>()

const { t, locale, localePath } = useLocale()

const menuImages = ['m1.png', 'm2.png', 'm3.gif', 'm4.png', 'm5.gif', 'm6.png', 'm7.png', 'm1.png', 'm2.png']

// Shared children mock (same set for every root category for now)
const children = [
  { en: "Women's Dresses", ar: 'فساتين نسائية' },
  { en: "Women's T-Shirts", ar: 'تيشيرتات نسائية' },
  { en: "Women's Coats", ar: 'معاطف نسائية' },
  { en: "Women's Sets", ar: 'أطقم نسائية' },
  { en: "Women's Coats", ar: 'معاطف نسائية' },
  { en: "Women's Glasses", ar: 'نظارات نسائية' },
  { en: "Women's Shoes", ar: 'أحذية نسائية' },
  { en: 'Evening Dresses', ar: 'فساتين سهرة' },
  { en: "Women's Shoes", ar: 'أحذية نسائية' },
].map((name, i) => ({
  id: i + 1,
  name,
  slug: `sub-${i + 1}`,
  image: `/images/${menuImages[i]}`,
}))

// Mock following the Navbar Categories API shape (NavbarCategory[]); will be API-driven
const categories = [
  { en: 'Women', ar: 'نساء' },
  { en: 'Men', ar: 'رجال' },
  { en: 'Kids', ar: 'أطفال' },
  { en: 'T-Shirts', ar: 'تيشيرتات' },
  { en: 'Jackets & Coats', ar: 'سترات ومعاطف' },
  { en: 'Modest Wear', ar: 'ملابس محتشمة' },
  { en: 'Jalabiyas', ar: 'جلابيات' },
  { en: 'Bags', ar: 'حقائب' },
  { en: 'T-Shirts', ar: 'تيشيرتات' },
  { en: 'Shirts', ar: 'قمصان' },
  { en: 'Girls', ar: 'فتيات' },
  { en: 'Boys', ar: 'أولاد' },
  { en: 'Infants', ar: 'Infants' },
  { en: 'Sunglasses', ar: 'نظارات شمسية' },
  { en: 'Watches', ar: 'ساعات' },
  { en: 'Arabian Fashion', ar: 'الأزياء العربية' },
  { en: 'Dresses', ar: 'فساتين' },
  { en: 'Eid Ramadan', ar: 'عيد رمضان' },
  { en: 'Storage & Organization', ar: 'التخزين والتنظيم' },
].map((name, i) => ({
  id: i + 1,
  name,
  slug: `category-${i + 1}`,
  show_in_navbar: 1,
  children,
}))

const activeId = ref(1)
const activeCategory = computed(() => categories.find((c) => c.id === activeId.value) ?? categories[0]!)

const chevronIcon = computed(() =>
  t.value.dir === 'rtl' ? 'ri-arrow-left-s-line' : 'ri-arrow-right-s-line',
)
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-250 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="open"
      class="absolute top-full start-[155px] w-[824px] max-w-[calc(100vw-40px)] h-[720px] bg-white rounded-[10px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden z-50 grid grid-cols-[250px_1fr] text-[#091019]"
    >
      <!-- Root categories list -->
      <ul class="overflow-y-auto border-e border-gray-100 py-1">
        <li v-for="category in categories" :key="category.id">
          <button
            class="w-full flex items-center justify-between px-5 py-[7px] text-[14px] font-medium transition-colors"
            :class="activeId === category.id ? 'bg-[#F6F6F6]' : 'hover:bg-[#F6F6F6]'"
            @mouseenter="activeId = category.id"
            @click="activeId = category.id"
          >
            <span>{{ category.name[locale] }}</span>
            <i :class="chevronIcon" class="text-lg text-slate-500" />
          </button>
        </li>
      </ul>

      <!-- Subcategories -->
      <div class="overflow-y-auto p-6">
        <div class="grid grid-cols-5 gap-x-3 gap-y-6 justify-items-center">
          <NuxtLink
            v-for="child in activeCategory.children"
            :key="child.id"
            :to="localePath('/shop')"
            class="w-[92px] flex flex-col items-center group"
          >
            <span class="w-[92px] h-[92px] rounded-full overflow-hidden">
              <img
                :src="child.image"
                :alt="child.name[locale]"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </span>
            <span class="mt-2 text-center text-[12px] font-medium leading-snug">
              {{ child.name[locale] }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </Transition>
</template>
