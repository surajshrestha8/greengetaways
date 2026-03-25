# Booking Availability Table Component

A reusable tour/travel booking table that displays departure dates, availability spaces, and per-person pricing with a "Book Now" CTA — modelled on the screenshot design.

---

## Visual Reference

| Column | Content |
|---|---|
| **Dates** | Arrival → Departure (day label + date) |
| **Availability** | Spaces left (or "Available (private only)") |
| **Price** | Per person, twin-share basis |
| **Action** | "BOOK NOW" button |

Month headers (`MARCH 2026`, `APRIL 2026`) group the rows in bold blue.

---

## Data Shape

```ts
type BookingRow = {
  id: string;
  arrivalDay: string;       // e.g. "Friday"
  arrivalDate: string;      // e.g. "27 Mar, 2026"
  departureDay: string;
  departureDate: string;
  availability: string;     // e.g. "6 spaces left" | "Available (private only)"
  isPrivateOnly?: boolean;  // drives orange "private only" label
  priceUSD: number;         // e.g. 3790
  bookingUrl: string;
};

type MonthGroup = {
  month: string;            // e.g. "MARCH 2026"
  rows: BookingRow[];
};
```

---

## React Component

```tsx
// BookingTable.tsx
import React from "react";
import "./BookingTable.css";

type BookingRow = {
  id: string;
  arrivalDay: string;
  arrivalDate: string;
  departureDay: string;
  departureDate: string;
  availability: string;
  isPrivateOnly?: boolean;
  priceUSD: number;
  bookingUrl: string;
};

type MonthGroup = {
  month: string;
  rows: BookingRow[];
};

type BookingTableProps = {
  groups: MonthGroup[];
  onBook?: (row: BookingRow) => void;
};

const fmt = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

export function BookingTable({ groups, onBook }: BookingTableProps) {
  return (
    <div className="bt-wrapper">
      {/* Header */}
      <div className="bt-header">
        <div className="bt-col bt-col--dates">
          <span className="bt-header-title">Dates</span>
          <span className="bt-header-sub">Arrival - Departure</span>
        </div>
        <div className="bt-col bt-col--avail">
          <span className="bt-header-title">Availability</span>
          <span className="bt-header-sub">Spaces</span>
        </div>
        <div className="bt-col bt-col--price">
          <span className="bt-header-title">Price</span>
          <span className="bt-header-sub">Per Person (Twin share basis)</span>
        </div>
        <div className="bt-col bt-col--action" />
      </div>

      {/* Month groups */}
      {groups.map((group) => (
        <div key={group.month} className="bt-group">
          <div className="bt-month-header">{group.month}</div>

          {group.rows.map((row, i) => (
            <div key={row.id} className={`bt-row ${i % 2 === 1 ? "bt-row--alt" : ""}`}>
              {/* Dates */}
              <div className="bt-col bt-col--dates">
                <div className="bt-date-pair">
                  <div className="bt-date-block">
                    <span className="bt-day">{row.arrivalDay}</span>
                    <span className="bt-date">{row.arrivalDate}</span>
                  </div>
                  <span className="bt-arrow">→</span>
                  <div className="bt-date-block">
                    <span className="bt-day">{row.departureDay}</span>
                    <span className="bt-date">{row.departureDate}</span>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="bt-col bt-col--avail">
                <span className={row.isPrivateOnly ? "bt-avail bt-avail--private" : "bt-avail"}>
                  {row.availability}
                </span>
              </div>

              {/* Price */}
              <div className="bt-col bt-col--price">
                <span className="bt-price">US {fmt(row.priceUSD)}</span>
              </div>

              {/* CTA */}
              <div className="bt-col bt-col--action">
                <button
                  className="bt-book-btn"
                  onClick={() => onBook ? onBook(row) : window.open(row.bookingUrl, "_blank")}
                >
                  BOOK NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

---

## CSS

```css
/* BookingTable.css */

.bt-wrapper {
  font-family: "Helvetica Neue", Arial, sans-serif;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  width: 100%;
}

/* ── Header ── */
.bt-header {
  display: flex;
  align-items: flex-start;
  padding: 16px 24px;
  border-bottom: 2px solid #e0e0e0;
  background: #fff;
}

.bt-header-title {
  display: block;
  font-weight: 700;
  font-size: 15px;
  color: #111;
}

.bt-header-sub {
  display: block;
  font-size: 12px;
  color: #888;
  margin-top: 2px;
}

/* ── Column layout ── */
.bt-col { display: flex; flex-direction: column; }

