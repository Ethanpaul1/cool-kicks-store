# Cool Kicks Store

A Vite + React sneaker store for browsing products and managing inventory.

## Setup Instructions

1. Clone the repository
2. Run `npm install`
3. Run `npm run server` to start the json-server backend on `http://localhost:3001`
4. In another terminal, run `npm start` to start Vite
5. Visit `http://localhost:5173`

## Features

- Vite-powered React app
- Home, Products, and Admin routes
- Browse sneakers on the Products page
- Search sneakers by name, brand, or description
- Add new sneakers with a POST request
- Edit sneaker prices with a PATCH request
- Delete sneakers with a DELETE request
- Shared `useSneakers` hook for data loading and CRUD actions

## Testing

Run the Vitest suite with:

```bash
npm run vitest
```

## Known Limitations

- Uses `json-server` as a local mock backend
- The backend must be running for live CRUD actions
- Images require valid external URLs
- No authentication or persistent production database is included
