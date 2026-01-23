const express = require("express");
const { BookingController } = require("../../controllers/index");
const bookingController = new BookingController();
const router = express.Router();
router.post("/bookings", bookingController.createBooking);
router.get("/publish", bookingController.sendMsg);
module.exports = router;
