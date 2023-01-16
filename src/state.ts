export const isDark = useDark()
export const showHelp = ref(false)
export const showSettings = ref(false)
export const isPassed = ref(false)
export const isCheating = ref(false)
const params = new URLSearchParams(window.location.search)
export const isDev = import.meta.hot || params.get('dev') === 'hey'
