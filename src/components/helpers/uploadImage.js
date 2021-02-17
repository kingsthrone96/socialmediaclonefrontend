import { storage } from "../../firebase/index";

const generateRandomString = () => {
  let generatedID = "";
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  for (let i = 0; i < chars.length; i++) {
    generatedID += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return generatedID;
};

const uploadImageToFirebase = (userState, image, submit) => {
  const randString = generateRandomString(image);
  const imageName = randString + "." + image.type.split("/")[1];
  const uploadTask = storage
    .ref(`${userState.user._id}/${userState.user.name}/${imageName}`)
    .put(image);

  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => console.log(error),
    () => {
      storage
        .ref(`${userState.user._id}`)
        .child(`${userState.user.name}/${imageName}`)
        .getDownloadURL()
        .then((url) => submit(url));
    }
  );
};

export { uploadImageToFirebase };
