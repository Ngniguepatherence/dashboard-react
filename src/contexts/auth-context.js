import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { FastRewind } from '@mui/icons-material';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  SIGN_IN_WITH_GOOGLE: 'SIGN_IN_WITH_GOOGLE',
  
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
     
    };
  },

  [HANDLERS.SIGN_IN_WITH_GOOGLE]: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      isLoading: false,
      user,
    };
  },

  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
     
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    

    let isAuthenticated = false;
    let isLoading = true;

    try {
      const token = window.sessionStorage.getItem('authToken');

      if (token) {
        const decodedToken = jwtDecode(token);

        // Customize this part based on your token structure
        const user = {
          id: decodedToken.userId._id,
          avatar: decodedToken.userId.avatar,
          prenom: decodedToken.userId.surname, // Assurez-vous que ces propriétés existent dans votre token
          name: decodedToken.userId.name,
          email: decodedToken.userId.email,
          phone: decodedToken.userId.phone,
          address: decodedToken.userId.address,
          role: decodedToken.userId.role,
        };
        console.log(user);
        initialized.current = true;
        isAuthenticated = true;
       

        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: 
            user
            
          
        });
      }

    } catch (err) {
      console.error(err);
    }

    if (!isAuthenticated) {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    } 
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = async (email, password) => {
    let isAuthenticated = false;

    try {
      const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/auth/login`, {
          email,
          password
        });
        
        const decodedToken = jwtDecode(response.data.token);
        // const userResponse = await axios.get(`http://localhost:5000/api/users/${decodedToken.userId}`);
        const user = {
          id: decodedToken.userId._id,
          prenom: decodedToken.userId.surname, // Assurez-vous que ces propriétés existent dans votre token
          name: decodedToken.userId.names,
          email: decodedToken.userId.email,
          phone: decodedToken.userId.phone,
          role: decodedToken.userId.role,
        };
        console.log(user);
        window.sessionStorage.setItem('authToken', response.data.token);
        
        try {
          const token = window.sessionStorage.getItem('authToken');
    
          if (token) {
            const decodedToken = jwtDecode(token);
    
            // Customize this part based on your token structure
            const user = {
              id: decodedToken.userId._id,
              avatar: decodedToken.userId.avatar,
              prenom: decodedToken.userId.surname, // Assurez-vous que ces propriétés existent dans votre token
              name: decodedToken.userId.name,
              email: decodedToken.userId.email,
              phone: decodedToken.userId.phone,
              address: decodedToken.userId.address,
              role: decodedToken.userId.role,
            };
            console.log(user);
            initialized.current = true;
            isAuthenticated = true;
           
    
            dispatch({
              type: HANDLERS.INITIALIZE,
              payload: 
                user
                
              
            });
          }
    
        } catch (err) {
          console.error(err);
        }

    }catch(error) {
      console.error('Erreur lors de la connexion :', error);
    throw new Error('Veuillez vérifier votre email et mot de passe');
    }
    
  };

  const forgotPassword = async (email) => {
    await axios.post(`${publicRuntimeConfig.api.baseURL}/api/profiles/forget-password`,{email});
    
  }
  const VerificationCode = async (codepin) => {
    await axios.post(`${publicRuntimeConfig.api.baseURL}/api/profiles/verification`,{codepin});
    
  }
  
  const AddEvent = async (title,description,date,responsable) => {
    try {
      console.log(responsable);
      const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/events`, {title, description,date,responsable});
      console.log(response);
    }
    catch(error) {
      console.error('Erreur lors de l\'ajout de l\'evenement:', error);
      throw new Error('Échec de l\'ajout de l\'evenement');
    }

  };
  const AddProjet = async (title,description,acteurs,logo,dateinit) => {
    console.log(title,description,acteurs,logo,dateinit);
    try {
      console.log(acteurs);
      const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/projets`, {title, description,acteurs,logo,dateinit});
      console.log(response);
      // Equiper les membres de l'association de polo pendant les seances
    }
    catch(error) {
      console.error('Erreur lors de l\'ajout du projet:', error);
      throw new Error('Échec de l\'ajout du nouveau projet`');
    }

  };
