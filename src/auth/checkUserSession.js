export default (to, from, next) => {
    if (
      localStorage.getItem("token") != null 
    ) {
      const default_url = "/en/admin-login"
      if(default_url) {
        next(default_url)
      } else {
        next('access-forbidden')
      }
    } else {
      next();
    }
  };
  