<script setup lang="ts">
const { t, locale } = useLocale()

// Mocks following the Shop Filters API shape (ShopFiltersResponse: categories, brands, colors, sizes); will be API-driven
const categories = [
  { id: 1, name: { en: 'Women', ar: 'نسائي' } },
  { id: 2, name: { en: 'Men', ar: 'رجالي' } },
  { id: 3, name: { en: 'Hajj & Umrah Supplies', ar: 'مستلزمات الحج والعمرة' } },
  { id: 4, name: { en: 'Home & Kitchen', ar: 'المنزل والمطبخ' } },
  { id: 5, name: { en: 'Electronics', ar: 'الكترونيات' } },
  { id: 6, name: { en: 'Bedding & Bath', ar: 'مفارش السرير والحمام' } },
  { id: 7, name: { en: 'Glasses', ar: 'نظارات' } },
]

const brands = [
  { id: 1, name: { en: 'Beige Dart', ar: 'بيج دارت' } },
  { id: 2, name: { en: 'Hazelin', ar: 'هازلين' } },
  { id: 3, name: { en: 'Modayakamoz', ar: 'موداياكاموز' } },
  { id: 4, name: { en: 'Modaybari', ar: 'مودايبري' } },
  { id: 5, name: { en: 'Tozlu', ar: 'توزلو' } },
  { id: 6, name: { en: 'Gavinor', ar: 'قافينور' } },
]

const colors = [
  { id: 1, name: { en: 'Red', ar: 'أحمر' }, color_code: '#DD3333' },
  { id: 2, name: { en: 'Blue', ar: 'أزرق' }, color_code: '#2D72E0' },
  { id: 3, name: { en: 'Gray', ar: 'رمادي' }, color_code: '#8A93A6' },
  { id: 4, name: { en: 'Green', ar: 'أخضر' }, color_code: '#2DB22D' },
  { id: 5, name: { en: 'Black', ar: 'أسود' }, color_code: '#0A0A0A' },
  { id: 6, name: { en: 'Beige', ar: 'بيج' }, color_code: '#C8AD7F' },
  { id: 7, name: { en: 'White', ar: 'أبيض' }, color_code: '#FFFFFF' },
  { id: 8, name: { en: 'Yellow', ar: 'أصفر' }, color_code: '#E7C700' },
  { id: 9, name: { en: 'Cream', ar: 'كريمي' }, color_code: '#EFE3C8' },
  { id: 10, name: { en: 'Navy', ar: 'كحلي' }, color_code: '#2B3A55' },
  { id: 11, name: { en: 'Khaki', ar: 'كاكي' }, color_code: '#D8C9A3' },
  { id: 12, name: { en: 'Fuchsia', ar: 'فوشيا' }, color_code: '#D633C5' },
]

const sizes = [
  { id: 1, name: 'S' },
  { id: 2, name: 'M' },
  { id: 3, name: 'L' },
  { id: 4, name: 'XL' },
  { id: 5, name: 'XXL' },
  { id: 6, name: 'XXXL' },
]

const selectedCategories = ref<number[]>([])
const selectedBrands = ref<number[]>([])
const selectedColors = ref<number[]>([])
const selectedSizes = ref<number[]>([])
const stock = ref<'in' | 'out' | null>(null)
const discount = ref(100)
const price = ref(1000)
const categorySearch = ref('')
const brandSearch = ref('')

const sections = reactive<Record<string, boolean>>({
  category: true,
  brands: true,
  colors: true,
  sizes: true,
  discount: true,
  stock: true,
  price: true,
})

const toggleColor = (id: number) => {
  selectedColors.value = selectedColors.value.includes(id)
    ? selectedColors.value.filter((c) => c !== id)
    : [...selectedColors.value, id]
}
</script>

