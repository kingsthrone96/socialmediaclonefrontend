function UseAuth() {
   const authToken = window.localStorage.getItem("authToken");
   if(authToken) return true
   return false;
}

export default UseAuth;
