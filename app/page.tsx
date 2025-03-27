// File: app/page.tsx (if using App Router)
"use client"; // If using interactive JS functions

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [nema17Step, setNema17Step] = useState(0);
  const [nema23Step, setNema23Step] = useState(0);

  const rotateMotor = (motor:any, direction:any) => {
    console.log(`${motor} rotating ${direction}`);
  };

  const pressAction = (motor:any) => {
    console.log(`${motor} Pressed`);
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <Image src="/bue-logo.png" alt="BUE Logo" width={100} height={50} />
        <h1>Welcome</h1>
      </div>

      {/* Motor Controls */}
      <div className="controls">
        <div className="motor-control">
          <button onClick={() => rotateMotor("nema17", "clockwise")}>Clockwise</button>
          <button onClick={() => rotateMotor("nema17", "anticlockwise")}>Anti-Clockwise</button>

          <div>
            <strong>Angle:</strong>
            <input type="number" placeholder="Enter Angle" />
            <strong>Step:</strong> {nema17Step}
          </div>

          <button onClick={() => pressAction("nema17")}>Press</button>
          <div>Nema 17</div>
        </div>

        <div className="motor-control">
          <button onClick={() => rotateMotor("nema23", "clockwise")}>Clockwise</button>
          <button onClick={() => rotateMotor("nema23", "anticlockwise")}>Anti-Clockwise</button>

          <div>
            <strong>Angle:</strong>
            <input type="number" placeholder="Enter Angle" />
            <strong>Step:</strong> {nema23Step}
          </div>

          <button onClick={() => pressAction("nema23")}>Press</button>
          <div>Nema 23</div>
        </div>
      </div>
    </div>
  );
}
