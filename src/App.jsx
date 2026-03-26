// Setup: npm create vite@latest session-10 -- --template react
// cd session-10 && npm install axios
// Copy the src/ files into the project
// npm run dev
// Requires Spring backend running on http://localhost:8080

import HelloMessage from './components/HelloMessage'
import ProductList from './components/ProductList'

export default function App() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
      <h1>Axios + Spring Backend</h1>

      {/* No auth required — public endpoint */}
      <section style={{ marginBottom: '32px' }}>
        <h2>Public Endpoint (no auth)</h2>
        <HelloMessage />
      </section>

      {/* Auth required — see note in ProductList about the token */}
      <section>
        <h2>Products (requires JWT)</h2>
        <ProductList />
      </section>
    </div>
  )
}
