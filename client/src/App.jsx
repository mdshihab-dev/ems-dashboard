import { Toaster } from "@/components/ui/sonner"
import { Navigate, Route, Routes } from "react-router-dom"
import CommonLayout from "./components/layout/CommonLayout"
import DashboardPage from "./pages/Dashboard"
import LeavePage from "./pages/Leave"
import PayslipsPage from "./pages/Payslip"
import SettingsPage from "./pages/Settings"
import EmployeesPage from "./pages/Employees"
import PrintPayslipPage from "./pages/PrintPayslip"
import LoginPage from "./pages/Login"
import LoginForm from "./components/login/LoginForm"
import AttendancePage from "./pages/Attendence"

function App() {

  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/login/admin" element={<LoginForm role='ADMIN' title='Admin Portal' subtitle='Sing in to manage the organization'/>} />
        <Route path="/login/employee" element={<LoginForm role='EMPLOYEE' title='Employee Portal' subtitle='Sing in to access your account'/>} />

        <Route element={<CommonLayout />} >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/leave" element={<LeavePage />} />
          <Route path="/payslips" element={<PayslipsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="/print/payslip/:id" element={<PrintPayslipPage />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  )
}

export default App