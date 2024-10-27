import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import Navbar from "./Components/Navbar";

function App() {
  return <>
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/create" element={<CreateBlog/>} />
    
  </Routes>
  </BrowserRouter>
  </>
}

export default App;
