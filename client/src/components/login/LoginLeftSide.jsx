import logo from '../../assets/images/logo.png'

const LoginLeftSide = () => {
    return (
        <div className="hidden md:flex w-1/2 overflow-hidden border-r bg-linear-to-br from-brand-primary via-brand-secondary to-brand-accent text-gray-100">

            <div className="flex flex-col items-center justify-center p-12 lg:p-20 w-full h-full">
                <div>

                    {/* ========= Logo ========= */}
                    <div className="w-fit text-gray-200">
                        <img className="w-20 mx-auto mb-1 rounded-[8px]" src={logo} alt="logo" />
                        <h3 className="md:text-xl font-bold">Staff<span className="font-normal"> Central</span></h3>
                    </div>


                    {/* ========= Title & Subtitle ========= */}
                    <h1 className="text-4xl lg:text-5xl font-medium my-6 leading-tight tracking-tight">Employee <br /> Management System</h1>
                    <p className="text-lg max-w-md leading-relaxed text-gray-200">Streamline your workforce operations, track attendance, manage payroll and empower your team securely.</p>

                </div>
            </div>

        </div>
    )
}

export default LoginLeftSide