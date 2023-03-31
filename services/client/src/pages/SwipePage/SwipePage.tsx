import { supabase } from '../../supabaseClient';

const SwipePage = () => {
  const { auth } = supabase;

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <div>
      SwipePage
      <button onClick={handleLogout}>log out</button>
    </div>
  );
};

export default SwipePage;
