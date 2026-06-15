<script setup lang="ts">
const { t, locale, localePath } = useLocale();

// ── Swipeable image feed ──────────────────────────
const images = ["/images/f1.png", "/images/f2.png", "/images/f3.png"];
const currentIndex = ref(0);
const swipeDir = ref<"up" | "down">("up");

let touchStartY = 0;

const goNext = () => {
  swipeDir.value = "up";
  currentIndex.value = (currentIndex.value + 1) % images.length;
};
const goPrev = () => {
  swipeDir.value = "down";
  currentIndex.value =
    (currentIndex.value - 1 + images.length) % images.length;
};

const onTouchStart = (e: TouchEvent) => {
  touchStartY = e.touches[0]?.clientY ?? 0;
};

const onTouchEnd = (e: TouchEvent) => {
  const diff = touchStartY - (e.changedTouches[0]?.clientY ?? 0);
  if (Math.abs(diff) < 50) return;
  diff > 0 ? goNext() : goPrev();
};

let wheelLockedUntil = 0;
const onWheel = (e: WheelEvent) => {
  if (Math.abs(e.deltaY) < 30) return;
  const now = Date.now();
  if (now < wheelLockedUntil) return;
  wheelLockedUntil = now + 450;
  e.deltaY > 0 ? goNext() : goPrev();
};

let mouseStartY = 0;

const finishMouseDrag = (e: MouseEvent) => {
  window.removeEventListener("mouseup", finishMouseDrag);
  const diff = mouseStartY - e.clientY;
  if (Math.abs(diff) < 50) return;
  diff > 0 ? goNext() : goPrev();
};

const onMouseDown = (e: MouseEvent) => {
  if (e.button !== 0) return;
  e.preventDefault();
  mouseStartY = e.clientY;
  window.addEventListener("mouseup", finishMouseDrag, { once: true });
};

// ── Search overlay ───────────────────────────────
const showSearch = ref(false)
const searchQuery = ref('')

const recentSearches = computed(() =>
  locale.value === 'ar'
    ? ['طقم', 'سف', 'BY', 'فستان', 'سف', 'طق', 'سف']
    : ['Set', 'Dress', 'BY', 'Jeans', 'Top', 'Skirt', 'Blouse']
)

const categories = computed(() => [
  { label: locale.value === 'ar' ? 'أطقم'      : 'Sets',       img: '/images/pn1.png' },
  { label: locale.value === 'ar' ? 'بناطيل'    : 'Pants',      img: '/images/pn3.png' },
  { label: locale.value === 'ar' ? 'تنانير'    : 'Skirts',     img: '/images/pn5.png' },
  { label: locale.value === 'ar' ? 'ملابس نوم' : 'Sleepwear',  img: '/images/pn7.png' },
  { label: locale.value === 'ar' ? 'جينز'      : 'Jeans',      img: '/images/pn9.png' },
])

const recentTitle    = computed(() => locale.value === 'ar' ? 'عمليات البحث الرائجة' : 'Recent Searches')
const categoriesTitle = computed(() => locale.value === 'ar' ? 'الأقسام الشائعة' : 'Popular Categories')
const searchPlaceholder = computed(() => locale.value === 'ar' ? 'ابحثي هنا...' : 'Search here...')
const backIcon = computed(() => locale.value === 'ar' ? 'ri-arrow-right-line' : 'ri-arrow-left-line')

// ── Like / Save toggle ────────────────────────────
const liked = ref(false);
const saved = ref(false);

// ── Size selection ────────────────────────────────
const selectedSizeId = ref(5);

// ── Share ─────────────────────────────────────────
const shareCurrent = async () => {
  if (typeof window === "undefined") return;
  const data = { title: productName.value, url: window.location.href };
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share(data);
      return;
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return;
    }
  }
  try {
    await navigator.clipboard.writeText(data.url);
  } catch {
    // best-effort
  }
};

const fillSearch = (term: string) => {
  searchQuery.value = term;
};

// ── Comments drawer ───────────────────────────────
const showComments = ref(false);

