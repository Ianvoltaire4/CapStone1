import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import News from './Components/News'
// import { ChatEngine } from 'react-chat-engine';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  
		// 	projectID='532a0811-8caf-4275-a705-e9b43b5a456e'
		// 	userName='adam'
		// 	userSecret='pass1234'

       
	<News/>

    </>
  )
}

export default App
