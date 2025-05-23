import './App.css'
import Navbar from './components/Navbar'
import CoursesGrid from './pages/CoursesGrid'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UnitCourse from './pages/UnitCourse'
import Footer from './components/Footer'
import LogIn from './pages/Login'
import SignUp from './pages/SignUp'
import CoursePlayer from './pages/CoursePlayer'
import UploadCourse from './pages/UploadCourse'
import ModifyCourse from './pages/ModifyCourse'

function App() {

  return (
    <Router>
        <div className='flex flex-col min-h-screen'>
      <Navbar />
        <Routes className="flex-1">
          <Route path="/" element={<LogIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/courses" element={<CoursesGrid />} />
          <Route path="/course/:id" element={<UnitCourse />} />
          <Route path="/course/:id/player" element={<CoursePlayer />} />
          <Route path="/course/:id/player/:videoId" element={<CoursePlayer />} />
          <Route path="/upload" element={<UploadCourse />} />
          <Route path="/course/:id/modify" element={<ModifyCourse />} />
        </Routes>
      <Footer />
    </div>
      </Router>
  )
}

export default App
