/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          50: '#013160',
          100: '#0a1635',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          100: '#01DA7C',
          50: '#16B598',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        openMenu: {
          '0%': {
            width: '0vw',
          },
          '100%': {
            width: 'var(--width-side-menu)',
          },
        },
        closeMenu: {
          '0%': {
            width: 'var(--width-side-menu)',
          },
          '100%': {
            width: '0vw',
          },
        },
        openMenuChildren: {
          '0%': {
            paddingLeft: '0vw',
          },
          '100%': {
            paddingLeft: 'var(--width-side-menu)',
          },
        },
        closeMenuChildren: {
          '0%': {
            paddingLeft: 'var(--width-side-menu)',
          },
          '100%': {
            paddingLeft: '0vw',
          },
        },
        openNavBar: {
          '0%': {
            width: 'w-screen',
          },
          '100%': {
            width: 'var(--width-nav-bar)',
          },
        },
        closeNavBar: {
          '0%': {
            width: 'var(--width-nav-bar)',
          },
          '100%': {
            width: 'w-screen',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        openMenu: 'openMenu 0.4s ease forwards',
        closeMenu: 'closeMenu 0.4s ease forwards',
        openMenuChildren: 'openMenuChildren 0.4s ease forwards',
        closeMenuChildren: 'closeMenuChildren 0.4s ease forwards',
        openNavBar: 'openNavBar 0.4s ease forwards',
        closeNavBar: 'closeNavBar 0.4s ease forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
