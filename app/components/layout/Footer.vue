<script setup lang="ts">
const { locale, localePath } = useLocale()

// Mock following the Footer API (FooterResponse: top_categories, pages grouped by category, socials, apps); will be API-driven
const brandDesc = {
  ar: 'اكتشف مجموعتنا من الأساسيات العصرية، المصممة بعناية لملابسك اليومية. كل قطعة تجسد جمالية نظيفة وبسيطة، مما يضمن لك مظهرًا أنيقًا مع شعور بالراحة',
  en: 'Discover our collection of modern essentials, carefully designed for your everyday wardrobe. Every piece embodies a clean, simple aesthetic ensuring an elegant look with comfort.',
}

const socials = [
  { icon: 'ri-facebook-fill', link: '#' },
  { icon: 'ri-youtube-line', link: '#' },
  { icon: 'ri-instagram-line', link: '#' },
  { icon: 'ri-tiktok-fill', link: '#' },
  { icon: 'ri-twitter-line', link: '#' },
]

const apps = [
  { image: '/images/playStore.png', link: '#', alt: 'Google Play' },
  { image: '/images/appStore.png', link: '#', alt: 'App Store' },
]

const columns = [
  {
    title: { ar: 'أفضل الفئات', en: 'Best Categories' },
    links: [
      { label: { ar: 'نسائي', en: 'Women' }, path: '/shop/women' },
      { label: { ar: 'رجالي', en: 'Men' }, path: '/shop/men' },
      { label: { ar: 'أطفال', en: 'Kids' }, path: '/shop/kids' },
      { label: { ar: 'فساتين', en: 'Dresses' }, path: '/shop/dresses' },
      { label: { ar: 'قمصان', en: 'Shirts' }, path: '/shop/shirts' },
      { label: { ar: 'نظارات', en: 'Glasses' }, path: '/shop/glasses' },
      { label: { ar: 'عطور', en: 'Perfumes' }, path: '/shop/perfumes' },
    ],
  },
  {
    title: { ar: 'فئات أخري', en: 'Other Categories' },
    links: [
      { label: { ar: 'المنزل والمطبخ', en: 'Home & Kitchen' }, path: '/shop/home-kitchen' },
      { label: { ar: 'مستلزمات الحج والعمرة', en: 'Hajj & Umrah Supplies' }, path: '/shop/hajj-umrah' },
      { label: { ar: 'إكسسوارات', en: 'Accessories' }, path: '/shop/accessories' },
      { label: { ar: 'شنط', en: 'Bags' }, path: '/shop/bags' },
      { label: { ar: 'بريميوم', en: 'Premium' }, path: '/shop/premium' },
      { label: { ar: 'وصل حديثا', en: 'New Arrivals' }, path: '/shop/new-arrivals' },
      { label: { ar: 'تخفيضات', en: 'Sale' }, path: '/shop/sale' },
    ],
  },
  {
    title: { ar: 'أشهر الماركات', en: 'Popular Brands' },
    links: [
      { label: { ar: 'نايك', en: 'Nike' }, path: '/shop/nike' },
      { label: { ar: 'أديداس', en: 'Adidas' }, path: '/shop/adidas' },
      { label: { ar: 'نيو بالانس', en: 'New Balance' }, path: '/shop/new-balance' },
      { label: { ar: 'جس', en: 'Guess' }, path: '/shop/guess' },
      { label: { ar: 'بريميوم', en: 'Premium' }, path: '/shop/premium-brand' },
      { label: { ar: 'اتش اند ام', en: 'H&M' }, path: '/shop/h-and-m' },
      { label: { ar: 'تومي', en: 'Tommy' }, path: '/shop/tommy' },
    ],
  },
  {
    title: { ar: 'السياسات', en: 'Policies' },
    links: [
      { label: { ar: 'سياسة التوصيل', en: 'Delivery Policy' }, path: '/page/delivery-policy' },
      { label: { ar: 'سياسة إرجاع السلع', en: 'Return Policy' }, path: '/page/return-policy' },
      { label: { ar: 'سياسات الدفع', en: 'Payment Policies' }, path: '/page/payment-policies' },
      { label: { ar: 'سياسة الاستلام', en: 'Pickup Policy' }, path: '/page/pickup-policy' },
      { label: { ar: 'الأسئلة الشائعة', en: 'FAQ' }, path: '/page/faq' },
      { label: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' }, path: '/page/privacy-policy' },
      { label: { ar: 'الشروط والأحكام', en: 'Terms & Conditions' }, path: '/page/terms' },
    ],
  },
]

const support = {
  title: { ar: 'خدمة العملاء', en: 'Customer Service' },
  items: [
    { icon: 'ri-phone-line', label: '+966 12345689', ltr: true, href: 'tel:+96612345689' },
    { icon: 'ri-mail-line', label: 'Info55@Gmail.com', ltr: true, href: 'mailto:Info55@Gmail.com' },
    { icon: 'ri-information-line', label: { ar: 'معلومات عن ريا', en: 'About Riya' }, ltr: false, href: '/page/about' },
  ],
}

const downloadTitle = { ar: 'قم بتنزيل التطبيق', en: 'Download the App' }

const copyright = {
  ar: ['© 2024 جميع الحقوق محفوظة لدى بيوند', 'شركة بيوند لتقنية المعلومات', 'السجل التجاري 1010662838'],
  en: ['© 2024 All rights reserved by Beyond', 'Beyond Information Technology Co.', 'Commercial Registration 1010662838'],
}

const payments = ['/images/pay1.png', '/images/pay2.png', '/images/pay3.png', '/images/pay4.png', '/images/pay5.png']
</script>

<template>
  <footer class="bg-[#F6F6F6] border-t border-[#E8E8E8] mt-10 min-h-[590px] flex flex-col">
    <!-- Top -->
    <div class="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-10 flex-1">
      <div class="grid gap-10 lg:gap-8 lg:grid-cols-[360px_repeat(5,1fr)]">
        <!-- Brand -->
        <div>
          <img src="/images/brandLogo2.png" alt="RIYA" class="w-[225px] h-auto" />
          <p class="m-0 mt-6 text-[12px] leading-relaxed text-[#6F7B8B]">
            {{ brandDesc[locale] }}
          </p>
          <div dir="ltr" class="mt-7 flex items-center gap-2.5 rtl:justify-end">
            <a
              v-for="social in socials"
              :key="social.icon"
              :href="social.link"
              class="w-10 h-10 rounded-full bg-[#1F1F1F] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <i :class="social.icon" class="text-lg" />
            </a>
          </div>
          <p class="m-0 mt-8 text-[14px] font-bold text-[#091019]">{{ downloadTitle[locale] }}</p>
          <div dir="ltr" class="mt-4 flex items-center gap-2 rtl:justify-end">
            <a v-for="app in apps" :key="app.image" :href="app.link">
              <img :src="app.image" :alt="app.alt" class="h-9 w-auto" />
            </a>
          </div>
        </div>

        <!-- Link columns -->
        <div v-for="column in columns" :key="column.title.en">
          <p class="m-0 text-[14px] font-bold text-[#091019]">{{ column.title[locale] }}</p>
          <ul class="mt-4 flex flex-col gap-2.5">
            <li v-for="link in column.links" :key="link.path">
              <NuxtLink
                :to="localePath(link.path)"
                class="text-[13px] text-[#6F7B8B] hover:text-navbar transition-colors"
              >
                {{ link.label[locale] }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Customer service -->
        <div>
          <p class="m-0 text-[14px] font-bold text-[#091019]">{{ support.title[locale] }}</p>
          <ul class="mt-4 flex flex-col gap-3.5">
            <li v-for="item in support.items" :key="item.icon">
              <a
                :href="item.ltr ? item.href : undefined"
                class="flex items-center gap-2.5 text-[13px] text-[#6F7B8B] hover:text-navbar transition-colors"
              >
                <i :class="item.icon" class="text-lg" />
                <span :dir="item.ltr ? 'ltr' : undefined">
                  {{ typeof item.label === 'string' ? item.label : item.label[locale] }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-[#E8E8E8]">
      <div class="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 py-6 flex flex-col lg:flex-row items-center justify-between gap-6">
        <!-- Copyright -->
        <div class="text-center lg:text-start">
          <p v-for="line in copyright[locale]" :key="line" class="m-0 text-[12px] text-[#091019] leading-relaxed">
            {{ line }}
          </p>
        </div>

        <!-- Payments -->
        <div dir="ltr" class="flex items-center gap-3 flex-wrap justify-center">
          <span
            v-for="pay in payments"
            :key="pay"
            class="w-[72px] h-[40px] bg-white rounded-[6px] flex items-center justify-center overflow-hidden"
          >
            <img :src="pay" alt="Payment method" class="max-h-[26px] max-w-[52px] object-contain" />
          </span>
        </div>

        <!-- Certificates -->
        <div dir="ltr" class="flex items-center gap-6">
          <span class="flex items-center gap-2">
            <img src="/images/b2.png" alt="VAT" class="h-9 w-auto" />
            <span class="text-[12px] text-[#091019]">310951932300003</span>
          </span>
          <span class="flex items-center gap-2">
            <img src="/images/b1.jpg" alt="Saudi Business Center" class="h-9 w-auto" />
            <span class="text-[12px] text-[#091019]">Saudi Business Center</span>
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
