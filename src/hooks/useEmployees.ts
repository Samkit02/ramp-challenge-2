import { useCallback, useState } from "react"
import { Employee } from "../utils/types"
import { useCustomFetch } from "./useCustomFetch"
import { EmployeeResult } from "./types"

export function useEmployees(): EmployeeResult {
  const { fetchWithCache, loading } = useCustomFetch()
  const [employees, setEmployees] = useState<Employee[] | null>(null)
  const [loaded, setLoaded] = useState(false)

  const fetchAll = useCallback(async () => {
    if (loaded) return

    const employeesData = await fetchWithCache<Employee[]>("employees")
    setEmployees(employeesData)
    setLoaded(true)
  }, [fetchWithCache, loaded])

  const invalidateData = useCallback(() => {
    setEmployees(null)
    setLoaded(false)
  }, [])

  return { data: employees, loading, fetchAll, invalidateData, loaded }
}
