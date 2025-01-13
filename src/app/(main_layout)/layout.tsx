import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

const layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div>
               <main className=" flex-grow bg-gray-100">
     <div className="flex flex-col min-h-[100vh] ">
     <div className="flex-grow">
    <div className="">
    <Navbar />
    </div>
    
   <div className="container mx-auto">
   {children} 
   </div>
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