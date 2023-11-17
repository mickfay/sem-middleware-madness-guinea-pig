exports.authenticateUser = (req, res, next) => {
  // authenticated users have admin set to true in their body details - they should be redirected back to the endpoint for the response
  // Anyone not an admin is not authenticated and shouldn't be allowed access and their response should be sent from in here
  if (req.body.admin) {
    next();
  } else {
    const error = { status: 401 };
    next(error);
  }
};
