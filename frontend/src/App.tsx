import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Sender from './pages/Sender'
import Reciever from './pages/Reciever'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Hi</div>} />
          <Route path="/sender" element={<Sender />} />
          <Route path="/reciever" element={<Reciever />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
