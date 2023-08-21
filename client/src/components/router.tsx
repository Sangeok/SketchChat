import { useState} from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../pages/home'
import Randomchat from '../pages/randomchat'
import Myprofile from '../pages/myprofile'
import Login from '../pages/login'


const Router = () => {
    // 로그인 유무는 나중에 recoil로 관리
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/randomchat" element={<Randomchat/>}/>
            <Route path="/findingroom" element={<Randomchat/>}/>
            {
                isLoggedIn ? (
                    <Route path="/myprofile" element={<Myprofile/>}/>
                ) : (
                    <Route path="/login" element={<Login/>}/>
                )
            }
        </Routes>
        </div>
    )
}

export default Router;
