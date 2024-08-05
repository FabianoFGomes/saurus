import React from 'react';
import { UseAuth } from '@/contexts/AuthContext';
import Public from '@/routers/Public';
import Private from '@/routers/Private';

function Routers() {
  const { isLoggedIn } = UseAuth();

  return isLoggedIn ? <Private /> : <Public />;
}

export default Routers;
