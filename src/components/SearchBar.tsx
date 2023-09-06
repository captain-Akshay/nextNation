"use client"
import { Subreddit, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/Command';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import { Users } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

interface SearchBarProps {}
const SearchBar: FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>('');
  const [prefix, setPrefix] = useState<string>('');
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { theme,setTheme } = useTheme();
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      setTheme(window.localStorage.getItem("theme")??"light");
    }else{
      setTheme("light")
    }},[]);
  useOnClickOutside(commandRef, () => {
    setInput('');
    setPrefix('');
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  const {
    isFetching,
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
        const { data } = await axios.get(`/api/search/${prefix}?q=${input}`);
        return data as Subreddit[]|User[];
    },
    queryKey: ['search-query'],
    enabled: false,
  });

  useEffect(() => {
    setInput('');
    setPrefix('');
  }, [pathname]);

  const handleValueChange = (text: string) => {
    setInput(text);
    if (text.startsWith('/c')) {
      setPrefix('/c');
      setInput("");
    } else if (text.startsWith('/u')) {
      setPrefix('/u');
      setInput("");
    } else if(prefix.length==0||prefix.length>2){
      setPrefix('');
    }
    debounceRequest();
  };

  // Set colors based on the current theme
  const inputBorderColor = theme === 'dark' ? 'border-zinc-600' : 'border-gray-200';
  const commandListBgColor = theme === 'dark' ? 'bg-zinc-800' : 'bg-white';
  const commandItemTextColor = theme === 'dark' ? 'text-zinc-200' : 'text-gray-800';

  return (
    <Command
      ref={commandRef}
      className={`relative rounded-lg border ${inputBorderColor} max-w-lg z-50 overflow-visible hidden md:block`}
      style={{ borderRadius: '9999px' }} // Rounded edges
      prefix={prefix}
    >
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-2 text-gray-500 text-lg">{prefix}</div>
        )}
      <CommandInput
        isLoading={isFetching}
        onValueChange={handleValueChange}
        value={input}
        className='outline-none border-none focus:border-none focus:outline-none ring-0'
        placeholder={prefix?"":"Search communities (/c) or users (/u)..."}
      />
      </div>
      {input.length > 0 && (
        <CommandList className={`absolute top-full inset-x-0 shadow rounded-b-md ${commandListBgColor}`}>
          {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading={prefix==='/c'?'Communities':'Users'}>
              {queryResults?.map((item) => {
                return <CommandItem
                  onSelect={(e) => {
                    let url=`${prefix}/${e}`
                    router.push(url); 
                    router.refresh();
                  }}
                  key={item.id}
                  value={item.name!}
                  className={commandItemTextColor}
                >
                  <Users className='mr-2 h-4 w-4' />
                  <Link href={`${prefix}/${item.name}`}>{prefix}/{item.name}</Link>
                </CommandItem>
              })}
                </CommandGroup>
          ) : null}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;