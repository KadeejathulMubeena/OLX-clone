import { useEffect,useContext } from 'react';
import './App.css';
import Home from './Pages/Home';
import { Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Components/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './Store/Context';
import { auth, db } from './firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import Create from './Pages/Create';
import Post from './Store/PostContext';
import View from './Pages/ViewPost';

function App() {

  const {setUser} = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const docRef = doc(db, 'Users', userAuth.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
          console.log('User data:', docSnap.data());
        }
      } else {
        setUser(null);
        console.log('User logged out');
      }
    });

    return unsubscribe;
  }, [setUser]);

  return (
    <div>
      <Post>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/view' element={<View />} />
        </Routes>
        <ToastContainer />
      </Post>
    </div>
  );
}

export default App;
