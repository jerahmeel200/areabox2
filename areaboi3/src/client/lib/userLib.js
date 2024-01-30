function validateUser(authData) {
  // console.log("validateUser", authData);
  var user = { ...authData };
  if (user.displayName == null) user.displayName = user.uid;

  if (user.displayName && user.displayName.startsWith('+')) {
    user.displayName = user.displayName.substring(1);

    user = {
      ...user,
      phoneNumber: user.phoneNumber || user.uid
    };
  }
  return user;
}

export { validateUser };
