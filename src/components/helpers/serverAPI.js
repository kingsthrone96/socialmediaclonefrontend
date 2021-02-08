const baseURL = "http://localhost:5000";

const endpoints = {
  userCreate: `${baseURL}/createUser`,
  userLogin: `${baseURL}/loginUser`,
  homefeedData: `${baseURL}/homepage`,
  postSomething: `${baseURL}/postSomething`,
  getAllUsersPosts: `${baseURL}/getAllUsersPosts`,
  changeProfilePictures: `${baseURL}/changeProfilePictures`,
};

export default endpoints;
