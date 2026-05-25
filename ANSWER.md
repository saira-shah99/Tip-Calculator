# ANSWERS.md

## 1. How to run

Prerequisites: Node.js 18.

git clone https://github.com/saira-shah99/Tip-Calculator
cd tip-calculator
npm install
npm run dev   # opens at http://localhost:5173

No other installs needed. See README.md for the Netlify deployed URL.

---

## 2. Stack & design choices

**Why React + Vite:**
This is a single interactive screen with several interdependent pieces of state (bill, tip mode, tip value, people count, derived outputs, error messages). React's useState + useEffect makes the dependency graph explicit and easy to reason about. Vite gives near-instant hot reload, which matters when iterating on interaction feel.

**Visual decision 1 — the per-person card is visually dominant (amber border, largest number).**
The per-person amount is what people actually care about. By making that card taller, accenting its border in amber, and rendering the number at 32px vs 26px for the other two cards, the eye lands there first even without reading any label.

## 3. Responsive & accessibility

**360px phone vs 1440px laptop:**
The two-panel layout uses grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)). On a 360px screen the grid automatically collapses to a single column — inputs stacked above results. On 1440px both panels sit side-by-side. No media query breakpoints were hand-coded; the grid handles it.

**Accessibility skipped:**
High-contrast mode / forced-colors testing. The amber accent (#EF9F27) passes WCAG AA contrast for large text but I did not test it against Windows High Contrast Mode. With another day I would add forced-colors media query overrides.

---

**Something I changed:**
The result section as three equal-height cards. I changed the per-person card to use flex:1 so it grows to fill remaining vertical space, and bumped its font size from 26px to 32px. The AI treated all three outputs as equally important; I wanted the per-person figure to dominate. I also added the wasRounded note beneath it — the AI omitted any rounding disclosure — because showing the user the rounded-up amount is the only way the rounding policy is transparent.

---

### Changes I Made
I also added a rounding note so users can clearly see when the amount has been rounded.

---

## 5. Honest Gap

The rounding note is small on mobile screens and can sometimes be easy to miss.
With more time, I would improve it by adding a clearer visual indicator or tooltip for better user experience.