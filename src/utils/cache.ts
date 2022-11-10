class Cache {
  setKey(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value))
  }
  getKey(key: string) {
    if (sessionStorage.getItem(key)) {
      return JSON.parse(sessionStorage.getItem(key) as string)
    }
  }
  removeKey(key: string) {
    sessionStorage.removeItem(key)
  }
  clear() {
    sessionStorage.clear()
  }
}

export default new Cache()
