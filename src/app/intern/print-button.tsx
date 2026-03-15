'use client'

export function PrintButton() {
  return (
    <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
      <button
        onClick={() => window.print()}
        className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors shadow-lg"
      >
        🖨️ Drucken / PDF
      </button>
      <a
        href="/"
        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors shadow-lg"
      >
        ← Zurück
      </a>
    </div>
  )
}
