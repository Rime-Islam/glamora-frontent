import Image from "next/image";
import logo from "../../../public/image/logo.png";
import Link from "next/link";

const Logo = () => {
    return (    <Link href='/'>
        <div className="flex gap-2">
            <div className="">
              <Image
        src={logo}
        width={60}
        height={40}
        alt='logo'
      />
              </div>
              <p className="mt-2.5 lg:text-lg xl:text-xl font-semibold">GLAMORA</p>
        </div>   </Link>
    )
};
export default Logo;