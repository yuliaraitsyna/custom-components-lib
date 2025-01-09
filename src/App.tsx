import {Button} from './components/Button/Button';
import {TextField} from './components/TextField/TextField';

const App: React.FC = () => {
  return (
    <>
      <Button size="large" variant="contained" color="primary" onClick={() => alert('click')}>
        button
      </Button>
      <Button size="small" variant="text" color="success" disabled={true}>
        button
      </Button>
      <Button size="small" variant="text" color="success" disabled={false}>
        button
      </Button>
      <Button size="medium" variant="outlined" color="error" onClick={() => alert('click')}>
        button
      </Button>
      <TextField placeholder="placeholder" error={true} />
    </>
  );
};

export {App};
