import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';

const ActionConnector = () => {
  const history = useHistory();

  useEffect(() => {
    const queryParams = qs.parse(history.location.search);
    const mode = queryParams.mode;

    switch (mode) {
      case 'resetPassword':
        history.push(`/reset-password?${qs.stringify(queryParams)}`);
        break;
      default:
        history.push('/');
        break;
    }
  }, [history]);

  return null;
};

export default ActionConnector;
