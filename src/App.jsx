import './App.css'
import Navbar from './components/Navbar'
import CoursesGrid from './pages/CoursesGrid'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UnitCourse from './pages/UnitCourse'
import Footer from './components/Footer'
import LogIn from './pages/Login'
import SignUp from './pages/SignUp'
import CoursePlayer from './pages/CoursePlayer'

function App() {

  return (
    <Router>
        <div className='flex flex-col min-h-screen'>
      <Navbar />
        <Routes className="flex-1">
          <Route path="/" element={<CoursesGrid />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/course/:id" element={<UnitCourse />} />
          <Route path="/course/:id/player" element={<CoursePlayer />} />
        </Routes>
      <Footer />
    </div>
      </Router>
  )
}

export default App
