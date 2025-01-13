import {useState} from 'react';
import {Button} from './components/Button/Button';
import {Checkbox} from './components/Checkbox/Checkbox';
import {Modal} from './components/Modal/Modal';
import {Select} from './components/Select/Select';
import {Switch} from './components/Switch/Switch';
import {TextField} from './components/TextField/TextField';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Button size="large" variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Open modal
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
      <TextField
        placeholder="placeholder"
        error={true}
        onChange={() => console.log('change')}
        onBlur={() => console.log('blur')}
      />
      <TextField placeholder="placeholder" value={'hello'} helperText="helper text" readOnly />
      <Select
        label="label"
        helperText="helper text"
        onChange={() => console.log('change')}
        onBlur={() => console.log('blur')}
        required>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
      <Checkbox onChange={e => console.log(e)} label="label" required></Checkbox>
      <Switch label="switch" required></Switch>
      <Switch label="switch" checked></Switch>
      <Switch label="switch" disabled></Switch>
      <Switch label="switch" disabled checked></Switch>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1>Modal window</h1>
        <p>Description: this is a modal window. You can add children here</p>
        <Switch label="modal switch" />
      </Modal>
    </>
  );
};

export {App};
