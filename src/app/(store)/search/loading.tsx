'use client'

import { Skeleton } from '@/components/skeleton'

export default function LoadingSearch() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text=sm">
        <Skeleton className="h-[20px]" />
      </p>

      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
      </div>
    </div>
  )
}
