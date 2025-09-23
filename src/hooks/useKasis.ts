import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { kasisApi, type Kasi } from '@/lib/api'
import { toast } from '@/hooks/use-toast'

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

// Hook to create a new kasi
export const useCreateKasi = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (kasi: Omit<Kasi, 'id' | 'created_at'>) =>
      kasisApi.createKasi(kasi),
    onSuccess: (newKasi) => {
      // Invalidate and refetch kasis queries
      queryClient.invalidateQueries({ queryKey: ['kasis'] })

      toast({
        title: "Kasi Added Successfully! 🎉",
        description: `${newKasi.name} has been added to the community.`,
      })
    },
    onError: (error) => {
      console.error('Error creating kasi:', error)
      toast({
        title: "Error Adding Kasi",
        description: "Failed to add kasi. Please try again.",
        variant: "destructive"
      })
    }
  })
}
