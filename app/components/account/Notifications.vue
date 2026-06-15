<script setup lang="ts">
const { t, locale, localePath } = useLocale()
const { open } = useAccountNav()

const user = {
  name: 'Mostafa samy',
  email: 'mjihad84@gmail.com',
  balance: '0.00',
  avatar: '/images/user.jpg',
}

const today = [
  {
    id: 1,
    unread: true,
    message: {
      ar: '📦 تم تجهيز طلبك وسيتم شحنه قريبًا! شكرًا لتسوقك معنا.',
      en: '📦 Your order has been prepared and will be shipped soon! Thanks for shopping with us.',
    },
  },
  {
    id: 2,
    unread: true,
    message: {
      ar: '🎟️ كوبون خصم خاص لك! استخدم الكود [CODE] واستمتع بخصم ٪20 على طلبك الأول!',
      en: '🎟️ A special discount coupon for you! Use code [CODE] and enjoy 20% off your first order!',
    },
  },
  {
    id: 3,
    unread: true,
    message: {
      ar: '⚠️ لقد تم تسجيل دخول جديد إلى حسابك، إذا لم تكن أنت، يرجى تغيير كلمة المرور فورًا.',
      en: '⚠️ A new login to your account was detected. If it was not you, please change your password immediately.',
    },
  },
]

const thisWeek = [
  {
    id: 4,
    unread: false,
    message: {
      ar: '🛍️ هل نسيت شيئًا؟ منتجاتك المفضلة لا تزال في سلة التسوق، أكمل طلبك الآن قبل نفاد الكمية!',
      en: '🛍️ Forgot something? Your favorite products are still in the cart — complete your order before they run out!',
    },
  },
  {
    id: 5,
    unread: false,
    message: {
      ar: '💳 تبقى خطوة واحدة! أنهِ عملية الدفع الآن واستمتع بتجربة تسوق رائعة!',
      en: '💳 One step left! Complete your payment now and enjoy a great shopping experience!',
    },
  },
]
</script>

<template>
  <div>
    <!-- ═══════════════════════════════════════
         DESKTOP LAYOUT
    ═══════════════════════════════════════ -->
    <main class="hidden lg:block max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 py-6 min-h-[60vh]">
      <nav class="flex items-center gap-1.5 text-[12px]">
        <NuxtLink :to="localePath('/')" class="text-[#64768C] hover:underline">{{ t.shop.home }}</NuxtLink>
        <span class="text-[#64768C]">/</span>
        <span class="text-[#091019]">{{ t.account.myAccount }}</span>
      </nav>

      <div class="mt-6 grid gap-6 lg:grid-cols-[260px_1fr] items-start">
        <AccountSidebar active="notifications" />

        <section class="bg-white border border-gray-100 rounded-[12px] shadow-[0px_4px_20px_0px_#6464640D] p-6">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h1 class="m-0 text-[16px] font-bold text-[#091019]">{{ t.account.notifications }}</h1>
              <p class="m-0 mt-1 text-[12px] text-[#64768C]">{{ t.account.notificationsSubtitle }}</p>
            </div>
            <button class="mt-1 text-[13px] font-semibold text-navbar hover:underline">
              {{ t.account.markAllRead }}
            </button>
          </div>

          <template v-for="group in [{ label: t.account.today, items: today }, { label: t.account.thisWeek, items: thisWeek }]" :key="group.label">
            <p class="m-0 mt-5 text-[13px] font-bold text-[#091019]">{{ group.label }}</p>

            <div class="mt-3 flex flex-col gap-3">
              <div
                v-for="notification in group.items"
                :key="notification.id"
                class="rounded-[16px] border border-[#E7E7E7] p-4 flex items-start gap-3"
                :class="notification.unread ? 'bg-[#F6F6F6]' : 'bg-white'"
              >
                <span class="relative shrink-0 mt-1">
                  <i class="ri-notification-3-line text-xl text-[#091019]" />
                  <span class="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#D4342A] border-2 border-white" />
                </span>
                <div class="min-w-0">
                  <img src="/images/brandLogo2.png" alt="RIYA" class="h-[15px] w-[55px] object-contain" />
                  <p class="m-0 mt-1.5 text-[12px] text-[#091019] leading-relaxed">{{ notification.message[locale] }}</p>
                  <p class="m-0 mt-1 text-[11px] text-[#64768C]">{{ t.account.timeAgo }}</p>
                </div>
              </div>
            </div>
          </template>
        </section>
      </div>
    </main>

    <!-- ═══════════════════════════════════════
         MOBILE LAYOUT
    ═══════════════════════════════════════ -->
    <div class="lg:hidden bg-[#F6F6F6]" :dir="t.dir">
      <!-- Page header -->
      <div class="bg-white px-4 h-14 flex items-center justify-between">
        <button class="w-8 h-8 flex items-center justify-center" @click="open">
          <i class="ri-menu-line text-xl text-[#091019]" />
        </button>
        <h1 class="m-0 text-[15px] font-bold text-[#091019]">{{ t.account.notifications }}</h1>
        <div class="w-8" />
      </div>

      <!-- Profile card -->
      <div class="bg-white mt-3 mx-4 rounded-[16px] px-4 py-5 flex flex-col items-center shadow-[0px_4px_20px_0px_#64646412]">
        <div class="relative">
          <img :src="user.avatar" :alt="user.name" class="w-[80px] h-[80px] rounded-full object-cover" />
          <button class="absolute bottom-0 start-0 w-6 h-6 rounded-full bg-icon-circle text-white flex items-center justify-center">
            <i class="ri-pencil-line text-[11px]" />
          </button>
        </div>
        <p class="m-0 mt-3 text-[15px] font-bold text-[#091019]" dir="ltr">{{ user.name }}</p>
        <p class="m-0 mt-0.5 text-[12px] text-[#64768C]" dir="ltr">{{ user.email }}</p>
        <p class="m-0 mt-2 text-[13px] font-bold text-[#FF3F3F]">
          {{ t.account.balance }} : <span dir="ltr">{{ user.balance }}</span>
        </p>
      </div>

      <!-- Mark all read -->
      <div class="mt-3 mx-4 flex justify-end">
        <button class="text-[13px] font-semibold text-navbar">
          {{ t.account.markAllRead }}
        </button>
      </div>

      <!-- Notification groups -->
      <div class="mt-2 mx-4 flex flex-col gap-4 pb-4">
        <template v-for="group in [{ label: t.account.today, items: today }, { label: t.account.thisWeek, items: thisWeek }]" :key="group.label">
          <div>
            <p class="m-0 mb-2 text-[13px] font-bold text-[#091019]">{{ group.label }}</p>
            <div class="flex flex-col gap-2.5">
              <div
                v-for="notification in group.items"
                :key="notification.id"
                class="rounded-[16px] border border-[#E7E7E7] px-4 py-3.5 flex items-start gap-3"
                :class="notification.unread ? 'bg-white' : 'bg-white'"
              >
                <span class="relative shrink-0 mt-0.5">
                  <i class="ri-notification-3-line text-xl text-[#091019]" />
                  <span v-if="notification.unread" class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#D4342A] border-2 border-white" />
                </span>
                <div class="min-w-0 flex-1">
                  <img src="/images/brandLogo2.png" alt="RIYA" class="h-[14px] w-[50px] object-contain" />
                  <p class="m-0 mt-1.5 text-[12px] text-[#091019] leading-relaxed">{{ notification.message[locale] }}</p>
                  <p class="m-0 mt-1 text-[11px] text-[#64768C]">{{ t.account.timeAgo }}</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <AccountNavDrawer />
  </div>
</template>
