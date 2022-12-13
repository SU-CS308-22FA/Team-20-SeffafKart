
import './App.css';
import Navbar from './components/Navbar';
import Sign_up from './Pages/Sign_up';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import { Route, Routes} from 'react-router-dom';
import {useState} from 'react';
import Game from './Pages/Game';
import Archive from './Pages/Archive';
import AdministrativeAct from './AdminPages/AdministrativeAct';
import CreateMatch from './AdminPages/CreateMatch';
import AssignReferee from './AdminPages/AssignReferee';

function App() {
  // const adminUser = {
  //   email:"admin@admin.com",
  //   username:"admin",
  //   password: "admin123",
  // }
  // const [user, setUser] = useState({username:"",email:""});
  // const [error, setError] = useState("");

  // const Login = details => {
  //   console.log(details);

  //   if(details.email == adminUser.email && details.password == adminUser.password) {
  //     console.log("Logged in");
  //     setUser({
  //       username: details.username,
  //       email: details.email
  //     });
  //   } else {
  //     console.log("Details do not match.");
  //   }
  // }

  // const Logout = () => {
  //   console.log("Logout");
  //   setUser({username:"",email:""});
  // }


 return (
    <>
      <Navbar />
      <div className='container'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/sign-up' element={<Sign_up />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/game' element={<Game />}/>
        <Route path='/referees' element={<Home />}/>
        <Route path='/admin-act' element={<AdministrativeAct />}/>
        <Route path='/match' element={<CreateMatch />}/>
        <Route path='/assignreferee' element={<AssignReferee />}/>

      </Routes>
      </div>   
    </>
  );
}

export default App;
