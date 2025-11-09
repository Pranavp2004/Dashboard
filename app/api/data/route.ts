import { NextResponse } from 'next/server'
import { generateInitialDataset } from '../../../lib/dataGenerator'
export async function GET() {
  const data = await generateInitialDataset(5000)
  return NextResponse.json({ data })
}
