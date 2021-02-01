/* eslint-disable react/jsx-filename-extension */
import React, {
  lazy, Suspense, useEffect, useState,
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import jwt from 'jwt-decode'
import userContext from 'shared_resources/context/user_context';
import AutoLogout from 'shared_resources/components/auto_logout/auto_logout';

const LoginApp = lazy(() => import('./login/index'));
const SignupApp = lazy(() => import('./login/signup'));
const AppIndex = lazy(() => import('./app/index'));

function App() {
  const [user, setUser] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      let token = localStorage.getItem('token');
      let decodedToken = jwt(token);
      let currentDate = new Date();

      // JWT exp is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        setUser({ username: '', email: '' });
        setLoading(false);
        console.log("here")
      } else {
        console.log("here")
        if (localStorage.getItem('token')) {
          fetch('/social_pill/current_user', {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`
            }
          })
            .then(res => res.json())
            .then(json => {
              setUser({ username: localStorage.getItem('user'), email: localStorage.getItem('user') });
              setLoading(false);
            });
        }
        else {
          setUser({ username: '', email: '' });
          setLoading(false);
        }
      }
    }
    catch (e) {
      setUser({ username: '', email: '' });
      setLoading(false);
    }
  }, [])

  return (
    <div style={{ backgroundColor: '#F5F7FB' }}>
      <React.StrictMode>
        <userContext.Provider value={{ user, setUser }}>
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              {!loading ? (
                <Switch>
                  <Route exact path="/app/login">
                    {user.username !== "" ? (
                      <Redirect to="/app/home" />
                    ) : (

                        <LoginApp />

                      )}
                  </Route>
                  <Route exact path="/app/signup">
                    {user.username !== "" ? (
                      <Redirect to="/app/home" />
                    ) : (

                        <SignupApp />

                      )}
                  </Route>
                  <Route exact path="/app">
                    {user.username !== "" ? (
                      <Redirect to="/app/home" />
                    ) : (
                        <Redirect to="/app/login" />
                      )}
                  </Route>
                  <Route path="/app">
                    {user.username !== "" ? (
                      <AutoLogout ComposedClass={AppIndex} />
                    ) : (
                        <Redirect to="/app/login" />
                      )}
                  </Route>
                </Switch>
              ) : (
                  ''
                )}
            </Suspense>
          </div>
        </userContext.Provider>
      </React.StrictMode>
    </div>
  );
}

export default App;
