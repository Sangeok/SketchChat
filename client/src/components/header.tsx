import {useState} from "react";
import { Link } from 'react-router-dom';


const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <div className="flex justify-between p-5 shadow-md">
            <ul>
                <li>
                    <Link to="/">ChatAndSketch</Link>
                </li>
            </ul>
            <ul className="flex">
                <li>
                    <Link to="/randomchat" className="px-5">Random Chat</Link>
                </li>
                <li>
                    <Link to="/findingroom" className="px-5">Finding Room</Link>
                </li>
                {
                    isLoggedIn ? (
                        <li>
                            <Link to="/myprofile">Profile</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default Header;
