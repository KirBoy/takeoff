import React from 'react';
import './App.css';
import Auth from "./components/Auth/Auth";
import ContactsList from "./components/ContactsList/ContactsList";
import {useTypedSelector} from "./hooks/useTypedSelector";

function App() {
    const {isAuth} = useTypedSelector(state => state.auth)
    return (
        <div className="App">
            {!isAuth ? <Auth/>: <ContactsList/>}
        </div>
    );
}

export default App;
