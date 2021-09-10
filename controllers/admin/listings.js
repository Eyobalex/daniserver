import Listing from '../../models/uploadListing.js'
export const getListings = async (req, res) => {
    try {
        // console.log('here');
        const listings = await Listing.find({});
        // console.log(listings);
        res.status(200).json(listings);
    } catch (error) {
        console.log(error);
    }
}