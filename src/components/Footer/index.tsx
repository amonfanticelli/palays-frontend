import "tailwindcss/tailwind.css";
import Image from "next/image";
import mastercard from "../../../public/assets/mastercard.svg";
import visa from "../../../public/assets/visa.svg";

export default function Footer() {
  return (
    <>
      <footer className="mt-[250px] h-[150px] w-full border-t border-gray-300 flex flex-col justify-center items-center gap-2">
        <div className="flex">
          <Image src={visa} alt="visa icon" width={52} height={52}></Image>
          <Image
            src={mastercard}
            alt="mastercard icon"
            width={52}
            height={52}
          ></Image>
        </div>
        <span className="text-xs font-normal font-helvetica flex items-center">
          © 2023, Palays, todos os direitos reservados
        </span>
      </footer>
    </>
  );
}
