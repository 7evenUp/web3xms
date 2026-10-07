/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "small-phone": "380px",
        "phone": "480px",
        "2md": "860px",
        '3xl': '1919px',
        'extra': '1921px',
        'extra2': '2500px'
      },
      colors: {
        black: '#141831',
        red: '#FF4654',
        gray: '#5772A1',
        yellow: '#FAC70E',
        blue: "#7DC7EB"
      },
      fontFamily: {
        'docker-one': ['"Docker One"', 'sans-serif'],
        'paperfiller': ['Paperfiller', 'sans-serif'],
        'damn': ['Damn', 'sans-serif'],
        'circe-bold': ['"Circe Bold"', 'sans-serif'],
        'circe-regular': ['"Circe Regular"', 'sans-serif'],
        'drukCyr': ['DrukCyr', 'sans-serif']
      },
      keyframes: {
        // Sound-Visualizer
        "scale-h-sm": {
          '0%, 100%': {transform: "scaleY(1)"},
          '50%': {transform: "scaleY(0.5)"}
        },
        "scale-h-md": {
          '0%, 100%': {transform: "scaleY(1)"},
          '50%': {transform: "scaleY(0.75)"}
        },
        // Accordion
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        // Dialog
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        // Sound-Visualizer
        "scale-h-sm": "scale-h-sm 0.6s ease-in-out infinite",
        "scale-h-md": "scale-h-md 0.6s ease-in-out infinite",
        // Accordion
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Dialog
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

