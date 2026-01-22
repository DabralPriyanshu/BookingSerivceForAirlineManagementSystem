const { BookRepository } = require("../repository/index");
const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
const { ServiceError } = require("../utils/errors/index");
const axios = require("axios");

class BookingService {
  constructor() {
    this.repository = new BookRepository();
  }

  async createBooking(data) {
    try {
      const flightId = data.flightId;
      const flightUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
      const response = await axios.get(flightUrl);
      let flightData = response.data.data;
      let priceOfFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in booking process",
          "Insufficient seats in the flight ",
        );
      }
      let totalCost = priceOfFlight * data.noOfSeats;
      const bookingPayload = { ...data, totalCost };
      let booking = await this.repository.create(bookingPayload);
      const updateFlightURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
      await axios.patch(updateFlightURL, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });
      booking = await this.repository.update(booking.id, { status: "BOOKED" });
      return booking;
    } catch (error) {
      if (error.name == "RepositoryError" || error.name === "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }
}
module.exports = BookingService;
