import Header from "./components/header/Header"
import Body from "./components/body/Body"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <main className="app">
      <Toaster />
      <Header />
      <Body />
    </main>
  )
}

export default App