const comments = computed(() => [
  {
    id: 1,
    name: locale.value === "ar" ? "سارة حمدي" : "Sara Hamdi",
    avatar: "/images/user1.jpg",
    text:
      locale.value === "ar"
        ? "نصيحة اليوم: استخدم دائمًا واقي الشمس حتى في الأيام الغائمة! بشرتك تحتاج إلى الحماية طوال العام."
        : "Tip of the day: Always use sunscreen even on cloudy days! Your skin needs protection all year long.",
    replies: 0,
  },
  {
    id: 2,
    name: locale.value === "ar" ? "منال مصطفي" : "Manal Mostafa",
    avatar: "/images/user4.jpg",
    text:
      locale.value === "ar"
        ? "نصيحة اليوم: استخدم دائمًا واقي الشمس حتى في الأيام الغائمة! 🌟 بشرتك تحتاج إلى الحماية طوال العام."
        : "Tip of the day: Always use sunscreen even on cloudy days! 🌟 Your skin needs protection all year long.",
    replies: 3,
  },
  {
    id: 3,
    name: locale.value === "ar" ? "راندا اشرف" : "Randa Ashraf",
    avatar: "/images/user1.jpg",
    text:
      locale.value === "ar"
        ? "نصيحة اليوم: استخدم دائمًا واقي الشمس حتى في الأيام الغائمة! بشرتك تحتاج إلى الحماية طوال العام."
        : "Tip of the day: Always use sunscreen even on cloudy days! Your skin needs protection all year long.",
    replies: 0,
  },
]);

const commentsTitle = computed(() =>
  locale.value === "ar" ? "التعليقات" : "Comments",
);
const viewReplies = computed(
  () => (n: number) =>
    locale.value === "ar" ? `عرض ${n} من الردود` : `View ${n} replies`,
);
const commentBtnText = computed(() =>
  locale.value === "ar" ? "تعليق" : "Post",
);
const inputPlaceholder = computed(() =>
  locale.value === "ar" ? "اكتب تعليقاً" : "Write a comment…",
);

watch(showComments, (val) => {
  if (import.meta.client) document.body.style.overflow = val ? "hidden" : "";
});

// ── Scroll hint ───────────────────────────────────
const showHint = ref(false);

onMounted(() => {
  setTimeout(() => {
    showHint.value = true;
  }, 1000);
  setTimeout(() => {
    showHint.value = false;
  }, 3000);
});

// ── Static data ───────────────────────────────────
const colors = [
  { id: 1, hex: "#1B3A7A" },
  { id: 2, hex: "#22A55A" },
  { id: 3, hex: "#C9B99A" },
  { id: 4, hex: "#7EC8B0" },
  { id: 5, hex: "#E03535" },
  { id: 6, hex: "#0D1B2A" },
  { id: 7, hex: "#C9A84C" },
];

const sizes = [
  { id: 1, label: "XL", state: "normal" },
  { id: 2, label: "XL", state: "normal" },
  { id: 3, label: locale.value === "ar" ? "أخر 2" : "Last 2", state: "danger" },
  { id: 4, label: "L", state: "normal" },
  { id: 5, label: "M", state: "active" },
  { id: 6, label: "S", state: "normal" },
];

const actions = computed(() => [
  {
    icon: "ri-shopping-cart-line",
    label: locale.value === "ar" ? "شراء" : "Buy",
  },
  {
    icon: "ri-share-forward-line",
    label: locale.value === "ar" ? "مشارك" : "Share",
  },
  {
    icon: "ri-message-3-line",
    label: locale.value === "ar" ? "تعليق" : "Comment",
  },
  { icon: "ri-heart-line", label: locale.value === "ar" ? "أعجب" : "Like" },
  { icon: "ri-bookmark-line", label: locale.value === "ar" ? "حفظ" : "Save" },
]);

