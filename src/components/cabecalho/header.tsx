import Image from "next/image";


export default function Header() {
  return (
    // <header className="flex flex-col justify-center items-center mt-40 mb-4"> {/* Center header content */}
    //   {/* <div>alura + gemini</div> */}
    //   <div className="flex gap-4 items-start">
    //     <Image src="/logo_alura.png" alt="logo Alura" width="200" height="200" />
    //     <Image src="/gemini.svg" alt="logo Alura" width="250" height="250" />
    //   </div>
    //   <div className="font-bold text-xl pt-8">Professor pessoal</div>
    //   <div className="font-light text-sm">para o ensino fundamental e ensino médio</div>
    // </header>

    <header className="flex flex-col items-center justify-center mt-16 mb-8 px-4"> 
    <div className="flex flex-wrap justify-center gap-8">
      <Image src="/logo_alura.png" alt="logo Alura" width={200} height={200} className="w-48 md:w-64" />
      <Image src="/gemini.svg" alt="logo Alura" width={250} height={250} className="w-56 md:w-80" />
    </div>
    <div className="text-center">
      <h1 className="font-bold text-2xl md:text-4xl pt-8">Professor pessoal</h1>
      <p className="font-light text-base md:text-lg">para o ensino fundamental e ensino médio</p>
    </div>
  </header>
  )
}
