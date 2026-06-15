export const useAccountNav = () => {
  const navOpen = useState<boolean>('accountNavOpen', () => false)
  const open = () => { navOpen.value = true }
  const close = () => { navOpen.value = false }
  return { navOpen, open, close }
}
