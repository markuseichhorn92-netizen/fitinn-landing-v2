declare global {
  interface Window {
    LiveChatWidget?: { call: (method: string) => void }
  }
}

export function openLiveChat() {
  if (typeof window !== 'undefined') {
    window.LiveChatWidget?.call('maximize')
  }
}
