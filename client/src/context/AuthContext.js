import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/auth';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = React.useState(
    false || window.localStorage.getItem('auth') === 'true'
  );
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(userCred => {
      if (userCred) {
        window.localStorage.setItem('auth', 'true');
        userCred.getIdToken(token => {
          setToken(token);
        });
        setAuth(true);
      }
    });
  }, []);

  // FAZER NOVAMENTE SEGUINDO DOCUMENTACAO

  // const loginWithGoogle = async () => {
  //   try {
  //     const userCred = await firebase
  //       .auth()
  //       .signInWithPopup(new firebase.auth.GoogleAuthProvider());

  //     if (userCred) {
  //       window.localStorage.setItem('auth', 'true');
  //       setAuth(true);
  //     }
  //     const token = userCred.user.getIdToken();
  //     setToken(token);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const logout = async () => {
  //   await firebase.auth().signOut();
  //   window.localStorage.removeItem('auth');
  //   setAuth(false);
  // };

  return (
    <AuthContext.Provider value={{ loginWithGoogle, auth, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
};

export default AuthProvider;
