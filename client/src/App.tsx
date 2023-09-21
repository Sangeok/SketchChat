import Header from './components/header';
import Footer from './components/footer';
import Routers from './components/routers';
import { SocketContext, socket } from './context/socket';
import { useRecoilValue } from 'recoil';
import { chatCheckAtom } from './recoil/chatCheckAtom';

function App() {
  const chatStart = useRecoilValue<Boolean>(chatCheckAtom)


  return (
    <div className="flex flex-col ">
      <SocketContext.Provider value={socket}>
        { !chatStart && <Header/> }
        <Routers/>
        <Footer/>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
