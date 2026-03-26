import { useState, useEffect } from 'react'
import api from '../api/axios'

// Calls GET /api/hello — no authentication required
export default function HelloMessage() {
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    async function load() {
      try {
        // GET http://localhost:8080/api/hello
        const response = await api.get('/hello')
        setMessage(response.data)  // response.data = 'Hello, Spring Boot!'
      } catch (err) {
        if (err.response) {
          setError(`Server error: ${err.response.status}`)
        } else {
          setError('Could not reach the backend. Is it running on port 8080?')
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error)   return <p style={{ color: '#dc2626' }}>❌ {error}</p>

  return (
    <div style={{ padding: '16px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
      <p style={{ margin: 0, color: '#15803d', fontWeight: 'bold' }}>
        ✓ {message}
      </p>
    </div>
  )
}
