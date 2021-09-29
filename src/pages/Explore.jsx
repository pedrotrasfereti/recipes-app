// React
import React from 'react';

// Router
import { useHistory } from 'react-router-dom';

// Children
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreNav from '../components/ExploreNav';

// Helpers
import explorePageTitle from '../helpers/explorePageTitle';

function Explore(props) {
  // History
  const history = useHistory();

  return (
    <section>
      <Header title={ explorePageTitle(props) } />
      {
        !Object.keys(props).length && <ExploreNav history={ history } />
      }
      <Footer />
    </section>
  );
}

export default Explore;
