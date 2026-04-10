const express = require("express");
const { protect } = require("../middleware/auth.js");
const { clockInOut, getAttendance } = require("../controllers/attendanceController.js");

const attendanceRouter = express.Router();

attendanceRouter.post('/', protect, clockInOut);
attendanceRouter.get('/', protect, getAttendance);

module.exports = attendanceRouter;