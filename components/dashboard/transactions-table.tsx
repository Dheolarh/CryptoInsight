'use client';

import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';
import { mockTransactions } from '@/data/mock-data';
import { cn } from '@/lib/utils';

export function TransactionsTable() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  
  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-black/40 border-slate-800 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "h-8 text-xs border-muted/50",
                filter === 'all' ? "bg-primary/10 text-primary" : "bg-transparent text-muted-foreground"
              )}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "h-8 text-xs border-muted/50",
                filter === 'transfer' ? "bg-primary/10 text-primary" : "bg-transparent text-muted-foreground"
              )}
              onClick={() => setFilter('transfer')}
            >
              Transfers
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "h-8 text-xs border-muted/50",
                filter === 'swap' ? "bg-primary/10 text-primary" : "bg-transparent text-muted-foreground"
              )}
              onClick={() => setFilter('swap')}
            >
              Swaps
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[120px]">Transaction</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow 
                  key={tx.id} 
                  className="hover:bg-muted/20 cursor-pointer border-b border-muted/20"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div 
                        className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center",
                          tx.type === 'transfer' ? "bg-blue-500/10" : "bg-purple-500/10"
                        )}
                      >
                        {tx.type === 'transfer' ? (
                          <ArrowRight className="h-4 w-4 text-blue-500" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-purple-500" />
                        )}
                      </div>
                      <div className="text-xs">{tx.hash.substring(0, 8)}...{tx.hash.substring(tx.hash.length - 4)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs capitalize border-transparent",
                        tx.type === 'transfer' ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"
                      )}
                    >
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <div className="font-medium">{tx.asset}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{tx.amount} {tx.asset}</div>
                    <div className="text-xs text-muted-foreground">${tx.amountUsd}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <div className="text-xs">{tx.address.substring(0, 6)}...{tx.address.substring(tx.address.length - 4)}</div>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </TableCell>
                  <TableCell>{tx.time}</TableCell>
                  <TableCell className="text-right">
                    <Badge 
                      className={cn(
                        "text-xs",
                        tx.status === 'confirmed' ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" : 
                        tx.status === 'pending' ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" : 
                        "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      )}
                    >
                      {tx.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-muted-foreground">
            Showing <span className="font-medium">{filteredTransactions.length}</span> transactions
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs"
              disabled={filteredTransactions.length < 10}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}