import { HouseRounded } from "@mui/icons-material";
import Link from "next/link";

const AppLayout = ({ header, children }) => {

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      {/* Page Heading */}
      <header className="bg-white shadow flex justify-start">
        <div className="py-4 px-8">
          <Link href="/"><HouseRounded/></Link>
        </div>

        <div className="py-4 px-4 sm:px-6 lg:px-8">
          {header}
        </div>
      </header>

      {/* Page Content */}
      <main>{children}</main>

      {/* <footer className="bg-white shadow fixed bottom-0 w-full">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Link href="/">-Home</Link>
        </div>
      </footer> */}
      </div>
      </>
  );
}

export default AppLayout
