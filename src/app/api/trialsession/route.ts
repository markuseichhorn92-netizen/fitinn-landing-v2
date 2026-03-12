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
    const {
      firstName, lastName, email, mobilephone, gender, dateOfBirth,
      street, houseNumber, zip, city,
      marketingConsent, note, startDateTime,
    } = body

    if (!firstName || !lastName || !email || !mobilephone || !gender || !dateOfBirth
      || !street || !houseNumber || !zip || !city || !startDateTime) {
      return NextResponse.json({ error: 'Alle Pflichtfelder sind erforderlich' }, { status: 400 })
    }

    const studioIdNum = parseInt(STUDIO_ID)

    // Schritt 1: Lead anlegen → customerId
    const leadBody = {
      studioId: studioIdNum,
      firstName,
      lastName,
      email,
      mobilephone,
      gender,
      dateOfBirth,
      address: { street, houseNumber, zipCode: zip, city, country: 'DE' },
      communicationPreferences: [
        { type: 'EMAIL', enabled: marketingConsent ?? false },
        { type: 'PHONE', enabled: marketingConsent ?? false },
      ],
      ...(note ? { note } : {}),
    }

    console.log('Lead request body:', JSON.stringify(leadBody, null, 2))

    const leadRes = await fetch(`${BASE_URL}/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadBody),
    })

    const leadText = await leadRes.text()
    console.log('Lead response:', leadRes.status, leadText)

    if (!leadRes.ok) {
      return NextResponse.json(
        { error: `Lead-Erstellung fehlgeschlagen (${leadRes.status})`, details: leadText },
        { status: leadRes.status }
      )
    }

    const leadData = JSON.parse(leadText)
    const customerId: string = leadData.customerId ?? leadData.id ?? leadData.uuid

    if (!customerId) {
      console.error('No customerId in lead response:', leadData)
      return NextResponse.json({ error: 'Keine Kunden-ID erhalten', details: leadText }, { status: 500 })
    }

    // Schritt 2: Probetraining buchen
    const bookRes = await fetch(`${BASE_URL}/trialsession/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studioId: studioIdNum,
        customerId,
        startDateTime,
      }),
    })

    const bookText = await bookRes.text()
    console.log('Book response:', bookRes.status, bookText)

    if (!bookRes.ok) {
      return NextResponse.json(
        { error: `Buchung fehlgeschlagen (${bookRes.status})`, details: bookText },
        { status: bookRes.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Booking proxy error:', err)
    return NextResponse.json({ error: 'Buchung konnte nicht abgeschlossen werden' }, { status: 500 })
  }
}
