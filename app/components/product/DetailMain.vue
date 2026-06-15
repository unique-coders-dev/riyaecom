<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue'

const { t, locale, localePath } = useLocale()

const product = {
  id: 3471,
  name: { ar: 'فستان ماكسي مزين بالداتيل المفضل', en: 'Maxi Dress with Favorite Detail' },
  image: '/images/detail1.png',
  files: ['/images/detail2.png', '/images/detail3.png', '/images/detail4.png', '/images/detail5.png', '/images/detail6.png'],
  final_selling_price: '57.49',
  old_price: '95.00',
  discount: 33,
  rated: 4.8,
  seller: 'tozlu',
  seller_link: 'Zuhre',
}

const galleryImages = [product.image, ...product.files]
const currentImage = ref(0)

// Mobile embla carousel
const [mobileEmblaRef, mobileEmblaApi] = emblaCarouselVue({
  direction: locale.value === 'ar' ? 'rtl' : 'ltr',
  loop: true,
})

watch(mobileEmblaApi, (api) => {
  if (!api) return
  api.on('select', () => { currentImage.value = api.selectedScrollSnap() })
})

const scrollToSlide = (index: number) => {
  mobileEmblaApi.value ? mobileEmblaApi.value.scrollTo(index) : (currentImage.value = index)
}

const prevImage = () => { currentImage.value = (currentImage.value - 1 + galleryImages.length) % galleryImages.length }
const nextImage = () => {
  mobileEmblaApi.value ? mobileEmblaApi.value.scrollNext() : (currentImage.value = (currentImage.value + 1) % galleryImages.length)
}

// Mobile action bar interactions
const isWishlisted = ref(false)
const isSearchOpen = ref(false)
const searchQuery = ref('')

const recentSearches = computed(() =>
  locale.value === 'ar'
    ? ['طقم', 'سف', 'BY', 'فستان', 'سف', 'طق', 'سف']
    : ['Set', 'Dress', 'BY', 'Jeans', 'Top', 'Skirt', 'Blouse'],
)

const searchCategoryItems = computed(() => [
  { label: locale.value === 'ar' ? 'أطقم'      : 'Sets',       img: '/images/pn1.png' },
  { label: locale.value === 'ar' ? 'بناطيل'    : 'Pants',      img: '/images/pn3.png' },
  { label: locale.value === 'ar' ? 'تنانير'    : 'Skirts',     img: '/images/pn5.png' },
  { label: locale.value === 'ar' ? 'ملابس نوم' : 'Sleepwear',  img: '/images/pn7.png' },
  { label: locale.value === 'ar' ? 'جينز'      : 'Jeans',      img: '/images/pn9.png' },
])

const recentSearchesTitle = computed(() => locale.value === 'ar' ? 'عمليات البحث الرائجة' : 'Recent Searches')
const popularCategoriesTitle = computed(() => locale.value === 'ar' ? 'الأقسام الشائعة' : 'Popular Categories')
const searchPlaceholder = computed(() => locale.value === 'ar' ? 'ابحثي هنا...' : 'Search here...')

watch(isSearchOpen, (open) => {
  if (import.meta.client) document.body.style.overflow = open ? 'hidden' : ''
})

// Mobile sticky action bar scroll state
const isScrolled = ref(false)
// Shared with app.vue — bottom nav slides away on scroll down; keep the cart bar in sync
const hideBottomBar = useState<boolean>('hideBottomBar', () => false)
const onScroll = () => {
  isScrolled.value = window.scrollY > 30
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

// Share
const isShareOpen = ref(false)
const isLinkCopied = ref(false)

const shareUrl = computed(() =>
  typeof window !== 'undefined' ? window.location.href : '',
)
const shareTitle = computed(() => product.name[locale.value] ?? product.name.en)

const openShare = async () => {
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({ title: shareTitle.value, url: shareUrl.value })
      return
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') return
    }
  }
  isShareOpen.value = true
  isLinkCopied.value = false
}

const closeShare = () => {
  isShareOpen.value = false
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value)
    isLinkCopied.value = true
    setTimeout(() => { isLinkCopied.value = false }, 2000)
  } catch {
    const input = document.createElement('input')
    input.value = shareUrl.value
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    input.remove()
    isLinkCopied.value = true
    setTimeout(() => { isLinkCopied.value = false }, 2000)
  }
}

const shareTargets = computed(() => {
  const u = encodeURIComponent(shareUrl.value)
  const text = encodeURIComponent(shareTitle.value)
  return [
    {
      key: 'whatsapp',
      label: t.value.product.shareVia.whatsapp,
      icon: 'ri-whatsapp-line',
      color: '#25D366',
      href: `https://wa.me/?text=${text}%20${u}`,
    },
    {
      key: 'facebook',
      label: t.value.product.shareVia.facebook,
      icon: 'ri-facebook-fill',
      color: '#1877F2',
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    },
    {
      key: 'twitter',
      label: t.value.product.shareVia.twitter,
      icon: 'ri-twitter-x-line',
      color: '#0F1419',
      href: `https://twitter.com/intent/tweet?url=${u}&text=${text}`,
    },
    {
      key: 'telegram',
      label: t.value.product.shareVia.telegram,
      icon: 'ri-telegram-line',
      color: '#26A5E4',
      href: `https://t.me/share/url?url=${u}&text=${text}`,
    },
  ]
})

