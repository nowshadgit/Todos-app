import React from 'react';
import { Redirect } from 'react-router-dom';
import { setCookie, getCookie, deleteCookie } from './cookieFunctions';
import { userSessionCookie, rememberUserCookie, PAGE_ACCESS } from '../config';

const setSession = (data, cookieName) => {
  setCookie(cookieName, JSON.stringify(data), 1);
};

const redirectToLogin = eve => {
  const urlParts = window.location.pathname.split('/');
  window.location.assign(`/${urlParts[0]}`);
};

const getSession = cookieName => {
  let sessionData;
  try {
    sessionData = JSON.parse(getCookie(cookieName)) || {};
  } catch (e) {
    sessionData = {};
    setSession(sessionData); // set it empty
  }
  return sessionData;
};

const deleteSession = cookieName => {
  deleteCookie(cookieName);
};

const isUserLoggedIn = () => {
  const { sessionId, user } = getSession();
  if (user && sessionId) {
    return true;
  }
  return false;
};

const logout = (sessionCookie) => {
  deleteSession(sessionCookie);
  redirectToLogin();
};

const handleUrl = authorizedComponent => {
  return checkUserLoggedIn() ? authorizedComponent : <Redirect to="/login" />;
};

const checkUserLoggedIn = () => {
  const sessionData = getSession(userSessionCookie);
  if (
    (sessionData &&
      Object.entries(sessionData).length > 0 &&
      sessionData.token)
  ) {
    return true;
  }
  return false;
};

export {
  logout,
  handleUrl,
  setSession,
  getSession,
  deleteSession,
  isUserLoggedIn,
  redirectToLogin,
  checkUserLoggedIn,
};
