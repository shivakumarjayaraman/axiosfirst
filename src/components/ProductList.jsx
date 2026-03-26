import { useState, useEffect } from 'react'
import api from '../api/axios'

// NOTE: Replace HARDCODED_TOKEN with a real JWT from POST /api/auth/login
// To get a token:
//   POST http://localhost:8080/api/auth/login
//   Body: { "username": "admin", "password": "admin" }
//   Copy the "token" from the response
//
// We will wire this up properly in Session 13 with Context.
const TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dLCJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3NzQ0OTA2ODEsImV4cCI6MTc3NDU3NzA4MX0.cMAFRenG9HvNk9RH3sDdx4dkByuuEQKQL09rwAAkRnkyW48irR4lahSSGX6w0O34KQWPhnXW5STuRjWcTO2gUA'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    async function load() {
      try {
        // GET http://localhost:8080/api/products
        const response = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        // response.data is an array of product objects:
        // [{ id, name, description, price, stockQuantity, categoryId }, ...]
        setProducts(response.data)
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Unauthorized — replace TOKEN with a valid JWT')
        } else if (err.response) {
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

  if (loading) return <p>Loading products...</p>

  if (error) {
    return (
      <div style={{ padding: '12px', background: '#fee2e2', borderRadius: '6px', color: '#dc2626' }}>
        <strong>Error:</strong> {error}
      </div>
    )
  }

  if (products.length === 0) {
    return <p>No products found in the database.</p>
  }

  return (
    <div>
      <p style={{ color: '#6b7280', marginBottom: '12px' }}>
        {products.length} product{products.length !== 1 ? 's' : ''} loaded from Spring backend
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {products.map(product => (
          <div
            key={product.id}
            style={{
              padding: '12px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              background: 'white',
            }}
          >
            <strong>{product.name}</strong>
            <span style={{ marginLeft: '12px', color: '#1e40af' }}>
              ${parseFloat(product.price).toFixed(2)}
            </span>
            {product.stockQuantity === 0 && (
              <span style={{ marginLeft: '8px', fontSize: '12px', color: '#dc2626', fontWeight: 'bold' }}>
                OUT OF STOCK
              </span>
            )}
            {product.description && (
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6b7280' }}>
                {product.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
