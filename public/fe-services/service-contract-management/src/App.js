import {
  BrowserRouter,
  Routes,
  Route,
  useParams
} from 'react-router-dom';

import ListContractContainer from './containers/ListContract';
import FormContractContainer from './containers/FormContract';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contract-management" element={<ListContractContainer />} />
        <Route path="/contract-management/create" element={<FormContractContainer />} />
        <Route path="/contract-management/:id" element={<FormContractContainer disabled={true} />} />
        <Route path="/contract-management/edit/:id" element={<FormContractContainer/>} />
      </Routes>
    </BrowserRouter>
  );
}

function About() {
  const {id} = useParams();
  console.log('id service',id);
  return <h2>About</h2>;
}

export default App;
