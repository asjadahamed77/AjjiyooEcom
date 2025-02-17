import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/layout/UserLayout';
function App() {
  return <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<UserLayout />} />
  </Routes>
  </BrowserRouter>
  </>;
}

export default App;
