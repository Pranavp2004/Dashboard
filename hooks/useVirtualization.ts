import { useMemo } from 'react'
export default function useVirtualization<T>(data:T[], windowSize:number){
  return useMemo(()=>data.slice(-windowSize),[data,windowSize])
}
