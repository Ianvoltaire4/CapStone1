import React, { useState } from 'react'
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';


const DirectChatPage = () => {
    const[username, setUsername] = useState('')
}
function createDirectChat(creds) {

    getOrCreateChat(creds, 
        {is_direct_chat: true, usernames:[username]},
        () => setUsername("")
    )
}

// const renderChatForm = (creds) => {
//   return (
//     <>
//         <input
//             placeholder='Username'
//             value={username}
//             onChange={(e)=> setUsername(e.target.value)}
//         />
//         <button onClick={()=>createDirectChat(creds)}>Create</button>
//     </>
//   )
// }

return(
    <ChatEngine 
        height='100vh'
        userName='Keth'
        userSecret='Keth1'
        projectID='532a0811-8caf-4275-a705-e9b43b5a456e'
        renderNewChatForm={(creds)=>renderChatForm(creds)}
    />
)

export default DirectChatPage