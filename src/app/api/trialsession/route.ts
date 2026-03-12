import { NextRequest, NextResponse } from 'next/server'

const STUDIO_ID = '1210005460'
const BASE_URL = 'https://fit-inn-trier.api.magicline.com/connect/v1'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  if (!startDate || !endDate) {
    return NextResponse.json({ error: 'startDate and endDate required' }, { status: 400 })
  }

  try {
    const res = await fetch(
      `${BASE_URL}/trialsession?studioId=${STUDIO_ID}&startDate=${startDate}&endDate=${endDate}`,
      { next: { revalidate: 300 } }
    )
    if (!res.ok) throw new Error(`Magicline ${res.status}`)
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Termine konnten nicht geladen werden' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, startDateTime } = body

    if (!firstName || !lastName || !email || !phone || !startDateTime) {
      return NextResponse.json({ error: 'Alle Felder sind erforderlich' }, { status: 400 })
    }

    const res = await fetch(`${BASE_URL}/trialsession`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studioId: parseInt(STUDIO_ID),
        startDateTime,
        firstName,
        lastName,
        email,
        phone,
      }),
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      console.error('Magicline booking error:', res.status, errText)
      return NextResponse.json(
        { error: `Buchung fehlgeschlagen (${res.status})`, details: errText },
        { status: res.status }
      )
    }

    const data = await res.json().catch(() => ({ success: true }))
    return NextResponse.json({ success: true, ...data })
  } catch (err) {
    console.error('Booking proxy error:', err)
    return NextResponse.json({ error: 'Buchung konnte nicht abgeschlossen werden' }, { status: 500 })
  }
}
