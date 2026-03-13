import { LegalPage } from '@/components/LegalPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Widerrufsbelehrung – FIT-INN Trier | happyfigur',
  robots: 'noindex',
}

export default function WiderrufPage() {
  return (
    <LegalPage title="Widerrufsbelehrung">

      <h2>Widerrufsrecht</h2>
      <p>
        Sie haben das Recht, binnen <strong>14 Tagen</strong> ohne Angabe von Gründen diesen Vertrag zu widerrufen.
      </p>
      <p>
        Die Widerrufsfrist beträgt 14 Tage ab dem Tag des Vertragsschlusses.
      </p>
      <p>
        Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung (z.&nbsp;B. ein mit der
        Post versandter Brief, Telefax oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
      </p>
      <p>Sie können dafür das nachstehende Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.</p>

      <h3>Empfänger des Widerrufs</h3>
      <p>
        <strong>FIT-INN Trier</strong><br />
        Inhaber: Harald Eichhorn<br />
        Auf Hirtenberg 8<br />
        54296 Trier
      </p>
      <p>
        Telefon: 0651 308524<br />
        E-Mail: info@fit-inn-trier.de
      </p>

      <p>
        Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts
        vor Ablauf der Widerrufsfrist absenden.
      </p>

      <h2>Folgen des Widerrufs</h2>
      <p>
        Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben,
        unverzüglich und spätestens binnen 14 Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren
        Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel,
        das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas
        anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
      </p>
      <p>
        Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen sollen, so haben Sie uns
        einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung
        des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich
        zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
      </p>

      <h2>Ausschluss bzw. vorzeitiges Erlöschen des Widerrufsrechts</h2>
      <p>Das Widerrufsrecht erlischt vorzeitig in folgenden Fällen:</p>
      <ul>
        <li>
          <strong>Versiegelte Waren:</strong> Bei Lieferung versiegelter Waren, deren Versiegelung nach der Lieferung
          entfernt wurde (z.&nbsp;B. geöffnetes Ernährungsplan-Buch mit individuellen Rezepten), sofern die Rückgabe
          aus Gründen des Gesundheitsschutzes oder der Hygiene nicht geeignet ist.
        </li>
        <li>
          <strong>Digitale Inhalte:</strong> Bei digitalen Inhalten (Zugang zur Online-Plattform happyfigur24.de),
          wenn die Ausführung mit Ihrer ausdrücklichen Zustimmung und Ihrer Kenntnis, dass Sie dadurch Ihr
          Widerrufsrecht verlieren, vor Ablauf der Widerrufsfrist begonnen hat.
        </li>
        <li>
          <strong>Vollständig erbrachte Dienstleistungen:</strong> Bei Dienstleistungen, die vollständig erbracht
          wurden, wenn die Ausführung mit Ihrer Zustimmung begonnen hat und Sie bestätigt haben, dass Sie Ihr
          Widerrufsrecht bei vollständiger Vertragserfüllung verlieren.
        </li>
      </ul>

      <h2>Muster-Widerrufsformular</h2>
      <p>
        <em>
          Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück:
        </em>
      </p>
      <div className="bg-card border border-border rounded-xl p-6 my-6 space-y-3">
        <p className="!text-foreground">
          An:<br />
          FIT-INN Trier<br />
          Inhaber: Harald Eichhorn<br />
          Auf Hirtenberg 8<br />
          54296 Trier<br />
          E-Mail: info@fit-inn-trier.de
        </p>
        <p className="!text-foreground">
          Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der
          folgenden Dienstleistung:
        </p>
        <p className="!text-foreground">
          Teilnahme am Präventionskurs „happyfigur – genussvoll abnehmen"
        </p>
        <p className="!text-foreground">Bestellt am (*) / erhalten am (*):</p>
        <p className="!text-foreground">Name des/der Verbraucher(s):</p>
        <p className="!text-foreground">Anschrift des/der Verbraucher(s):</p>
        <p className="!text-foreground">Datum:</p>
        <p className="!text-foreground">Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):</p>
        <p className="!text-xs !text-muted-foreground">(*) Unzutreffendes streichen.</p>
      </div>

    </LegalPage>
  )
}
