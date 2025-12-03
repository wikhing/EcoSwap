import Image from "next/image";
import React from "react";
import Header from "./header";
import Landing from "./landing";

const Home: React.FC = () => {

  return (
      <main className="">
        <Header />
        <div className="">
          <Landing />
        </div>
        
      </main>
  );
};

export default Home;
