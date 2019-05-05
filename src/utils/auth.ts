import Cookies from 'js-cookie'

const TokenKey = 'sysToken'

export const getToken = () => {
  return Cookies.get(TokenKey)
}

export const setToken = (token: any) => {
  return Cookies.set(TokenKey, token)
}

export const removeToken = () => {
  return Cookies.remove(TokenKey)
}
