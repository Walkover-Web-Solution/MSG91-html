import Head from "next/head";
import Navbar from "../components/Navbar";

const about = () => {
  return (
    <>
      <Head>
      <title>MSG91 Products Page</title>
      <meta name="discription" content="hello there test discription pricing page here"/>
      </Head> 
      <Navbar/>
      products here
    </>
  );
};
export default about;
