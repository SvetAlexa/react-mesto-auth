import * as token from '../utils/token';
import { checkResponse } from './utils';

export const BASE_URL = 'https://auth.nomoreparties.co'

export function request(endpoint, options) {
  const baseUrl = `${BASE_URL}${endpoint}`
  return fetch(baseUrl, options)
    .then(checkResponse)
}

export const register = (email, password) => {
  return request(`/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
}

export const authorize = (email, password) => {
  return request(`/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((data) => {
      if (data.token) {
        token.setToken(data.token);
        return data;
      } else {
        return null
      }
    })
}

export const checkToken = (token) => {
  return request(`/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}
