import { create } from 'zustand'

export interface Brand {
  id: string
  name: string
  niche: string
  tone: string
  target_audience: string
  content_goal: string
}

interface BrandStore {
  brands: Brand[]
  activeBrand: Brand | null
  setBrands: (brands: Brand[]) => void
  setActiveBrand: (brand: Brand) => void
}

export const useBrandStore = create<BrandStore>((set) => ({
  brands: [],
  activeBrand: null,
  setBrands: (brands) => set({ brands, activeBrand: brands[0] || null }),
  setActiveBrand: (brand) => set({ activeBrand: brand }),
}))