import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [lastKey, setLastKey] = useState("");

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setLastKey("");
  };

  const handleNumber = (num) => {
    if (lastKey === "=") {
      setDisplay(num);
      setExpression(num);
    } else if (display === "0" && num === "0") {
      setDisplay("0");
      setExpression(expression ? expression : "0");
    } else if (/^[1-9]/.test(display) || display === "0") {
      setDisplay((prev) => (prev === "0" ? num : prev + num));
      setExpression((prev) => (prev === "0" ? num : prev + num));
    } else {
      setDisplay(num);
      setExpression(expression + num);
    }
    setLastKey(num);
  };

  const handleOperator = (operator) => {
    if (lastKey === "=") {
      setExpression(display + operator);
    } else if (/[+\-*/]$/.test(expression)) {
      if (operator === "-") {
        if (/[+\-*/]-$/.test(expression)) {
          // If there are already two operators including a negative sign, replace the last operator
          setExpression((prev) => prev.slice(0, -2) + operator);
        } else {
          setExpression((prev) => prev + operator);
        }
      } else {
        setExpression((prev) => prev.replace(/[+\-*/]+$/, operator));
      }
    } else {
      setExpression((prev) => prev + operator);
    }
    setDisplay(operator);
    setLastKey(operator);
  };

  const handleDecimal = () => {
    if (lastKey === "=") {
      setDisplay("0.");
      setExpression("0.");
    } else if (!display.includes(".")) {
      setDisplay((prev) => prev + ".");
      setExpression((prev) => prev + ".");
    }
    setLastKey(".");
  };

  const handleEquals = () => {
    try {
      const result = eval(expression)
        .toFixed(4)
        .replace(/\.?0+$/, "");
      setDisplay(result);
      setExpression(result);
    } catch {
      setDisplay("Error");
      setExpression("");
    }
    setLastKey("=");
  };

  return (
    <>
      <main className="flex flex-col gap-6 justify-center items-center w-full h-full min-h-screen bg-[#c2c2d6]">
        {/* display */}
        <div className="block container w-[320px] bg-black p-2 space-y-2">
          <div className="flex items-center">
            <span
              id="display"
              className="text-[#ffa500] text-md font-bold w-full text-right"
              style={{ fontFamily: "'Seven Segment', sans-serif" }}
            >
              {expression || "0"}
            </span>
          </div>
          <div className="flex items-center">
            <span
              id="display"
              className="text-white text-4xl font-bold w-full text-right"
              style={{ fontFamily: "'Seven Segment', sans-serif" }}
            >
              {display}
            </span>
          </div>
          {/* calculator buttons */}
          <div
            className="grid grid-cols-4 gap-[2px] grid-flow-row text-white text-center text-xl"
            style={{ fontFamily: "'Seven Segment', sans-serif" }}
          >
            <button
              id="clear"
              className="col-span-2 w-full bg-[#ac3939] h-[65px]"
              onClick={handleClear}
            >
              AC
            </button>
            <button
              id="divide"
              className="bg-[#666666] h-[65px]"
              onClick={() => handleOperator("/")}
            >
              /
            </button>
            <button
              id="multiply"
              className="bg-[#666666] h-[65px]"
              onClick={() => handleOperator("*")}
            >
              X
            </button>
            <button
              id="seven"
              className="bg-[#4d4d4d] h-[65px]"
              onClick={() => handleNumber("7")}
            >
              7
            </button>
            <button
              id="eight"
              className="bg-[#4d4d4d] h-[65px]"
              onClick={() => handleNumber("8")}
            >
              8
            </button>
            <button
              id="nine"
              className="bg-[#4d4d4d] h-[65px]"
              onClick={() => handleNumber("9")}
            >
              9
            </button>
            <button
              id="subtract"
              className="bg-[#666666] h-[65px]"
              onClick={() => handleOperator("-")}
            >
              -
            </button>
            <button
              id="four"
              className="bg-[#4d4d4d] h-[65px]"
              onClick={() => handleNumber("4")}
            >
              4
            </button>
            <button
              id="five"
              className="bg-[#4d4d4d] h-[65px]"
              onClick={() => handleNumber("5")}
            >
              5
            </button>
            <button
              id="six"
              className="bg-[#4d4d4d] h-[65px]"
              onClick={() => handleNumber("6")}
            >
              6
            </button>
            <button
              id="add"
              className="bg-[#666666] h-[65px]"
              onClick={() => handleOperator("+")}
            >
              +
            </button>
            <button
              id="one"
              className="bg-[#4d4d4d] h-[65px]"
              onClick={() => handleNumber("1")}
            >
              1
            </button>
            <button
              id="two"
              className="bg-[#4d4d4d] h-[65px]"
              onClick={() => handleNumber("2")}
            >
              2
            </button>
            <button
              id="three"
              className="bg-[#4d4d4d] h-[65px]"
              onClick={() => handleNumber("3")}
            >
              3
            </button>
            <div
              id="equals"
              className="row-span-3 bg-[#004466] flex justify-center items-center"
              onClick={handleEquals}
            >
              =
            </div>
            <button
              id="zero"
              className="col-span-2 w-full bg-[#4d4d4d] h-[65px]"
              onClick={() => handleNumber("0")}
            >
              0
            </button>
            <button
              id="decimal"
              className="bg-[#4d4d4d] h-[65px]"
              onClick={handleDecimal}
            >
              .
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center font-mono font-semibold">
          {" "}
          <h1 className="text-md">Designed and Coded By</h1>
          <p className="text-sm text-[#00264d]">
            <a href="https://github.com/Loydie16">Jon Loyd Talagtag</a>
          </p>
        </div>
      </main>
    </>
  );
}

export default App;
