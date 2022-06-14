import EmployeeContextProvider from "../../contexts/employee"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
// import {use} from "react-router"
import Layout from "../Layout/main";
import Home from '../Home'
import Archieve from '../Archieved'

function App() {
  return (
    <Layout>
      <EmployeeContextProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/deleted" element={<Archieve />} />
            </Routes>
          </Router>
      </EmployeeContextProvider>
    </Layout>
  );
}

export default App;
