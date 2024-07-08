import { useState } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { UserInfoContext } from './providers/UserInfo';
import './app.css';

const router = createRouter({ routeTree });
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {

  const [username, setUsername] = useState('');

  return (
    <UserInfoContext.Provider value={{ name: username, setName: setUsername }}>
      <RouterProvider router={router} />
    </UserInfoContext.Provider>
  )
}

export default App
