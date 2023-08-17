"use client"
import Editor from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import Preview from "./Preview";
import { useSearchParams } from 'next/navigation'
import { useTheme } from "next-themes";
  function CodeEditor(){
    const searchParams = useSearchParams()
    const existingCode = searchParams.get("code");
    const[code,setCode]=useState(existingCode?existingCode:"//Start your code here!!");
    const { theme,setTheme } = useTheme();
    useEffect(()=>{
      if (typeof window !== 'undefined') {
        setTheme(JSON.stringify(window.localStorage.getItem("theme")));
      }else{
        setTheme("light")
      }},[]);
    return (
      <div className="flex flex-row">
  <div className={`w-1/2 ${theme==="dark"?"bg-gray-800":"bg-gray-200"} p-4`}>
    <h2 className={`${theme==="dark"?"text-white":"text-black"}text-2xl mb-4`}>JavaScript Code</h2>
    <Editor
      value={code}
      onChange={(value) => {
        setCode(value ?? '');
      }}
      height="50vh"
      language="javascript"
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
    <Preview code={code} err={''} />
  </div>
</div>);
  };
  
  export default CodeEditor;