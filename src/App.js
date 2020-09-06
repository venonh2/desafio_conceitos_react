import React, { useEffect, useState } from "react";
// styles
import "./styles.css";
// services
import api from './services/api';

function App() {
  // states
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  },[])



  async function handleAddRepository() {
    api.post('/repositories', {
      title: "Um passo de cade vez.",
      url: "https://github.com/react-native-community",
      techs: ["NodeJS", "Karoline", "Amanda"]
    }).then( (response) => {
      setRepositories([...repositories, response.data]) 
    })
   
 
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`).then(() => {
      const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
      repositories.splice(repositorieIndex, 1);
      setRepositories([...repositories]);
    })
    
    //console.log(repositorieIndex);
    
  }

  return (
    <div>
      
      <ul data-testid="repository-list">
      { repositories.map((repositorie) => 
         <li key={repositorie.id}>
           <p>{repositorie.title} </p>
         <button onClick={() => handleRemoveRepository(repositorie.id)}>
           Remover
         </button>
       </li>
      )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
