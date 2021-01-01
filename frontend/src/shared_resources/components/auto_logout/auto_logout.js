import React, { useContext, useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import UserContext from 'shared_resources/context/user_context';

const AutoLogoutTimer = (props) => {
  localStorage.setItem('is_idle', false);

  const { user, setUser } = useContext(UserContext);
  const { ComposedClass } = props;
  const [inactivityOpen, setInactivityOpen] = React.useState(false);

  const title = 'Still there?';
  const options = {
    body: 'You\'ll be logged out in 5 minutes and that will cause losing in progress work.',
    icon: '/ngh_logo.png',
    requireInteraction: true,
  };

  let notification;

  const handleOnIdle = (event) => {
    if (localStorage.getItem('is_idle') !== true && Date.now() - localStorage.getItem('last_active') > 29000) {
      setTimeout(() => {
        if (localStorage.getItem('is_idle') !== true && Date.now() - localStorage.getItem('last_active') > 29000) {
          axios
            .get('/api/logout')
            .then((res) => {
              setUser({
                email: '', role: '', id_token: '', given_name: '',
              });
              localStorage.setItem('is_idle', true);
              localStorage.removeItem('last_active');
              if (notification) notification.close();
              return <Redirect to="/" push />;
            })
            .catch((err) => console.log('I could not call axios'));
        } else if (localStorage.getItem('is_idle') === true) window.location.href = '/app';
        else;
      }, 1000 * 60 * 5);
      // setIdle(true);

      if (!('Notification' in window)) {
        alert('This browser does not support desktop notification');
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === 'granted') {
        if (!notification) notification = new Notification(title, options);
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
          if (permission === 'granted') {
            notification = new Notification(title, options);
          }
        });
      }
    } else if (localStorage.getItem('is_idle') === true) window.location.href = '/app';
    else;
  };

  const handleOnActive = (event) => {
    if (localStorage.getItem('is_idle').toString() === 'true') {
      notification.close();
      window.location.href = '/app';
    } else if (notification) notification.close();
  };

  const handleOnAction = (e) => {
    localStorage.setItem('last_active', Date.now());
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 60,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  return (
    <div>
      <ComposedClass />
    </div>
  );
};

export default AutoLogoutTimer;
