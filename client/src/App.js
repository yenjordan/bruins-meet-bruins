import Landing from './pages/HomePage/Landing';
import Profile from './pages/HomePage/CreateProfile';
import SearchPage from './pages/SearchPage/SearchPage';
import ChatPage from './pages/ChatPage/Message';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
//installed routing with npm i react-router-dom@6, other group members just need to run 'npm install'


//routing is what the links will look like, ex: chat page will be localhost.../chat,
//home page woudl just be localhost.../

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/CreateProfile" element={<Profile />} />
        <Route path="/SearchPage" element={<SearchPage />} /> 
        <Route path="/Message" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
