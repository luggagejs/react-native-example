const createSessionManager = token => (
  class SessionManager {
    getToken() {
      return this.token || token
    }

    setToken(t) {
      this.token = t
    }
  }
)

export default createSessionManager
