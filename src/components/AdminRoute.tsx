import { Navigate } from "react-router-dom";

function AdminRoute({ children }: { children: JSX.Element }) {
  const userString = localStorage.getItem("rezzilli_user");
  
  if (!userString) {
    return <Navigate to="/login" />; 
  }

  const user = JSON.parse(userString);

  if (user.role !== 'admin') {
    return <Navigate to="/" />; 
  }

  return children; 
}

export default AdminRoute;