import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
    ['basetext', 'text-center text-gray-700 dark:text-gray-200'],
    ['block-div', 'w-15 h-15 b-0'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  rules: [
    [/^(?:border|b)-(tl|tr|bl|br)-(r)(?:-(\d+))?/, (match) => {
      if (match[1] === 'tl')
        return { 'border-top-left-radius': `${match[3]}px` }
      else if (match[1] === 'tr')
        return { 'border-top-right-radius': `${match[3]}px` }
      else if (match[1] === 'bl')
        return { 'border-bottom-left-radius': `${match[3]}px` }
      else if (match[1] === 'br')
        return { 'border-bottom-right-radius' : `${match[3]}px` }
    }],
  ]
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
