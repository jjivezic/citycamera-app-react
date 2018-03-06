export const sessionStorage ={


  /**
   * Stores user json object ot local storage
   * @param user
   */
  create(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },
  /**
   * Destroy user object from local storage and redirects to login
   */
  destroy() {
    localStorage.removeItem('user');
  }
}
// export const userService = {
//   login,
//   logout,
//   register
// };