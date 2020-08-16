import React from 'react';
import logo from './logo.svg';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import KanBoard from '../KanBoard/KanBoard';

let Footer = () => {
  return (
    <Typography variant='subtitle1' style= {{padding: '1vh 0'}}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Curabitur leo eros, porta sed maximus sed, mollis sed sem.
      Sed ligula lacus, aliquet eu convallis eget, efficitur quis nulla.
    </Typography>
  )
}

function App() {
  return <div className='App'>
    <ThemeProvider theme={theme}>
      <Typography variant='h1'>
        U-Kan
      </Typography>
      <KanBoard />
      <Footer />
    </ThemeProvider>
  </div>
}

export default App;
