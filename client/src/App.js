import './App.css';
import ListOfTodos from './components/ListOfTodos';
import { useAuth } from './context/AuthContext';

function App() {
  const { auth, loginWithGoogle, logout } = useAuth();

  return (
    <div className="App">
      {!auth ? (
        <button onClick={loginWithGoogle}>Login with Google</button>
      ) : (
        <>
          <h1>Todos</h1>
          <button onClick={() => logout()}>Logout</button>
          <ListOfTodos />
        </>
      )}
    </div>
  );
}

export default App;
