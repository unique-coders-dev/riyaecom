<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import emblaCarouselVue from "embla-carousel-vue";

const { t, locale } = useLocale();

type VendorTab = 'home' | 'all-products' | 'special-offers';
const activeTab = ref<VendorTab | null>(null);

const tabs = computed(() => {
  const t = [
    { key: 'home' as VendorTab, label: locale.value === 'ar' ? 'الرئيسية' : 'Home' },
    { key: 'all-products' as VendorTab, label: locale.value === 'ar' ? 'جميع المنتجات' : 'All Products' },
    { key: 'special-offers' as VendorTab, label: locale.value === 'ar' ? 'العروض الخاصة' : 'Special Offers' },
  ];
  return locale.value === 'ar' ? t : t.reverse();
});

const showSellerProfile = () => {
  activeTab.value = null;
};

const [emblaRef, emblaApi] = emblaCarouselVue({
  align: "start",
  direction: locale.value === "ar" ? "rtl" : "ltr",
  dragFree: true,
  containScroll: "trimSnaps",
});

const canScrollPrev = ref(false);
const canScrollNext = ref(true);

const updateScrollState = () => {
  if (!emblaApi.value) return;
  canScrollPrev.value = emblaApi.value.canScrollPrev();
  canScrollNext.value = emblaApi.value.canScrollNext();
};

const scrollPrev = () => emblaApi.value?.scrollPrev();
const scrollNext = () => emblaApi.value?.scrollNext();

watch(emblaApi, (api) => {
  if (!api) return;
  updateScrollState();
  api.on("select", updateScrollState);
  api.on("reInit", updateScrollState);
});

onBeforeUnmount(() => {
  emblaApi.value?.off("select", updateScrollState);
  emblaApi.value?.off("reInit", updateScrollState);
});
</script>

