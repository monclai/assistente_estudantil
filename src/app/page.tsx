import Header from "@/components/cabecalho/header";
import Main from "@/components/main/main";

export default function Home() {
  return (
    <>
      <div className="flex h-screen">
        <div className="container relative">
          <Header />
          <Main />
        </div>
      </div>
    </>
  );
}
