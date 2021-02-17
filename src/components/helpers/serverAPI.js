const baseURL = "https://evening-cove-74322.herokuapp.com";

const endpoints = {
  userCreate: `${baseURL}/createUser`,
  userLogin: `${baseURL}/loginUser`,
  homefeedData: `${baseURL}/homepage`,
  postSomething: `${baseURL}/postSomething`,
  getAllUsersPosts: `${baseURL}/getAllUsersPosts`,
  changeProfilePictures: `${baseURL}/changeProfilePictures`,
};

export default endpoints;