const colors = [
  { id: 1, code: '#8FD0AC' },
  { id: 2, code: '#F05454' },
  { id: 3, code: '#0B1B33' },
  { id: 4, code: '#D9B98C' },
]
const selectedColor = ref(1)

const sizes = [
  { id: 1, label: 'S', state: 'default' },
  { id: 2, label: 'M', state: 'selected' },
  { id: 3, label: 'L', state: 'default' },
  { id: 4, label: t.value.product.lastLeft, state: 'last' },
  { id: 5, label: 'XXL', state: 'default' },
  { id: 6, label: 'Rnk', state: 'default' },
]
const selectedSize = ref(2)

const quantity = ref(1)
const isSizeGuideOpen = ref(false)
const isCartDrawerOpen = ref(false)

const cartItem = {
  id: 'drawer_item',
  quantity: 1,
  size: 'M',
  color: 'black',
  price: 57.49,
  old_price: 95.00,
  product: {
    name_en: 'Maxi Dress with Favorite Detail',
    name_ar: 'فستان ماكسي مزين بالداتيل المفضل',
    name_tr: null as null,
    image: '/images/detail1.png',
    brand: { name: { en: 'Zuhre', ar: 'زهري' } },
    sizes: [
      { id: 1, name: { en: 'S', ar: 'S' } },
      { id: 2, name: { en: 'M', ar: 'M' } },
      { id: 3, name: { en: 'L', ar: 'L' } },
    ],
    colors: [
      { id: 1, key: 'black', name: { en: 'Black', ar: 'أسود' } },
      { id: 2, key: 'green', name: { en: 'Green', ar: 'أخضر' } },
      { id: 3, key: 'red',   name: { en: 'Red',   ar: 'أحمر' } },
    ],
  },
}

const drawerItem = reactive({ ...cartItem, quantity: quantity.value, size: 'M', color: 'black' })

const productName = (p: { name_ar: string | null; name_en: string | null; name_tr: string | null }) => {
  const current = locale.value === 'ar' ? p.name_ar : p.name_en
  return current ?? p.name_en ?? p.name_ar ?? p.name_tr ?? ''
}

watch(isCartDrawerOpen, (open) => {
  if (import.meta.client) document.body.style.overflow = open ? 'hidden' : ''
})

watch(isSizeGuideOpen, (open) => {
  if (import.meta.client) document.body.style.overflow = open ? 'hidden' : ''
})

const paymentCards = [
  { bg: '#FEF3F2', border: '#E7938D', image: '/images/pay2.png', text: { ar: 'دفع سريع وأمن بضغطة واحدة عبر أجهزتك', en: 'Fast, secure one-tap payment on your devices' } },
  { bg: '#EEF6FF', border: '#0070F3', image: '/images/pay1.png', text: { ar: 'قسط مشترياتك بسهولة وادفع بمرونة تامة', en: 'Installment your purchases easily and pay flexibly' } },
  { bg: '#ECFDF3', border: '#8CBA9E', image: '/images/pay4.png', text: { ar: 'ادفع بسهولة وأمان مباشرة من حسابك البنكي', en: 'Pay easily and securely from your bank account' } },
  { bg: '#FFF8E5', border: '#D9AA68', image: '/images/pay6.png', text: { ar: 'قسم مشترياتك حتي 4 دفعة', en: 'Split your purchases into up to 4 payments' } },
]

const deliveryFeatures = [
  { icon: 'ri-truck-line', title: { ar: 'توصيل سريع', en: 'Fast Delivery' }, sub: { ar: '2-3 أيام عمل', en: '2-3 working days' } },
  { icon: 'ri-refresh-line', title: { ar: 'إرجاع مجاني', en: 'Free Returns' }, sub: { ar: 'خلال 14 يوم', en: 'Within 14 days' } },
  { icon: 'ri-lock-line', title: { ar: 'دفع امن 100%', en: '100% Secure Payment' }, sub: { ar: 'فيزا - مدي', en: 'Visa - Mada' } },
  { icon: 'ri-money-dollar-box-line', title: { ar: 'دفع عند الاستلام', en: 'Cash on Delivery' }, sub: { ar: 'في كل أنحاء المملكة', en: 'Across the Kingdom' } },
]

const breadcrumbs = computed(() => [
  { label: t.value.shop.home, path: '/' },
  { label: locale.value === 'ar' ? 'نسائي' : 'Women', path: '/shop/women' },
  { label: locale.value === 'ar' ? 'ملابس' : 'Clothing', path: '/shop/clothing' },
  { label: locale.value === 'ar' ? 'فساتين' : 'Dresses', path: '/shop/dresses' },
])

