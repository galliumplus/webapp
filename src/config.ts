const Config = {
  TESTING: false,
  API_URL: 'https://api.gallium.etiq-dijon.fr/v1',
  API_KEY: import.meta.env.VITE_API_KEY ?? '',
} as const

export default Config