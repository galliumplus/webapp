const Config = {
  TESTING: import.meta.env.VITE_TESTING === 'yes',
  API_URL: import.meta.env.VITE_API_URL ?? 'https://api.gallium.etiq-dijon.fr/v1',
  API_KEY: import.meta.env.VITE_API_KEY ?? '',
  START_OF_SCHOOL_YEAR: import.meta.env.VITE_START_OF_SCHOOL_YEAR ?? '15-08'
} as const

export default Config
