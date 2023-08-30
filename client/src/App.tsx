import Header from './components/header';
import Footer from './components/footer';
import Routers from './components/routers';
import { SocketContext, socket } from './context/socket';

function App() {


  return (
    <div className="flex flex-col ">
      <SocketContext.Provider value={socket}>
        <Header/>
        <Routers/>
        <Footer/>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