const AddMembers = async (avatar, name, surname, email, phone,country, ville,role,profession,password,passwordConfirm)=>{
  if(password != passwordConfirm){
    console.log('password not match');
  }
  console.log(password,role);
  try {
    const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/profiles`, {avatar, name,surname,email, phone,country,ville,role,profession,password});
    console.log(response);
  }
  catch(error) {
    console.error('Erreur lors de l\'ajout :', error);
      throw new Error('Échec de l\'ajout d\'un nouveau membre');
  }
};
  const signUp = async (title,description, responsable, logo,createat) => {
    try {
      // Envoyer les informations d'inscription au backend
      const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/projets`, { title,description, responsable, logo,createat });
  
      // Stocker le token dans le sessionStorage (ou localStorage selon vos besoins)
      window.sessionStorage.setItem('authToken', response.data.token);
  
      // Récupérer les détails de l'utilisateur à partir du token
      const decodedToken = jwtDecode(response.data.token);
      
      const user = {
        id: decodedToken.userId,
        avatar: decodedToken.avatar, // Assurez-vous que ces propriétés existent dans votre token
        name: decodedToken.name,
        email: decodedToken.email
      };
  
      // Dispatch pour mettre à jour l'état de l'authentification
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user
      });
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      throw new Error('Échec de l\'inscription');
    }
  };
  
  const signInWithGoogle = async (email,expires) => {
    let isAuthenticated = false;
    try {
      const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/auth/google`, {
        email, expires
      });
      const decodedToken = jwtDecode(response.data.token);
        // const userResponse = await axios.get(`http://localhost:5000/api/users/${decodedToken.userId}`);
        const user = {
          id: decodedToken.userId._id,
          prenom: decodedToken.userId.surname, // Assurez-vous que ces propriétés existent dans votre token
          name: decodedToken.userId.names,
          email: decodedToken.userId.email,
          phone: decodedToken.userId.phone,
          role: decodedToken.userId.role,
        };
        console.log(user);
        window.sessionStorage.setItem('authToken', response.data.token);
        
        try {
          const token = window.sessionStorage.getItem('authToken');
    
          if (token) {
            const decodedToken = jwtDecode(token);
    
            // Customize this part based on your token structure
            const user = {
              id: decodedToken.userId._id,
              avatar: decodedToken.userId.avatar,
              prenom: decodedToken.userId.surname, // Assurez-vous que ces propriétés existent dans votre token
              name: decodedToken.userId.name,
              email: decodedToken.userId.email,
              phone: decodedToken.userId.phone,
              address: decodedToken.userId.address,
              role: decodedToken.userId.role,
            };
            console.log(user);
            initialized.current = true;
            isAuthenticated = true;
           
    
            dispatch({
              type: HANDLERS.INITIALIZE,
              payload: 
                user
                
              
            });
          }
    
        } catch (err) {
          console.error(err);
        }
    } catch (error) {

    }
  };


  const GoogleSession = async (email,expires) => {
    let isAuthenticated = false;
    try {
      const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/auth/google`, {
        email, expires
      });
      const decodedToken = jwtDecode(response.data.token);
        // const userResponse = await axios.get(`http://localhost:5000/api/users/${decodedToken.userId}`);
        const user = {
          id: decodedToken.userId._id,
          prenom: decodedToken.userId.surname, // Assurez-vous que ces propriétés existent dans votre token
          name: decodedToken.userId.names,
          email: decodedToken.userId.email,
          phone: decodedToken.userId.phone,
          role: decodedToken.userId.role,
        };
        console.log(user);
        window.sessionStorage.setItem('authToken', response.data.token);
        
        try {
          const token = window.sessionStorage.getItem('authToken');
    
          if (token) {
            const decodedToken = jwtDecode(token);
    
            // Customize this part based on your token structure
            const user = {
              id: decodedToken.userId._id,
              avatar: decodedToken.userId.avatar,
              prenom: decodedToken.userId.surname, // Assurez-vous que ces propriétés existent dans votre token
              name: decodedToken.userId.name,
              email: decodedToken.userId.email,
              phone: decodedToken.userId.phone,
              address: decodedToken.userId.address,
              role: decodedToken.userId.role,
            };
            console.log(user);
            initialized.current = true;
            isAuthenticated = true;
           
    
            dispatch({
              type: HANDLERS.INITIALIZE,
              payload: 
                user
                
              
            });
          }
    
        } catch (err) {
          console.error(err);
        }
    } catch (error) {

    }
  }
  



  const signOut = async () => {
    await axios.post(`${publicRuntimeConfig.api.baseURL}/api/auth/logout`);

    // Nettoyer le token du sessionStorage
    window.sessionStorage.removeItem('authToken');

    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };


  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        AddProjet,
        AddEvent,
        AddMembers,
        GoogleSession,
        forgotPassword,
        VerificationCode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
