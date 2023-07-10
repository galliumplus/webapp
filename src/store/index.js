class SessionStorage {
  constructor() {
    this.storage = window.sessionStorage
  }

  get loggedIn() {
    return Boolean(this.storage.getItem('loggedin'))
  }

  get previous() {
    return this.storage.getItem('previous')
  }

  set previous(url) {
    this.storage.setItem('previous', url)
  }
}

const store = new SessionStorage()

export default store
