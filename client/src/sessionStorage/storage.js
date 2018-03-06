export const sessionStorage = {


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
  },
 isAuth() {
    let data = localStorage.getItem('user');
    if (!data) return false;
    var session = JSON.parse(data);
    return (session && session.token);
  }
}
