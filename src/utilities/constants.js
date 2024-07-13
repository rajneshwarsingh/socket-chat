/********* Error Code ********/
export const statusCode = {
  success: 200,
  badRequest: 400,
  serverError: 501,
  forbidden: 203,
  notFound: 204,
  notAllowed: 205,
  tokenExpired: 401,
  emailOrUserExist: 207,
  wrongPassword: 208,
  accountDeactivated: 209,
  authTokenRequired: 499,
  unauthorized: 403
};

/********* Messages ********/
export const message = {
  loginSuccess: 'Login successfully.',
  registerSuccess: 'User register successfully.',
  somethingWrong: 'Something went wrong!',
  unauthorized: 'You are not authorized to access this application, please login and try again.',
  authTokenRequired: 'Authentication token required.',
  invalidFileType: 'Invalid file type.',
  fileSizeTooHigh: 'The file size is too high.',
  invalidCredentials: 'Invalid login credential.',
  accountDeactive: 'Your account is inactive. Please contact with GenGreen support team for more information.',
  dataFetched: (val) => `${val} fetched successfully.`,
  dataSaved: (val) => `${val} saved successfully.`,
  dataAdded: (val) => `${val} has been successfully added.`,
  dataUpdated: (val) => `${val} has been successfully updated.`,
  dataDeleted: (val) => `${val} has been successfully deleted.`,
  dataExist: (val) => `${val} data already exist.`,
  dataNotExist: (val) => `${val} data not exist.`
};
