import { useState } from "react";
import { useDispatch } from "react-redux";
import { accountInformation, gitAccessToken } from "../redux/authReducer";

export const useGetUserInformation = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [profileStatus, setProfileStatus] = useState(false);

  const getProfile = () => {
    dispatch(
      accountInformation((response: any) => {
        setProfileStatus(response.ok);
        setLoading(false);
      })
    );
  };

  const getAccessGit = (code:string) => {
    dispatch(
      gitAccessToken(code, (response: any) => {
        setProfileStatus(response.ok);
        console.log(response.ok);
        
        setLoading(false);
      })
    );
  }

  return {
    getProfile,
    getAccessGit,
    loading,
    setLoading,
    profileStatus,
    setProfileStatus,
  };
};
