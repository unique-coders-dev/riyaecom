<script setup lang="ts">
const { t, locale } = useLocale();

const activeTab = ref<"specs" | "reviews" | "shipping">("specs");
const openAccordion = ref<string | null>(null)
const toggleAccordion = (key: string) => {
  openAccordion.value = openAccordion.value === key ? null : key
}
const accordionChevron = computed(() => locale.value === 'ar' ? 'ri-arrow-left-s-line' : 'ri-arrow-right-s-line')

const tabs = computed(() => [
  { key: "specs" as const, label: t.value.product.tabSpecs },
  { key: "reviews" as const, label: t.value.product.tabReviews },
  { key: "shipping" as const, label: t.value.product.tabShipping },
]);

// Mock product content; will be API-driven (product desc/attributes)
const why = {
  title: { ar: "لماذا ستحبين هذا الفستان", en: "Why You'll Love This Dress" },
  paragraph: {
    ar: "تصميم تركي اصيل من أحدث تشكيلات Zuhre لعام 2025 . قماش ثقيل ناعم يمنحك الراحة والأناقة في ان واحد. مثالي لإطلالة العيد, مناسبات الخطوبة,والافراح. الطراز المطرز يدويا يجعل كل قطعة فريدة من نوعها",
    en: "An authentic Turkish design from Zuhre's latest 2025 collection. A soft heavy fabric that gives you comfort and elegance at once. Perfect for Eid looks, engagements and weddings. The hand-embroidered style makes every piece unique.",
  },
  bullets: [
    {
      ar: "قطن تركي بريميوم - 100% طبيعي",
      en: "Premium Turkish cotton - 100% natural",
    },
    { ar: "تطريزيدوي بخيوط فضية", en: "Hand embroidery with silver threads" },
    {
      ar: "قصة مريحة - مناسبة للمقاسات S الي L",
      en: "Comfortable cut - fits sizes S to L",
    },
    {
      ar: "ألوان ثابتة - مضمونة بعد الغسيل",
      en: "Colorfast - guaranteed after washing",
    },
    { ar: "تصميم حشمة كاملة", en: "Fully modest design" },
  ],
};

// Mock following the product attributes/specifications shape; will be API-driven
const specs = [
  {
    label: { ar: "المادة", en: "Material" },
    value: { ar: "قطن تركي 100%", en: "100% Turkish Cotton" },
  },
  {
    label: { ar: "الماركة", en: "Brand" },
    value: { ar: "تركيا - Zuhre", en: "Zuhre - Turkey" },
  },
  {
    label: { ar: "المقاسات", en: "Sizes" },
    value: { ar: "M . S . XS . (Xl نفذ)", en: "M . S . XS . (XL sold out)" },
  },
  {
    label: { ar: "الألوان المتوفرة", en: "Available Colors" },
    value: {
      ar: "بيج - أسود - كحلي - وردي - زيتوني",
      en: "Beige - Black - Navy - Pink - Olive",
    },
  },
  {
    label: { ar: "الطول", en: "Length" },
    value: { ar: "ماكسي - 140 سم", en: "Maxi - 140 cm" },
  },
  {
    label: { ar: "الكود", en: "Code" },
    value: { ar: "ZHR-3471", en: "ZHR-3471" },
  },
  {
    label: { ar: "الغسيل", en: "Washing" },
    value: { ar: "غسيل يدوي او بارد", en: "Hand wash or cold wash" },
  },
];

// Mock following the Product Reviews API shape (star_counts + reviews); will be API-driven
const starCounts: Record<number, number> = { 5: 192, 4: 28, 3: 9, 2: 4, 1: 1 };
const maxCount = Math.max(...Object.values(starCounts));

