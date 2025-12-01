import { Routes, Route } from 'react-router-dom';
import CalendarPage from '../src/assets/pages/CalendarPage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<CalendarPage />} />
      </Routes>

    </div>
  )
}

export default App;