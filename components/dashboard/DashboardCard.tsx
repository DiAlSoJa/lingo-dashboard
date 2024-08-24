import React from 'react'
import { Card, CardContent } from '../ui/card';
import { Newspaper } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  count: number;
  icon: React.ReactElement<LucideIcon>;
}


const DashboardCard = ({title,count,icon}:DashboardCardProps) => {
    return (
      <Card className="bg-sky-700 dark:bg-sky-900 p-4 pb-0 ">
        <CardContent>
          <h3 className="text-3xl text-center mb-4 font-bold text-sky-50">
            {title}
          </h3>
          <div className="flex gap-5 justify-center items-center">
           {icon}
            <h3 className="text-5xl font-semibold text-sky-50">
                {count}
            </h3>
        </div>
        </CardContent>
      </Card>
    );
  };

export default DashboardCard