const reviews = [
  {
    id: 1,
    files: [
      "/images/detail2.png",
      "/images/detail3.png",
      "/images/detail4.png",
    ],
  },
  { id: 2, files: [] },
  { id: 3, files: ["/images/detail5.png"] },
].map((r) => ({
  ...r,
  name: { ar: "نورة العتيبي", en: "Noura Al-Otaibi" },
  location: { ar: "الرياض", en: "Riyadh" },
  rate: 5,
  date: { ar: "12 ابريل 2026", en: "April 12, 2026" },
  comment: {
    ar: "القماش ممتاز جدا وثيل بشكل يليق بالسعر الشحن وصل خلال يومين بالضبط الفستان أحلي من الصورة اشتريتة لحفل خطوبة وحصلت علي كثير من الاطراء",
    en: "The fabric is excellent and heavy in a way worthy of the price. Shipping arrived in exactly two days. The dress is prettier than the picture — I bought it for an engagement party and got lots of compliments.",
  },
  sizeNote: {
    ar: "اشترت مقاس: M طولها 165سم",
    en: "Bought size: M, height 165cm",
  },
}));

const shipping = [
  {
    icon: "ri-truck-line",
    text: {
      ar: "توصيل سريع خلال 2-3 أيام عمل لجميع مدن المملكة",
      en: "Fast delivery within 2-3 working days to all cities in the Kingdom",
    },
  },
  {
    icon: "ri-refresh-line",
    text: {
      ar: "إرجاع مجاني خلال 14 يوم من تاريخ الاستلام",
      en: "Free returns within 14 days of receipt",
    },
  },
  {
    icon: "ri-money-dollar-box-line",
    text: {
      ar: "الدفع عند الاستلام متاح في كل أنحاء المملكة",
      en: "Cash on delivery available across the Kingdom",
    },
  },
];
</script>