<template>
  <div class="bg-white min-h-[60vh] pb-12">
    <!-- Banner Section -->
    <div
      class="relative w-full lg:h-[180px] bg-cover bg-center overflow-hidden"
      style="background-image: url(&quot;/images/vendorBanner.png&quot;)"
    >
      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-[#00000033]"></div>

      <!-- Blur effects left & right -->
      <div
        class="absolute inset-y-0 start-0 w-[35%] lg:w-[30%] backdrop-blur-[2px] bg-gradient-to-r rtl:bg-gradient-to-l from-black/10 to-transparent pointer-events-none"
      ></div>
      <div
        class="absolute inset-y-0 end-0 w-[35%] lg:w-[30%] backdrop-blur-[2px] bg-gradient-to-l rtl:bg-gradient-to-r from-black/10 to-transparent pointer-events-none"
      ></div>

      <!-- Content Container -->
      <div
        class="relative w-full h-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-0 flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-4"
      >
        <!-- Right side (RTL) / Left side (LTR): Avatar & Info -->
        <div class="flex items-center gap-4">
          <!-- Avatar -->
          <div
            class="w-[100px] h-[100px] rounded-full bg-white flex items-center justify-center shadow-md z-10 shrink-0"
          >
            <span class="text-[#390049] text-[28px] font-bold">ALS</span>
          </div>

          <!-- Vendor Info -->
          <div class="flex items-center gap-3">
            <h1 class="text-white text-xl font-bold m-0">ALS</h1>

            <!-- Rating -->
            <div class="flex items-center gap-1">
              <i class="ri-star-fill text-[#D4AF37] text-lg"></i>
              <span class="text-white text-sm font-semibold">4.9</span>
            </div>

            <!-- Verified Check -->
            <div
              class="w-5 h-5 rounded-full bg-[#1877F2] flex items-center justify-center shrink-0"
            >
              <i class="ri-check-line text-white text-xs"></i>
            </div>

            <!-- Seller Profile Button -->
            <button
              class="bg-white text-[#390049] h-8 px-4 rounded-[16px] flex items-center gap-1 text-[13px] font-bold ms-2 hover:opacity-90 transition-opacity"
              @click="showSellerProfile"
            >
              {{ locale === "ar" ? "ملف البائع" : "Seller Profile" }}
              <i
                class="ri-arrow-left-s-line rtl:block ltr:hidden text-lg leading-none"
              ></i>
              <i
                class="ri-arrow-right-s-line hidden ltr:block text-lg leading-none"
              ></i>
            </button>
          </div>
        </div>

        <!-- Left side (RTL) / Right side (LTR): Stats -->
        <div class="flex items-center gap-8 text-white">
          <div class="flex items-center gap-2">
            <i class="ri-group-line text-[22px]"></i>
            <div class="flex items-center gap-1.5">
              <span class="font-bold text-[17px] mt-0.5">15.240</span>
              <span class="text-[13px] opacity-90">{{
                locale === "ar" ? "متابع" : "Followers"
              }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <i class="ri-box-3-line text-[22px]"></i>
            <div class="flex items-center gap-1.5">
              <span class="font-bold text-[17px] mt-0.5">287</span>
              <span class="text-[13px] opacity-90">{{
                locale === "ar" ? "منتج" : "Products"
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs & Search Section -->
    <div class="w-full border-b border-[#BABABA]">
      <div
        class="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 py-4 lg:py-0 lg:h-[72px] flex flex-col lg:flex-row items-center justify-between gap-4"
      >
        <!-- Search -->
        <div class="relative w-full lg:w-[460px] order-1 lg:rtl:order-2 lg:ltr:order-1">
          <input
            type="text"
            :placeholder="
              locale === 'ar' ? 'ابحث في المتجر' : 'Search In Store'
            "
            class="w-full h-[40px] bg-[#F2F4F9] rounded-[8px] ps-10 pe-4 rtl:ps-4 rtl:pe-10 text-[13px] focus:outline-none text-[#091019] placeholder-[#64768C]"
          />
          <i
            class="ri-search-line absolute top-1/2 -translate-y-1/2 start-3 rtl:end-3 rtl:start-auto text-lg text-[#64768C]"
          ></i>
        </div>

        <!-- Tabs -->
        <div role="tablist" class="flex items-center gap-6 lg:gap-8 h-[40px] lg:h-full order-2 lg:rtl:order-1 lg:ltr:order-2 overflow-x-auto w-full lg:w-auto" style="scrollbar-width: none">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            role="tab"
            :aria-selected="activeTab === tab.key"
            class="font-bold text-[14px] h-full transition-colors border-b-2 shrink-0 px-2 lg:px-0"
            :class="
              activeTab === tab.key
                ? 'text-[#390049] border-[#390049]'
                : 'text-[#64768C] border-transparent hover:text-[#091019]'
            "
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Tab content: vendor header + shop-style listing -->
    <template v-if="activeTab !== null">
      <ShopMain :hide-brands="true" :hide-breadcrumbs="true" :sidebarPosition="locale === 'ar' ? 'start' : 'end'" :hide-top-bar="true" :hide-suggested-title="true">
        
        <template #main-header>
          <!-- Main Header Wrapper: justify-between -->
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
            
            <!-- White Tag (Always on Left side -> ltr:order-1 rtl:order-2) -->
            <div class="order-2 lg:rtl:order-2 lg:ltr:order-1 self-start lg:self-auto">
              <span class="shrink-0 inline-flex items-center gap-1.5 h-8 px-3.5 rounded-[16px] text-[12px] font-semibold text-[#091019] bg-white border border-[#E5E5E5]">
                <span>{{ locale === 'ar' ? 'اشتر أكثر، وادفع أقل' : 'Buy More, Pay Less' }}</span>
                <i class="ri-filter-3-line text-[#091019] text-[15px]" />
              </span>
            </div>

            <!-- 4 Tags + Text (Always on Right side -> rtl:order-1 ltr:order-2) -->
            <div class="flex flex-col items-start rtl:lg:items-start ltr:lg:items-end gap-3 order-1 lg:rtl:order-1 lg:ltr:order-2 w-full lg:w-auto overflow-hidden">
              <div class="flex items-baseline gap-1 text-[13px] font-bold text-[#091019]">
                <span v-if="locale === 'ar'" class="font-medium text-[#64768C] ms-1">منتج</span>
                <span>ALS 2721+</span>
                <span v-if="locale !== 'ar'" class="font-medium text-[#64768C]">Product</span>
              </div>
              <div class="flex items-center gap-2.5 rtl:flex-row-reverse w-full overflow-x-auto pb-2 lg:pb-0" style="scrollbar-width: none">
                <span class="shrink-0 inline-flex items-center gap-1.5 h-8 px-3.5 rounded-[16px] text-[12px] font-semibold text-[#091019] bg-[#FFEFEE]">
                  <span>{{ locale === 'ar' ? 'اشتر أكثر، وادفع أقل' : 'Buy More, Pay Less' }}</span>
                  <i class="ri-pie-chart-2-line text-[#FF4747] text-[15px]" />
                </span>
                <span class="shrink-0 inline-flex items-center gap-1.5 h-8 px-3.5 rounded-[16px] text-[12px] font-semibold text-[#091019] bg-[#FEF4EB]">
                  <span>{{ locale === 'ar' ? 'اشتر أكثر، وادفع أقل' : 'Buy More, Pay Less' }}</span>
                  <i class="ri-price-tag-3-line text-[#FF7B33] text-[15px]" />
                </span>
                <span class="shrink-0 inline-flex items-center gap-1.5 h-8 px-3.5 rounded-[16px] text-[12px] font-semibold text-[#091019] bg-[#F5F5F5]">
                  <span>{{ locale === 'ar' ? 'شحن مجاني' : 'Free Shipping' }}</span>
                  <i class="ri-box-3-line text-[#64768C] text-[15px]" />
                </span>
                <span class="shrink-0 inline-flex items-center gap-1.5 h-8 px-3.5 rounded-[16px] text-[12px] font-semibold text-[#091019] bg-[#FFF9EB]">
                  <span>{{ locale === 'ar' ? 'منتجات ذات تقييمات عالية' : 'Highly Rated Products' }}</span>
                  <i class="ri-star-line text-[#FFC000] text-[15px]" />
                </span>
              </div>
            </div>

          </div>
        </template>
        
      </ShopMain>
    </template>

    <template v-else>
    <!-- Stats Cards Section -->
    <div class="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 py-8 mt-2">
      <div class="grid grid-cols-1 md:grid-cols-6 gap-5">
        <!-- Top row: 3 cards -->
        <div
          class="md:col-span-2 rounded-[16px] border border-[#E5E5E5] px-6 py-5 flex items-center bg-white"
        >
          <!-- Icon (First DOM element -> Right in RTL, Left in LTR) -->
          <div
            class="w-[52px] h-[52px] rounded-full bg-[#FCEFFF] flex items-center justify-center shrink-0"
          >
            <i class="ri-time-line text-[24px] text-[#390049]"></i>
          </div>
          <!-- Text -->
          <div class="flex-1 flex flex-col items-center justify-center mt-1">
            <span class="text-[12px] text-[#64768C] font-semibold">{{
              locale === "ar" ? "في المنصة منذ" : "On platform since"
            }}</span>
            <span class="text-[15px] font-bold text-[#390049] mt-1">{{
              locale === "ar" ? "3 سنوات" : "3 Years"
            }}</span>
          </div>
        </div>

        <div
          class="md:col-span-2 rounded-[16px] border border-[#E5E5E5] px-6 py-5 flex items-center bg-white"
        >
          <div
            class="w-[52px] h-[52px] rounded-full bg-[#FCEFFF] flex items-center justify-center shrink-0"
          >
            <i class="ri-map-pin-line text-[24px] text-[#390049]"></i>
          </div>
          <div class="flex-1 flex flex-col items-center justify-center mt-1">
            <span class="text-[12px] text-[#64768C] font-semibold">{{
              locale === "ar" ? "الموقع" : "Location"
            }}</span>
            <span class="text-[15px] font-bold text-[#390049] mt-1">{{
              locale === "ar" ? "السعودية" : "Saudi Arabia"
            }}</span>
          </div>
        </div>

        <div
          class="md:col-span-2 rounded-[16px] border border-[#E5E5E5] px-6 py-5 flex items-center bg-white"
        >
          <div
            class="w-[52px] h-[52px] rounded-full bg-[#FCEFFF] flex items-center justify-center shrink-0"
          >
            <i class="ri-file-text-line text-[24px] text-[#390049]"></i>
          </div>
          <div class="flex-1 flex flex-col items-center justify-center mt-1">
            <span class="text-[12px] text-[#64768C] font-semibold">{{
              locale === "ar" ? "الفواتير" : "Invoices"
            }}</span>
            <span class="text-[15px] font-bold text-[#390049] mt-1">{{
              locale === "ar" ? "فواتير ضريبية" : "Tax Invoices"
            }}</span>
          </div>
        </div>

        <!-- Bottom row: 2 cards -->
        <div
          class="md:col-span-3 rounded-[16px] border border-[#E5E5E5] px-6 py-5 flex items-center bg-white"
        >
          <div
            class="w-[52px] h-[52px] rounded-full bg-[#FCEFFF] flex items-center justify-center shrink-0"
          >
            <i class="ri-truck-line text-[24px] text-[#390049]"></i>
          </div>
          <div class="flex-1 flex flex-col items-center justify-center mt-1">
            <span class="text-[12px] text-[#64768C] font-semibold">{{
              locale === "ar" ? "سرعة الشحن" : "Shipping Speed"
            }}</span>
            <span class="text-[15px] font-bold text-[#390049] mt-1">{{
              locale === "ar" ? "1-2 يوم عمل" : "1-2 business days"
            }}</span>
          </div>
        </div>

        <div
          class="md:col-span-3 rounded-[16px] border border-[#E5E5E5] px-6 py-5 flex items-center bg-white"
        >
          <div
            class="w-[52px] h-[52px] rounded-full bg-[#FCEFFF] flex items-center justify-center shrink-0"
          >
            <i class="ri-chat-1-line text-[24px] text-[#390049]"></i>
          </div>
          <div class="flex-1 flex flex-col items-center justify-center mt-1">
            <span class="text-[12px] text-[#64768C] font-semibold">{{
              locale === "ar" ? "وقت الاستجابة" : "Response Time"
            }}</span>
            <span class="text-[15px] font-bold text-[#390049] mt-1">{{
              locale === "ar" ? "خلال ساعة" : "Within an hour"
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Reviews Section -->
    <div class="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
      <div class="border border-[#E5E5E5] rounded-[16px] p-6 lg:p-8">
        <!-- Header -->
        <div
          class="flex flex-col md:flex-row items-start md:items-start justify-between gap-6"
        >
          <!-- Rating (Right in RTL) -->
          <div class="flex flex-col items-center">
            <span class="text-[#390049] text-[60px] font-bold leading-none"
              >4.9</span
            >
            <div class="flex items-center gap-1 mt-2">
              <i
                class="ri-star-fill text-[#FFC000] text-xl"
                v-for="n in 4"
                :key="n"
              ></i>
              <i class="ri-star-line text-[#FFC000] text-xl"></i>
            </div>
            <span class="text-[#64768C] text-[14px] mt-1">{{
              locale === "ar" ? "8021 تقييمات" : "8021 Reviews"
            }}</span>
          </div>

          <!-- Toggle Buttons (Left in RTL) -->
          <div
            class="bg-[#F3F4F6] p-1.5 rounded-[12px] flex items-center shrink-0"
          >
            <button
              class="px-6 py-2.5 rounded-[10px] text-white text-[14px] font-bold"
              style="
                background: linear-gradient(
                  90deg,
                  #390049 0%,
                  #3c004c 20%,
                  #40004f 40%,
                  #430053 60%,
                  #470056 80%,
                  #4a0059 100%
                );
              "
            >
              {{ locale === "ar" ? "تقييمات البائع" : "Seller Reviews" }}
            </button>
            <button
              class="px-6 py-2.5 rounded-[10px] text-[#4A5565] text-[14px] font-bold hover:bg-white/50 transition-colors"
            >
              {{ locale === "ar" ? "تقييمات المنتجات" : "Product Reviews" }}
            </button>
          </div>
        </div>

        <!-- Filter by result -->
        <div class="border-t border-[#E5E5E5] mt-8 pt-8">
          <h3 class="text-[#091019] text-[15px] font-bold mb-4">
            {{ locale === "ar" ? "تصفية حسب النتيجة" : "Filter by result" }}
          </h3>

          <div class="flex flex-wrap items-center gap-3">
            <button
              class="border border-[#E5E5E5] rounded-[8px] px-4 h-10 flex items-center gap-2 hover:border-[#FFC000] transition-colors bg-white"
            >
              <div class="flex items-center gap-0.5">
                <i
                  class="ri-star-fill text-[#FFC000] text-sm"
                  v-for="n in 5"
                  :key="n"
                ></i>
              </div>
              <span class="text-[#636671] text-[13px] ms-1"
                >(8021 {{ locale === "ar" ? "تقييمات" : "Reviews" }})</span
              >
            </button>

            <button
              class="border border-[#E5E5E5] rounded-[8px] px-4 h-10 flex items-center gap-2 hover:border-[#FFC000] transition-colors bg-white"
            >
              <div class="flex items-center gap-0.5">
                <i
                  class="ri-star-fill text-[#FFC000] text-sm"
                  v-for="n in 4"
                  :key="n"
                ></i>
                <i class="ri-star-line text-[#FFC000] text-sm"></i>
              </div>
              <span class="text-[#636671] text-[13px] ms-1"
                >(2021 {{ locale === "ar" ? "تقييمات" : "Reviews" }})</span
              >
            </button>

            <button
              class="border border-[#E5E5E5] rounded-[8px] px-4 h-10 flex items-center gap-2 hover:border-[#FFC000] transition-colors bg-white"
            >
              <div class="flex items-center gap-0.5">
                <i
                  class="ri-star-fill text-[#FFC000] text-sm"
                  v-for="n in 3"
                  :key="n"
                ></i>
                <i
                  class="ri-star-line text-[#FFC000] text-sm"
                  v-for="n in 2"
                  :key="n"
                ></i>
              </div>
              <span class="text-[#636671] text-[13px] ms-1"
                >(521 {{ locale === "ar" ? "تقييمات" : "Reviews" }})</span
              >
            </button>

            <button
              class="border border-[#E5E5E5] rounded-[8px] px-4 h-10 flex items-center gap-2 hover:border-[#FFC000] transition-colors bg-white"
            >
              <div class="flex items-center gap-0.5">
                <i
                  class="ri-star-fill text-[#FFC000] text-sm"
                  v-for="n in 2"
                  :key="n"
                ></i>
                <i
                  class="ri-star-line text-[#FFC000] text-sm"
                  v-for="n in 3"
                  :key="n"
                ></i>
              </div>
              <span class="text-[#636671] text-[13px] ms-1"
                >(221 {{ locale === "ar" ? "تقييمات" : "Reviews" }})</span
              >
            </button>

            <button
              class="border border-[#E5E5E5] rounded-[8px] px-4 h-10 flex items-center gap-2 hover:border-[#FFC000] transition-colors bg-white"
            >
              <div class="flex items-center gap-0.5">
                <i class="ri-star-fill text-[#FFC000] text-sm"></i>
                <i
                  class="ri-star-line text-[#FFC000] text-sm"
                  v-for="n in 4"
                  :key="n"
                ></i>
              </div>
              <span class="text-[#636671] text-[13px] ms-1"
                >(121 {{ locale === "ar" ? "تقييمات" : "Reviews" }})</span
              >
            </button>
          </div>
        </div>

        <!-- Image Slider -->
        <div class="border-t border-[#E5E5E5] mt-8 pt-8">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-[#091019] text-[15px] font-bold">
              {{ locale === "ar" ? "تعليقات مع الصور" : "Reviews with images" }}
            </h3>

            <div class="flex items-center gap-2">
              <button
                class="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                @click="scrollPrev"
                :disabled="!canScrollPrev"
              >
                <i
                  class="ri-arrow-right-s-line text-[#091019] rtl:block ltr:hidden text-lg leading-none"
                ></i>
                <i
                  class="ri-arrow-left-s-line text-[#091019] hidden ltr:block text-lg leading-none"
                ></i>
              </button>
              <button
                class="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                @click="scrollNext"
                :disabled="!canScrollNext"
              >
                <i
                  class="ri-arrow-left-s-line text-[#091019] rtl:block ltr:hidden text-lg leading-none"
                ></i>
                <i
                  class="ri-arrow-right-s-line text-[#091019] hidden ltr:block text-lg leading-none"
                ></i>
              </button>
            </div>
          </div>

          <div
            ref="emblaRef"
            class="overflow-hidden cursor-grab active:cursor-grabbing pb-8 border-b border-[#E5E5E5]"
          >
            <div class="flex gap-4">
              <div
                v-for="i in 7"
                :key="i"
                class="relative shrink-0 flex-[0_0_184px]"
              >
                <img
                  :src="`/images/rp${i}.jpg`"
                  class="w-[184px] h-[184px] rounded-[8px] object-cover"
                  alt="Review Image"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- User Reviews -->
        <div class="flex flex-col gap-12 pt-8">
          <div class="flex items-start justify-between">
            <div class="flex items-start gap-4">
              <img
                src="/images/user1.jpg"
                class="w-[48px] h-[48px] rounded-full object-cover border-2 border-[#FFC000]"
                alt="سارة أحمد"
              />
              <div class="flex flex-col mt-0.5">
                <span class="text-[#091019] text-[15px] font-bold"
                  >سارة أحمد</span
                >
                <div class="flex items-center gap-0.5 mt-1">
                  <i
                    class="ri-star-fill text-[#FFC000] text-[14px]"
                    v-for="n in 5"
                    :key="n"
                  ></i>
                </div>
                <p class="text-[#091019] text-[14px] mt-2 mb-0">
                  بائع ممتاز وصادق. التعامل معه سهل والشحن سريع.
                </p>
              </div>
            </div>
            <span class="text-[#64768C] text-[13px] mt-1 shrink-0">{{
              locale === "ar" ? "منذ يوم" : "1 day ago"
            }}</span>
          </div>

          <div class="flex items-start justify-between">
            <div class="flex items-start gap-4">
              <img
                src="/images/user2.jpg"
                class="w-[48px] h-[48px] rounded-full object-cover border-2 border-[#FFC000]"
                alt="خالد عبدالله"
              />
              <div class="flex flex-col mt-0.5">
                <span class="text-[#091019] text-[15px] font-bold"
                  >خالد عبدالله</span
                >
                <div class="flex items-center gap-0.5 mt-1">
                  <i
                    class="ri-star-fill text-[#FFC000] text-[14px]"
                    v-for="n in 5"
                    :key="n"
                  ></i>
                </div>
                <p class="text-[#091019] text-[14px] mt-2 mb-0">
                  بائع ممتاز وصادق. التعامل معه سهل والشحن سريع.
                </p>
              </div>
            </div>
            <span class="text-[#64768C] text-[13px] mt-1 shrink-0">{{
              locale === "ar" ? "منذ يوم" : "1 day ago"
            }}</span>
          </div>

          <div class="flex items-start justify-between">
            <div class="flex items-start gap-4">
              <img
                src="/images/user3.jpg"
                class="w-[48px] h-[48px] rounded-full object-cover border-2 border-[#FFC000]"
                alt="محمد يوسف"
              />
              <div class="flex flex-col mt-0.5">
                <span class="text-[#091019] text-[15px] font-bold"
                  >محمد يوسف</span
                >
                <div class="flex items-center gap-0.5 mt-1">
                  <i
                    class="ri-star-fill text-[#FFC000] text-[14px]"
                    v-for="n in 5"
                    :key="n"
                  ></i>
                </div>
                <p class="text-[#091019] text-[14px] mt-2 mb-0">
                  من أفضل البائعين على المنصة. احترافية عالية في التعامل.
                </p>
              </div>
            </div>
            <span class="text-[#64768C] text-[13px] mt-1 shrink-0">{{
              locale === "ar" ? "منذ 4 أيام" : "4 days ago"
            }}</span>
          </div>
        </div>
      </div>
    </div>
    </template>
  </div>
</template>
