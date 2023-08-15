"use client"
import React from "react";
const Switch = ({ isOn, handleToggle, type,theme }:{isOn:boolean,handleToggle:() => void,type:string,theme:string}) => {
  return (
<div
      className={`switch relative w-32 h-8 rounded-full ${
        isOn
          ? theme === "light"
            ? "bg-red-500"
            : "bg-slate-800"
          : theme === "light"
          ? "bg-red-600"
          : "bg-slate-900"
      } cursor-pointer transition-all duration-500 ml-64 mb-2`}
      onClick={() => {
        handleToggle();
      }}
    >
      <span
        className={`toggle-button absolute top-1/2 transform -translate-y-1/2 ${
          isOn ? "right-0" : "left-0"
        } ${
          theme === "light" ? "bg-white" : "bg-black"
        } border-black w-8 h-8 rounded-full border-2 transition-transform duration-500`}
      />
      <span
        className={`text-white absolute inset-0 flex items-center justify-center font-bold text-lg transition-transform duration-500 ${
          isOn ? "-translate-x-4" : "translate-x-4"
        }`}
      >
        {type}
      </span>
    </div>
  );
};

const SwitchButton = ({isOn,setType,setIsOn,type,theme}:{isOn: boolean,setType: React.Dispatch<React.SetStateAction<string>>,setIsOn: React.Dispatch<React.SetStateAction<boolean>>,type:string,theme:string}) => {
  const handleToggle = () => {
    setType((prev) => {
      if (prev === "prompt") {
        return "posts";
      } else {
        return "prompt";
      }
    });
    setIsOn(!isOn);
  };

  return <Switch isOn={isOn} handleToggle={handleToggle} type={type} theme={theme}/>;
};
export default SwitchButton;