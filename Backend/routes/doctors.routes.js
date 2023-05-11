const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { auth } = require("../middlewares/auth");

const DoctorRouter = express.Router();

const db = require("../models");

DoctorRouter.get("/single-doctor/:id", async (req, res) => {
  try {
    // create association between doctors and descdoctors table(imp)
    db.doctors.hasOne(db.descdoctors, {
      foreignKey: "doctor_id",
    });

    // join the doctors and descdoctors table and  get the complete data of the doctor
    const doctor = await db.doctors.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: db.descdoctors,
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
    console.log(error);
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

      const newdoctor = await db.doctors.create({
        name,
        avatar,
        speciality,
        department,
        availability,
        rating,
        fee,
      });

      const doctor = await db.doctors.findOne({
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

      await db.descdoctors.create({
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
    const doctors = await db.doctors.findAll({});
    res.status(200).json({
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

DoctorRouter.delete(
  "/delete-doctor/:id",
  authentication,
  auth(["admin"]),
  async (req, res) => {
    try {
      await db.doctors.destroy({
        where: {
          id: req.params.id,
        },
      });

      await db.descdoctors.destroy({
        where: {
          doctor_id: req.params.id,
        },
      });

      res.status(200).json({
        msg: "Doctor deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

DoctorRouter.put(
  "/update-doctor/:id",
  authentication,
  auth(["admin"]),
  async (req, res) => {
    try {
      await db.doctors.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json({
        msg: "Doctor updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

DoctorRouter.put(
  "/update-descdoctor/:id",
  authentication,
  auth(["admin"]),
  async (req, res) => {
    try {
      await db.descdoctors.update(req.body, {
        where: {
          doctor_id: req.params.id,
        },
      });

      res.status(200).json({
        msg: "Doctor description updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);


// doctors own profile routes here


module.exports = { DoctorRouter };
