import { useState } from 'react'
import './App.css'

function App() {
  const [dob, setDob] = useState('')
  const [years, setYears] = useState(0)
  const [months, setMonths] = useState(0)
  const [days, setDays] = useState(0)
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  function calculate() {
    if (dob === '') {
      setError('Please select your date of birth.')
      setShow(false)
      return
    }

    const birth = new Date(dob)
    const today = new Date()

    if (birth > today) {
      setError('Date of birth cannot be in the future.')
      setShow(false)
      return
    }

    let y = today.getFullYear() - birth.getFullYear()
    let m = today.getMonth() - birth.getMonth()
    let d = today.getDate() - birth.getDate()

    if (d < 0) {
      m = m - 1
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      d = d + prevMonth.getDate()
    }

    if (m < 0) {
      y = y - 1
      m = m + 12
    }

    setYears(y)
    setMonths(m)
    setDays(d)
    setError('')
    setShow(true)
  }

  return (
    <div className="app">
      <h1>Age Calculator</h1>

      <label>Date of Birth</label>
      <br />
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      <br />
      <button onClick={calculate}>Calculate Age</button>

      {error !== '' && <p className="error">{error}</p>}

      {show && (
        <div className="result">
          <p>Your age is</p>
          <p className="answer">{years} years {months} months {days} days</p>
        </div>
      )}
    </div>
  )
}

export default App
