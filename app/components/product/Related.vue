<script setup lang="ts">
const { t } = useLocale()

const currency = { id: 1, name: 'SAR', prefix: 'ر.س', exchange_rate: 1, delivery_days: null }
const brand = { id: 1, name: { en: 'Tozlu', ar: 'توزلو' }, translated_name: 'توزلو', image: null }

// Mock following the related_products / ProductCard API shape; will be API-driven
const products = Array.from({ length: 20 }, (_, i) => {
  const img = (i % 20) + 1
  return {
    id: i + 1,
    name_en: 'Sway casual hooded T-shirt with burn print for men',
    name_ar: 'سوي تيشيرت كاجول بغطاء رأس ونقشة حروق للرجال',
    name_tr: null,
    slug: `related-product-${i + 1}`,
    image: `/images/p${img}.${[8, 10].includes(img) ? 'gif' : 'png'}`,
    old_price: '95.00',
    final_selling_price: 200,
    discount_percentage: 30,
    brand,
    currency,
    extra_colors: 2,
  }
})
</script>

<template>
  <section class="mt-12">
    <h2 class="m-0 mb-5 ps-3 lg:ps-5 text-[18px] lg:text-[20px] font-bold text-[#091019]">
      {{ t.product.relatedProducts }}
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 lg:gap-x-4 gap-y-6 justify-items-center">
      <ProductCard v-for="product in products" :key="product.id" :product="product" class="!w-full max-w-[185px] lg:max-w-[280px]" />
    </div>

    <div class="mt-8 flex justify-center">
      <button class="flex items-center gap-2 text-[14px] font-semibold text-[#091019] hover:text-navbar transition-colors">
        {{ t.product.showMore }}
        <i class="ri-arrow-down-s-line text-lg" />
      </button>
    </div>
  </section>
</template>
