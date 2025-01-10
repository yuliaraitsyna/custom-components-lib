import {Button} from './components/Button/Button';
import {Select} from './components/Select/Select';
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
      <TextField placeholder="placeholder" value={'hello'} helperText="helper text" readOnly />
      <Select label="label" helperText="helper text" onChange={() => console.log('change')} required>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
    </>
  );
};

export {App};
