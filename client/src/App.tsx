import {io, Socket} from 'socket.io-client';
import Header from './components/header';
import Footer from './components/footer';
import Routers from './components/routers';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001");

function App() {


  return (
    <div className="flex flex-col ">
      <Header/>
      <Routers/>
      <Footer/>
    </div>
  );
}

export default App;
