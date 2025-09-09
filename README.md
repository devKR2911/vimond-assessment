# Interval Checker Application

A Node.js + Express application that provides a REST endpoint for calculating resulting intervals based on given **included** and **excluded** interval sets.

## Technologies

- [Node.js](https://nodejs.org/en) — Core application platform
- [Express.js](https://expressjs.com/) — Web framework for Node.js
- [Joi](https://joi.dev/api/?v=17.13.3) — Schema validation for request payloads
- [Jest](https://jestjs.io/) — Unit testing framework

---

## Getting started

### Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/devKR2911/vimond-assessment
   cd vimond-assessment
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. The application will be available at:

   ```
   http://localhost:3000
   ```

5. Test the API endpoint using a REST client (eg: Postman):

   - **Endpoint:** `POST http://localhost:3000/api/interval-checker`
   - Sample request/response payloads are available in the `src/testdata` folder.

6. Run unit tests:
   ```bash
   npm run test
   ```
   Unit tests cover routes and services.

---

## API Documentation

### `POST /api/interval-checker`

Calculates the resulting intervals after subtracting `excludedInterval` from `includedInterval`.

### Request body

The request body accepts two arrays:

- `includedInterval` — intervals to include
- `excludedInterval` — intervals to exclude

Example request:

```json
{
  "includedInterval": [
    { "from": 10, "to": 100 },
    { "from": 50, "to": 5000 }
  ],
  "excludedInterval": [
    { "from": 80, "to": 300 },
    { "from": 330, "to": 450 }
  ]
}
```

### Response

Returns an object with a `result` array containing the remaining intervals after exclusions.

Example response:

```json
{
  "result": [
    { "from": 10, "to": 79 },
    { "from": 301, "to": 329 },
    { "from": 451, "to": 5000 }
  ]
}
```

---

## Data model & assumptions

- Each interval object contains numeric `from` and `to` fields.
- `to` must be strictly greater than `from`.
- Either `includedInterval` or `excludedInterval` (or both) may be empty.
- Intervals within each list may overlap; the service handles merging and subtraction appropriately.
- Each interval must include both `from` and `to` values. Or else the api will throw error from schema validation layer.

---

## Project structure

```
src/
  ├─ controllers/
  ├─ interfaces/
  ├─ routes/
  ├─ services/
  ├─ testdata/
  ├─ validators/
  ├─ server.ts
  └─ app.ts
package.json
README.md
```

---

## Testing

- Unit tests are implemented with Jest.
- Tests cover route handlers and the interval calculation service.
- Run `npm run test` to execute the test suite.
