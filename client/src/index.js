
import {StrictMode} from 'react';
import {BrowserRouter as Router} from 'react-router-dom' ;
import { createRoot } from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux'; 
import {store} from './redux/store';

import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react" ;
import './index.css';


const container = document.getElementById('root');
const root = createRoot(container);



const theme = extendTheme({
  colors: {
    redditOrange: {
      100:"#ff6314" ,
      300:"#FF4500" ,
    }
  },
  fonts: {
    heading: 'VAG Rounded Next' ,
    body: 'Noto Sans',
  },
}) ;

root.render(
  <StrictMode>
    <Router>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </Router>
  </StrictMode>
);

