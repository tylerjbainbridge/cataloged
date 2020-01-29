import { useLocation, useHistory } from 'react-router-dom';

export const useGoToPath = () => {
  const location = useLocation();
  const history = useHistory();

  const goTo = (pathname: string) => {
    history.push({ pathname, search: location.search });
  };

  return [goTo];
};
