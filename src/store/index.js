class SessionStorage {
  constructor() {
    this.storage = window.sessionStorage
  }

  get loggedIn() {
    return Boolean(this.storage.getItem('loggedin'))
  }
}

const store = new SessionStorage()

export default store
