import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  googleFonts: [
    { name: 'Knewave', styles: ['400'] },
    { name: 'Roboto', styles: ['400'] },
  ],
  headerFontFamily: ['Knewave', 'serif'],
  headerColor: '#0081fd',

  bodyFontFamily: ['Roboto', 'sans-serif'],
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export const rhythm = typography.rhythm
export const scale = typography.scale
export default typography
