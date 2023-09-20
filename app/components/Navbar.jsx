import Link from "next/link";
import Image from "next/image";
import Logo from "./cloudinary-logo.png";
export default function Navbar() {
  return (
    <nav>
      <Image
        src={Logo}
        alt="Cloudinary Logo"
        width={70}
        placeholder="blur"
        quality={100}
      />
      <h1>Cloudinary Gallery</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
    </nav>
  );
}
