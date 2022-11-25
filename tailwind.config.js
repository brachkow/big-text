/** @type {import('tailwindcss').Config} */

const spacing = (base, limit, unit = 'px', prefix = '') => {
  const output = {};
  let n = 1;
  let value;

  do {
    value = base * n;
    output[prefix ? `${prefix}-${value}` : value] = `${value}${unit}`;
    n++;
  } while (value <= limit);

  return output;
};

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    spacing: {
      0: 0,
      ...spacing(8, 256),
      ...spacing(5, 100, 'vh', 'screen'),
    },
    colors: {
      black: { DEFAULT: 'black' },
      gray: { DEFAULT: 'gray' },
    },
    extend: {},
  },
  plugins: [],
};
