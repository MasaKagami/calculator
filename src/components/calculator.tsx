import { useState } from "react";
import Button from "./button";
import Display from "./display";
import Kagami from "../assets/Kagami.svg"

function Calculator() {
    const [input, setInput] = useState("0")
    const [isSecond, setIsSecond] = useState(false)
    const [isRadians, setIsRadians] = useState(false)

    // Define buttons for the 6x5 grid
    const buttons = [
        ["del", "sin", "cos", "tan", "^"],
        ["x^(-1)", "mode", "(", ")", "÷"],
        ["x^2", "7", "8", "9", "x"],
        ["log", "4", "5", "6", "-"],
        ["ln", "1", "2", "3", "+"],
        ["on", "0", ".", "(-)", "enter"],
    ];

    // const secondaryFunctions: { [key: string]: string } = {
    //     sin: "sin⁻¹",
    //     cos: "cos⁻¹",
    //     tan: "tan⁻¹",
    //     "^": "π",
    //     "x^2": "√",
    //     "÷": "e",
    //     log: "10^x",
    //     ln: "e^x",
    // };

    const resetIfEvaluated = () => {
        if (!isNaN(Number(input)) && input !== "0") {
            setInput("");
        }
    }
    
    const convertToRadians = (angle: number) => (isRadians ? angle : (angle * Math.PI) / 180);
    const convertToDegrees = (angle: number) => (isRadians ? angle : angle * (180 / Math.PI));

    const handleButtonClick = (label: string) => {
        resetIfEvaluated();

        switch(label) {
            case "2nd":
                setIsSecond(!isSecond);
                break;
            
            case "clear":
                setInput("");
                break;
                
            case "del":   
                setInput(input.slice(0, -1) || "0");
                break;

        
            // case "sin":
            // case "cos":
            // case "tan":
            //     // if (isRadians){
                    
            //     // }
            //     const angleConversion = convertToRadians(parseFloat(input || "0")); // Convert to radians if necessary
            //     setInput(input + "${label}(${angleConversion})");
            //     break;

            case "x^(-1)":
                setInput(input + "^(−1)"); 
                break;
    
            case "mode":
                setIsRadians(!isRadians);
                break;
            
            case "x^2":
                setInput(input + "^2"); 
                break;
    
            case "log":
                setInput(input + "log("); 
                break;
    
            case "ln":
                setInput(input + "ln(");
                break;

            case "on":
                setInput("0"); 
                break;
    
            case "(-)":
                setInput(input + "-"); // Append negative sign
                break;

            case "enter":
                try {
                    const expression = input
                        .replace(/\^/g, "**") // Replace ^ with ** for JS exponentiation
                        .replace(/÷/g, "/")  // Replace ÷ with /
                        .replace(/x/g, "*"); // Replace x with *
                    const result = eval(expression); // Evaluate the expression
                    setInput(result.toString());
                } catch {
                    setInput("Error");
                }
                break;

            default:
                setInput(input === "0" ? label : input + label); // Append label or replace "0"
                break;
        }
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 max-w-md px-10 py-10 m-5 justify-between shadow-lg rounded-3xl">
            <div className="flex flex-col h-full gap-4 z-10">
                <Display value={input || "0"} />
                <div className="flex flex-col gap-2 bg-gray-100">
                    <div className="flex gap-2">

                        {/* 2nd and Clear Buttons */}
                        <div className="w-3/5 h-full flex flex-col gap-2">
                            <Button 
                                label={"2nd"} 
                                onClick={() => handleButtonClick("2nd")} 
                                className="font-semibold w-full h-auto items-center justify-center bg-blue-400 text-white hover:bg-blue-500"
                            />
                            <Button 
                                label={"clear"} 
                                onClick={() => handleButtonClick("clear")} 
                                className="font-semibold w-full h-auto items-center justify-center bg-green-400 hover:bg-green-500 text-white"
                            />
                        </div>

                        {/* Arrow Buttons */}
                        <div className="flex flex-col w-2/5 gap-2">
                            <Button 
                                label={"↑"} 
                                onClick={() => handleButtonClick("↑")} 
                                className="font-medium text-sm hover:bg-gray-200 text-black items-center justify-center h-6 bg-white"
                            />
                            <div className="flex w-full gap-2 items-center justify-center">
                                <Button 
                                    label={"←"} 
                                    onClick={() => handleButtonClick("←")} 
                                    className="font-medium text-sm hover:bg-gray-200 text-black items-center justify-center w-1/2 h-3 bg-white"
                                />
                                <Button 
                                    label={"→"} 
                                    onClick={() => handleButtonClick("→")} 
                                    className="font-medium text-sm hover:bg-gray-200 text-black items-center justify-center w-1/2 h-3 bg-white"
                                />
                            </div>
                            <Button 
                                label={"↓"} 
                                onClick={() => handleButtonClick("↓")} 
                                className="font-medium text-sm hover:bg-gray-200 text-black items-center justify-center h-6 bg-white"
                            />
                        </div>

                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {buttons.flat().map((label) => {
                            let customClass = "";
                            if (label === "÷" || label === "7" || label === "8" || label === "9" || label === "x" || label === "4" || label === "5" || label === "6" || label === "-" || label === "1" || label === "2" || label === "3" || label === "+"  || label === "0" || label === "." || label === "(-)" || label === "enter") customClass = "btn bg-white text-black hover:bg-gray-200";
                            else customClass = "btn text-white hover:bg-gray-700";
                            return(
                                <Button 
                                    key={label} 
                                    label={label} 
                                    onClick={() => handleButtonClick(label)} 
                                    className={customClass}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
            <span className="w-full text-center z-1 flex justify-center items-center gap-3 text-black font-bold">
                <img src={Kagami} alt="kagami family badge" className="h-4 w-auto"/>
                MASA INSTRUMENTS
            </span>
        </div>
    );
}

export default Calculator;
