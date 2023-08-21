import "tailwindcss/tailwind.css";

export default function Footer() {
  return (
    <>
      <footer className="absolute bottom-0 h-[150px] w-full border-t border-gray-300 flex justify-center items-center]">
        <span className="text-xs font-normal font-helvetica flex items-center">
          © 2023, Palays Store, todos os direitos reservados
        </span>
      </footer>
    </>
  );
}
