import React, { useState, useEffect ,FormEvent } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { FiChevronRight } from 'react-icons/fi'
import logo from '../../assets/logo.svg';

import { Title, Form, Repository, Error } from './styles';

interface RepositoryData {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<RepositoryData[]>(() => {
    const storageRepository = localStorage.getItem('@GitHubExplorer: repositories');

    if(storageRepository) {
      return JSON.parse(storageRepository);
    } else {
       return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('@GitHubExplorer: repositories', JSON.stringify(repositories))
  }, [repositories]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if(!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return
    }

    try {
      const response = await api.get<RepositoryData>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([ ...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse repositório');
    }

  }

  return (
    <>
      <img src={logo} alt="Github Explorer" />
      <Title>Explore Repositórios no GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository} >
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

    { inputError && <Error>{inputError}</Error>}

      <Repository>
        {repositories.map( repository => (
          <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repository>
    </>
  )
}

export default Dashboard;