const productName = computed(() =>
  locale.value === "ar"
    ? "طقم ثنورة محبوكة منقوشة بياقة هالتر للنساء"
    : "Women halter neck patterned knitted skirt set",
);
const colorsLabel = computed(() =>
  locale.value === "ar" ? "الألوان" : "Colors",
);
const sizesLabel = computed(() =>
  locale.value === "ar" ? "المقاسات" : "Sizes",
);
const addToCart = computed(() =>
  locale.value === "ar" ? "اضغط هنا" : "Add to cart",
);
const styleLabel = computed(() => (locale.value === "ar" ? "ستايل" : "Style"));
</script>

<template>
  <div
    class="relative w-full h-screen lg:h-[calc(100vh-90px)] lg:bg-[#0a0a0a] lg:flex lg:items-center lg:justify-center overflow-hidden"
  >
    <div
      class="relative w-full h-full lg:w-[min(440px,calc((100vh-130px)*0.5625))] lg:h-[min(800px,calc(100vh-130px))] lg:rounded-[24px] lg:overflow-hidden lg:shadow-[0_20px_60px_rgba(0,0,0,0.6)] lg:cursor-grab lg:active:cursor-grabbing select-none"
      :dir="t.dir"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
      @wheel.passive="onWheel"
      @mousedown="onMouseDown"
    >
    <!-- ── Full-screen image with reel-style slide transition ── -->
    <Transition
      :enter-from-class="
        swipeDir === 'up' ? 'translate-y-full' : '-translate-y-full'
      "
      enter-to-class="translate-y-0"
      enter-active-class="transition-transform duration-[350ms] ease-out"
      leave-from-class="translate-y-0"
      :leave-to-class="
        swipeDir === 'up' ? '-translate-y-full' : 'translate-y-full'
      "
      leave-active-class="transition-transform duration-[350ms] ease-out"
    >
      <img
        :key="currentIndex"
        :src="images[currentIndex]"
        alt="style"
        draggable="false"
        class="absolute inset-0 w-full h-full object-cover object-top select-none"
      />
    </Transition>

    <!-- Dark gradient overlay -->
    <div
      class="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
      style="
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.45) 0%,
          transparent 100%
        );
      "
    />

    <!-- ── Top bar ── -->
    <div
      class="absolute top-0 inset-x-0 flex items-center justify-between px-4 pt-10 pb-3"
    >
      <button
        class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
        aria-label="Search"
        @click="showSearch = true"
      >
        <i class="ri-search-line text-[18px]" style="color: #390049" />
      </button>
      <div class="flex flex-col items-center">
        <span class="text-white text-[15px] font-bold tracking-wide">{{
          styleLabel
        }}</span>
        <div class="mt-0.5 w-8 h-[2px] bg-white rounded-full" />
      </div>
      <NuxtLink
        :to="localePath('/cart')"
        class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
        aria-label="Cart"
      >
        <i class="ri-shopping-cart-line text-[18px]" style="color: #390049" />
      </NuxtLink>
    </div>

    <!-- ── Side action icons ── -->
    <div
      class="absolute start-3 bottom-[120px] flex flex-col items-center gap-5"
    >
      <div
        v-for="(action, i) in actions"
        :key="action.label"
        class="flex flex-col items-center gap-1"
      >
        <button
          class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
          :aria-label="action.label"
          @click="
            i === 0
              ? $router.push(localePath('/shop'))
              : i === 1
                ? shareCurrent()
                : i === 2
                  ? (showComments = true)
                  : i === 3
                    ? (liked = !liked)
                    : i === 4
                      ? (saved = !saved)
                      : undefined
          "
        >
          <i
            :class="[
              i === 3
                ? liked
                  ? 'ri-heart-fill'
                  : 'ri-heart-line'
                : i === 4
                  ? saved
                    ? 'ri-bookmark-fill'
                    : 'ri-bookmark-line'
                  : action.icon,
              'text-[18px]',
            ]"
            :style="
              i === 3
                ? `color: ${liked ? '#FF3F3F' : '#390049'}`
                : i === 4
                  ? `color: ${saved ? '#32B828' : '#390049'}`
                  : 'color: #390049'
            "
          />
        </button>
        <span class="text-white text-[10px] font-semibold drop-shadow">{{
          action.label
        }}</span>
      </div>
    </div>

    <!-- ── Info box ── -->
    <div
      class="absolute bottom-[120px] end-3 w-[240px] rounded-[8px] p-3"
      style="background: #ffffffcc"
    >
      <p class="m-0 text-[12px] font-bold text-[#091019] leading-snug">
        {{ productName }}
      </p>

      <div class="mt-2 flex items-center gap-2 flex-wrap">
        <span
          dir="ltr"
          class="text-[14px] font-bold text-[#091019] inline-flex items-center gap-0.5"
        >
          <UiRiyalSymbol /> 200
        </span>
        <span
          dir="ltr"
          class="text-[11px] text-[#64768C] line-through inline-flex items-center gap-0.5"
        >
          <UiRiyalSymbol /> 95.00
        </span>
        <span dir="ltr" class="text-[11px] font-bold text-[#FF3F3F]">-20</span>
      </div>

      <div class="mt-2">
        <p class="m-0 text-[10px] text-[#64768C]">{{ colorsLabel }}</p>
        <div class="mt-1 flex items-center gap-1.5">
          <span
            v-for="color in colors"
            :key="color.id"
            class="w-5 h-5 rounded-full shrink-0 border border-white"
            :style="{ backgroundColor: color.hex }"
          />
        </div>
      </div>

      <div class="mt-2">
        <p class="m-0 text-[10px] text-[#64768C]">{{ sizesLabel }}</p>
        <div class="mt-1 flex items-center gap-1 flex-wrap">
          <button
            v-for="size in sizes"
            :key="size.id"
            class="h-6 px-2 rounded-[4px] text-[10px] font-semibold border transition-colors hover:bg-[#F6F6F6]"
            :class="{
              'border-[#390049] text-[#390049] bg-[#39004910]':
                selectedSizeId === size.id,
              'border-[#FF3F3F] text-[#FF3F3F]':
                selectedSizeId !== size.id && size.state === 'danger',
              'border-[#E8E8E8] text-[#64768C] bg-white':
                selectedSizeId !== size.id && size.state !== 'danger',
            }"
            @click="selectedSizeId = size.id"
          >
            {{ size.label }}
          </button>
        </div>
      </div>

      <button
        class="mt-3 w-full h-9 rounded-[16px] text-white text-[12px] font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        style="background: #390049"
      >
        <i class="ri-shopping-cart-line text-[14px]" />
        {{ addToCart }}
      </button>
    </div>

    <!-- ── Search overlay ── -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showSearch"
        class="absolute inset-0 z-[250] bg-white overflow-y-auto"
        :dir="t.dir"
      >
        <!-- Search input bar -->
        <div class="flex items-center gap-3 px-4 pt-12 pb-4 border-b border-[#F0F0F0]">
          <button @click="showSearch = false; searchQuery = ''">
            <i :class="backIcon" class="text-xl text-[#091019]" />
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

        <!-- Recent searches -->
        <div class="px-4 pt-5">
          <p class="m-0 text-[14px] font-bold mb-3" style="color: #390049">{{ recentTitle }}</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="term in recentSearches"
              :key="term"
              class="flex items-center gap-1.5 h-8 px-3 rounded-[16px] border text-[12px] font-medium text-[#091019] hover:bg-[#F6F6F6] transition-colors"
              style="border-color: #E8E8E8"
              @click="fillSearch(term)"
            >
              <i class="ri-arrow-go-back-line text-[13px] text-[#64768C]" />
              {{ term }}
            </button>
          </div>
        </div>

        <!-- Popular categories -->
        <div class="px-4 pt-6">
          <p class="m-0 text-[14px] font-bold mb-3" style="color: #390049">{{ categoriesTitle }}</p>
          <div class="flex gap-4 overflow-x-auto pb-2" style="scrollbar-width: none">
            <button
              v-for="cat in categories"
              :key="cat.label"
              class="flex flex-col items-center gap-2 shrink-0 hover:opacity-80 transition-opacity"
              @click="fillSearch(cat.label)"
            >
              <img
                :src="cat.img"
                :alt="cat.label"
                class="object-cover"
                style="width: 55px; height: 55px; border-radius: 8px"
              />
              <span class="text-[11px] font-medium text-[#091019]">{{ cat.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ── Scroll hint overlay ── -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showHint"
        class="absolute inset-0 z-[300] flex items-center justify-center pointer-events-none"
        style="background: #00000080"
      >
        <img
          src="/images/scrollHand.gif"
          alt=""
          class="w-32 h-32 object-contain"
        />
      </div>
    </Transition>
    </div>
  </div>

  <!-- ── Comments drawer (teleported outside overflow-hidden) ── -->
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showComments"
        class="fixed inset-0 bg-black/40 z-[500]"
        @click="showComments = false"
      />
    </Transition>

    <!-- Sheet -->
    <Transition
      enter-active-class="transition-transform duration-350 ease-out"
      enter-from-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-y-0"
      leave-to-class="translate-y-full"
    >
      <div
        v-if="showComments"
        class="fixed bottom-0 inset-x-0 z-[510] bg-white flex flex-col"
        style="height: 70vh; border-radius: 16px 16px 0 0"
        :dir="t.dir"
      >
        <!-- Drag handle -->
        <div class="flex justify-center pt-3 pb-1 shrink-0">
          <div class="w-10 h-1 rounded-full bg-[#E8E8E8]" />
        </div>

        <!-- Header -->
        <div class="px-4 pb-3 text-center shrink-0">
          <h3 class="m-0 text-[15px] font-bold text-[#091019]">
            {{ commentsTitle }}
          </h3>
        </div>

        <!-- Comments list -->
        <div class="flex-1 overflow-y-auto px-4">
          <div v-for="comment in comments" :key="comment.id" class="mb-5">
            <!-- User row -->
            <div class="flex items-center gap-2 mb-2">
              <img
                :src="comment.avatar"
                :alt="comment.name"
                class="w-8 h-8 rounded-full object-cover shrink-0"
              />
              <span class="text-[13px] font-bold text-[#091019]">{{
                comment.name
              }}</span>
            </div>

            <!-- Comment text -->
            <p class="m-0 text-[12px] text-[#64768C] leading-relaxed">
              {{ comment.text }}
            </p>

            <!-- Icon row -->
            <div class="mt-2 flex items-center gap-3">
              <button class="flex items-center gap-1 text-[#64768C]">
                <i class="ri-message-3-line text-[15px]" />
              </button>
              <button class="flex items-center gap-1 text-[#64768C]">
                <i class="ri-heart-line text-[15px]" />
              </button>
            </div>

            <!-- View replies -->
            <button
              v-if="comment.replies > 0"
              class="mt-1.5 flex items-center gap-1 text-[12px] font-semibold"
              style="color: #390049"
            >
              <i class="ri-arrow-down-s-line text-base" />
              {{ viewReplies(comment.replies) }}
            </button>
          </div>
        </div>

        <!-- Input bar -->
        <!-- DOM order (flex): [avatar][input][image-icon][post-btn]
             RTL: avatar on right, post-btn on left
             LTR: avatar on left, post-btn on right -->
        <div
          class="shrink-0 px-4 py-3 flex items-center gap-2 border-t border-[#F0F0F0]"
        >
          <img
            src="/images/user1.jpg"
            alt=""
            class="w-8 h-8 rounded-full object-cover shrink-0"
          />
          <input
            type="text"
            :placeholder="inputPlaceholder"
            class="flex-1 min-w-0 h-9 px-3 text-[12px] text-[#091019] placeholder:text-[#64768C] outline-none border border-[#E8E8E8] rounded-[24px]"
          />
          <button>
            <i class="ri-image-line text-[20px]" style="color: #32b828" />
          </button>
          <button
            class="h-8 px-3 rounded-[8px] text-white text-[12px] font-bold shrink-0"
            style="background: #390049"
          >
            {{ commentBtnText }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
