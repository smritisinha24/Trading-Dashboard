import React from "react";
import DasboardHero from "../components/user-view/DasboardHero";
import DisplayTradeData from "../components/user-view/DisplayTradeData";
import PerformanceAnalysis from "../components/user-view/PerformanceAnalysis";
import Footer from "../components/user-view/Footer";


function Dashboard() {
  return (
    <main className="min-h-screen dark:bg-black/25 antialiased">
      <DasboardHero />
      <DisplayTradeData />
      <PerformanceAnalysis />
      <Footer/>
    </main>

  );
}

export default Dashboard;