const prevIcon = computed(() => (locale.value === 'ar' ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'))
const nextIcon = computed(() => (locale.value === 'ar' ? 'ri-arrow-left-s-line' : 'ri-arrow-right-s-line'))
</script>

<template>
  <main class="max-w-[1536px] mx-auto lg:px-12 py-0 lg:py-6 min-h-[60vh]">

    <!-- ── MOBILE STICKY ACTION BAR ── -->
    <div
      class="lg:hidden fixed top-0 inset-x-0 z-30 px-3 py-3 flex items-center justify-between transition-all duration-200"
      :class="isScrolled ? 'bg-white/70 backdrop-blur-lg shadow-[0_2px_10px_rgba(0,0,0,0.05)]' : ''"
    >
      <button
        class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0px_4px_20px_0px_#64646426] text-[#091019] hover:bg-gray-50 transition-colors"
        aria-label="Back"
        @click="$router.back()"
      >
        <i :class="prevIcon" class="text-xl" />
      </button>
      <div class="flex items-center gap-2.5">
        <button
          class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0px_4px_20px_0px_#64646426] text-[#091019] hover:bg-gray-50 transition-colors"
          aria-label="Share"
          @click="openShare"
        >
          <i class="ri-share-line text-lg" />
        </button>
        <button
          class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0px_4px_20px_0px_#64646426] hover:bg-gray-50 transition-colors"
          aria-label="Wishlist"
          @click="isWishlisted = !isWishlisted"
        >
          <i
            :class="[isWishlisted ? 'ri-heart-fill text-[#FF3F3F]' : 'ri-heart-line text-[#091019]', 'text-lg']"
          />
        </button>
        <button
          class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0px_4px_20px_0px_#64646426] text-[#091019] hover:bg-gray-50 transition-colors"
          aria-label="Search"
          @click="isSearchOpen = true"
        >
          <i class="ri-search-line text-lg" />
        </button>
      </div>
    </div>

    <!-- ── MOBILE GALLERY ── -->
    <div ref="mobileEmblaRef" class="lg:hidden relative h-[550px] bg-gray-100 overflow-hidden">
      <!-- Embla slide track -->
      <div class="flex h-full">
        <div
          v-for="(img, i) in galleryImages"
          :key="i"
          class="flex-[0_0_100%] shrink-0 h-full"
        >
          <img :src="img" :alt="`${product.name[locale]} ${i + 1}`" class="w-full h-full object-cover pointer-events-none select-none" draggable="false" />
        </div>
      </div>

      <!-- Dots -->
      <div class="absolute bottom-4 inset-x-0 flex items-center justify-center gap-1.5 z-10">
        <button
          v-for="(_, i) in galleryImages"
          :key="i"
          class="rounded-full transition-all duration-200"
          :class="i === currentImage ? 'w-4 h-2 bg-navbar' : 'w-2 h-2 bg-white/70'"
          @click="scrollToSlide(i)"
        />
      </div>
    </div>

    <!-- ── DESKTOP GALLERY ── -->
    <div class="px-4 sm:px-6 lg:px-0">
      <!-- Breadcrumbs (desktop only) -->
      <nav class="hidden lg:flex items-center gap-1.5 text-[12px] flex-wrap">
        <template v-for="crumb in breadcrumbs" :key="crumb.path">
          <NuxtLink :to="localePath(crumb.path)" class="text-[#64768C] hover:underline">{{ crumb.label }}</NuxtLink>
          <span class="text-[#64768C]">/</span>
        </template>
        <span class="text-[#091019]">{{ product.name[locale] }}</span>
      </nav>

      <div class="mt-0 lg:mt-5 grid gap-8 lg:grid-cols-[460px_1fr] items-start">
        <!-- Desktop gallery column -->
        <div class="hidden lg:block">
          <div class="relative w-full h-[550px] rounded-[16px] overflow-hidden bg-gray-100">
            <img :src="galleryImages[currentImage]" :alt="product.name[locale]" class="w-full h-full object-cover" />

            <span class="absolute top-3 start-3">
              <span dir="ltr" class="block bg-[#FF3F3F] text-white text-[12px] font-semibold px-2.5 py-1 rounded-[24px]">
                -{{ product.discount }}%
              </span>
            </span>
            <span class="absolute top-3 end-3 bg-[#00AE34] text-white text-[12px] font-semibold px-3 py-1 rounded-[24px]">
              {{ t.product.newArrival }}
            </span>

            <button
              class="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#E6E6E6] flex items-center justify-center text-[#091019] hover:bg-gray-50 transition-colors"
              @click="prevImage"
            >
              <i :class="prevIcon" class="text-xl" />
            </button>
            <button
              class="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#E6E6E6] flex items-center justify-center text-[#091019] hover:bg-gray-50 transition-colors"
              @click="nextImage"
            >
              <i :class="nextIcon" class="text-xl" />
            </button>

            <div class="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5">
              <button
                v-for="(_, i) in galleryImages"
                :key="i"
                class="w-2 h-2 rounded-full transition-colors"
                :class="i === currentImage ? 'bg-navbar' : 'bg-gray-300'"
                @click="currentImage = i"
              />
            </div>
          </div>

          <div class="mt-3 grid grid-cols-5 gap-3">
            <button
              v-for="(file, i) in product.files"
              :key="file"
              class="relative h-[80px] rounded-[8px] overflow-hidden bg-gray-100"
              :class="currentImage === i + 1 ? 'ring-2 ring-navbar' : ''"
              @click="currentImage = i + 1"
            >
              <img :src="file" :alt="`${product.name[locale]} ${i + 1}`" class="w-full h-full object-cover" />
              <span v-if="i === product.files.length - 1" class="absolute inset-0 flex items-center justify-center">
                <span class="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white">
                  <i class="ri-play-fill text-base" />
                </span>
              </span>
            </button>
          </div>
        </div>

        <!-- ── PRODUCT INFO (both mobile & desktop) ── -->
        <div class="min-w-0 pt-4 lg:pt-0">
          <!-- Stock + browsing row -->
          <div class="flex items-center justify-between gap-2 bg-[#F9F9F9] border border-[#E7938D] rounded-[8px] px-3 lg:px-4 py-2 text-[11px] lg:text-[12px] text-[#FF3F3F]">
            <span class="font-semibold">• {{ t.product.stockLeft }}</span>
            <span class="flex items-center gap-1 shrink-0">
              <i class="ri-user-3-line text-sm" />
              <span class="hidden sm:inline">{{ t.product.browsing }}</span>
              <span class="sm:hidden">47</span>
            </span>
          </div>

          <!-- Seller + views -->
          <div class="mt-3 flex items-center gap-2 flex-wrap text-[12px] lg:text-[13px]">
            <span class="text-[#091019]">{{ t.product.seller }}: <span dir="ltr">tozlu</span></span>
            <span class="flex items-center gap-1 bg-[#F5FAFF] border border-[#7CB8FF] text-[#0070F3] text-[10px] lg:text-[11px] font-semibold px-2 py-0.5 rounded-full">
              {{ t.product.trustedBrand }}
              <i class="ri-check-line text-xs" />
            </span>
            <span class="ms-auto text-[#64768C] flex items-center gap-1">
              <i class="ri-camera-line text-sm" />
              {{ t.product.views }}
            </span>
          </div>

          <!-- Title -->
          <h1 class="m-0 mt-2 text-[17px] lg:text-[20px] font-bold text-[#091019] leading-snug">{{ product.name[locale] }}</h1>

          <!-- Mobile share + rating row -->
          <div class="mt-2 flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-2 text-[12px] text-[#64768C]">
              <span class="font-bold text-[#091019]" dir="ltr">4.8</span>
              <span class="flex items-center text-[#F5A623] text-[11px]">
                <i class="ri-star-fill" /><i class="ri-star-fill" /><i class="ri-star-fill" /><i class="ri-star-fill" /><i class="ri-star-half-line" />
              </span>
              <span class="text-[11px] lg:text-[12px]">{{ t.product.reviewsCount }}</span>
              <span class="text-gray-300 hidden sm:inline">|</span>
              <span class="hidden sm:inline text-[11px] lg:text-[12px]">{{ t.product.sold }}</span>
            </div>
            <button
              class="border border-[#E8E8E8] rounded-[24px] px-3 lg:px-4 py-1 text-[11px] lg:text-[12px] text-[#091019] hover:bg-gray-50 transition-colors flex items-center gap-1"
              @click="openShare"
            >
              <i class="ri-share-line text-sm" />
              {{ t.product.share }}
            </button>
          </div>
          <!-- sold on mobile (separate line) -->
          <p class="m-0 mt-0.5 text-[11px] text-[#64768C] sm:hidden">{{ t.product.sold }}</p>

          <!-- Pricing box -->
          <div class="mt-3 lg:mt-4 bg-[#F6F6F6] border border-[#E8E8E8] rounded-[16px] px-4 lg:px-5 py-3 lg:py-4">
            <div class="flex items-center gap-2 lg:gap-3">
              <span dir="ltr" class="text-[20px] lg:text-[22px] font-bold text-[#091019] inline-flex items-center gap-1">
                <UiRiyalSymbol /> {{ product.final_selling_price }}
              </span>
              <span dir="ltr" class="text-[12px] lg:text-[13px] text-[#6F7B8B] line-through inline-flex items-center gap-0.5">
                <UiRiyalSymbol /> {{ product.old_price }}
              </span>
              <span class="bg-[#FF3F3F] text-white text-[11px] lg:text-[12px] font-semibold px-2 py-0.5 rounded-full" dir="ltr">-{{ product.discount }}%</span>
            </div>
            <div class="my-2.5 lg:my-3 border-t border-[#9D9D9D]" />
            <div class="flex items-center gap-2 text-[11px] lg:text-[12px] text-[#091019] flex-wrap">
              <img src="/images/pay6.png" alt="Tamara" class="h-4 lg:h-5 w-auto rounded" />
              <span>
                {{ t.product.installment1 }}
                <span class="text-[#32B828] font-semibold">{{ t.product.installment2 }}</span>
                {{ t.product.installment3 }}&nbsp;
                <span class="text-[#32B828] font-semibold">{{ t.product.installment4 }}</span>
                <UiRiyalSymbol class="!h-[0.65em]" />
                {{ t.product.installment5 }}
              </span>
            </div>
          </div>

          <!-- Color -->
          <div class="mt-3 lg:mt-4">
            <p class="m-0 text-[12px] lg:text-[13px] text-[#64768C]">{{ t.product.color }} : <span class="text-[#091019]">{{ t.product.colorValue }}</span></p>
            <div class="mt-2 flex items-center gap-2">
              <button
                v-for="color in colors"
                :key="color.id"
                class="w-6 h-6 lg:w-7 lg:h-7 rounded-full border"
                :class="selectedColor === color.id ? 'ring-2 ring-navbar ring-offset-2 border-transparent' : 'border-gray-200'"
                :style="{ background: color.code }"
                @click="selectedColor = color.id"
              />
            </div>
          </div>

          <!-- Size -->
          <div class="mt-3 lg:mt-4">
            <div class="flex items-center justify-between">
              <p class="m-0 text-[12px] lg:text-[13px] text-[#64768C]">{{ t.product.size }} : <span class="text-[#091019]">{{ t.product.sizeValue }}</span></p>
              <button class="flex items-center gap-1 text-[11px] lg:text-[12px] text-[#091019] hover:text-navbar transition-colors" @click="isSizeGuideOpen = true">
                {{ t.product.sizeGuide }}
                <i :class="nextIcon" class="text-sm" />
              </button>
            </div>
            <div class="mt-2 flex items-center gap-1.5 lg:gap-2 flex-wrap">
              <button
                v-for="size in sizes"
                :key="size.id"
                class="min-w-[40px] lg:min-w-[44px] h-8 lg:h-9 px-2 rounded-[8px] border text-[11px] lg:text-[12px] font-medium transition-colors"
                :class="
                  selectedSize === size.id
                    ? 'bg-navbar text-white border-navbar'
                    : size.state === 'last'
                      ? 'border-[#FF3F3F] text-[#FF3F3F] bg-white'
                      : 'border-gray-200 text-[#091019] bg-white hover:border-navbar'
                "
                @click="selectedSize = size.id"
              >
                {{ size.label }}
              </button>
            </div>
          </div>

          <!-- Actions (desktop only) -->
          <div class="hidden lg:flex items-center gap-3 mt-5">
            <div dir="ltr" class="h-12 flex items-stretch border border-[#E8E8E8] rounded-[16px] overflow-hidden bg-[#F6F6F6]">
              <button class="w-12 flex items-center justify-center text-[#091019] hover:bg-gray-200 transition-colors" @click="quantity > 1 && quantity--">
                <i class="ri-subtract-line text-lg" />
              </button>
              <span class="w-12 flex items-center justify-center bg-white border-x border-[#E8E8E8] text-[14px] font-medium text-[#091019]">{{ quantity }}</span>
              <button class="w-12 flex items-center justify-center text-[#091019] hover:bg-gray-200 transition-colors" @click="quantity++">
                <i class="ri-add-line text-lg" />
              </button>
            </div>
            <button class="flex-1 min-w-[180px] h-12 rounded-[16px] bg-navbar text-white text-[14px] font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition-opacity">
              {{ t.product.addToCart }}
              <i class="ri-shopping-cart-2-line text-lg" />
            </button>
            <NuxtLink
              :to="localePath('/checkout')"
              class="flex-1 min-w-[160px] h-12 rounded-[16px] bg-[#EFD0FF] text-[#091019] text-[14px] font-semibold flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              {{ t.product.buyNow }}
            </NuxtLink>
            <button class="w-12 h-12 rounded-[12px] bg-white border border-[#E8E8E8] flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors" aria-label="Wishlist">
              <i class="ri-heart-fill text-xl" />
            </button>
          </div>

          <!-- Payment methods -->
          <div class="mt-5 lg:mt-6">
            <div class="flex items-center justify-between mb-2.5 lg:mb-3">
              <h2 class="m-0 text-[13px] lg:text-[14px] font-bold text-[#091019]">{{ t.product.paymentMethods }}</h2>
              <span class="flex items-center gap-1 text-slate-400">
                <i :class="prevIcon" class="text-base" />
                <i :class="nextIcon" class="text-base" />
              </span>
            </div>
            <div class="grid grid-cols-2 xl:grid-cols-4 gap-2 lg:gap-3">
              <div
                v-for="card in paymentCards"
                :key="card.image"
                class="rounded-[12px] border p-2.5 lg:p-3"
                :style="{ background: card.bg, borderColor: card.border }"
              >
                <div class="flex items-center justify-between">
                  <img :src="card.image" alt="Payment" class="h-4 lg:h-5 w-auto max-w-[56px] lg:max-w-[64px] object-contain" />
                  <i :class="nextIcon" class="text-sm text-slate-500" />
                </div>
                <p class="m-0 mt-1.5 text-[10px] lg:text-[11px] leading-snug text-[#091019]">{{ card.text[locale] }}</p>
              </div>
            </div>
          </div>

          <!-- Delivery features -->
          <div class="mt-4 lg:mt-5 bg-[#F6F6F6] border border-[#E8E8E8] rounded-[16px] grid grid-cols-2 xl:grid-cols-4">
            <div
              v-for="(feature, i) in deliveryFeatures"
              :key="feature.icon"
              class="flex flex-col items-center justify-center text-center px-2 lg:px-3 py-3 lg:py-4 border-[#E8E8E8]"
              :class="[i % 2 === 0 ? 'border-e lg:border-e-0' : '', i < 2 ? 'border-b lg:border-b-0' : '', i < deliveryFeatures.length - 1 ? 'xl:border-e' : '']"
            >
              <i :class="feature.icon" class="text-[18px] lg:text-[20px] text-[#00AE34]" />
              <p class="m-0 mt-1 text-[11px] lg:text-[12px] font-bold text-[#091019]">{{ feature.title[locale] }}</p>
              <p class="m-0 mt-0.5 text-[10px] lg:text-[11px] text-[#64768C] leading-tight">{{ feature.sub[locale] }}</p>
            </div>
          </div>

          <!-- Expected delivery -->
          <div class="mt-3 lg:mt-4 bg-[#ECFDF3] border border-[#DEEBDD] rounded-[16px] px-3 lg:px-5 py-3 lg:py-3.5 flex items-start gap-2.5 lg:gap-3">
            <i class="ri-map-pin-line text-lg lg:text-xl text-[#32B828] shrink-0 mt-0.5" />
            <div class="text-[#32B828]">
              <p class="m-0 text-[12px] lg:text-[13px] font-bold">{{ t.product.expectedDelivery }}</p>
              <p class="m-0 mt-0.5 text-[11px] lg:text-[12px]">{{ t.product.orderWithin }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── MOBILE FIXED ADD-TO-CART BAR ── -->
    <Teleport to="body">
      <div
        class="lg:hidden fixed bottom-[62px] inset-x-0 z-40 bg-white border-t border-[#E8E8E8] px-4 h-[68px] flex items-center gap-3 transition-transform duration-300 ease-out"
        :class="hideBottomBar ? 'translate-y-[62px]' : 'translate-y-0'"
      >
        <!-- Quantity stepper (start side: right RTL / left LTR) -->
        <div dir="ltr" class="shrink-0 h-11 flex items-stretch border border-[#E8E8E8] rounded-[12px] overflow-hidden bg-[#F6F6F6]">
          <button
            class="w-11 flex items-center justify-center text-[#091019] hover:bg-gray-100 transition-colors"
            aria-label="-"
            @click="quantity > 1 && quantity--"
          >
            <i class="ri-subtract-line text-lg" />
          </button>
          <span class="w-10 flex items-center justify-center bg-white border-x border-[#E8E8E8] text-[14px] font-semibold text-[#091019]">
            {{ quantity }}
          </span>
          <button
            class="w-11 flex items-center justify-center text-[#091019] hover:bg-gray-100 transition-colors"
            aria-label="+"
            @click="quantity++"
          >
            <i class="ri-add-line text-lg" />
          </button>
        </div>

        <!-- Add to cart button (end side: left RTL / right LTR) -->
        <button class="flex-1 h-11 rounded-[12px] bg-navbar text-white text-[13px] font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition-opacity" @click="isCartDrawerOpen = true">
          <i class="ri-shopping-cart-2-line text-lg" />
          {{ t.product.addToCart }}
        </button>
      </div>
    </Teleport>

    <!-- Mobile mini-cart drawer -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isCartDrawerOpen" class="lg:hidden fixed inset-0 z-[500] bg-black/40" @click="isCartDrawerOpen = false" />
      </Transition>

      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="translate-y-full"
        enter-to-class="translate-y-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-y-0"
        leave-to-class="translate-y-full"
      >
        <div
          v-if="isCartDrawerOpen"
          class="lg:hidden fixed bottom-0 inset-x-0 z-[510] bg-white rounded-t-[16px] flex flex-col"
          style="height: 60vh"
          :dir="t.dir"
        >
          <!-- Drag handle -->
          <div class="shrink-0 flex justify-center pt-3 pb-1">
            <span class="w-10 h-1 rounded-full bg-[#E8E8E8]" />
          </div>

          <!-- Scrollable item area -->
          <div class="flex-1 overflow-y-auto px-4 pt-3 pb-2">
            <div class="flex gap-3">
              <!-- Image -->
              <img
                :src="drawerItem.product.image"
                :alt="productName(drawerItem.product)"
                class="w-[90px] h-[90px] rounded-[8px] object-cover shrink-0"
              />

              <!-- Details -->
              <div class="flex-1 min-w-0">
                <p class="m-0 text-[13px] font-semibold text-[#091019] leading-snug line-clamp-2">
                  {{ productName(drawerItem.product) }}
                </p>
                <p class="m-0 mt-0.5 text-[11px] text-[#6F7B8B]">{{ drawerItem.product.brand.name[locale] }}</p>
                <div class="mt-1 flex items-center gap-2">
                  <span dir="ltr" class="text-[14px] font-bold text-[#091019] inline-flex items-center gap-0.5">
                    <UiRiyalSymbol v-if="locale === 'ar'" />
                    <span v-else class="text-[12px]">SAR</span>
                    {{ drawerItem.price }}
                  </span>
                  <span dir="ltr" class="text-[12px] text-[#6F7B8B] line-through inline-flex items-center gap-0.5">
                    <UiRiyalSymbol v-if="locale === 'ar'" />
                    <span v-else class="text-[11px]">SAR</span>
                    {{ drawerItem.old_price }}
                  </span>
                </div>

                <!-- Variant selects -->
                <div class="mt-2 flex items-center gap-2">
                  <div class="flex flex-col items-center gap-0.5">
                    <span class="text-[10px] text-[#6F7B8B]">{{ t.cart.quantity }}</span>
                    <div dir="ltr" class="h-8 flex items-center bg-[#F6F6F6] rounded-[8px] px-1 gap-0.5">
                      <button class="w-6 h-6 flex items-center justify-center text-[#091019]" @click="drawerItem.quantity > 1 && drawerItem.quantity--">
                        <i class="ri-subtract-line text-sm" />
                      </button>
                      <span class="w-5 text-center text-[12px] font-medium text-[#091019]">{{ drawerItem.quantity }}</span>
                      <button class="w-6 h-6 flex items-center justify-center text-[#091019]" @click="drawerItem.quantity++">
                        <i class="ri-add-line text-sm" />
                      </button>
                    </div>
                  </div>

                  <div class="flex flex-col items-center gap-0.5">
                    <span class="text-[10px] text-[#6F7B8B]">{{ t.cart.size }}</span>
                    <select v-model="drawerItem.size" class="h-8 px-2 rounded-[8px] border border-[#E8E8E8] bg-white text-[11px] text-[#091019] min-w-[52px]">
                      <option v-for="s in drawerItem.product.sizes" :key="s.id" :value="s.name.en">{{ s.name[locale] }}</option>
                    </select>
                  </div>

                  <div class="flex flex-col items-center gap-0.5">
                    <span class="text-[10px] text-[#6F7B8B]">{{ t.cart.color }}</span>
                    <select v-model="drawerItem.color" class="h-8 px-2 rounded-[8px] border border-[#E8E8E8] bg-white text-[11px] text-[#091019] min-w-[64px]">
                      <option v-for="c in drawerItem.product.colors" :key="c.id" :value="c.key">{{ c.name[locale] }}</option>
                    </select>
                  </div>
                </div>

                <!-- Delivery row -->
                <div class="mt-2 flex items-center gap-2">
                  <div class="flex-1 h-8 flex items-center gap-1.5 bg-[#F6F6F6] rounded-[8px] px-2.5 text-[#091019]">
                    <i class="ri-truck-line text-sm shrink-0" />
                    <span class="text-[10px]">{{ t.cart.deliveryBy }}</span>
                  </div>
                  <button class="text-[#FF3F3F] shrink-0" :aria-label="t.cart.remove" @click="isCartDrawerOpen = false">
                    <i class="ri-delete-bin-line text-[20px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom summary -->
          <div class="shrink-0 border-t border-[#E8E8E8] px-4 pt-3 pb-4">
            <!-- Free shipping progress -->
            <div class="flex items-center gap-2 mb-1.5">
              <i class="ri-checkbox-circle-line text-[14px] text-[#32B828] shrink-0" />
              <p class="m-0 text-[11px] font-semibold text-[#091019]">
                {{ t.cart.congratsPrefix }}
                <span class="text-[#32B828]">{{ t.cart.freeShipping }}</span>
                {{ t.cart.congratsSuffix }}
              </p>
            </div>
            <div class="h-[4px] rounded-full bg-[#E8E8E8] relative overflow-hidden mb-3">
              <div class="absolute inset-y-0 start-0 w-[62%] rounded-full bg-[#32B828]" />
            </div>

            <!-- Total -->
            <div class="flex items-center justify-between mb-3">
              <span class="text-[14px] font-bold text-[#091019]">{{ t.cart.total }}</span>
              <span dir="ltr" class="text-[15px] font-bold text-[#091019] inline-flex items-center gap-0.5">
                <UiRiyalSymbol v-if="locale === 'ar'" />
                <span v-else class="text-[13px]">SAR</span>
                {{ drawerItem.price }}
              </span>
            </div>

            <!-- Buttons -->
            <div class="flex flex-col gap-2.5">
              <NuxtLink
                :to="localePath('/cart')"
                class="w-full h-11 flex items-center justify-center rounded-[8px] bg-[#F6F6F6] border border-[#E8E8E8] text-[13px] font-semibold text-[#091019]"
                @click="isCartDrawerOpen = false"
              >
                {{ t.cart.viewCart }}
              </NuxtLink>
              <NuxtLink
                :to="localePath('/checkout')"
                class="w-full h-11 flex items-center justify-center rounded-[8px] bg-navbar text-white text-[14px] font-semibold"
                @click="isCartDrawerOpen = false"
              >
                {{ t.cart.checkout }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Size guide modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isSizeGuideOpen" class="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4" @click.self="isSizeGuideOpen = false">
          <Transition
            appear
            enter-active-class="transition-transform duration-300 ease-out"
            enter-from-class="rtl:translate-x-[60vw] ltr:-translate-x-[60vw]"
            enter-to-class="translate-x-0"
          >
            <div class="w-full max-w-[380px] max-h-[90vh] overflow-y-auto bg-white rounded-[12px] p-3" :dir="t.dir">
              <div class="flex justify-end">
                <button class="text-[#091019] hover:opacity-70 transition-opacity" @click="isSizeGuideOpen = false">
                  <i class="ri-close-line text-2xl" />
                </button>
              </div>
              <img src="/images/sizeGuide.jpg" :alt="t.product.sizeGuide" class="mt-2 w-full h-auto rounded-[8px]" />
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- Tabs / Accordion -->
    <div class="px-4 sm:px-6 lg:px-0">
      <ProductTabs />
    </div>

    <HomeCompleteLook class="!my-10 lg:!my-12" />

    <ProductRelated />

    <!-- Mobile search overlay -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isSearchOpen"
          class="lg:hidden fixed inset-0 z-[400] bg-white overflow-y-auto"
          :dir="t.dir"
        >
          <div class="flex items-center gap-3 px-4 pt-4 pb-4 border-b border-[#F0F0F0]">
            <button
              class="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[#091019] hover:bg-gray-100 transition-colors"
              aria-label="Close"
              @click="isSearchOpen = false; searchQuery = ''"
            >
              <i :class="prevIcon" class="text-xl" />
            </button>
            <div class="flex-1 flex items-center gap-2 h-10 px-3 rounded-[20px] bg-[#F6F6F6] border border-[#E8E8E8]">
              <i class="ri-search-line text-base text-[#64768C] shrink-0" />
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="searchPlaceholder"
                class="flex-1 min-w-0 bg-transparent text-[13px] text-[#091019] placeholder:text-[#64768C] outline-none"
                autofocus
              />
            </div>
          </div>

          <div class="px-4 pt-5">
            <p class="m-0 text-[14px] font-bold mb-3 text-navbar">{{ recentSearchesTitle }}</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="term in recentSearches"
                :key="term"
                class="flex items-center gap-1.5 h-8 px-3 rounded-[16px] border border-[#E8E8E8] text-[12px] font-medium text-[#091019] hover:bg-[#F6F6F6] transition-colors"
                @click="searchQuery = term"
              >
                <i class="ri-arrow-go-back-line text-[13px] text-[#64768C]" />
                {{ term }}
              </button>
            </div>
          </div>

          <div class="px-4 pt-6 pb-8">
            <p class="m-0 text-[14px] font-bold mb-3 text-navbar">{{ popularCategoriesTitle }}</p>
            <div class="flex gap-4 overflow-x-auto pb-2" style="scrollbar-width: none">
              <button
                v-for="cat in searchCategoryItems"
                :key="cat.label"
                class="flex flex-col items-center gap-2 shrink-0 hover:opacity-80 transition-opacity"
                @click="searchQuery = cat.label"
              >
                <img :src="cat.img" :alt="cat.label" class="w-14 h-14 rounded-[8px] object-cover" />
                <span class="text-[11px] font-medium text-[#091019]">{{ cat.label }}</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Share fallback modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isShareOpen"
          class="fixed inset-0 bg-black/50 z-[100] flex items-end sm:items-center justify-center p-4"
          @click.self="closeShare"
        >
          <div
            class="bg-white w-full sm:w-[420px] rounded-t-[16px] sm:rounded-[16px] shadow-[0px_10px_40px_0px_#0000001F] p-5"
            @click.stop
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="m-0 text-[15px] font-bold text-[#091019]">{{ t.product.shareTitle }}</h3>
              <button
                class="w-9 h-9 rounded-full flex items-center justify-center text-[#091019] hover:bg-gray-100 transition-colors"
                aria-label="Close"
                @click="closeShare"
              >
                <i class="ri-close-line text-xl" />
              </button>
            </div>

            <div class="grid grid-cols-4 gap-3">
              <a
                v-for="target in shareTargets"
                :key="target.key"
                :href="target.href"
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-col items-center gap-2 py-2 rounded-[10px] hover:bg-gray-50 transition-colors"
              >
                <span
                  class="w-12 h-12 rounded-full flex items-center justify-center text-white"
                  :style="{ backgroundColor: target.color }"
                >
                  <i :class="target.icon" class="text-2xl" />
                </span>
                <span class="text-[11px] text-[#091019] text-center">{{ target.label }}</span>
              </a>
            </div>

            <div class="mt-5 flex items-center gap-2 bg-[#F6F6F6] border border-[#E8E8E8] rounded-[10px] p-2">
              <span class="flex-1 min-w-0 text-[12px] text-[#64768C] truncate" dir="ltr">{{ shareUrl }}</span>
              <button
                class="shrink-0 flex items-center gap-1.5 bg-navbar text-white text-[12px] font-semibold rounded-[8px] px-3 py-2 hover:opacity-90 transition-opacity"
                @click="copyLink"
              >
                <i :class="isLinkCopied ? 'ri-check-line' : 'ri-file-copy-line'" class="text-base" />
                {{ isLinkCopied ? t.product.linkCopied : t.product.copyLink }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>
