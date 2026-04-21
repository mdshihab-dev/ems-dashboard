const Attendance = require("../models/Attendence.js");
const Employee = require("../models/Employee.js");

// Clock in/out for employee
// POST /api/attendance
const clockInOut = async (req, res) => {
  try {
    const session = req.session;
    
    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) {
      return res.status(404).json({ 
        error: "Employee not found" 
      });
    }

    if (employee.isDeleted) {
      return res.status(403).json({
        error: "Your account is deactivated. You cannot clock in/out."
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const now = new Date();

    let existing = await Attendance.findOne({
      employeeId: employee._id,
      date: today,
    });

    if (!existing) {
      const isLate = now.getHours() >= 9 && now.getMinutes() > 0;

      const attendance = await Attendance.findOneAndUpdate(
        {
          employeeId: employee._id,
          date: today,
        },
        {
          $setOnInsert: {
            employeeId: employee._id,
            date: today,
            checkIn: now,
            status: isLate ? "LATE" : "PRESENT",
          }
        },
        { upsert: true, new: true }
      );

      await inngest.send({
        name: 'employee/check-out',
        data: {
          employeeId: employee._id,
          attendanceId: attendance._id
        }
      })

      return res.json({success: true,type: "CHECK_IN",data: attendance});
    } 
    else if (!existing.checkOut) {
  // Check-in time theke current time er parthokkyo ber kora
  const checkInTime = new Date(existing.checkIn).getTime();
  const diffMs = now.getTime() - checkInTime;
  const diffHours = diffMs / (1000 * 60 * 60);

  existing.checkOut = now;

  // Working hours calculate kora (doshomik-er por 2 ghor)
  const workingHours = parseFloat(diffHours.toFixed(2));
  let dayType = "Half Day";

  if (workingHours >= 8) {
    dayType = "Full Day";
  } else if (workingHours >= 6) {
    dayType = "Three Quarter Day";
  } else if (workingHours >= 4) {
    dayType = "Half Day";
  } else {
    dayType = "Short Day";
  }

      existing.workingHours = workingHours;
      existing.dayType = dayType;

      await existing.save();
      return res.json({ success: true, type: "CHECK_OUT", data: existing  });
    } 
    else {
      return res.json({ success: true, type: "CHECK_OUT", data: existing  });
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Get attendance for employee
// GET /api/attendance
const getAttendance = async (req, res) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) return res.status(404).json({ error:
    "Employee not found" });

    const limit = parseInt(req.query.limit || 30)
    const history = await Attendance.
    find({ employeeId: employee._id }).
    sort({ date: -1 }).limit(limit)

    return res.json({data: history,employee: { isDeleted: employee.isDeleted }})
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch attendance" });
  }
};


module.exports = { clockInOut,getAttendance };