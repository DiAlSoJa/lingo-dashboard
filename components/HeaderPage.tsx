import React from 'react'
import BackButton from './BackButton'
import { Button } from './ui/button'
import Link from 'next/link';

type HeaderPageProps={
    link:string;
}
const HeaderPage = ({link} : HeaderPageProps) => {
  return (
    <div className='flex justify-between max-w-[1000px] mx-auto'>
        <BackButton text='go back' link='/'/>
        <Link href={link}>
            <Button variant={"primary"}>Add +</Button>
        </Link>
    </div>
  )
}

export default HeaderPage