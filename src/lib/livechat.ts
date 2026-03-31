const WHATSAPP_URL = 'https://wa.me/49651308524'

export function openLiveChat() {
  if (typeof window !== 'undefined') {
    window.open(WHATSAPP_URL, '_blank', 'noopener')
  }
}
