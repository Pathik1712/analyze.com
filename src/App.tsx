import Header from "./components/header/Header"
import { Toaster } from "react-hot-toast"
import Layout from "./components/layout/Layout"

function App() {
  return (
    <main className="app">
      <Toaster />
      <Header />
      <Layout />
    </main>
  )
}

export default App