<template>
  <aside class="bg-white border border-gray-100 rounded-[10px] shadow-[0px_4px_20px_0px_#6464640D] p-4 lg:sticky lg:top-[100px] lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
    <h3 class="m-0 text-[15px] font-bold text-[#091019]">{{ t.shop.filter }}</h3>

    <!-- Category -->
    <div class="mt-4">
      <button class="w-full flex items-center justify-between bg-[#F6F6F6] rounded-[8px] px-3 py-2" @click="sections.category = !sections.category">
        <span class="text-[13px] font-bold text-[#091019]">{{ t.shop.category }}</span>
        <i :class="sections.category ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'" class="text-lg text-slate-600" />
      </button>
      <div v-if="sections.category" class="mt-2">
        <div class="flex items-center gap-2 bg-[#F6F6F6] rounded-[8px] px-3 h-9 text-gray-400">
          <i class="ri-search-line text-base shrink-0" />
          <input v-model="categorySearch" type="text" :placeholder="t.shop.searchCategory" class="flex-1 min-w-0 bg-transparent border-0 text-[12px] text-gray-700 placeholder:text-gray-400" />
        </div>
        <label v-for="category in categories" :key="category.id" class="flex items-center justify-between px-1 py-2 cursor-pointer">
          <span class="text-[13px] text-[#091019]">{{ category.name[locale] }}</span>
          <input v-model="selectedCategories" type="checkbox" :value="category.id" class="w-4 h-4 accent-navbar" />
        </label>
      </div>
    </div>

    <!-- Brands -->
    <div class="mt-4">
      <button class="w-full flex items-center justify-between bg-[#F6F6F6] rounded-[8px] px-3 py-2" @click="sections.brands = !sections.brands">
        <span class="text-[13px] font-bold text-[#091019]">{{ t.shop.brands }}</span>
        <i :class="sections.brands ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'" class="text-lg text-slate-600" />
      </button>
      <div v-if="sections.brands" class="mt-2">
        <div class="flex items-center gap-2 bg-[#F6F6F6] rounded-[8px] px-3 h-9 text-gray-400">
          <i class="ri-search-line text-base shrink-0" />
          <input v-model="brandSearch" type="text" :placeholder="t.shop.searchBrand" class="flex-1 min-w-0 bg-transparent border-0 text-[12px] text-gray-700 placeholder:text-gray-400" />
        </div>
        <label v-for="brand in brands" :key="brand.id" class="flex items-center justify-between px-1 py-2 cursor-pointer">
          <span class="text-[13px] text-[#091019]">{{ brand.name[locale] }}</span>
          <input v-model="selectedBrands" type="checkbox" :value="brand.id" class="w-4 h-4 accent-navbar" />
        </label>
      </div>
    </div>

    <!-- Colors -->
    <div class="mt-4">
      <button class="w-full flex items-center justify-between bg-[#F6F6F6] rounded-[8px] px-3 py-2" @click="sections.colors = !sections.colors">
        <span class="text-[13px] font-bold text-[#091019]">{{ t.shop.colors }}</span>
        <i :class="sections.colors ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'" class="text-lg text-slate-600" />
      </button>
      <div v-if="sections.colors" class="mt-3 grid grid-cols-6 gap-x-1 gap-y-3">
        <button v-for="color in colors" :key="color.id" class="flex flex-col items-center gap-1" @click="toggleColor(color.id)">
          <span
            class="w-6 h-6 rounded-full border"
            :class="selectedColors.includes(color.id) ? 'ring-2 ring-navbar ring-offset-1 border-transparent' : 'border-gray-200'"
            :style="{ background: color.color_code }"
          />
          <span class="text-[10px] text-[#091019]">{{ color.name[locale] }}</span>
        </button>
      </div>
    </div>

    <!-- Sizes -->
    <div class="mt-4">
      <button class="w-full flex items-center justify-between bg-[#F6F6F6] rounded-[8px] px-3 py-2" @click="sections.sizes = !sections.sizes">
        <span class="text-[13px] font-bold text-[#091019]">{{ t.shop.sizes }}</span>
        <i :class="sections.sizes ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'" class="text-lg text-slate-600" />
      </button>
      <div v-if="sections.sizes" class="mt-2">
        <label v-for="size in sizes" :key="size.id" class="flex items-center justify-between px-1 py-2 cursor-pointer">
          <span class="text-[13px] text-[#091019]" dir="ltr">{{ size.name }}</span>
          <input v-model="selectedSizes" type="checkbox" :value="size.id" class="w-4 h-4 accent-navbar" />
        </label>
      </div>
    </div>

    <!-- Discount -->
    <div class="mt-4">
      <button class="w-full flex items-center justify-between bg-[#F6F6F6] rounded-[8px] px-3 py-2" @click="sections.discount = !sections.discount">
        <span class="text-[13px] font-bold text-[#091019]">{{ t.shop.discount }}</span>
        <i :class="sections.discount ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'" class="text-lg text-slate-600" />
      </button>
      <div v-if="sections.discount" class="mt-3">
        <p class="m-0 text-center text-[12px] text-[#091019]" dir="ltr">0% 100%</p>
        <input v-model="discount" type="range" min="0" max="100" class="w-full range-green mt-1" />
        <button class="mt-3 w-full h-9 rounded-[8px] bg-navbar text-white text-[12px] font-semibold hover:opacity-95 transition-opacity">
          {{ t.shop.clickHere }}
        </button>
      </div>
    </div>

    <!-- Stock -->
    <div class="mt-4">
      <button class="w-full flex items-center justify-between bg-[#F6F6F6] rounded-[8px] px-3 py-2" @click="sections.stock = !sections.stock">
        <span class="text-[13px] font-bold text-[#091019]">{{ t.shop.stock }}</span>
        <i :class="sections.stock ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'" class="text-lg text-slate-600" />
      </button>
      <div v-if="sections.stock" class="mt-2">
        <label class="flex items-center justify-between px-1 py-2 cursor-pointer">
          <span class="text-[13px] text-[#091019]">{{ t.shop.inStock }}</span>
          <input v-model="stock" type="radio" value="in" name="stock" class="w-4 h-4 accent-navbar" />
        </label>
        <label class="flex items-center justify-between px-1 py-2 cursor-pointer">
          <span class="text-[13px] text-[#091019]">{{ t.shop.outOfStock }}</span>
          <input v-model="stock" type="radio" value="out" name="stock" class="w-4 h-4 accent-navbar" />
        </label>
      </div>
    </div>

    <!-- Price -->
    <div class="mt-4">
      <button class="w-full flex items-center justify-between bg-[#F6F6F6] rounded-[8px] px-3 py-2" @click="sections.price = !sections.price">
        <span class="text-[13px] font-bold text-[#091019]">{{ t.shop.price }}</span>
        <i :class="sections.price ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'" class="text-lg text-slate-600" />
      </button>
      <div v-if="sections.price" class="mt-3">
        <p class="m-0 text-center text-[12px] text-[#091019]" dir="ltr">{{ price }}</p>
        <input v-model="price" type="range" min="0" max="1000" class="w-full range-green mt-1" />
        <button class="mt-3 w-full h-9 rounded-[8px] bg-navbar text-white text-[12px] font-semibold hover:opacity-95 transition-opacity">
          {{ t.shop.go }}
        </button>
      </div>
    </div>
  </aside>
</template>
