import "./preview.css";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from '@/hooks/use-toast'

interface PreviewProps {
  code: string;
}

const PreviewPython: React.FC<PreviewProps> = ({ code }) => {
    const [result, setResult] = useState<string>("");
    const options = {
        method: 'POST',
        url: 'https://python-3-code-compiler.p.rapidapi.com/',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'python-3-code-compiler.p.rapidapi.com'
        },
        data: {
          code:code.length>0?code:'print("Hello, World!");',
          version: 'latest',
          input: null
        }
      };
  
    useEffect(() => {
      const compileCode = async () => {
        try{
            const response = await axios.request(options);
            setResult(response.data.output);
          }
          catch(error){
            toast({
              title: 'Something went wrong.',
              description:"Check Your Code!",
              variant: 'destructive',
            })
          };
      };
  
      compileCode();
    }, [code]);
  
    return (
      <div className="preview-wrapper preview">
          <div className="result-wrapper">
            <h4>Compiler Result:</h4>
            <pre>{result}</pre>
          </div>
      </div>
    );
  };
  
  export default PreviewPython;
  