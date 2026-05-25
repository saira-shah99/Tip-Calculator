# Tip Calculator · Bill Splitter

A single-screen, live-updating tip calculator and bill splitter built with React (Vite). No "Calculate" button — all outputs update as you type.

## Live Demo
[
(https://stunning-toffee-d4a279.netlify.app/)](https://agent-6a13db4c25694abefc--stunning-toffee-d4a279.netlify.app/)

## How to run locally

**Prerequisites:** Node.js 18 installed.

```bash
git clone https://github.com/saira-shah99/Tip-Calculator
cd tip-calculator
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Rounding policy

Per-person amounts are rounded up to the nearest paisa (ceiling at 2 decimal places):
Math.ceil(grandTotal / people * 100) / 100

When rounding occurs, the app shows exactly how much was rounded and why.
