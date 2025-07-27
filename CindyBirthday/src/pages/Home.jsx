import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'

function Home() {
  const [selectedDate, setSelectedDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertType, setAlertType] = useState('success') // 'success' | 'error'

  const navigate = useNavigate()

  const handleVerify = () => {
    if (!selectedDate) {
      alert("masukin dlu tanggalnya ih")
      return
    }

    setIsLoading(true)
    setAlertMessage(null) // Reset alert dulu

    setTimeout(() => {
      setIsLoading(false)
      const targetDate = '2003-07-25'

      if (selectedDate === targetDate) {
        setAlertType('success')
        setAlertMessage('yey bener cindy strobery 😄')

        setTimeout(() => {
          navigate('/galery')
        }, 1500) // Kasih jeda biar user lihat alertnya dulu
      } else {
        setAlertType('error')
        setAlertMessage('ihh bukan cindy juliandry nih masak gak tau tgl lahir 😢')
      }
    }, 2000)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '20px'
    }}>
      <h1>Verifikasi bahwa kamu cindy</h1>
      <p>Coba masukin tanggal lahir km</p>
      {alertMessage && (
        <Alert severity={alertType}>{alertMessage}</Alert>
      )}

      <input
        type="date"
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />

      <button
        onClick={handleVerify}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {isLoading ? 'Sedang diverifikasi...' : 'Verify'}
      </button>

      
    </div>
  )
}

export default Home
