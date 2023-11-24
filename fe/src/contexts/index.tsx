import React, { ReactNode } from 'react'
import { GlobalContextProvider } from './Globals';

interface IProps {
  children: ReactNode;
}
export default function AppContext({children}: IProps) {
  return (
    <GlobalContextProvider>
      {children}
    </GlobalContextProvider>
  )
}
