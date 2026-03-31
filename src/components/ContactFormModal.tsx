'use client'

import { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const WIDGET_ORIGIN = 'https://mein.studiopartner.de'
const FORM_SRC =
  'https://mein.studiopartner.de/b0a8bae3-dad0-4281-8279-dc0e4d0a15e6/form/contact'

export function ContactFormModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  useEffect(() => {
    if (!open) return

    function handleMessage(event: MessageEvent) {
      if (event.origin !== WIDGET_ORIGIN) return
      if (event.data?.type === 'form_redirect') {
        onOpenChange(false)
        if (event.data.redirectUrl) {
          window.location.href = event.data.redirectUrl
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [open, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl w-[95vw] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-5 pb-2">
          <DialogTitle>Kontaktformular</DialogTitle>
        </DialogHeader>
        {open && (
          <iframe
            src={FORM_SRC}
            className="w-full h-[70vh] md:h-[750px] border-0"
            title="Kontaktformular"
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
