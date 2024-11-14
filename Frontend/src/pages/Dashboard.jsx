import React, { useRef } from "react";
import DasboardHero from "../components/user-view/DasboardHero";
import DisplayTradeData from "../components/user-view/DisplayTradeData";
import PerformanceAnalysis from "../components/user-view/PerformanceAnalysis";
import Footer from "../components/user-view/Footer";
import SearchBar from "../components/user-view/SearchBar";


function Dashboard() {
  const displayTradeDataRef = useRef(null);
  const performanceAnalysisRef = useRef(null);

  const scrollToDisplayTradeData = () => {
    displayTradeDataRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPerformanceAnalysis = () => {
    performanceAnalysisRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen dark:bg-black/25 antialiased">
      <DasboardHero onButtonOneClick={scrollToDisplayTradeData} onButtonTwoClick={scrollToPerformanceAnalysis}/>
      <SearchBar />
      <DisplayTradeData ref={displayTradeDataRef}/>
      <PerformanceAnalysis ref={performanceAnalysisRef}/>
      <Footer/>
    </main>

  );
}

export default Dashboard;
