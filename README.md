# Produk Dashboard — Demo Fullstack

Demo app built for interview preparation: a small Next.js frontend (App Router, TypeScript, Tailwind) and a Go backend providing a simple REST API. The backend uses an in-memory slice as a data store for simplicity.

Contents

- `backend/main.go` — Go REST API (in-memory DB)
- `src/app` — Next.js (App Router) frontend
  - `src/app/page.tsx` — Home
  - `src/app/dashboard/page.tsx` — Dashboard (list of products)
  - `src/app/input/page.tsx` — Create product
  - `src/app/edit/page.tsx` — Edit / Delete product

API endpoints

- `GET /products` — list products
- `POST /products` — create product (JSON `{ name, price }`)
- `PUT /products/:id` — update product
- `DELETE /products/:id` — delete product

Run locally

1. Start the backend

```zsh
cd backend
go run main.go
```

The backend listens on `http://localhost:8080`.

2. Start the frontend (from project root)

```zsh
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

Quick demo script (1-2 minutes)

1. Open Home -> click `Open Dashboard`.
2. Dashboard: show header, yellow info box, product buttons grid.
3. Create: click `Tambah Produk`, fill the form, `Simpan` — product appears.
4. Edit: hover a product, click the ✎ badge -> edit page -> change values -> `Simpan Perubahan`.
5. Delete: on edit page click `Hapus produk` and confirm.

Notes & tradeoffs

- Storage: in-memory. Restarting the Go server clears data — use SQLite/Postgres for persistence in production.
- CORS: backend allows `http://localhost:3000` during development.
- UX & validation: minimal; consider adding toasts, client validation, and better error messages.

Next steps I can add (pick one)

- Add unit tests for Go handlers and basic frontend tests.
- Add `Dockerfile` + `docker-compose.yml` for one-command demo.
- Add visual polish and toasts for create/edit/delete feedback.

Tell me which of the next steps you want me to implement and I will add it now.

// git add .
// git commit -m "Perbaikan urutan import sesuai lint"
// git push
