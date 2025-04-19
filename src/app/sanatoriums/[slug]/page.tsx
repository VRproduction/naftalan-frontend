import React from 'react'
import SanatoriumDetailPage from './Detail'

interface Props {
    params: Promise<{ 
      slug: string;
    }>;
  }
  
const page = async ({ params }: Props) => {
    const { slug } = await params;
    return (
    <SanatoriumDetailPage params={{slug: slug}} /> 
  )
}

export default page