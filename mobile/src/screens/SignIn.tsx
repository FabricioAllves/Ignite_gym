import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "native-base";
import { useForm, Controller } from 'react-hook-form'

import { useAuth } from '@hooks/useAuth';


import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import BackgroundImg from '@assets/background.png'
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AppError } from '@utils/AppError';

type FormData = {
  email: string;
  password: string;
}



export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()


  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  async function handleLogin({ email, password }: FormData) {
    try {
      setIsLoading(true)
      await signIn(email, password)

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possivel entrar. Tente novamente mais tarde.'

      setIsLoading(false)

      toast.show({
        title,
        bgColor: 'red.500',
        placement: 'top'
      })
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={10}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoa treinando"
          resizeMode="contain"
          position='absolute'
        />

        <Center my={24}>
          <LogoSvg />

          <Text color='gray.100' fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name='email'
            rules={{ required: 'Informe o e-mail' }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='password'
            rules={{ required: 'Informe a senha' }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />





          <Button
            title="Acessar"
            onPress={handleSubmit(handleLogin)}
            isLoading={isLoading}
          />
        </Center>

        <Center mt={24}>
          <Text color='gray.100' fontSize='sm' mb={3} fontFamily='body'>
            Ainda não tem acesso?
          </Text>

          <Button
            title="Criar conta"
            variant={'outline'}
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}