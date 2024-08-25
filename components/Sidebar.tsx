'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChartBarBig, Languages, LucideWholeWord, User2Icon } from 'lucide-react'; // Asegúrate de importar los íconos correctamente

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", icon: <ChartBarBig className="mr-2 h-4 w-4" /> },
    { href: "/languages", label: "Languages", icon: <Languages className="mr-2 h-4 w-4" /> },
    { href: "/words", label: "Words", icon: <LucideWholeWord className="mr-2 h-4 w-4" /> },
    { href: "/word_type", label: "Word Types", icon: <LucideWholeWord className="mr-2 h-4 w-4" /> },
    { href: "/lists", label: "List", icon: <LucideWholeWord className="mr-2 h-4 w-4" /> },
    { href: "/users", label: "Users", icon: <User2Icon className="mr-2 h-4 w-4" /> },
    {href:"/plants", label: "Plants", icon: <User2Icon className="mr-2 h-4 w-4" />},
    {href:"/courses", label: "Courses", icon: <User2Icon className="mr-2 h-4 w-4" />},
    {href:"/chapter", label: "Chapters", icon: <User2Icon className="mr-2 h-4 w-4" />},
    {href:"/lessons", label: "Lessons", icon: <User2Icon className="mr-2 h-4 w-4" />},



  ];

  return (
    <div className='dark:bg-slate-800 bg-slate-300 rounded-none h-full'>
      <div className='px-2 py-4'>
        {links.map((link) => (
          <Link href={link.href} key={link.href} className={`text-slate-900 dark:text-slate-200 flex text-md items-center py-2 px-3 rounded-md 
            hover:bg-slate-200 dark:hover:bg-slate-600 
            ${pathname === link.href ? 'bg-slate-200 dark:bg-slate-600 text-sky-700' : ''}`}>
            
              {link.icon}
              {link.label}
            
          </Link>
        ))}
      </div>
      <div className='mx-3 bg-slate-400 h-[1px]'></div>
    </div>
  );
};

export default Sidebar;