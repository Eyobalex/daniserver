

export const admin = async (req, res, next) => {
  try {
    if (req.userRole !== "ADMIN") {
        res.status(403).json({message: "you need to login as an admin"});
        return;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
export const client = async (req, res, next) => {
  try {
    if (req.userRole !== "CLIENT") {
        res.status(403).json({message: "you need to login as an client"});
        return;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
export const business = async (req, res, next) => {
  try {
    if (req.userRole !== "BUSINESS") {

      if (req.userRole == "ADMIN") {
        next();
        return;
      }
      console.log(req.userRole);
        res.status(403).json({message: "you need to login as an businesss"});
        return;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

