import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type authContextType = {
  profileName: string;
  profileImage: string;
  login: (profileName, profileImage) => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  profileName: "",
  profileImage: "",
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [profileName, setProfileName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");

  useEffect(() => {
    setProfileName(localStorage.getItem("profile_name"));
    setProfileImage(localStorage.getItem("profileImage"));
  }, []);

  const login = (profileName, profileImage) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("profile_name", profileName);
      localStorage.setItem("profileImage", profileImage);
    }

    setProfileName(profileName);
    setProfileImage(profileImage);
  };

  const logout = () => {
    setProfileName("");
    setProfileImage("");
  };

  const value = {
    profileName,
    profileImage,
    login,
    logout,
  };

  let element = (
    <>
      <>
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
      </>
    </>
  );
  return element;
}

export default AuthProvider;
