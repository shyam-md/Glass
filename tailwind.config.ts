import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        surface: 'rgba(255,255,255,0.12)',
        line: 'rgba(255,255,255,0.18)',
        accent: '#74c0fc',
        accent2: '#b197fc',
        ink: '#e8f1ff'
      },
      backdropBlur: {
        xs: '6px'
      },
      boxShadow: {
        glass: '0 12px 30px rgba(0,0,0,0.25)',
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 30px 60px rgba(52, 152, 219, 0.12)'
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at 20% 20%, rgba(116,192,252,0.26), transparent 30%), radial-gradient(circle at 80% 0%, rgba(177,151,252,0.22), transparent 25%), linear-gradient(180deg, #0b1020 0%, #11182e 55%, #0a0f1d 100%)'
      }
    }
  },
  plugins: []
};

export default config;
