/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  bracketSameLine: true, // <--- Garde le '>' sur la même ligne
  printWidth: 100, // (Optionnel) Augmente la longueur de ligne pour éviter qu'il découpe trop vite
  semi: true,
  singleQuote: true,
  tabWidth: 2,
};
