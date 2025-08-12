import { useSelector } from "react-redux";
import AdminDashboard from "../components/AdminDashboard";
import AuthorDashboard from "../components/AuthorDashboard";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {userInfo ? (
        userInfo.isAdmin ? (
          <AdminDashboard />
        ) : (
          <AuthorDashboard />
        )
      ) : (
        <>
          <div style={{ height: "40px" }} />
          <img src="/home.png" style={{ width: "100%", height: "auto" }} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
