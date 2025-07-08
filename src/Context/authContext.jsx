import { createContext, useEffect, useState, Suspense } from "react";
import ApiManager from "../Utilies/ApiManager";
import HomeLoading from "../Component/Ui/HomeLoading/HomeLoading";
const authContext = createContext();
function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  // this token is for student who register
  const [onlineToken, setOnlineToken] = useState(null);
  const [isRegistered, setIsRegistered] = useState(null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [onlineUser, setOnlineUser] = useState(null);
  const [loading, setLoading] = useState(true);
  /**
   * this function check if the session is still valid or not
   * @returns {void}
   */
  const checkSession = async () => {
    // return true if the session is still valid
    try {
      let isSessionValid = await checkIfSessionValid(token);
      if (isSessionValid) {
        setIsRegistered(isSessionValid);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setIsRegistered(false);
    }
  };
  /**
   * this function get Current User Data
   * @param {string} token
   * @returns {void}
   */
  const getCurrentUserData = async (token) => {
    try {
      const { data } = await ApiManager.getProfile(token);
      if (data.code == 200) {
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  /**
   * this function get online User Token
   * @param {string} onlineToken
   * @returns {void}
   */
  /**
   * 
   *  "OnlineUser": {
    "id": "bf275e1a-340e-49d2-888a-35622be875ed",
    "name": "Ahmed Alaa Elsaadani",
    "level": "رياض أطفال 1",
    "schoolLevel": 1,
    "phone": "+20 01033487865",
    "email": "ahmedalaaelsaadani0@gmail.com",
    "countryId": 43,
    "countryCode": "EG"
  }} onlineToken 
   */
  const getOnlineUserData = async (onlineToken) => {
    try {
      const { data } = await ApiManager.getOnlineStudentInfo(onlineToken);
      if (data.code == 200) {
        setOnlineUser(data.data);
      } else setOnlineToken(null);
    } catch (error) {
      console.error(error);
      setOnlineToken(null);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (token) {
      checkSession();
    } else {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (token) checkSession();
    else {
      setIsRegistered(false);
      endACurrentSession();
    }
  }, [token]);
  useEffect(() => {
    // else setLoading(true);
    let timeOutIdx;
    
    if (isRegistered) getCurrentUserData(token);
    else {
      setLoading(true);
      timeOutIdx = setTimeout(() => setLoading(false), 1000);
    }
    return () => clearTimeout(timeOutIdx);
  }, [isRegistered]);

  useEffect(() => {
    if (onlineToken) getOnlineUserData(onlineToken);
    else setOnlineUser(null);
  }, [onlineToken]);

  return (
    <>
      {loading ? (
        <HomeLoading />
      ) : (
        <Suspense fallback={<HomeLoading />}>
          <authContext.Provider
            value={{
              token,
              setToken,
              isRegistered,
              user,
              setUser,
              onlineUser,
              onlineToken,
              setOnlineUser,
              setOnlineToken,
              loading, // this is for the loading state but i don't use it yet
            }}
          >
            {children}
          </authContext.Provider>
        </Suspense>
      )}
    </>
  );
}
export default AuthProvider;
export { authContext };
//==============Authorization Functions=============
export function startANewSession() {
  const currentDate = new Date();
  localStorage.setItem("startDateSession", currentDate);
  currentDate.setMinutes(currentDate.getMinutes() + 30);
  localStorage.setItem("endDateSession", currentDate);
  localStorage.setItem("sessionFlag", "true");
}
export function endACurrentSession() {
  localStorage.setItem("sessionFlag", "false");
  localStorage.removeItem("endDateSession");
  localStorage.removeItem("startDateSession");
  localStorage.removeItem("token");
}
async function isUserSession(token) {
  if (token) {
    const { data } = await ApiManager.checkIfSessionValid(token);

    if (data.code === 200) {
      localStorage.setItem("token", token);
      startANewSession();
      return true;
    } else if (data.code === 202) {
      localStorage.setItem("token", data.message);
      startANewSession();
      return true;
    } else {
      endACurrentSession();
      return false;
    }
  } else {
    return false;
  }
}
async function checkIfSessionValid(token) {
  const now = new Date();
  const endDateSessionFromLocalStorage = localStorage.getItem("endDateSession");
  if (token && endDateSessionFromLocalStorage) {
    const endDateSession = new Date(endDateSessionFromLocalStorage);
    if (now <= endDateSession) {
      localStorage.setItem("token", token);
      localStorage.setItem("sessionFlag", "true");
      return true;
    } else {
      return await isUserSession(token);
    }
  } else {
    return await isUserSession(token);
  }
}
