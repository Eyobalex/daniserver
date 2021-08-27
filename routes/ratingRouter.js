import {getRating, rate} from "../controllers/ratingController.js";

const ratingRouter = (app) => {
    app.route('/:listingId/ratings')
        .get(getRating)
        .post(rate)
}
export default ratingRouter;