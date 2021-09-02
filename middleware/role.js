

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

