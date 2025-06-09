import { BrowserRouter } from "react-router-dom"
import { DashBoard } from "./components/dashBoard"

const App = () => {

  return <BrowserRouter>
    <DashBoard />
  </BrowserRouter>

}


export { App }