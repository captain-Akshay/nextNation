"use client"
import Editor from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import Preview from "./Preview";
import { useSearchParams } from 'next/navigation'
import { useTheme } from "next-themes";
import PreviewJava from "./PreviewJava";
import PreviewCpp from "./PreviewCpp";
import Image from "next/image";
function CodeEditor(){
    const searchParams = useSearchParams();
    const [filterSelected, setFilterSelected] = useState('javascript');
    const existingCode = searchParams.get("code");
    const[code,setCode]=useState(existingCode?existingCode:"//Start your code here!!");
    const[otherCode,setOtherCode]=useState("");
    const { theme,setTheme } = useTheme();
    useEffect(()=>{
      if (typeof window !== 'undefined') {
        setTheme(JSON.stringify(window.localStorage.getItem("theme")));
      }else{
        setTheme("light")
      }},[]);
      const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Update the selected filter when the dropdown option changes
        setFilterSelected(event.target.value);
        setOtherCode(existingCode??'');
      };
    
    return (
      <div className="flex flex-row">
  <div className={`w-1/2 ${theme==="dark"?"bg-gray-800":"bg-gray-200"} p-4`}>
    <select
          value={filterSelected}
          onChange={handleFilterChange}
          className={`px-4 py-2 rounded-md border ${
            theme === 'dark' ? 'border-white' : 'border-gray-300'
          } bg-${theme === 'dark' ? 'gray-800' : 'white'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mb-5 text-${theme === 'dark' ? 'white' : 'black'}`}
        >
          <option value="javascript">Javascript</option>
          <option value="java">Java</option>
          <option value="python">python</option>
        </select>
        <div className="flex flex-row justify-between">
    <h2 className={`${theme==="dark"?"text-white":"text-black"}text-2xl mb-4`}>Code</h2>
    {filterSelected!=="javascript"&&<div className="">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-8 rounded-full flex flex-row" onClick={()=>{
          setOtherCode(code);
        }}>
          <p>Run </p>
        <Image src={"https://icon-library.com/images/play-button-icon/play-button-icon-12.jpg"} alt="" width={25} height={10}/>
        </button>
</div>}
</div>
    <Editor
      value={code}
      onChange={(value) => {
        setCode(value ?? '');
      }}
      height="50vh"
      language={filterSelected}
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  </div>
  <hr className={`w-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-400'}`} />
  <div className={`w-1/2 ${theme==="dark"?"bg-gray-800":"bg-gray-200"} p-4`}>
    <h2  className={`${theme==="dark"?"text-white":"text-black"}text-2xl mb-4`}>Output</h2>
   {filterSelected==="javascript"&&<Preview code={code} err={''} />}
    {filterSelected==="java"&&<PreviewJava code={otherCode}/>}
    {filterSelected==="python"&&<PreviewCpp code={otherCode}/>}
  </div>
</div>);
  };
  
  export default CodeEditor;