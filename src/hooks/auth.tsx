import React, {
    useContext,
    useState,
    createContext,
    ReactNode
} from 'react'
import { api } from '../services/api';
import { database } from '../database';
import { User as UserModel } from '../database/model/User';
import { useEffect } from 'react';
import { Alert } from 'react-native';

interface User {
    id: string;
    user_id: string;
    token: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => Promise<void>;
    updateUser: (user: User) => Promise<void>;
    loading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<User>({} as User);
    const [loading, setLoading] = useState(true);

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const response = await api.post('/sessions', {
                email,
                password
            });

            const { token, user } = response.data
            console.log(token);
            api.defaults.headers.authorization = `Bearer ${token}`;

            const userCollection = database.get<UserModel>('users');
            await database.write(async () => {
                await userCollection.create((newUser) => {
                    newUser.user_id = user.id,
                    newUser.name = user.name,
                    newUser.email = user.email,
                    newUser.driver_license = user.driver_license,
                    newUser.avatar = user.avatar,
                    newUser.token = token
                });
            });

            setData({ ...user, token });
        } catch (error) {
            throw new Error(error);
        }
    }

    async function signOut() {
        try {
            const userCollection = database.get<UserModel>('users');
            await database.write(async () => {
                const currentUser = await userCollection.find(data.id);
                await currentUser.destroyPermanently();
            });

            setData({} as User);
        }catch(error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async function updateUser(user: User) {
        try {
            const userCollection = await database.get<UserModel>('users');
            await database.write(async () => {
                const currentUser = await userCollection.find(user.id);
                await currentUser.update(() => {
                    currentUser.id = user.id
                    currentUser.user_id = user.user_id
                    currentUser.token = user.token
                    currentUser.avatar = user.avatar
                    currentUser.driver_license = user.driver_license
                    currentUser.name = user.name
                });
            });

            setData(user);
            Alert.alert('Pronto!','Seu perfil atualizado com sucesso!')
        } catch (error) {
            throw new Error(error);
        }
    } 

    useEffect(() => {
        async function loadUserData() {
            const userCollection = database.get<UserModel>('users');
            const response = await userCollection.query().fetch();

            if (response.length > 0) {
                const userData: User = response[0]._raw as unknown as User;
                api.defaults.headers.authorization = `Bearer ${userData.token}`;
                setData(userData);
            }
            setLoading(false);
        }

        loadUserData();
    },[]);


    return (
        <AuthContext.Provider value={{
            user: data,
            signIn,
            signOut,
            updateUser,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };