<script setup lang="ts">
export type ProductCardData = {
  id: number
  name_en: string | null
  name_ar: string | null
  name_tr?: string | null
  slug: string
  image: string | null
  old_price: string | number | null
  final_selling_price: number
  discount_percentage: number | null
  brand: { id: number; name: { en: string; ar: string }; translated_name?: string; image?: string | null } | null
  currency?: { prefix: string } | null
  extra_colors?: number
}

const props = defineProps<{ product: ProductCardData }>()

const { locale, localePath } = useLocale()

const name = computed(() => {
  const p = props.product
  const current = locale.value === 'ar' ? p.name_ar : p.name_en
  return current ?? p.name_en ?? p.name_ar ?? p.name_tr ?? ''
})

const brandName = computed(() => props.product.brand?.name?.[locale.value] ?? props.product.brand?.translated_name ?? '')
</script>

<template>
  <NuxtLink :to="localePath(`/product/${product.slug}`)" class="block w-[170px] lg:w-[240px] border border-[#E8E8E8] group">
    <!-- Image -->
    <div class="relative h-[185px] lg:h-[290px] overflow-hidden bg-gray-100">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />

      <!-- Wishlist -->
      <button
        class="absolute top-2.5 end-2.5 w-8 h-8 rounded-full bg-white shadow-[0px_0px_10px_0px_#0000001A] flex items-center justify-center text-[#020514] hover:text-red-500 transition-colors"
        aria-label="Wishlist"
        @click.prevent
      >
        <i class="ri-heart-line text-base" />
      </button>

      <!-- Discount badge -->
      <span v-if="product.discount_percentage" class="absolute bottom-2.5 start-2.5">
        <span dir="ltr" class="h-[26px] flex items-center gap-1 bg-navbar text-white text-[12px] font-semibold ps-2.5 pe-1.5 rounded-[24px]">
          {{ product.discount_percentage }}%
          <i class="ri-discount-percent-line text-[15px]" />
        </span>
      </span>

      <!-- Extra colors -->
      <span v-if="product.extra_colors" class="absolute bottom-2.5 end-2.5">
        <span dir="ltr" class="flex items-center gap-1.5">
          <span class="text-[12px] font-semibold text-[#091019]">+{{ product.extra_colors }}</span>
          <span
            class="w-[22px] h-[22px] rounded-full"
            style="background: linear-gradient(270deg, #FFAAEA 0%, #A7DAFF 50%, #FFDFDF 100%)"
          />
        </span>
      </span>
    </div>

    <!-- Info -->
    <div class="px-3 pb-3">
      <p class="m-0 mt-2.5 text-[12px] text-gray-400">{{ brandName }}</p>
      <p class="m-0 mt-0.5 text-[12px] lg:text-[13.5px] font-medium text-[#091019] leading-snug line-clamp-2 min-h-[34px] lg:min-h-[37px]">
        {{ name }}
      </p>
      <div class="mt-1.5 flex justify-end">
        <span dir="ltr" class="flex items-center gap-2">
          <span class="text-[15px] font-bold text-navbar inline-flex items-center gap-1">
            <UiRiyalSymbol /> {{ product.final_selling_price }}
          </span>
          <span v-if="product.old_price" class="text-[12px] text-[#6F7B8B] line-through inline-flex items-center gap-0.5">
            <UiRiyalSymbol /> {{ product.old_price }}
          </span>
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
