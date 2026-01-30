import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        next: {
          dark: "#0F172A",    // Azul Profundo
          blue: "#2563EB",    // Azul Destaque
          light: "#EFF6FF",   
          accent: "#1E293B",  
        },
        brand: {
          bg: "#FFFFFF",      
          ghost: "#F8FAFC",   // Cinza-branqueado
          text: "#334155",    
          muted: "#64748B",   
        }
      },
      borderRadius: {
        'next': '12px',
      },
    },
  },
  plugins: [],
};
export default config;