.bt-col--dates  { flex: 3; }
.bt-col--avail  { flex: 2; justify-content: center; }
.bt-col--price  { flex: 2; justify-content: center; }
.bt-col--action { flex: 1.2; align-items: flex-end; justify-content: center; }

/* ── Month header ── */
.bt-month-header {
  padding: 14px 24px 10px;
  font-size: 15px;
  font-weight: 700;
  color: #1a73c8;
  border-bottom: 1px solid #e0e0e0;
  letter-spacing: 0.04em;
}

/* ── Row ── */
.bt-row {
  display: flex;
  align-items: center;
  padding: 18px 24px;
  border-bottom: 1px solid #e8e8e8;
  background: #fff;
  transition: background 0.15s;
}

.bt-row--alt {
  background: #f7faff;
}

.bt-row:hover {
  background: #eef4ff;
}

/* ── Date pair ── */
.bt-date-pair {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bt-date-block {
  display: flex;
  flex-direction: column;
}

.bt-day {
  font-size: 14px;
  color: #1a73c8;
  font-weight: 600;
}

.bt-date {
  font-size: 14px;
  color: #333;
  margin-top: 2px;
}

.bt-arrow {
  color: #1a73c8;
  font-size: 18px;
  font-weight: 300;
}

/* ── Availability ── */
.bt-avail {
  font-size: 14px;
  color: #333;
}

.bt-avail--private {
  color: #e8910a;
  font-weight: 500;
}

/* ── Price ── */
.bt-price {
  font-size: 15px;
  color: #1a73c8;
  font-weight: 500;
}

/* ── Book button ── */
.bt-book-btn {
  background: #f5a623;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 12px 22px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s, transform 0.1s;
}

.bt-book-btn:hover  { background: #d4881a; }
.bt-book-btn:active { transform: scale(0.97); }

/* ── Responsive ── */
@media (max-width: 640px) {
  .bt-row, .bt-header {
    flex-wrap: wrap;
    gap: 12px;
  }
  .bt-col--dates  { flex: 100%; }
  .bt-col--avail  { flex: 1; }
  .bt-col--price  { flex: 1; }
  .bt-col--action { flex: 100%; align-items: stretch; }
  .bt-book-btn    { width: 100%; text-align: center; }
}
```

---

## Usage Example

```tsx
import { BookingTable } from "./BookingTable";

const DATA = [
  {
    month: "MARCH 2026",
    rows: [
      {
        id: "mar-27",
        arrivalDay: "Friday",   arrivalDate: "27 Mar, 2026",
        departureDay: "Friday", departureDate: "10 Apr, 2026",
        availability: "6 spaces left",
        priceUSD: 3790,
        bookingUrl: "/book/mar-27",
      },
    ],
  },
  {
    month: "APRIL 2026",
    rows: [
      {
        id: "apr-03",
        arrivalDay: "Friday",   arrivalDate: "03 Apr, 2026",
        departureDay: "Friday", departureDate: "17 Apr, 2026",
        availability: "1 spaces left",
        priceUSD: 3790,
        bookingUrl: "/book/apr-03",
      },
      {
        id: "apr-10",
        arrivalDay: "Friday",   arrivalDate: "10 Apr, 2026",
        departureDay: "Friday", departureDate: "24 Apr, 2026",
        availability: "8 spaces left",
        priceUSD: 3790,
        bookingUrl: "/book/apr-10",
      },
      {
        id: "apr-12",
        arrivalDay: "Sunday",   arrivalDate: "12 Apr, 2026",
        departureDay: "Sunday", departureDate: "26 Apr, 2026",
        availability: "Available (private only)",
        isPrivateOnly: true,
        priceUSD: 3790,
        bookingUrl: "/book/apr-12",
      },
    ],
  },
];

export default function App() {
  return (
    <BookingTable
      groups={DATA}
      onBook={(row) => console.log("Booking:", row.id)}
    />
  );
}
```

---

## Customisation Notes

| Token | Default | Purpose |
|---|---|---|
| `--bt-blue` | `#1a73c8` | Day labels, prices, month headers, arrows |
| `--bt-orange` | `#f5a623` | Book Now button & private-only label |
| `--bt-alt-row` | `#f7faff` | Alternating row tint |

To switch to CSS variables, replace colour literals in `BookingTable.css` with `var(--bt-blue)` etc. and declare them on `:root`.

---

## File Checklist

```
src/
  components/
    BookingTable/
      BookingTable.tsx   ← component
      BookingTable.css   ← styles
      index.ts           ← re-export
```

`index.ts` contents:
```ts
export { BookingTable } from "./BookingTable";
```