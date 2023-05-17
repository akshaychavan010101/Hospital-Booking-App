const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { auth } = require("../middlewares/auth");
const DoctorRouter = express.Router();

// const db = require("../models");
const { Doctors } = require("../models/doctors");
const { Descdoctors } = require("../models/descdoctors");

DoctorRouter.get("/single-doctor/:id", async (req, res) => {
  try {
    // create association between doctors and descdoctors table(imp)
    Doctors.hasOne(Descdoctors, {
      foreignKey: "doctor_id",
    });

    // join the doctors and descdoctors table and  get the complete data of the doctor
    const doctor = await Doctors.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Descdoctors,
          where: {
            doctor_id: req.params.id,
          },
        },
      ],
    });

    res.status(200).json({
      doctor,
    });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

DoctorRouter.post(
  "/add-doctor",
  authentication,
  auth(["admin"]),
  async (req, res) => {
    try {
      const {
        name,
        avatar,
        speciality,
        department,
        availability,
        rating,
        fee,
        education,
        Professional,
        Certifications,
        Expertise,
        Honors_and_Awards,
        Publications,
        Professional_Memberships,
        mobile,
      } = req.body;

      const newdoctor = await Doctors.create({
        name,
        avatar,
        speciality,
        department,
        availability,
        rating,
        fee,
      });

      const doctor = await Doctors.findOne({
        where: {
          name,
          avatar,
          speciality,
          department,
          availability,
          rating,
          fee,
        },
      });

      if (!doctor) {
        return res.status(400).json({ msg: "Could not add Doctor" });
      }

      await Descdoctors.create({
        education,
        Professional,
        Certifications,
        Expertise,
        Honors_and_Awards,
        Publications,
        Professional_Memberships,
        mobile,
        doctor_id: doctor.id,
      });

      res.status(200).json({
        msg: "Doctor added successfully",
      });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

DoctorRouter.get("/all-doctors", async (req, res) => {
  try {
    const doctors = await Doctors.findAll({});
    res.status(200).json({
      doctors,
    });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

DoctorRouter.delete(
  "/delete-doctor/:id",
  authentication,
  auth(["admin"]),
  async (req, res) => {
    try {
      await Doctors.destroy({
        where: {
          id: req.params.id,
        },
      });

      await Descdoctors.destroy({
        where: {
          doctor_id: req.params.id,
        },
      });

      res.status(200).json({
        msg: "Doctor deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

DoctorRouter.patch(
  "/update-doctor/:id",
  authentication,
  auth(["admin"]),
  async (req, res) => {
    try {
      await Doctors.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json({
        msg: "Doctor updated successfully",
      });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

DoctorRouter.patch(
  "/update-descdoctor/:id",
  authentication,
  auth(["admin"]),
  async (req, res) => {
    try {
      await Descdoctors.update(req.body, {
        where: {
          doctor_id: req.params.id,
        },
      });

      res.status(200).json({
        msg: "Doctor description updated successfully",
      });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

module.exports = { DoctorRouter };
