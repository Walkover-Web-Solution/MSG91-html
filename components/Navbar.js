import Link from "next/link";
import Image from "next/image";
import Msg91Logo from "../public/img/MSG91-LOGO.svg";

const navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <Link href="/products">
            <h3 className="f-m-20">Products</h3>
          </Link>
          <Link href="/learning-center">
            <h3 className="f-m-20">Learning Center</h3>
          </Link>
          <Link href="/pricing">
            <h3 className="f-m-20">Pricing</h3>
          </Link>
        </ul>
        <Link href="/">
          <Image src="/img/MSG91-LOGO.svg" width="124" height="40"></Image>
        </Link>
        <ul className="left-align">
          
          <Link href="/api-documentation">
            <h3 className="f-m-20">Api Documentation</h3>
          </Link>
          <Link href="/pricing">
            <h3 className="f-m-20 btn-prime">Sign Up</h3>
          </Link>
        </ul>
        

      </nav>
    </>
  );
};
export default navbar;
