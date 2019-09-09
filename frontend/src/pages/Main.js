import React, { useEffect, useState } from 'react';
import "./Main.css";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import api from '../services/api';

export default function Main({ match }){ //match tbm é um parametro do react-router-dom
    //UseEffect é uma função que dá pra executar antes do return
    //É uma funçao , e quando eu quero executar essa função. O quando é geralmente usado um array, se for [] vai executar só uma vez
    const [users, setUsers] = useState([]);
    
    
    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/listaDevs', {
                headers: { user : match.params.id}
            })

            setUsers(response.data);
        }

        loadUsers();
    }, [match.params.id]);//Sempre que o id for alterado vai chamar a arrow function


    async function handleLike(id){
        await api.post(`/devs/${id}/likes`, null, { 
            headers: {user: match.params.id}
        }); // Parametros do post (url, corpo, headers), nesse caso o corpo é vazio

        setUsers(users.filter(user => user._id != id));
    }


    async function handleDislike(id){
        await api.post(`/devs/${id}/dislikes`, null, { 
            headers: {user: match.params.id}
        }); // Parametros do post (url, corpo, headers), nesse caso o corpo é vazio

        setUsers(users.filter(user => user._id != id));
    }


    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt='Tindev'/>        
            </Link>
            {users.length > 0 ? (
                <ul>
                {   console.log(match.params.id)}
                    {users.map( user => (
                        <li key={user._id} >
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p> 
                            </footer>
                            <div className="buttons">
                                <button type="button" onClick={() => handleLike(user._id)}> 
                                    <img src={like} alt='botao de like' />                            
                                </button>
                                <button type="button" onClick={() => handleDislike(user._id)}> 
                                    <img src={dislike} alt='botao de dislike' /> 
                                </button>
                                
                            </div>
                        </li> 
                    ))}
                </ul>
            )
                : (
                    <div className='empty'>
                        Acabou :(
                    </div>    

                )}        
        </div>
            )//<!-- Botao quando nao serve pra submit faz assim -->
        }
                

            
    
