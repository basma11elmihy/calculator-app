import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
const buttons = [
  "C",
  "±",
  "%",
  "÷",
  "7",
  "8",
  "9",
  "×",
  "4",
  "5",
  "6",
  "−",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];
const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const handleButtonClick = (button: string) => {
    if (!isNaN(Number(button))) {
      handleNumberClick(button);
    } else if (["+", "−", "×", "÷"].includes(button)) {
      handleOperatorClick(button);
    } else if (button === "C") {
      setDisplay("0");
      setPreviousValue(null);
      setOperator(null);
    } else if (button === "=") {
      handleEqualsClick();
    }
  };

  const handleDivision = (a: number, b: number): number => {
    if (b === 0) {
      setDisplay("Error: Division by zero");
      return 0;
    }
    return a / b;
  };

  const handleNumberClick = (value: string) => {
    if (display === "0") {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  const handleOperatorClick = (op: string) => {
    if (previousValue === null) {
      setPreviousValue(Number(display));
      setOperator(op);
      setDisplay("0");
    }
  };

  const handleEqualsClick = () => {
    if (previousValue !== null && operator !== null) {
      let result: number;
      const currentValue = Number(display);
      const prevValue = previousValue;

      switch (operator) {
        case "+":
          result = prevValue + currentValue;
          break;
        case "−":
          result = prevValue - currentValue;
          break;
        case "×":
          result = prevValue * currentValue;
          break;
        case "÷":
          result = handleDivision(prevValue, currentValue);
          break;

        default:
          return;
      }

      setDisplay(result.toString());
      setPreviousValue(null);
      setOperator(null);
    }
  };

  return (
    <div className="calcContainer mx-auto mt-8 w-full max-w-sm rounded-2xl border p-4 shadow-lg">
      <Input
        className="calcInput mb-4 text-right text-2xl"
        placeholder="0"
        value={display}
        readOnly
      />

      <div className="calcButtons grid grid-cols-4 gap-2">
        {buttons.map((button) => (
          <Button
            key={button}
            className="calcButton"
            onClick={() => handleButtonClick(button)}
          >
            {button}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
