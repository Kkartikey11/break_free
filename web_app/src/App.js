import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import DashboardRoutes from './routes/dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
        </Routes>
      </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
