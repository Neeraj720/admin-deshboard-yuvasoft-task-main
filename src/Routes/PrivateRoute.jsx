import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function PrivateRoute({ Component }) {
  const { userToken } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!userToken) {
      navigate("/");
    }
  }, [userToken]);
  return <>{userToken ? <Component /> : <Navigator to="/" />}</>;
}

export default PrivateRoute;
