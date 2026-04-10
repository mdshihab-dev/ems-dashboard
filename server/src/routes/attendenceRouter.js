const express = require("express");
const { protect } = require("../middlewares/auth");
const { clockInOut, getAttendance } = require("../controllers/attendenceController");

const attendanceRouter = express.Router();

attendanceRouter.post('/', protect, clockInOut);
attendanceRouter.get('/', protect, getAttendance);

module.exports = attendanceRouter;