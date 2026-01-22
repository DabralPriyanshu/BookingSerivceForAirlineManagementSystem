const { BookingService } = require("../services/index");
const { StatusCodes } = require("http-status-codes");
const bookingService = new BookingService();
const createBooking = async (req, res) => {
  try {
    const bookingData = {
      flightId: Number(req.body.flightId),
      userId: Number(req.body.userId),
      noOfSeats: Number(req.body.noOfSeats),
    };
    console.log(bookingData);
    const response = await bookingService.createBooking(bookingData);
    return res.status(StatusCodes.CREATED).json({
      data: response,
      err: {},
      message: "Successfully created a booking",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      data: {},
      err: error.explanation,
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  createBooking,
};
