import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Streamer from './pages/Streamer';
import Watcher from './pages/Watcher';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Streamer />} />
          <Route path="/watch/:streamId" element={<Watcher />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
