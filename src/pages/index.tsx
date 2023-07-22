import "tailwindcss/tailwind.css";
import Image from "next/image";
import { CiUser, CiSearch } from "react-icons/ci";
import { PiShoppingCartLight } from "react-icons/pi";
import palays from "../../public/assets/palays.png";
import cardImage1 from "../../public/assets/card1.jpg";
import cardImage2 from "../../public/assets/card2.jpg";

export default function Home() {
  return (
    <>
      <header className="w-full flex flex-col">
        <div className="bg-black py-2 flex justify-center">
          <p className=" text-gray-50 text-xs ">
            FRETE GRÁTIS À PARTIR DE R$399
          </p>
        </div>
        <div className="w-full flex items-center border-b-2 border-gray-300">
          <div className="max-w-screen-xl flex justify-between items-center w-full px-10 py-5 mx-auto">
            <figure>
              <Image src={palays} alt="logo da marca palays" width="200" />
            </figure>

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

      <main className="w-full max-w-screen-xl mx-auto py-7 px-10 ">
        <h1 className="w-full text-2xl font-helvetica font-bold mb-8">Store</h1>

        <div className="w-full flex gap-3">
          <div className="w-[269px] flex flex-col">
            <figure>
              <Image
                className="mx-auto"
                src={cardImage1}
                alt="imagem do card"
                width="200"
              />
            </figure>

            <div className="flex flex-col py-6">
              <span className=" font-bold text-sm font-helvetica">
                {" "}
                Camiseta chavona
              </span>
              <span className="font-normal font-helvetica text-base">
                R$ 200,00{" "}
              </span>
            </div>
          </div>
          <div className="w-[269px] flex flex-col">
            <figure>
              <Image
                src={cardImage2}
                className="mx-auto"
                alt="imagem do card 2"
                width="200"
              />
            </figure>
            <div className="flex flex-col py-6">
              <span className=" font-bold text-sm font-helvetica">
                {" "}
                Camiseta chavona
              </span>
              <span className="font-normal font-helvetica text-base">
                R$ 200,00{" "}
              </span>
              {/* weight 400, font helvetica, size 16px, color: rgba(18, 18, 18, 0.75) */}
              `
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
