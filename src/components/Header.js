import { useContext } from 'react'; 
import { AuthContext } from "./../context/auth.context";

function Header() {

  const { logOutUser } = useContext(AuthContext);

  return (
  <header className="bg-white shadow-sm">
    <div className="container mx-auto px-4 py-6 flex items-center justify-between">
      
      {/* Left side: Title + tagline */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Taskify</h1>
        <p className="text-gray-600">Complete your tasks efficiently</p>
      </div>

      {/* Right side: Logout button */}
      <button 
        onClick={logOutUser} 
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
      >
        Logout
      </button>

    </div>
  </header>

  );
}

export default Header;
