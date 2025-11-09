import { generateInitialDataset } from '../../lib/dataGenerator'
import DataProvider from '../../components/providers/DataProvider'
import DashboardClient from '../../components/DashboardClient'

export default async function Page() {
  const initial = await generateInitialDataset(10000)
  return (
    <DataProvider initialData={initial}>
      <DashboardClient />
    </DataProvider>
  )
}
