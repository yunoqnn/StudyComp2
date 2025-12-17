export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import AuthPageContent from './AuthPageContent'

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(219, 234, 254, 0.4) 0%, rgba(243, 232, 255, 0.4) 50%, rgba(252, 231, 243, 0.4) 100%)',
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#6366f1',
        }}>
          Loading...
        </div>
      </div>
    }>
      <AuthPageContent />
    </Suspense>
  )
}
