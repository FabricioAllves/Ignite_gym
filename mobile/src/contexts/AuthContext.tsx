import { createContext, ReactNode, useEffect, useState } from "react";
import { UserDTO } from "@dtos/UserDTO";

import { storageUserSave, storageUserGet } from "@storage/storageUser";

import { api } from "@services/api";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingUserStorageData: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });

      if (data.user) {
        setUser(data.user)
        storageUserSave(data.user)
      }
    } catch (error) {
      throw error
    }
    console.log(user)
  }

  // Esta funçao verifica se o usuario esta logado / salvo no storage para pode direcionar ele na rota
  //depois que carregar tudo ai o estado de loading muda e o usuario vai pra tela Home
  async function loadUserData() {
    try {
      const userLogged = await storageUserGet();

      if (userLogged) {
        setUser(userLogged)
      }

    } catch (error) {
      throw error;

    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, isLoadingUserStorageData }}>
      {children}
    </AuthContext.Provider>
  )
}