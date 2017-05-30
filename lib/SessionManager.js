// import Dropbox from 'dropbox'
// import { parseQueryString } from './utils'

// class SessionManager {
//   constructor({ apiKey, redirectUrl = '/'}) {
//     this.apiKey = apiKey
//     this.redirectUrl = redirectUrl
//   }

//   getToken() {
//     return this.token
//       || this.getTokenFromStorage()
//       || this.getTokenFromUrl()
//       || this.redirect()
//   }

//   setToken(token) {
//     this.token = token
//     global.sessionStorage.setItem(TOKEN_KEY, token)
//   }

//   getTokenFromStorage() {
//     return global.sessionStorage.getItem(TOKEN_KEY)
//   }

//   getTokenFromUrl() {
//     const token = parseQueryString(global.location.hash).access_token

//     if (token) {
//       this.setToken(token)
//       this.removeHash()
//     }

//     return token
//   }

//   removeHash() {
//     global.history.pushState('', global.document.title, global.location.pathname
//       + global.location.search)
//   }

//   redirect() {
//     const dbx = new Dropbox({ clientId: this.apiKey })
//     const authUrl = dbx.getAuthenticationUrl(this.authUrl)

//     global.location = authUrl
//   }

//   get authUrl() {
//     const { hostname, port, protocol } = global.location

//     return protocol + '//' +
//       hostname +
//       (port ? ':' + port : '') +
//       this.redirectUrl
//   }
// }

export const APP_KEY = 'tqx0ze13xl6vawf'
export const TOKEN_KEY = 'luggageToken'

class SessionManager {

  getToken() {
    return 'w7gUxoguV8wAAAAAAAAR8yDD4AGlUIgVmWCcl3Ctth7VXIy4r6cvUl9GvF60j1bW'
  }

  setToken(token) {
    //this.token = token
    //try {
    //  await AsyncStorage.setItem(TOKEN_KEY, token);
    //} catch (error) {
    //  // Error saving data
    //}
  }

  getTokenFromStorage() {
    //try {
    //  const value = await AsyncStorage.getItem(TOKEN_KEY);
    //  if (value !== null){
    //    // We have data!!
    //    console.log(value);
    //    return value
    //  }
    //} catch (error) {
    //  // Error retrieving data
    //}
  }
}

export default SessionManager
