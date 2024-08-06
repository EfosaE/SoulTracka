import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRefreshQuery, useGetProfileQuery } from '../redux/api/authApiSlice';
import { setToken, setUser } from '../redux/features/authSlice';

const Redirect = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   // Refresh token query
   const {
     isLoading: isRefreshLoading,
     data: accessToken,
     error: accessTokenError,
   } = useRefreshQuery('');

   // Profile query with skip
   const {
     isLoading: isProfileLoading,
     data: profile,
     error: profileError,
   } = useGetProfileQuery(null, { skip: !isAuthenticated });

   useEffect(() => {
     console.log('isLoading', isRefreshLoading);
     console.log('error', accessTokenError);
     console.log('token', accessToken);
     if (accessTokenError) {
       navigate('/login');
     }
     if (accessToken) {
       dispatch(setToken(accessToken));
       setIsAuthenticated(true);
     }
   }, [accessToken, accessTokenError, dispatch, isRefreshLoading, navigate]);

   useEffect(() => {
     if (profileError) {
       setIsAuthenticated(false);
     } else if (profile) {
       console.log(profile);
       dispatch(setUser(profile.user));
       navigate('/home');
     }
   }, [profile, profileError, dispatch, navigate]);
    
    return ('loading...')

}

export default Redirect