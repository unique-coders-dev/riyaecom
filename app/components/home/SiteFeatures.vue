<script setup lang="ts">
const { locale } = useLocale();

// Mock following the Home Site Features API shape (HomeSiteFeature); will be API-driven
const features = [
  {
    id: 1,
    name: { en: "Fast & Free Shipping", ar: "شحن سريع ومجاني" },
    description: {
      en: "Within Riyadh, Jeddah and Dammam",
      ar: "داخل مدينة الرياض وجدة والدمام",
    },
    icon: "ri-truck-line",
    sort_order: 1,
    placement: "home",
  },
  {
    id: 2,
    name: { en: "Return & Exchange", ar: "استرجاع واستبدال" },
    description: {
      en: "Return within 3 days, exchange within 7 days",
      ar: "استرجاع خلال 3 ايام واستبدال خلال 7 ايام",
    },
    icon: "ri-refresh-line",
    sort_order: 2,
    placement: "home",
  },
  {
    id: 3,
    name: { en: "Two-Year Agent Warranty", ar: "ضمان سنتين من  الوكيل" },
    description: { en: "On all store products", ar: "علي جميع منتجات المتجر" },
    icon: "ri-medal-line",
    sort_order: 3,
    placement: "home",
  },
  {
    id: 4,
    name: { en: "Secure E-Payment", ar: "دفع الكتروني امن" },
    description: {
      en: "Visa - Mastercard - Apple Pay - Mada",
      ar: "فيزا - ماستر كارد - ابل باي - مدي",
    },
    icon: "ri-bank-card-line",
    sort_order: 4,
    placement: "home",
  },
];

const homeFeatures = computed(() =>
  features
    .filter((f) => f.placement === "home")
    .sort((a, b) => a.sort_order - b.sort_order),
);
</script>

<template>
  <section>
    <!-- Mobile: auto-scrolling marquee under the banner -->
    <div
      class="lg:hidden mx-4 bg-white rounded-b-[12px] shadow-[0px_4px_20px_0px_#64646426] overflow-hidden py-4"
    >
      <div class="features-marquee flex items-center">
        <div
          v-for="feature in homeFeatures"
          :key="feature.id"
          class="shrink-0 pe-10"
        >
          <div class="flex items-center gap-2">
            <i
              :class="feature.icon"
              class="text-[20px] text-[#00AE34] shrink-0 leading-none"
            />
            <div>
              <p class="m-0 text-[12px] font-bold text-slate-900 whitespace-nowrap">
                {{ feature.name[locale] }}
              </p>
              <p class="m-0 mt-0.5 text-[11px] text-gray-500 whitespace-nowrap">
                {{ feature.description?.[locale] }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop -->
    <div class="hidden lg:block bg-white shadow-[0px_4px_20px_0px_#64646426]">
      <div class="max-w-[1536px] mx-auto grid grid-cols-4">
        <div
          v-for="feature in homeFeatures"
          :key="feature.id"
          class="flex items-center justify-center px-6 py-5 border-e last:border-e-0 border-gray-100"
        >
          <div class="flex items-center gap-2.5">
            <i
              :class="feature.icon"
              class="text-[22px] text-[#00AE34] shrink-0 leading-none"
            />
            <div class="min-w-0">
              <p class="m-0 text-[13px] font-bold text-slate-900">
                {{ feature.name[locale] }}
              </p>
              <p class="m-0 mt-1 text-[12px] text-gray-500">
                {{ feature.description?.[locale] }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
