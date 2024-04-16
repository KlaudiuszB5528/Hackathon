'use client';

import CardFiles from './CardFiles';
import CardMembers from './CardMembers';
import CardWelcome from './CardWelcome';

const Dashboard = () => {
  return (
    <div className="w-full h-full p-4 sm:p-10 m-auto space-y-4 lg:grid lg:grid-cols-2 lg:space-y-0 lg:gap-4 xl:grid-cols-3 max-w-screen-2xl">
      <CardWelcome />
      <CardMembers />
      <CardFiles />
    </div>
  );
};

export default Dashboard;
