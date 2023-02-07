import Navbar from "../components/Navbar";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const index = () => {
  return (
    <>
      <Head>
        <title>MSG91 Landing Page</title>
        <meta name="discription" content="hello there test discription" />
      </Head>
      <div className="main">
        <Navbar />
        <div className="heroContainer d-f-c">
          <h1>Cloud Communication Platform</h1>
          <h4>
            Customer conversation, segmentation, verification, notification.
          </h4>
          <h4>The All-In-One CPaaS Platform.</h4>
          <h3 className="f-m-20 btn-prime">Get Started Free</h3>
        </div>
        <p>Trusted By 30000+ Businesses</p>
        <div className="images-brand">
          <Link href="/">
            <Image src="/img/ixigo-logo.png" width="52" height="24"></Image>
          </Link>
          <Link href="/">
            <Image
              src="/img/unacademy-logo.png"
              width="161"
              height="24"
            ></Image>
          </Link>
          <Link href="/">
            <Image src="/img/indeed-logo.png" width="90" height="24"></Image>
          </Link>
        </div>
      </div>
    </>
  );
};
export default index;
