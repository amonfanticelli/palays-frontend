import "tailwindcss/tailwind.css";
import Image from "next/image";
import { CiUser, CiSearch } from "react-icons/ci";
import { PiShoppingCartLight } from "react-icons/pi";
import palays from "../../public/assets/palays.png";

export default function Home() {
  return (
    <header className="w-full flex flex-col">
      <div className="bg-black py-2 flex justify-center">
        <p className=" text-gray-50 text-xs ">FRETE GRÁTIS À PARTIR DE R$399</p>
      </div>
      <div className="w-full flex items-center border-b-2 border-gray-300">
        <div className="max-w-screen-xl flex justify-between items-center w-full px-10 py-5 mx-auto">
          <figure>
            <Image src={palays} alt="" width="200" />
          </figure>
          {/* <h1 className="text-3xl font-bold">PALAYS</h1> */}

          <div className="flex space-x-2">
            <button>
              <CiSearch className="w-6 h-6" />
            </button>

            <a href="">
              <CiUser className="w-6 h-6" />
            </a>
            <button>
              <PiShoppingCartLight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
