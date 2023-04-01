import React from 'react';
import { supabase } from '../../supabaseClient';

const ProviderDashboard = () => {
  const { auth } = supabase;

  const handleLogOut = async () => {
    auth.signOut();
  };

  return (
    <div>
      ProviderDashboard
      <button onClick={handleLogOut}>Wyloguj</button>
    </div>
  );
};

export default ProviderDashboard;
