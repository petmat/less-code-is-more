import Typography from 'typography'
import Lincoln from 'typography-theme-lincoln'

Lincoln.overrideThemeStyles = ({ rhytm }, options) => ({
  'h1,h2,h3': {
    color: '#d6deeb',
  },
})

const typography = new Typography(Lincoln)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
