"use client";

import { useState } from "react";
import { Wheel } from "react-custom-roulette";

interface SpinWheelProps {
  data: { option: string }[];
  prizeIndex: number;
  mustSpin: boolean;
  onSpinStart: () => void;
  onSpinEnd: (selectedOption: string) => void;
}

export default function SpinWheelClient({
  data,
  prizeIndex,
  mustSpin,
  onSpinStart,
  onSpinEnd,
}: SpinWheelProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ marginBottom: "1rem" }}>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeIndex}
          data={data}
          backgroundColors={["#1e3a8a", "#2563eb"]}
          textColors={["#ffffff"]}
          outerBorderColor="#1e3a8a"
          outerBorderWidth={5}
          radiusLineColor="#d1d5db"
          radiusLineWidth={1}
          fontSize={14}
          onStopSpinning={() => {
            const selected = data[prizeIndex]?.option || "";
            onSpinEnd(selected);
          }}
        />
      </div>
      <button
        onClick={onSpinStart}
        style={{
          padding: "0.8rem 1.5rem",
          backgroundColor: "#1e3a8a",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Spin
      </button>
    </div>
  );
}
