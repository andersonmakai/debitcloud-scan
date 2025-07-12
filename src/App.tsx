import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/routes";
import Chatbot from './components/chatboot/chatboot';
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      
      <Chatbot />
    </BrowserRouter>
  );
}

export default App;
