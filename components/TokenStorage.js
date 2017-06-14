import { AsyncStorage } from 'react-native'

export const TOKEN_KEY = '@DropboxAuthToken'

class TokenStorage {
  async getToken() {
    return this.token || await this.getTokenFromStorage()
  }

  async setToken(token) {
    this.token = token
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      // Error saving data
    }
  }

  async getTokenFromStorage() {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY)
    } catch (error) {
      // Error retrieving data
    }
  }
}

export default TokenStorage
