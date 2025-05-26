'use client';

import { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function Search() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn(
      "relative flex items-center w-full max-w-md transition-all duration-300",
      isFocused && "w-full"
    )}>
      <SearchIcon className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search coins, tokens..."
        className="pl-8 h-9 bg-muted/40 border-muted focus:bg-background focus:border-primary/50"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {query && (
        <button
          className="absolute right-2 h-4 w-4 text-muted-foreground hover:text-foreground"
          onClick={() => setQuery('')}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}