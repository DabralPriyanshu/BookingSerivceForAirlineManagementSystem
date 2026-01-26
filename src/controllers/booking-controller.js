const { BookingService } = require("../services/index");
const { StatusCodes } = require("http-status-codes");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const bookingService = new BookingService();

class BookingController {
  constructor() {}
  async sendMsg(req, res) {
    const channel = await createChannel();
    const payload = {
      data: {
        subject: "this is a notification ",
        content: "hey pal",
        recipientEmail: "priyanshudabral07@gmail.com",
        notificationTime: "2026-01-23T12:25:00",
      },
      service: "CREATE_TICKET",
    };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
    return res.status(200).json({
      data: {},
      err: {},
      message: "Successfully published the event",
      success: true,
    });
  }
  createBooking = async (req, res) => {
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
}

module.exports = BookingController;
