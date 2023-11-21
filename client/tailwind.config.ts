import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgba(var(--color-primary), <alpha-value>)",
        secondary: "rgba(var(--color-secondary), <alpha-value>)",
        surface: {
          "000": "rgba(var(--color-surface-000), <alpha-value>)",
          "050": "rgba(var(--color-surface-050), <alpha-value>)",
          "100": "rgba(var(--color-surface-100), <alpha-value>)",
          "150": "rgba(var(--color-surface-150), <alpha-value>)",
          "200": "rgba(var(--color-surface-200), <alpha-value>)",
          "250": "rgba(var(--color-surface-250), <alpha-value>)",
          "300": "rgba(var(--color-surface-300), <alpha-value>)",
        },
        text: "rgba(var(--color-text), <alpha-value>)",
        transparent: "transparent",
      },
    },
  },
  plugins: [],
}
export default config
