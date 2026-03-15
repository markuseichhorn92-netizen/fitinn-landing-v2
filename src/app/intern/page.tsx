import type { Metadata } from 'next'
import { PrintButton } from './print-button'

export const metadata: Metadata = {
  title: 'happyfigur Kampagne — Mitarbeiter-Anleitung',
  robots: 'noindex, nofollow',
}

export default function InternPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen print:min-h-0">
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 10mm 12mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          main { font-size: 8pt !important; line-height: 1.3 !important; }
          .no-print { display: none !important; }
          .page-container { padding: 0 !important; max-width: 100% !important; }
          .section-card { break-inside: avoid; border: 1px solid #e5e7eb !important; }
          h1 { font-size: 15pt !important; }
          h2 { font-size: 10pt !important; }
        }
        @media screen {
          .page-container { max-width: 210mm; }
        }
      `}</style>

      <PrintButton />

      <div className="page-container mx-auto px-5 py-6 print:py-0 print:px-0">

        {/* Header */}
        <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-gray-900">
          <div>
            <h1 className="text-xl print:text-[15pt] font-extrabold uppercase tracking-wide">
              happyfigur Kampagne
            </h1>
            <p className="text-[11px] text-gray-500 mt-0.5">Interne Anleitung · FIT-INN Trier · Vertraulich</p>
          </div>
          <div className="text-right text-[11px] text-gray-400">
            <div className="font-bold text-gray-700 text-xs">FIT-INN</div>
            <div>Stand: März 2026</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 print:gap-1.5">

          {/* Block 1: Programm */}
          <div className="section-card col-span-2 bg-gray-50 rounded-md p-2.5 border border-gray-200">
            <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-gray-900 mb-1.5 flex items-center gap-1.5">
              <span className="w-[17px] h-[17px] rounded bg-green-600 text-white flex items-center justify-center text-[11px] font-bold">i</span>
              Das Programm auf einen Blick
            </h2>
            <div className="grid grid-cols-4 gap-1.5 text-center">
              {[
                { num: '8', label: 'Wochen Laufzeit' },
                { num: '3x', label: 'Körperanalyse (InBody)' },
                { num: '179€', label: 'Preis (Vorkasse)' },
                { num: '0€', label: 'bei vielen Kassen' },
              ].map(s => (
                <div key={s.num} className="bg-white rounded p-1.5 border border-gray-200">
                  <div className="text-[20px] font-bold text-green-700">{s.num}</div>
                  <div className="text-[11px] text-gray-500 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-500 mt-1.5">
              § 20 SGB V zertifiziert → KK erstattet 75–179€. Kunde zahlt vorab, reicht Teilnahmebestätigung ein. <strong className="text-gray-700">Keine Vorab-Genehmigung nötig.</strong>
            </p>
          </div>

          {/* Block 2: Probetraining */}
          <div className="section-card bg-amber-50 rounded-md p-2.5 border border-amber-200">
            <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-gray-900 mb-1.5 flex items-center gap-1.5">
              <span className="w-[17px] h-[17px] rounded bg-amber-500 text-white flex items-center justify-center text-[11px] font-bold">1</span>
              Probetraining
            </h2>
            <div className="space-y-1 text-[13px] text-gray-700">
              <div className="flex gap-1.5"><span className="font-bold text-amber-600 shrink-0">→</span><span><strong className="text-gray-900">Begrüßung</strong> — Vorstellung, Wohlfühl-Atmosphäre. „Was ist dein Ziel?"</span></div>
              <div className="flex gap-1.5"><span className="font-bold text-amber-600 shrink-0">→</span><span><strong className="text-gray-900">Studio-Tour</strong> — Geräte zeigen, Atmosphäre, Fragen ermutigen</span></div>
              <div className="flex gap-1.5"><span className="font-bold text-amber-600 shrink-0">→</span><span><strong className="text-gray-900">Probe-Einheit</strong> — 3–4 Geräte testen, Technik erklären</span></div>
              <div className="flex gap-1.5"><span className="font-bold text-amber-600 shrink-0">→</span><span><strong className="text-gray-900">Abschlussgespräch</strong> — happyfigur vorstellen (→ Verkauf)</span></div>
            </div>
            <div className="mt-1.5 p-1.5 bg-white rounded border border-amber-200 text-[11px] text-amber-800">
              💡 <strong>Ziel:</strong> Kunde soll sich wohlfühlen und verstehen, dass er betreut wird.
            </div>
          </div>

          {/* Block 3: Verkauf */}
          <div className="section-card bg-green-50 rounded-md p-2.5 border border-green-200">
            <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-gray-900 mb-1.5 flex items-center gap-1.5">
              <span className="w-[17px] h-[17px] rounded bg-green-600 text-white flex items-center justify-center text-[11px] font-bold">2</span>
              Verkaufsgespräch
            </h2>
            <div className="space-y-1 text-[13px] text-gray-700">
              <div className="flex gap-1.5"><span className="font-bold text-green-600 shrink-0">→</span><span><strong className="text-gray-900">Problem bestätigen</strong> — „Dein Ziel ist [X]. Genau dafür ist happyfigur."</span></div>
              <div className="flex gap-1.5"><span className="font-bold text-green-600 shrink-0">→</span><span><strong className="text-gray-900">Programm erklären</strong> — 8 Wo., 3x Analyse, Training + Ernährung</span></div>
              <div className="flex gap-1.5"><span className="font-bold text-green-600 shrink-0">→</span><span><strong className="text-gray-900">KK-Argument</strong> — „179€, aber Kasse erstattet bis zu 100%."</span></div>
              <div className="flex gap-1.5"><span className="font-bold text-green-600 shrink-0">→</span><span><strong className="text-gray-900">Support</strong> — „Bei Fragen helfen dir unsere Ernährungsexperten jederzeit."</span></div>
            </div>
            <div className="mt-1.5 p-1.5 bg-white rounded border border-green-200 text-[11px] text-green-800">
              🎯 <strong>Abschluss:</strong> „Sollen wir dich direkt für nächste Woche eintragen?"
            </div>
          </div>

          {/* Block 4: Bestellung */}
          <div className="section-card col-span-2 bg-purple-50 rounded-md p-2.5 border border-purple-300">
            <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-gray-900 mb-1.5 flex items-center gap-1.5">
              <span className="w-[17px] h-[17px] rounded bg-purple-600 text-white flex items-center justify-center text-[11px] font-bold">3</span>
              happyfigur Bestellung — Schritt für Schritt
            </h2>
            <div className="flex gap-2.5 items-start">
              {/* QR Bestellseite */}
              <div className="text-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fhappyfigur24.de%2Fregistrierung%2Fformular&color=9333ea" alt="QR Bestellseite" className="w-[72px] h-[72px] border border-gray-200 rounded" />
                <div className="text-[10px] text-gray-500 mt-0.5 font-semibold">Bestellseite</div>
              </div>
              {/* Steps */}
              <div className="flex-1 grid grid-cols-2 gap-x-2.5 gap-y-1 text-[13px] text-gray-700">
                <div className="flex gap-1.5"><span className="font-bold text-purple-600 shrink-0">1.</span><span>Link öffnen (QR) → auf <strong className="text-gray-900">„Los geht&apos;s"</strong> klicken</span></div>
                <div className="flex gap-1.5"><span className="font-bold text-purple-600 shrink-0">4.</span><span><strong className="text-gray-900">Gutscheincode</strong> von der Kasse eingeben + <strong className="text-gray-900">durchstreichen!</strong></span></div>
                <div className="flex gap-1.5"><span className="font-bold text-purple-600 shrink-0">2.</span><span>Formular <strong className="text-gray-900">gemeinsam mit Kunden</strong> ausfüllen</span></div>
                <div className="flex gap-1.5"><span className="font-bold text-purple-600 shrink-0">5.</span><span>Alle Fragen im nächsten Schritt beantworten</span></div>
                <div className="flex gap-1.5"><span className="font-bold text-purple-600 shrink-0">3.</span><span>Auf <strong className="text-gray-900">„Anmelden"</strong> klicken</span></div>
                <div className="flex gap-1.5"><span className="font-bold text-purple-600 shrink-0">6.</span><span>Fertig! → Kunden informieren (s. unten)</span></div>
              </div>
              {/* QR KK-Rechner */}
              <div className="text-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fwww.dein.happyfigur24.de%2Finfosite%2Ffit-inn-trier-infoseite-2%23kkrechner&color=16a34a" alt="QR KK-Rechner" className="w-[72px] h-[72px] border border-gray-200 rounded" />
                <div className="text-[10px] text-gray-500 mt-0.5 font-semibold">KK-Rechner</div>
              </div>
            </div>
            <div className="mt-1.5 p-1.5 bg-amber-50 rounded border border-amber-300 text-[11px] text-amber-800">
              ⚠️ <strong>WICHTIG — Bezahlprozess:</strong> Gutscheincode von der Kasse eingeben. Danach den Code auf der Liste <strong>durchstreichen</strong>, damit kein Code doppelt verwendet wird!
            </div>
          </div>

          {/* Block 5: Kunde informieren */}
          <div className="section-card bg-blue-50 rounded-md p-2.5 border border-blue-200">
            <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-gray-900 mb-1.5 flex items-center gap-1.5">
              <span className="w-[17px] h-[17px] rounded bg-blue-600 text-white flex items-center justify-center text-[11px] font-bold">4</span>
              Kunde informieren
            </h2>
            <div className="space-y-1 text-[13px] text-gray-700">
              <div className="flex items-start gap-1.5"><span className="font-bold text-blue-500 shrink-0 min-w-[40px]">48 Std.</span><span>Rezepte als <strong className="text-gray-900">PDF per E-Mail</strong></span></div>
              <div className="flex items-start gap-1.5"><span className="font-bold text-blue-500 shrink-0 min-w-[40px]">7–10 T.</span><span><strong className="text-gray-900">Gedrucktes Buch</strong> per Post</span></div>
              <div className="flex items-start gap-1.5"><span className="font-bold text-blue-500 shrink-0 min-w-[40px]">12 Wo.</span><span>Frist: Alle <strong className="text-gray-900">8 Einheiten + Wissensquiz</strong> abschließen</span></div>
            </div>
            <div className="mt-1.5 p-1.5 bg-white rounded border border-blue-200 text-[11px] text-blue-800">
              📋 <strong>Teilnahmebestätigung:</strong> Erst nach 8 Einheiten + Quiz. <strong>Erst dann</strong> kann der Kunde bei der KK einreichen!
            </div>
          </div>

          {/* Block 6: Einwände */}
          <div className="section-card bg-red-50 rounded-md p-2.5 border border-red-200">
            <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-gray-900 mb-1.5 flex items-center gap-1.5">
              <span className="w-[17px] h-[17px] rounded bg-red-500 text-white flex items-center justify-center text-[11px] font-bold">!</span>
              Häufige Einwände
            </h2>
            <div className="space-y-1 text-[13px]">
              <div><span className="font-bold text-red-600">„Zu teuer"</span> <span className="text-gray-600">→ „Kasse erstattet bis 100%. Das sind nur 3,20€/Tag — weniger als ein Kaffee."</span></div>
              <div><span className="font-bold text-red-600">„Keine Zeit"</span> <span className="text-gray-600">→ „2x 30 Min/Woche reichen. Passt in jeden Alltag."</span></div>
              <div><span className="font-bold text-red-600">„Muss überlegen"</span> <span className="text-gray-600">→ „Soll ich zeigen was deine Kasse erstattet?" (→ KK-Rechner QR)</span></div>
              <div><span className="font-bold text-red-600">„Diäten probiert"</span> <span className="text-gray-600">→ „Keine Diät. Körperanalyse zeigt was DEIN Körper braucht."</span></div>
            </div>
          </div>

          {/* Block 7: Regeln */}
          <div className="section-card col-span-2 bg-gray-900 text-white rounded-md p-2.5">
            <h2 className="text-[13px] font-extrabold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span className="w-[17px] h-[17px] rounded bg-white text-gray-900 flex items-center justify-center text-[11px] font-bold">✓</span>
              Wichtige Regeln
            </h2>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[13px]">
              <div className="flex gap-1.5"><span className="text-green-400 shrink-0">✓</span><span>Trainer <strong>vor Ort ansprechbar</strong> — nicht „bei jedem Training dabei"</span></div>
              <div className="flex gap-1.5"><span className="text-green-400 shrink-0">✓</span><span>Keine Heilversprechen — „erfahrungsgemäß", „viele berichten"</span></div>
              <div className="flex gap-1.5"><span className="text-green-400 shrink-0">✓</span><span>KK braucht <strong>keine Vorab-Genehmigung</strong></span></div>
              <div className="flex gap-1.5"><span className="text-green-400 shrink-0">✓</span><span>Kunde muss <strong>8 Einheiten + Quiz in 12 Wochen</strong> schaffen</span></div>
              <div className="flex gap-1.5"><span className="text-green-400 shrink-0">✓</span><span>Gutscheincode <strong>immer durchstreichen</strong> nach Verwendung</span></div>
              <div className="flex gap-1.5"><span className="text-green-400 shrink-0">✓</span><span><strong>Ernährungsexperten</strong> unterstützen bei Problemen</span></div>
            </div>
          </div>

        </div>

        <div className="mt-1.5 text-center text-[10px] text-gray-400 border-t border-gray-200 pt-1.5">
          Nur zur internen Verwendung · FIT-INN Trier · Auf Hirtenberg 8, 54296 Trier · Fragen an die Studioleitung
        </div>

      </div>
    </main>
  )
}
