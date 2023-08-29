"use client"
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import "@/styles/prompt.css"
import PromptCard from './PromptCard';
import { Prompt } from '@prisma/client';
const PromptSearchBar = () => {
  const { theme,setTheme } = useTheme();
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      setTheme(window.localStorage.getItem("theme")??"light");
    }else{
      setTheme("light");
    }},[]);
  const [input, setInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [prompts,setprompts]=useState<Prompt[]>([])
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    const fetchPopularTags = async () => {
      try {
        // Convert the 'tags' state to a comma-separated string.
        if (typeof window !== 'undefined') {
          setTheme(window.localStorage.getItem("theme")??"light");
        }else{
          setTheme("light");
        }
        const tagsString = tags.join(',');
  
        // Build the fetch URL with the tags as query parameters.
        const url = `/api/p?tags=${encodeURIComponent(tagsString)}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        setprompts(data);

      } catch (error) {
        console.error("Error fetching popular tags:", error);
      }
    };
    fetchPopularTags();
  }, [tags]);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && input.trim() !== '') {
      setTags((prevTags: string[]): string[] => [...prevTags, input.trim()]);
      setInput('');
    }
  };

  const addTagFromPopular = (tag: string) => {
    setTags((prevTags: string[]): string[] => [...prevTags, tag]);
  };

  const removeTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const popularTags = [
    "food", "travel", "fashion", "photography", "nature", "art", "fitness", "music", "love", "health", "beauty", "summer", "workout", "family", "fun", "happy", "instagood", "photooftheday", "beautiful", "selfie", "picoftheday", "friends", "smile", "cute", "follow", "tbt", "like", "followme", "repost", "style", "me", "instadaily", "igers", "bestoftheday", "life", "amazing", "nofilter", "sun", "beach", "landscape", "party", "foodporn", "fashionista", "fitnessmotivation", "musician", "lovequotes", "happiness", "yoga", "makeup", "wedding"
  ];

  const lightThemeColors = {
    containerBackground: 'bg-grey',
    inputBorder: 'border-gray-300',
    inputText: 'text-black',
    tagBackground: 'bg-blue-500',
    tagTextColor: 'text-black',
    popularTagBorder: 'border-blue-500',
    popularTagBackground: 'bg-blue-500',
    popularTagTextColor: 'text-black',
    popularTagShinyBackground: '',
  };

  const darkThemeColors = {
    containerBackground: 'bg-black',
    inputBorder: 'border-gray-700',
    inputText: 'text-white',
    tagBackground: 'bg-blue-700',
    tagTextColor: 'text-white',
    popularTagBorder: 'border-blue-700',
    popularTagBackground: 'bg-blue-700',
    popularTagTextColor: 'text-white',
    popularTagShinyBackground: 'bg-gradient-to-r from-black to-transparent',
  };

  const themeColors = theme === 'dark' ?darkThemeColors:lightThemeColors;

  return (
    // <HexagonBackground>
    <div className={`relative ${themeColors.containerBackground} `}>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={`w-full px-4 py-2 mb-2 rounded-lg ${themeColors.inputBorder} focus:outline-none focus:ring focus:border-blue-300 ${themeColors.containerBackground} ${themeColors.inputText}`}
        placeholder="Enter tags and press Enter..."
      />
      {tags.length !== 0 && (
        <div className="mt-2 flex flex-wrap">
          {tags.map((tag, index) => (
            <div
              key={index}
              className={`flex items-center  ${themeColors.tagTextColor} rounded-lg mt-2 mr-2 px-3 py-2 border border-solid`}
            //   style={{ backgroundColor: `hsl(${index * (360 / tags.length)}, 100%, 50%)` }}
            >
              <button
                onClick={() => removeTag(index)}
                className={`mr-2 font-bold text-xl focus:outline-none ${themeColors.tagTextColor}`}
              >
                &#x2716;
              </button>
              {tag}
            </div>
          ))}
        </div>
      )}      <div className={`text-sm text-gray-500 mt-4 ${themeColors.popularTagBorder}`}>
      Popular Tags:
      <div className="flex flex-wrap mt-2">
        {popularTags.map((tag, index) => (
          <button
            key={index}
            onClick={() => addTagFromPopular(tag)}
            className={`btn m-1 inline-block py-3 px-4 ${themeColors.popularTagTextColor} rounded-md border border-solid font-bold ${themeColors.popularTagShinyBackground}`}
            style={{ borderColor: `hsl(${index * (360 / popularTags.length)}, 100%, 50%)` }}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
    <div className=' my-6'>
    {prompts.map((prompt,index)=><PromptCard post={prompt} key={index}/>)}
    </div>
    </div>

  );
};

export default PromptSearchBar;