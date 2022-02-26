import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Streamer from './pages/Streamer';
import Watcher from './pages/Watcher';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Streamer />} />
        <Route path="/watch/:streamId" element={<Watcher />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
