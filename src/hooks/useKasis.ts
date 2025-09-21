import { useQuery } from '@tanstack/react-query'
import { kasisApi } from '@/lib/api'

// Hook to fetch all kasis
export const useKasis = () => {
  return useQuery({
    queryKey: ['kasis'],
    queryFn: () => kasisApi.getKasis(),
    staleTime: 1000 * 60 * 30, // 30 minutes (kasis don't change often)
  })
}

// Hook to fetch a single kasi by name
export const useKasi = (name: string) => {
  return useQuery({
    queryKey: ['kasi', name],
    queryFn: () => kasisApi.getKasi(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 30, // 30 minutes
  })
}
