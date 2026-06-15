<script setup lang="ts">
const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ close: [] }>();

const { t, locale, localePath } = useLocale();

// Mock following the Navbar Categories API shape; will be API-driven
const categories = [
  {
    label: { ar: "سترات ومعاطف", en: "Jackets & Coats" },
    image: "/images/m1.png",
  },
  { label: { ar: "ملابس محتشمة", en: "Modest Wear" }, image: "/images/m2.png" },
  { label: { ar: "أوشحة", en: "Scarves" }, image: "/images/m4.png" },
  { label: { ar: "حقائب", en: "Bags" }, image: "/images/p16.png" },
  { label: { ar: "تيشيرتات", en: "T-Shirts" }, image: "/images/m6.png" },
  { label: { ar: "قمصان", en: "Shirts" }, image: "/images/m7.png" },
  {
    label: { ar: "سترات ومعاطف", en: "Jackets & Coats" },
    image: "/images/p18.png",
  },
  { label: { ar: "ملابس محتشمة", en: "Modest Wear" }, image: "/images/p3.png" },
  { label: { ar: "أوشحة", en: "Scarves" }, image: "/images/p11.png" },
  { label: { ar: "جينز", en: "Jeans" }, image: "/images/p12.png" },
  { label: { ar: "إكسسوارات", en: "Accessories" }, image: "/images/p15.png" },
  { label: { ar: "ملابس سباحة", en: "Swimwear" }, image: "/images/p9.png" },
  { label: { ar: "أطقم", en: "Sets" }, image: "/images/p6.png" },
].map((c, i) => ({ ...c, id: i + 1 }));

const genderFilters = computed(() => [
  { key: 'women', label: locale.value === 'ar' ? 'النساء' : 'Women' },
  { key: 'men',   label: locale.value === 'ar' ? 'الرجال' : 'Men'   },
  { key: 'kids',  label: locale.value === 'ar' ? 'الأطفال' : 'Kids'  },
])

const selectedGender = ref('women')
const isFilterOpen = ref(false)

const selectedLabel = computed(() => genderFilters.value.find(g => g.key === selectedGender.value)?.label ?? '')

watch(
  () => props.open,
  (open) => {
    if (!open) isFilterOpen.value = false
    if (import.meta.client) document.body.style.overflow = open ? "hidden" : "";
  },
);
</script>

<template>
  <Teleport to="body">
    <!-- Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 bg-black/40 z-[200] lg:hidden"
        @click="emit('close')"
      />
    </Transition>

    <!-- Panel (slides from inline-start) -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="rtl:-translate-x-full ltr:translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-250 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="rtl:-translate-x-full ltr:translate-x-full"
    >
      <aside
        v-if="open"
        class="fixed inset-y-0 end-0 w-[280px] bg-[#E8E8E8] z-[210] overflow-y-auto p-4 lg:hidden"
        :dir="t.dir"
      >
        <!-- Header -->
        <div class="flex items-center justify-between">
          <img src="/images/brandLogo2.png" alt="RIYA" class="h-6 w-auto" />
          <button
            class="text-[#091019] hover:opacity-70 transition-opacity"
            aria-label="Close"
            @click="emit('close')"
          >
            <i class="ri-close-line text-2xl" />
          </button>
        </div>

        <!-- All sections + filter -->
        <div class="mt-4 flex items-center justify-between gap-2">
          <span class="text-[13px] font-bold text-[#091019]">{{
            t.navbar.allSections
          }}</span>

          <!-- Filter dropdown trigger -->
          <div class="relative">
            <button
              class="bg-white rounded-[8px] px-3 py-1.5 text-[12px] font-semibold text-[#091019] flex items-center gap-1"
              @click="isFilterOpen = !isFilterOpen"
            >
              {{ selectedLabel }}
              <i
                class="ri-arrow-down-s-line text-base transition-transform duration-200"
                :class="isFilterOpen ? 'rotate-180' : ''"
              />
            </button>

            <!-- Dropdown -->
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div
                v-if="isFilterOpen"
                class="absolute top-[calc(100%+6px)] end-0 w-[160px] bg-white rounded-[12px] border border-[#E8E8E8] shadow-[0_8px_24px_rgba(0,0,0,0.10)] overflow-hidden z-[10]"
              >
                <!-- Backdrop to close -->
                <div class="fixed inset-0 z-[-1]" @click="isFilterOpen = false" />

                <ul>
                  <li
                    v-for="(filter, i) in genderFilters"
                    :key="filter.key"
                  >
                    <button
                      class="w-full flex items-center justify-between px-4 py-3.5 text-[14px] font-bold text-[#091019]"
                      :class="i < genderFilters.length - 1 ? 'border-b border-[#E8E8E8]' : ''"
                      @click="selectedGender = filter.key; isFilterOpen = false"
                    >
                      <span :class="t.dir === 'rtl' ? 'text-right w-full' : 'text-left w-full'">{{ filter.label }}</span>
                      <i
                        v-if="selectedGender === filter.key"
                        class="ri-arrow-down-s-line text-lg shrink-0"
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Categories -->
        <ul class="mt-4 flex flex-col gap-3">
          <li v-for="category in categories" :key="category.id">
            <NuxtLink
              :to="localePath('/shop')"
              class="flex items-center gap-2.5"
              @click="emit('close')"
            >
              <img
                :src="category.image"
                :alt="category.label[locale]"
                class="w-11 h-11 rounded-[8px] object-cover shrink-0 bg-white"
              />
              <span
                class="rounded-[8px] px-3 py-1.5 text-[12px] font-semibold text-[#091019]"
              >
                {{ category.label[locale] }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </aside>
    </Transition>
  </Teleport>
</template>
