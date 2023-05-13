import Image from "next/image";
import logo from "../../public/Asset 3.svg";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <button className="btn btn-primary">Submit</button>
      <Image src={logo} height={300} width={300} />
    </main>
  );
}
