import { useState } from 'react'
import Editor from './editor'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Editor></Editor>
    </div>
  )
}

export default App
