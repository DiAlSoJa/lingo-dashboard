import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
      

    return (
      <div className="relative">
          <Navbar />
          <div className="relative pt-[60px] ">

            <div className="hidden md:block w-[300px] sidebar fixed top-[60px] left-0">
              <Sidebar />
            </div>

            <div className=" md:pl-[300px] w-full ">


                {children}

            </div>
          </div>
      </div>
    );
  };
  
  export default MainLayout;