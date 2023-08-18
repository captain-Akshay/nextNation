import "./preview.css";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from '@/hooks/use-toast'
interface PreviewProps {
  code: string;
}
const PreviewJava: React.FC<PreviewProps> = ({ code }) => {
    const [result, setResult] = useState<string>("");
    const options = {
      method: 'POST',
      url: 'https://java-code-compiler.p.rapidapi.com/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.RapidAPI,
        'X-RapidAPI-Host': 'java-code-compiler.p.rapidapi.com'
      },
      data: {
        code: code.length>0?code:'public class MyClass { public static void main(String args[]) { System.out.print("Hello, World!"); } }',
        version: 'latest'
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
        }
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
  
  export default PreviewJava;
  