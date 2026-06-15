import ar from '~/locales/ar'
import en from '~/locales/en'

export type LocaleKey = 'ar' | 'en'
export type Translations = typeof ar

export const useLocale = () => {
  const route = useRoute()

  const locale = computed<LocaleKey>(() =>
    route.path.startsWith('/en') ? 'en' : 'ar',
  )

  const t = computed<Translations>(() => (locale.value === 'en' ? en : ar))

  const localePath = (path: string) => `/${locale.value}${path === '/' ? '' : path}`

  const switchLocalePath = computed(() => {
    const other: LocaleKey = locale.value === 'ar' ? 'en' : 'ar'
    const stripped = route.path.replace(/^\/(ar|en)/, '')
    return `/${other}${stripped}`
  })

  return { locale, t, localePath, switchLocalePath }
}
