# axiosfirst

A React + Axios project demonstrating how to make HTTP requests to a Spring Boot backend, including both public and JWT-authenticated endpoints.

## Prerequisites

- Node.js installed
- A Spring Boot backend running on `http://localhost:8080`

## Setup

**1. Install dependencies (including Axios):**

```bash
npm install
npm install axios
```

**2. Add your JWT token:**

The API requires a valid JWT. Obtain one by logging in against the backend:

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin"}'
```

Copy the token from the response.

Open `src/components/ProductList.jsx` and replace the placeholder token with a valid JWT token from your backend:

```js
const TOKEN = "your-jwt-token-here";
```

**3. Start the development server:**

```bash
npm run dev
```

## Project Structure

```
src/
├── api/
│   └── axios.js          # Axios instance with base URL and default headers
├── components/
│   ├── HelloMessage.jsx  # Calls a public (unauthenticated) endpoint
│   └── ProductList.jsx   # Calls a protected endpoint using a Bearer token
└── App.jsx               # Main layout
```

## How It Works

- `src/api/axios.js` creates a shared Axios instance pointed at `http://localhost:8080/api`
- `HelloMessage` fetches from `/api/hello` — no authentication required
- `ProductList` fetches from `/api/products` — sends the JWT token as a `Bearer` header

---

## Exercises

### Exercise 1 — Change the loading message
In `HelloMessage.jsx`, find the text that says `"Loading..."` and change it to something else, like `"Please wait..."` or `"Fetching data..."`. Save the file and see the change in your browser.

### Exercise 2 — Add a heading
In `HelloMessage.jsx`, add an `<h2>` tag above the message that says **"Hello from the Server"**. It should always be visible, even while loading.

### Exercise 3 — Style the error message
In `ProductList.jsx`, the error message is plain text. Wrap it in a `<p>` tag and give it a red color using an inline style:

```jsx
<p style={{ color: "red" }}>{error}</p>
```

### Exercise 4 — Count the products
In `ProductList.jsx`, after the list of products loads, display how many products there are. For example: **"3 products found"**. Hint: use `products.length`.

### Exercise 5 — Add a reload button
In `HelloMessage.jsx`, add a `<button>` that reloads the page when clicked:

```jsx
<button onClick={() => window.location.reload()}>Reload</button>
```
