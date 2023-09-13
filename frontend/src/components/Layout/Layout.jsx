import Header from './Header';
import Footer from './Footer';
import { GlobalStatesProvider } from './GlobalState';

export default function Layout ({children}) {
    return (
      <>
        <GlobalStatesProvider>
            <Header/>
            <div>
                {children}
            </div>
            <Footer/>
        </GlobalStatesProvider>
      </>);
}
