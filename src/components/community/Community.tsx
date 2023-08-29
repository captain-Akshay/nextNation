"use client"
import React, { useEffect, useState } from 'react';
import CommunityList from './CommunityList';
import { Subreddit } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useToast } from '@/hooks/use-toast';
import { useCustomToasts } from '@/hooks/use-custom-toasts';
import { useMutation } from '@tanstack/react-query';
import { useTheme } from 'next-themes';

function Community() {
  const { theme,setTheme } = useTheme(); 
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      setTheme(window.localStorage.getItem("theme")??"light");
    }else{
      setTheme("light")
    }},[]);
  const { toast } = useToast();
  const { loginToast } = useCustomToasts();
  const [filterSelected, setFilterSelected] = useState('popular');
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);

  const { mutate: getSubs, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.get(`/api/friendrequest?q=${filterSelected}`);
      return data as Subreddit[];
    },
    onError: (err: AxiosError) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      return toast({
        title: 'Something went wrong.',
        description: "Won't be fetched. Please try again.",
        variant: 'destructive',
      });
    },
    onSuccess: (data) => {
      setSubreddits(data);
    },
  });

  useEffect(() => {
    // Fetch data when the component mounts or the filterSelected state changes
    getSubs();
  }, [filterSelected]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Update the selected filter when the dropdown option changes
    setFilterSelected(event.target.value);
  };

  return (
    <div className='py-14'>
      {/* Dropdown menu for selecting filter */}
      <select
        value={filterSelected}
        onChange={handleFilterChange}
        className={`px-4 py-2 rounded-md border ${
          theme === 'dark' ? 'border-white' : 'border-gray-300'
        } bg-${theme === 'dark' ? 'gray-800' : 'white'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mb-5 text-${theme === 'dark' ? 'white' : 'black'}`}
      >
        <option value="popular">Popular</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>

      {/* Display loading message while fetching data */}
      {isLoading && <div>Loading...</div>}

      {/* Display the list of subreddits */}
      {!isLoading && <CommunityList data={subreddits} />}
    </div>
  );
}

export default Community;
