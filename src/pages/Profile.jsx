// React
import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';

// Children
import Header from '../components/Header';

function Profile() {
  /* usando useHistory para trocar de pagina */
  const history = useHistory();

  /* função que volta pra pagina inicial e limpa o localStorage */
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Perfil" />
      <p data-testid="profile-email">{JSON.parse(localStorage.getItem('user')).email}</p>
      <button
        onClick={ () => history.push('/receitas-feitas') }
        type="button"
        data-testid="profile-done-btn"
      >
        Receitas Feitas
      </button>
      <button
        onClick={ () => history.push('/receitas-favoritas') }
        type="button"
        data-testid="profile-favorite-btn"
      >
        Receitas Favoritas
      </button>
      <button
        onClick={ () => handleLogout() }
        type="button"
        data-testid="profile-logout-btn"
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
