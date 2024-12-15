import Image from "next/image";
import logo from "../../../public/image/logo.png";

const Logo = () => {
    return (
        <div>
              <Image
        src={logo}
        width={100}
        height={10}
        alt='logo'
      />
        </div>
    )
};
export default Logo;