import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import BackgroundImg from '@assets/background.png'
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

type FormData = {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup.string().required('Informe o E-mail').email("E-mail invalido"),
  password: yup.string().required("Informe a senha"),
})

export function SignIn() {

  const { control, handleSubmit, formState: {errors} } = useForm<FormData>({
    resolver: yupResolver(signInSchema)
  })

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  function handleLogin({email, password}: FormData){
    console.log({email, password})
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