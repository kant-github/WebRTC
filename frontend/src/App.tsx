import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Sender from './pages/Sender'
import Receiver from './pages/Reciever'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Hi</div>} />
          <Route path="/sender" element={<Sender />} />
          <Route path="/reciever" element={<Receiver />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
