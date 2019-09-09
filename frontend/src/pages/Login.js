import React, { useState }  from 'react';
import logo from '../assets/logo.svg'
import './Login.css';
import api from '../services/api'

export default function Login({ history }){ //Herda do react-router-dom essa propriedade history. Serve pra navegação
    const [userName, setUserName] = useState('');
    
    async function handleSubmit(e){
        e.preventDefault();

        const response = await api.post('/devs',{
            username: userName,
        });
        
        const { _id } = response.data;

        history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Logo do Tindev" />
                <input 
                    placeholder="Digite seu usuário do GitHub"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>

        </div>
    );
}

