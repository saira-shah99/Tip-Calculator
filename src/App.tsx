import { useState } from 'react'

const QUICK_TIPS = [10, 15, 18, 20, 25]

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function App() {
  const [bill, setBill] = useState('')
  const [tipMode, setTipMode] = useState<'quick' | 'custom'>('quick')
  const [quickTip, setQuickTip] = useState(15)
  const [customTip, setCustomTip] = useState('')
  const [people, setPeople] = useState('1')

  const billNum = parseFloat(bill) || 0
  const tipPct =
    tipMode === 'quick' ? quickTip : parseFloat(customTip) || 0
  const peopleNum = Math.max(1, parseInt(people) || 1)

  const tipAmount = billNum * (tipPct / 100)
  const grandTotal = billNum + tipAmount

  const exactPerPerson = grandTotal / peopleNum
  const roundedPerPerson = Math.ceil(exactPerPerson * 100) / 100
  const wasRounded = roundedPerPerson !== parseFloat(exactPerPerson.toFixed(2))
  const roundingDiff = parseFloat((roundedPerPerson - exactPerPerson).toFixed(4))

  const billError = bill !== '' && (isNaN(billNum) || billNum < 0)
    ? 'Enter a valid bill amount'
    : null
  const tipError =
    tipMode === 'custom' && customTip !== '' && (isNaN(parseFloat(customTip)) || parseFloat(customTip) < 0)
      ? 'Enter a valid tip %'
      : null
  const peopleError =
    people !== '' && (isNaN(parseInt(people)) || parseInt(people) < 1)
      ? 'Must be at least 1 person'
      : null

  return (
    <div className="page">
      <header className="header">
        <h1>Tip Calculator</h1>
        <p className="subtitle">Split the bill — no button needed</p>
      </header>

      <main className="card-grid">
        {/* ── Inputs panel ── */}
        <section className="panel inputs-panel">
          <div className="field">
            <label htmlFor="bill">Bill amount</label>
            <div className="input-wrap">
              <span className="prefix">$</span>
              <input
                id="bill"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                className={billError ? 'error' : ''}
              />
            </div>
            {billError && <span className="field-error">{billError}</span>}
          </div>

          <div className="field">
            <label>Tip</label>
            <div className="tip-tabs">
              <button
                className={tipMode === 'quick' ? 'tab active' : 'tab'}
                onClick={() => setTipMode('quick')}
              >
                Quick pick
              </button>
              <button
                className={tipMode === 'custom' ? 'tab active' : 'tab'}
                onClick={() => setTipMode('custom')}
              >
                Custom
              </button>
            </div>

            {tipMode === 'quick' ? (
              <div className="quick-tips">
                {QUICK_TIPS.map((pct) => (
                  <button
                    key={pct}
                    className={quickTip === pct ? 'tip-btn selected' : 'tip-btn'}
                    onClick={() => setQuickTip(pct)}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            ) : (
              <div className="input-wrap">
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="e.g. 12"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  className={tipError ? 'error' : ''}
                />
                <span className="suffix">%</span>
              </div>
            )}
            {tipError && <span className="field-error">{tipError}</span>}
          </div>

          <div className="field">
            <label htmlFor="people">Number of people</label>
            <div className="input-wrap">
              <input
                id="people"
                type="number"
                min="1"
                step="1"
                placeholder="1"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className={peopleError ? 'error' : ''}
              />
            </div>
            {peopleError && <span className="field-error">{peopleError}</span>}
          </div>
        </section>

        {/* ── Results panel ── */}
        <section className="panel results-panel">
          <div className="result-card">
            <span className="result-label">Tip amount</span>
            <span className="result-value">${formatCurrency(tipAmount)}</span>
            <span className="result-sub">{tipPct}% of ${formatCurrency(billNum)}</span>
          </div>

          <div className="result-card">
            <span className="result-label">Total</span>
            <span className="result-value">${formatCurrency(grandTotal)}</span>
            <span className="result-sub">bill + tip</span>
          </div>

          <div className="result-card result-card--featured">
            <span className="result-label">Per person</span>
            <span className="result-value result-value--lg">${formatCurrency(roundedPerPerson)}</span>
            <span className="result-sub">
              {peopleNum} {peopleNum === 1 ? 'person' : 'people'}
            </span>
            {wasRounded && (
              <p className="rounding-note">
                Rounded up by&nbsp;
                <strong>${formatCurrency(roundingDiff)}</strong> per person
                (ceiling at 2 decimal places)
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
