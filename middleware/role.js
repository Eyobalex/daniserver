

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
        res.status(403).json({message: "you need to login as an business"});
        return;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

