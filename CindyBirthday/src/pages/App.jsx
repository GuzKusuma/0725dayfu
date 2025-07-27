import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Ucapan from './Ucapan'
import Galery from './Galery'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/galery" element={<Galery />} />
      <Route path="/ucapan" element={<Ucapan />} />
    </Routes>
  )
}

export default App
