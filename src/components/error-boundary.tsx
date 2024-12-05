'use client'

import { useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

export function ErrorBoundary({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Unhandled error:', event.error)
      // You could send this error to an error tracking service here
    }

    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  return (
    <>
      {children}
      <ErrorMessage />
    </>
  )
}

function ErrorMessage() {
  return (
    <Alert variant="destructive" className="fixed bottom-4 right-4 max-w-md">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        An unexpected error occurred. Please try refreshing the page.
      </AlertDescription>
    </Alert>
  )
}

