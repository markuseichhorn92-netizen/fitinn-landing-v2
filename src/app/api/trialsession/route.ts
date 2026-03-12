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
      marketingConsent, note,
      startDateTime,
    } = body

    if (!firstName || !lastName || !email || !mobilephone || !gender || !dateOfBirth
      || !street || !houseNumber || !zip || !city || !startDateTime) {
      return NextResponse.json({ error: 'Alle Pflichtfelder sind erforderlich' }, { status: 400 })
    }

    const bookRes = await fetch(`${BASE_URL}/trialsession/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studioId: 1210005460,
        startDateTime,
        trainerRequired: false,
        note: [
          `Name: ${firstName} ${lastName}`,
          `E-Mail: ${email}`,
          `Telefon: ${mobilephone}`,
          `Geburtsdatum: ${dateOfBirth}`,
          `Adresse: ${street} ${houseNumber}, ${zip} ${city}`,
          `Marketing-Einwilligung: ${marketingConsent ? 'Ja' : 'Nein'}`,
          ...(note ? [`Anmerkung: ${note}`] : []),
        ].join(' | '),
        leadCustomer: {
          firstname: firstName,
          lastname: lastName,
          email,
          phone: mobilephone,
          gender,
          dateOfBirth,
          address: {
            street,
            houseNumber,
            zip,
            city,
            country: 'DE',
          },
          privacyConfiguration: {
            email: marketingConsent ?? false,
            phone: marketingConsent ?? false,
            letter: false,
            textMessage: marketingConsent ?? false,
            mySportsMessage: false,
          },
        },
      }),
    })

    const bookText = await bookRes.text()

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
