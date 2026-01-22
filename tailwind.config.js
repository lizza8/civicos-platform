module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(230, 20%, 20%)",
        input: "hsl(185, 100%, 40%)",
        ring: "hsl(185, 100%, 65%)",
        background: "hsl(230, 30%, 5%)",
        foreground: "hsl(0, 0%, 98%)",
        primary: {
          DEFAULT: "hsl(185, 100%, 50%)",
          foreground: "hsl(0, 0%, 100%)",
          hover: "hsl(185, 100%, 60%)",
          active: "hsl(185, 100%, 45%)",
        },
        secondary: {
          DEFAULT: "hsl(300, 90%, 55%)",
          foreground: "hsl(0, 0%, 100%)",
          hover: "hsl(300, 90%, 60%)",
          active: "hsl(300, 90%, 45%)",
        },
        tertiary: {
          DEFAULT: "hsl(240, 40%, 20%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        accent: {
          DEFAULT: "hsl(330, 90%, 55%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        success: {
          DEFAULT: "hsl(140, 90%, 45%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        warning: {
          DEFAULT: "hsl(50, 100%, 55%)",
          foreground: "hsl(0, 0%, 10%)",
        },
        error: {
          DEFAULT: "hsl(0, 100%, 50%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        info: {
          DEFAULT: "hsl(210, 100%, 55%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        muted: {
          DEFAULT: "hsl(230, 10%, 15%)",
          foreground: "hsl(230, 10%, 55%)",
        },
        card: {
          DEFAULT: "hsla(230, 30%, 5%, 0.6)",
          foreground: "hsl(0, 0%, 98%)",
        },
        popover: {
          DEFAULT: "hsl(230, 30%, 10%)",
          foreground: "hsl(0, 0%, 98%)",
        },
        gray: {
          50: "hsl(230, 15%, 96%)",
          100: "hsl(230, 12%, 90%)",
          200: "hsl(230, 10%, 75%)",
          300: "hsl(230, 9%, 60%)",
          400: "hsl(230, 8%, 45%)",
          500: "hsl(230, 8%, 35%)",
          600: "hsl(230, 8%, 25%)",
          700: "hsl(230, 10%, 15%)",
          800: "hsl(230, 12%, 10%)",
          900: "hsl(230, 15%, 5%)",
        },
      },
      fontFamily: {
        sans: ["Geist", "Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      fontSize: {
        h1: ["40px", { lineHeight: "48px", fontWeight: "500" }],
        h2: ["32px", { lineHeight: "40px", fontWeight: "500" }],
        h3: ["24px", { lineHeight: "32px", fontWeight: "500" }],
        h4: ["20px", { lineHeight: "28px", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "300" }],
        caption: ["12px", { lineHeight: "16px", fontWeight: "300" }],
      },
      spacing: {
        1: "4px",
        2: "8px",
        4: "16px",
        6: "24px",
        8: "32px",
        12: "48px",
        16: "64px",
        18: "72px",
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px hsla(230, 50%, 10%, 0.4)",
        md: "0 4px 8px hsla(230, 60%, 10%, 0.5)",
        lg: "0 6px 16px hsla(230, 70%, 10%, 0.6)",
        xl: "0 12px 32px hsla(230, 80%, 10%, 0.7)",
        glow: "0 0 12px hsla(185, 100%, 50%, 0.5)",
        "glow-hover": "0 0 16px hsla(185, 100%, 50%, 0.7)",
        "card-hover": "0 0 16px hsla(185, 100%, 50%, 0.2)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, hsl(185, 100%, 45%), hsl(300, 90%, 55%))",
        "gradient-secondary": "linear-gradient(135deg, hsl(300, 90%, 55%), hsl(330, 90%, 55%))",
        "gradient-accent": "linear-gradient(90deg, hsl(185, 100%, 45%), hsl(140, 90%, 45%))",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "300ms",
        slow: "600ms",
      },
      transitionTimingFunction: {
        "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
        "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
        "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 12px hsla(185, 100%, 50%, 0.5)" },
          "50%": { boxShadow: "0 0 20px hsla(185, 100%, 50%, 0.8)" },
        },
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
