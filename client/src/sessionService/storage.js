export const sessionService = {


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

  getUserId() {
    let data = localStorage.getItem('user');
    if (!data) return null;
    var user = JSON.parse(data);
    return (user) ? user.user._id : "";
  },


  getSessionToken() {
    let data = localStorage.getItem('user');
    if (!data) return null;
    let session = JSON.parse(data);
    return (session && session.token) ? session.token : null;
  },
  isAdmin() {
    let data = localStorage.getItem('user');
    if (!data) return null;
    var admin = JSON.parse(data).user;
    return (admin) ? admin.isAdmin : "";
  },
  isAuth() {
    let data = localStorage.getItem('user');
    if (!data) {
      return false;
    } else {
      var session = JSON.parse(data);
      return session.token
    }
  }
}