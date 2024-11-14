import React from "react";
import { Separator } from "../ui/separator";

import { Tabs } from "../ui/tabs";

import ReadSpeed from "../performance-metrics/ReadSpeed";
import Latency from "../performance-metrics/Latency";
import Throughput from "../performance-metrics/Throughput";
import WriteSpeed from "../performance-metrics/WriteSpeed";
import QueryPerSecond from "../performance-metrics/QueryPerSecond";
import DummyImage from "../../assets/Trading Dashboard.webp"

// TODO: Edit DummyContent and tabs to match the performance metrics

const DummyContent = () => {
    return (
      <img
        src={DummyImage}
        alt="dummy image"
        width="800"
        height="800"
        className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
      />
    );
};

const tabs = [
    {
      title: "Read Speed",
      value: "read-speed",
      content: (
        <div className="w-full overflow-auto relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-gray-800 to-zinc-800">
          <p className="mb-4">Read Speed</p>
          <ReadSpeed />
        </div>
      ),
    },
    {
      title: "Throughput",
      value: "throughput",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-gray-800 to-zinc-800">
          <p>Throughput</p>
          <DummyContent />
        </div>
      ),
    },
];

const PerformanceAnalysis = React.forwardRef((props, ref) => {
  return (
    <>
      <Separator className="bg-zinc-900"/>

      <div ref={ref} className="py-4 flex flex-col h-[900px]">
            <div>
                <div className="text-center">
                    <p className="my-3 text-3xl leading-8 font-extrabold tracking-tight text-teal-500 sm:text-4xl capitalize mb-3">
                    Explore Performance Analysis of Relational DB vs Columnar DB
                    </p>
                </div>
            </div>
            
            <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-10">
                <Tabs tabs={tabs} />
            </div>
      </div>

      <Separator className="bg-zinc-950"/>
    </>
  );
});

export default PerformanceAnalysis;
