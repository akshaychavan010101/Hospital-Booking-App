const express = require("express");

const { authentication } = require("../middlewares/authentication");

const AppointmentRouter = express.Router();

const db = require("../models");
const { auth } = require("../middlewares/auth");
const { slots } = require("../mongodb/slots.model");

// create all appointment routes over here
AppointmentRouter.use(authentication);

AppointmentRouter.post("/book-appointment", async (req, res) => {
  try {
    const { patientName, doctorName, date, time, doctorId } = req.body;

    // check the slot availability
    const slotBooked = await slots.findOne({
      date,
      time,
      doctorId,
    });

    if (slotBooked) {
      res.status(400).json({ msg: "Already Booked" });
      return;
    }

    const appointment = await db.appointments.create({
      patientName,
      doctorName,
      date,
      time,
      patientId: req.user.dataValues.id,
      doctorId,
    });

    //   add the slot details in the db

    const slotDetails = {
      date,
      time,
      doctorId,
      patientId: req.user.dataValues.id,
      isbooked: true,
    };

    await slots(slotDetails).save();

    if (appointment) {
      res.status(201).json({
        msg: "Appointment booked successfully",
        appointment,
      });
    } else {
      res.status(500).json({ msg: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// check slot availability

AppointmentRouter.post("/check-slot-availability", async (req, res) => {
  try {
    const { date, time, doctorId } = req.body;

    const slot = await slots.findOne({
      date,
      time,
      doctorId,
    });

    if (!slot) {
      res.status(200).json({ msg: "Available" });
    } else {
      res.status(200).json({ msg: "Booked" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

AppointmentRouter.get("/my-appointments", async (req, res) => {
  try {
    const appointments = await db.appointments.findAll({
      where: {
        patientId: req.user.dataValues.id,
      },
    });
    res.status(200).json({
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

AppointmentRouter.delete("/delete-appointment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await db.appointments.findOne({
      where: {
        id,
      },
    });

    if (!appointment) {
      res.status(400).json({ msg: "Appointment does not exist" });
      return;
    }

    await db.appointments.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({ msg: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

AppointmentRouter.patch(
  "/approve-appointment/:id",
  auth(["admin"]),
  async (req, res) => {
    try {
      const { id } = req.params;

      const appointment = await db.appointments.findOne({
        where: {
          id,
        },
      });

      if (!appointment) {
        res.status(400).json({ msg: "Appointment does not exist" });
        return;
      }

      await db.appointments.update(
        {
          status: "approved",
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({ msg: "Appointment approved" });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

AppointmentRouter.patch(
  "/cancel-appointment/:id",
  auth(["admin", "user"]),
  async (req, res) => {
    try {
      const { id } = req.params;

      const appointment = await db.appointments.findOne({
        where: {
          id,
        },
      });

      if (!appointment) {
        res.status(400).json({ msg: "Appointment does not exist" });
        return;
      }

      await db.appointments.update(
        {
          status: "cancelled",
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({ msg: "Appointment cancelled" });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

AppointmentRouter.get(
  "/all-appointments",
  auth(["admin"]),
  async (req, res) => {
    try {
      const appointments = await db.appointments.findAll({});
      res.status(200).json({
        appointments,
      });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

module.exports = { AppointmentRouter };