<template>
  <section class="mt-6 lg:mt-12">

    <!-- ── DESKTOP: Tab bar + panels ── -->
    <div class="hidden lg:block">
      <div class="flex items-center gap-8 border-b border-gray-100">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="pb-3 text-[14px] transition-colors"
          :class="activeTab === tab.key ? 'font-bold text-[#091019] border-b-2 border-[#091019] -mb-px' : 'text-[#64768C] hover:text-[#091019]'"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Specs -->
      <div v-if="activeTab === 'specs'" class="mt-6 grid gap-8 lg:grid-cols-2 items-start">
        <div>
          <h3 class="m-0 text-[16px] font-bold text-[#091019]">{{ why.title[locale] }}</h3>
          <p class="m-0 mt-3 text-[13px] leading-relaxed text-[#768495]">{{ why.paragraph[locale] }}</p>
          <ul class="mt-4 flex flex-col gap-2">
            <li v-for="(bullet, i) in why.bullets" :key="i" class="text-[13px] text-[#768495]">• {{ bullet[locale] }}</li>
          </ul>
        </div>
        <div class="rounded-[24px] overflow-hidden h-[335px] flex flex-col">
          <div v-for="(spec, i) in specs" :key="i" class="flex-1 flex" :class="i < specs.length - 1 ? 'border-b border-[#E8E8E8]' : ''">
            <div class="w-[150px] shrink-0 bg-[#EFEFEF] flex items-center px-5 text-[13px] text-[#091019]">{{ spec.label[locale] }}</div>
            <div class="flex-1 bg-[#F9F9F9] flex items-center px-4 text-[13px] text-[#091019]">{{ spec.value[locale] }}</div>
          </div>
        </div>
      </div>

      <!-- Reviews -->
      <div v-else-if="activeTab === 'reviews'" class="mt-6">
        <h3 class="m-0 text-[15px] font-bold text-[#091019]">{{ t.product.customerReviews }}</h3>
        <div class="mt-4 flex items-start gap-5">
          <div class="shrink-0 bg-[#F6F6F6] rounded-[10px] px-4 py-3 text-center">
            <p class="m-0 text-[18px] font-bold text-[#091019]" dir="ltr">4.8</p>
            <div class="mt-1 flex items-center justify-center text-[#C1B41C] text-[12px]">
              <i v-for="n in 5" :key="n" class="ri-star-fill" />
            </div>
            <p class="m-0 mt-1 text-[11px] text-[#64768C]">{{ t.product.ofReviews }}</p>
          </div>
          <div class="flex-1 flex flex-col gap-2.5 pt-1">
            <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center gap-3">
              <span class="flex items-center gap-1 w-8 shrink-0 text-[12px] text-[#091019]">
                <i class="ri-star-fill text-[#C1B41C]" />{{ star }}
              </span>
              <div class="flex-1 h-[5px] rounded-full bg-[#EFEFEF] relative overflow-hidden">
                <div class="absolute inset-y-0 start-0 rounded-full bg-[#C1B41C]" :style="{ width: `${((starCounts[star] ?? 0) / maxCount) * 100}%` }" />
              </div>
              <span class="w-8 shrink-0 text-[12px] text-[#091019]" dir="ltr">{{ starCounts[star] ?? 0 }}</span>
            </div>
          </div>
        </div>
        <div class="mt-5 flex flex-col gap-4">
          <div v-for="review in reviews" :key="review.id" class="bg-[#F9F9F9] rounded-[16px] p-5">
            <div class="flex items-start justify-between gap-3 flex-wrap">
              <div class="flex items-start gap-3">
                <span class="w-9 h-9 rounded-full bg-white text-[#091019] text-[13px] flex items-center justify-center shrink-0">{{ review.name[locale].charAt(0) }}</span>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-[13px] font-bold text-[#091019]">{{ review.name[locale] }}</span>
                    <span class="flex items-center text-[#C1B41C] text-[12px]"><i v-for="n in review.rate" :key="n" class="ri-star-fill" /></span>
                  </div>
                  <p class="m-0 mt-0.5 text-[11px] text-[#64768C]">{{ review.location[locale] }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 text-[12px]">
                <span class="flex items-center gap-1 text-[#32B828] font-semibold"><i class="ri-check-line" />{{ t.product.verifiedBuyer }}</span>
                <span class="text-[#091019] font-semibold">{{ review.date[locale] }}</span>
              </div>
            </div>
            <p class="m-0 mt-3 text-[13px] text-[#091019] leading-relaxed">{{ review.comment[locale] }}</p>
            <div v-if="review.files.length" class="mt-3 flex items-center gap-3">
              <img v-for="file in review.files" :key="file" :src="file" alt="Review" class="w-[64px] h-[78px] rounded-[8px] object-cover bg-white" loading="lazy" />
            </div>
            <p class="m-0 mt-3 text-[11px] text-[#64768C]">{{ review.sizeNote[locale] }}</p>
          </div>
        </div>
        <div class="mt-5 flex justify-center">
          <button class="border border-navbar text-navbar text-[13px] font-semibold px-5 py-2 rounded-[8px] hover:bg-navbar/5 transition-colors">{{ t.product.viewAllReviews }}</button>
        </div>
      </div>

      <!-- Shipping -->
      <div v-else class="mt-6 flex flex-col gap-3">
        <div v-for="item in shipping" :key="item.icon" class="flex items-center gap-3 bg-[#F6F6F6] border border-[#E8E8E8] rounded-[16px] px-5 py-4">
          <i :class="item.icon" class="text-xl text-[#00AE34] shrink-0" />
          <p class="m-0 text-[13px] text-[#091019]">{{ item.text[locale] }}</p>
        </div>
      </div>
    </div>

    <!-- ── MOBILE: Accordion ── -->
    <div class="lg:hidden border-t border-[#E8E8E8]">
      <div v-for="tab in tabs" :key="tab.key" class="border-b border-[#E8E8E8]">
        <!-- Accordion header -->
        <button
          class="w-full flex items-center justify-between px-1 py-4 text-[14px] font-medium text-[#091019]"
          @click="toggleAccordion(tab.key)"
        >
          <span>{{ tab.label }}</span>
          <i
            class="text-xl text-[#091019] transition-transform duration-200"
            :class="[openAccordion === tab.key ? 'ri-arrow-down-s-line' : accordionChevron]"
          />
        </button>

        <!-- Accordion body -->
        <div v-if="openAccordion === tab.key" class="pb-5">

          <!-- Specs content -->
          <template v-if="tab.key === 'specs'">
            <div class="rounded-[16px] overflow-hidden flex flex-col border border-[#E8E8E8]">
              <div v-for="(spec, i) in specs" :key="i" class="flex" :class="i < specs.length - 1 ? 'border-b border-[#E8E8E8]' : ''">
                <div class="w-[120px] shrink-0 bg-[#EFEFEF] flex items-center px-4 py-2.5 text-[12px] text-[#091019]">{{ spec.label[locale] }}</div>
                <div class="flex-1 bg-[#F9F9F9] flex items-center px-3 py-2.5 text-[12px] text-[#091019]">{{ spec.value[locale] }}</div>
              </div>
            </div>
          </template>

          <!-- Reviews content -->
          <template v-else-if="tab.key === 'reviews'">
            <div class="flex items-start gap-4">
              <div class="shrink-0 bg-[#F6F6F6] rounded-[10px] px-3 py-2.5 text-center">
                <p class="m-0 text-[17px] font-bold text-[#091019]" dir="ltr">4.8</p>
                <div class="mt-1 flex items-center justify-center text-[#C1B41C] text-[11px]"><i v-for="n in 5" :key="n" class="ri-star-fill" /></div>
                <p class="m-0 mt-1 text-[10px] text-[#64768C]">{{ t.product.ofReviews }}</p>
              </div>
              <div class="flex-1 flex flex-col gap-2 pt-1">
                <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center gap-2">
                  <span class="flex items-center gap-0.5 w-7 shrink-0 text-[11px] text-[#091019]">
                    <i class="ri-star-fill text-[#C1B41C] text-[10px]" />{{ star }}
                  </span>
                  <div class="flex-1 h-[4px] rounded-full bg-[#EFEFEF] relative overflow-hidden">
                    <div class="absolute inset-y-0 start-0 rounded-full bg-[#C1B41C]" :style="{ width: `${((starCounts[star] ?? 0) / maxCount) * 100}%` }" />
                  </div>
                  <span class="w-7 shrink-0 text-[11px] text-[#091019]" dir="ltr">{{ starCounts[star] ?? 0 }}</span>
                </div>
              </div>
            </div>
            <div class="mt-4 flex flex-col gap-3">
              <div v-for="review in reviews" :key="review.id" class="bg-[#F9F9F9] rounded-[12px] p-3.5">
                <div class="flex items-start justify-between gap-2 flex-wrap">
                  <div class="flex items-start gap-2.5">
                    <span class="w-8 h-8 rounded-full bg-white text-[#091019] text-[12px] flex items-center justify-center shrink-0">{{ review.name[locale].charAt(0) }}</span>
                    <div>
                      <div class="flex items-center gap-1.5">
                        <span class="text-[12px] font-bold text-[#091019]">{{ review.name[locale] }}</span>
                        <span class="flex items-center text-[#C1B41C] text-[10px]"><i v-for="n in review.rate" :key="n" class="ri-star-fill" /></span>
                      </div>
                      <p class="m-0 mt-0.5 text-[10px] text-[#64768C]">{{ review.location[locale] }}</p>
                    </div>
                  </div>
                  <span class="text-[10px] font-semibold text-[#091019]">{{ review.date[locale] }}</span>
                </div>
                <p class="m-0 mt-2.5 text-[12px] text-[#091019] leading-relaxed">{{ review.comment[locale] }}</p>
                <div v-if="review.files.length" class="mt-2.5 flex items-center gap-2">
                  <img v-for="file in review.files" :key="file" :src="file" alt="Review" class="w-[56px] h-[68px] rounded-[6px] object-cover" loading="lazy" />
                </div>
                <p class="m-0 mt-2 text-[10px] text-[#64768C]">{{ review.sizeNote[locale] }}</p>
              </div>
            </div>
            <div class="mt-4 flex justify-center">
              <button class="border border-navbar text-navbar text-[12px] font-semibold px-4 py-2 rounded-[8px]">{{ t.product.viewAllReviews }}</button>
            </div>
          </template>

          <!-- Shipping content -->
          <template v-else>
            <div class="flex flex-col gap-2.5">
              <div v-for="item in shipping" :key="item.icon" class="flex items-center gap-3 bg-[#F6F6F6] border border-[#E8E8E8] rounded-[12px] px-4 py-3">
                <i :class="item.icon" class="text-lg text-[#00AE34] shrink-0" />
                <p class="m-0 text-[12px] text-[#091019]">{{ item.text[locale] }}</p>
              </div>
            </div>
          </template>

        </div>
      </div>
    </div>

  </section>
</template>
