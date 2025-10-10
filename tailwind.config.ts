/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
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
          50: 'hsl(var(--primary-50))',
          100: 'hsl(var(--primary-100))',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          50: 'hsl(var(--secondary-50))',
          100: 'hsl(var(--secondary-100))',
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
        opacityUp: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        opacityDown: {
          '0%': {
            opacity: '1',
          },
          '40%': {
            opacity: '1',
          },
          '75%': {
            opacity: '0.8',
          },
          '80%': {
            opacity: '0.6',
          },
          '90%': {
            opacity: '0.3',
          },
          '100%': {
            opacity: '0',
            display: 'none',
          },
        },
        confettiLeft: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, -18vh, 0) rotate(0deg) scale(0.9)',
            filter: 'brightness(1)',
          },
          '15%': {
            opacity: '1',
          },
          '55%': {
            opacity: '1',
            filter: 'brightness(1.05)',
          },
          '100%': {
            opacity: '0',
            transform: 'translate3d(-14vw, 68vh, 0) rotate(-360deg) scale(1.1)',
            filter: 'brightness(1.1)',
          },
        },
        confettiRight: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, -20vh, 0) rotate(0deg) scale(0.9)',
            filter: 'brightness(1)',
          },
          '15%': {
            opacity: '1',
          },
          '55%': {
            opacity: '1',
            filter: 'brightness(1.05)',
          },
          '100%': {
            opacity: '0',
            transform: 'translate3d(15vw, 70vh, 0) rotate(360deg) scale(1.1)',
            filter: 'brightness(1.1)',
          },
        },
        confettiCenter: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, -16vh, 0) rotate(0deg) scale(0.95)',
            filter: 'brightness(1)',
          },
          '20%': {
            opacity: '1',
          },
          '60%': {
            opacity: '1',
            filter: 'brightness(1.05)',
          },
          '100%': {
            opacity: '0',
            transform: 'translate3d(0, 66vh, 0) rotate(360deg) scale(1.12)',
            filter: 'brightness(1.1)',
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
        opacityUp: 'opacityUp 0.4s ease-out',
        opacityDown: 'opacityDown 5s ease forwards',
        'confetti-left': 'confettiLeft 2.8s ease-out forwards',
        'confetti-right': 'confettiRight 2.8s ease-out forwards',
        'confetti-center': 'confettiCenter 2.8s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
