import { useLocalStorage } from '@vueuse/core'

export function useTheme() {
  const theme = useLocalStorage('vitepress-theme-appearance', () => '')
  return {
    theme,
  }
}
