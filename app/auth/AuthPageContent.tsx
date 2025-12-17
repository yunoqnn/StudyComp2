'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roleFromUrl = searchParams.get('role') as 'student' | 'parent' | null
  
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin')
  const [role, setRole] = useState<'student' | 'parent'>(roleFromUrl || 'student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  })

  useEffect(() => {
    if (roleFromUrl) {
      setRole(roleFromUrl)
    }
  }, [roleFromUrl])

  // Password validation
  const validatePassword = (pwd: string) => {
    const strength = {
      hasMinLength: pwd.length >= 8,
      hasUpperCase: /[A-Z]/.test(pwd) || /[А-Я]/.test(pwd),
      hasLowerCase: /[a-z]/.test(pwd) || /[а-я]/.test(pwd),
      hasNumber: /[0-9]/.test(pwd),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    }
    setPasswordStrength(strength)
    return Object.values(strength).every(Boolean)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value
    setPassword(pwd)
    if (activeTab === 'signup') {
      validatePassword(pwd)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single()

        if (profile?.role === 'parent') {
          router.push('/parent/dashboard')
        } else if (profile?.role === 'student') {
          router.push('/student/dashboard')
        } else {
          router.push('/dashboard')
        }
      }
    } catch (err: any) {
      setError(err.message || 'Нэвтрэлт амжилтгүй боллоо')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!validatePassword(password)) {
      setError('Нууц үг шаардлага хангахгүй байна')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Нууц үг таарахгүй байна')
      setLoading(false)
      return
    }

    if (!fullName.trim()) {
      setError('Нэрээ оруулна уу')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            role: role,
            full_name: fullName,
          })

        if (profileError) throw profileError

        if (role === 'parent') {
          router.push('/parent/dashboard')
        } else {
          router.push('/student/dashboard')
        }
      }
    } catch (err: any) {
      setError(err.message || 'Бүртгэл амжилтгүй боллоо')
    } finally {
      setLoading(false)
    }
  }

  const getRoleDisplay = () => {
    return role === 'parent' ? '👨‍👩‍👧 Эцэг эх' : '👨‍🎓 Сурагч'
  }

  const getRoleGradient = () => {
    return role === 'parent' 
      ? 'linear-gradient(135deg, rgb(244, 114, 182) 0%, rgb(239, 68, 68) 100%)'
      : 'linear-gradient(135deg, rgb(45, 212, 191) 0%, rgb(34, 197, 94) 100%)'
  }

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden"
      style={{ fontFamily: 'inherit' }}
    >
      {/* Background Image */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.95)',
        }}
      />
      
      {/* Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(219, 234, 254, 0.4) 0%, rgba(243, 232, 255, 0.4) 50%, rgba(252, 231, 243, 0.4) 100%)',
        }}
      />
      
      {/* Back Button */}
      <button 
        onClick={() => router.push('/')}
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          width: '56px',
          height: '56px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          zIndex: 10,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'rgb(255, 255, 255)'
          e.currentTarget.style.transform = 'scale(1.1)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        <svg style={{ width: '24px', height: '24px', color: '#374151' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Main Card */}
      <div 
        style={{
          position: 'relative',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
          padding: '32px',
          width: '100%',
          maxWidth: '448px',
          zIndex: 10,
        }}
      >
        {/* Logo/Title */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 
            style={{
              fontSize: '30px',
              fontWeight: 'bold',
              background: getRoleGradient(),
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '12px',
            }}
          >
            🎓 AI Сурах Туслах
          </h1>
          <div 
            style={{
              display: 'inline-block',
              backgroundColor: '#f3f4f6',
              padding: '8px 16px',
              borderRadius: '9999px',
            }}
          >
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#374151', margin: 0 }}>
              {getRoleDisplay()}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div 
          style={{
            display: 'flex',
            backgroundColor: '#e5e7eb',
            borderRadius: '9999px',
            padding: '4px',
            marginBottom: '32px',
          }}
        >
          <button
            onClick={() => setActiveTab('signin')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '9999px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: activeTab === 'signin' ? '#ffffff' : 'transparent',
              color: activeTab === 'signin' ? '#2563eb' : '#6b7280',
              boxShadow: activeTab === 'signin' ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
            }}
          >
            Нэвтрэх
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '9999px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: activeTab === 'signup' ? '#ffffff' : 'transparent',
              color: activeTab === 'signup' ? '#2563eb' : '#6b7280',
              boxShadow: activeTab === 'signup' ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
            }}
          >
            Бүртгүүлэх
          </button>
        </div>

        {/* Sign In Form */}
        {activeTab === 'signin' && (
          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', color: '#1f2937', marginBottom: '4px' }}>
              Системд нэвтрэх
            </h2>

            <div>
              <input
                type="email"
                placeholder="И-мэйл хаяг оруулна уу"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  backgroundColor: '#f3f4f6',
                  border: '2px solid #e5e7eb',
                  borderRadius: '9999px',
                  fontSize: '16px',
                  color: '#374151',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2dd4bf'
                  e.target.style.backgroundColor = '#ffffff'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb'
                  e.target.style.backgroundColor = '#f3f4f6'
                }}
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Нууц үг оруулна уу"
                value={password}
                onChange={handlePasswordChange}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  backgroundColor: '#f3f4f6',
                  border: '2px solid #e5e7eb',
                  borderRadius: '9999px',
                  fontSize: '16px',
                  color: '#374151',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2dd4bf'
                  e.target.style.backgroundColor = '#ffffff'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb'
                  e.target.style.backgroundColor = '#f3f4f6'
                }}
                required
              />
            </div>

            {error && (
              <div 
                style={{
                  backgroundColor: '#fef2f2',
                  border: '2px solid #fecaca',
                  borderRadius: '16px',
                  padding: '12px',
                  color: '#dc2626',
                  fontSize: '14px',
                  textAlign: 'center',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: getRoleGradient(),
                color: 'white',
                padding: '16px',
                borderRadius: '9999px',
                fontWeight: 'bold',
                fontSize: '18px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'scale(1.05)'
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)'
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)'
              }}
            >
              {loading ? 'Уншиж байна...' : 'Үргэлжлүүлэх'}
            </button>
          </form>
        )}

        {/* Sign Up Form - Similar structure, keeping it brief for space */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', color: '#1f2937', marginBottom: '4px' }}>
              Шинэ данс үүсгэх
            </h2>

            <input
              type="text"
              placeholder="Овог нэр оруулна уу"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 24px',
                backgroundColor: '#f3f4f6',
                border: '2px solid #e5e7eb',
                borderRadius: '9999px',
                fontSize: '16px',
                color: '#374151',
                outline: 'none',
              }}
              required
            />

            <input
              type="email"
              placeholder="И-мэйл хаяг оруулна уу"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 24px',
                backgroundColor: '#f3f4f6',
                border: '2px solid #e5e7eb',
                borderRadius: '9999px',
                fontSize: '16px',
                color: '#374151',
                outline: 'none',
              }}
              required
            />

            <input
              type="password"
              placeholder="Нууц үг оруулна уу"
              value={password}
              onChange={handlePasswordChange}
              style={{
                width: '100%',
                padding: '16px 24px',
                backgroundColor: '#f3f4f6',
                border: '2px solid #e5e7eb',
                borderRadius: '9999px',
                fontSize: '16px',
                color: '#374151',
                outline: 'none',
              }}
              required
            />

            <input
              type="password"
              placeholder="Нууц үг дахин оруулна уу"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 24px',
                backgroundColor: '#f3f4f6',
                border: '2px solid #e5e7eb',
                borderRadius: '9999px',
                fontSize: '16px',
                color: '#374151',
                outline: 'none',
              }}
              required
            />

            {error && (
              <div 
                style={{
                  backgroundColor: '#fef2f2',
                  border: '2px solid #fecaca',
                  borderRadius: '16px',
                  padding: '12px',
                  color: '#dc2626',
                  fontSize: '14px',
                  textAlign: 'center',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: getRoleGradient(),
                color: 'white',
                padding: '16px',
                borderRadius: '9999px',
                fontWeight: 'bold',
                fontSize: '18px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
              }}
            >
              {loading ? 'Бүртгэж байна...' : 'Үргэлжлүүлэх'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
