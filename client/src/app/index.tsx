import { AppRouter } from "./router";
import { UserProvider } from '@/context/user-context';

import 'react-modern-drawer/dist/index.css'
import "./i18n";

export const App = () => {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
};
