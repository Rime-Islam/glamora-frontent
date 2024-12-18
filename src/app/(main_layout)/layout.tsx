import Footer from "@/components/common/Footer";
import { NavbarDemo } from "@/components/common/Navbar";

const layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div>
               <main className=" flex-grow">
     <div className="flex flex-col min-h-[100vh]">
     <div className="flex-grow">
     <NavbarDemo />
     {children} 
     </div>
       <div className="flex-shrink-0">
        <Footer />
        </div>
     </div>
        </main>
        </div>
    );
};

export default layout;