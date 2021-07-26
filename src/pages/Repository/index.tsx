import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { Header, RepositoryInfo } from './styles';
import { FiChevronLeft } from 'react-icons/fi';

import logo from '../../assets/logo.svg';



interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>()

  return(
    <>
      <Header>
        <img src={logo} alt="GitHub Explorer" />
        <Link to="/dashboard">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img src="https://avatars.githubusercontent.com/u/54548820?v=4" alt="MatheusSESH" />
          <div>
            <strong>MatheusSESH/comms-app</strong>
            <p>Descrição do repositorio</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>1808</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>48</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>67</strong>
            <span>Issues</span>
          </li>
        </ul>
      </RepositoryInfo>
    </>
  )
}

export default Repository;
