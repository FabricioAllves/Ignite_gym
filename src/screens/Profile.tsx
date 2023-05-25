import { VStack, ScrollView, Center, Skeleton, Text, Heading } from 'native-base';
import { TouchableOpacity } from 'react-native'

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { useState } from 'react';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />

      <ScrollView contentContainerStyle={{ paddingBottom: 56}}>
        <Center mt={6} px={10}>
          {photoIsLoading ?
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded='full'
              startColor='gray.400'
              endColor='gray.500'
            />
            :
            <UserPhoto
              source={{ uri: 'https://github.com/FabricioAllves.png' }}
              alt='User foto'
              size={PHOTO_SIZE}
            />}

          <TouchableOpacity>
            <Text color='green.500' fontWeight='bold' fontSize='md' mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            placeholder='Nome'
            bg='gray.600'
          />

          <Input
            placeholder='fabricio@gmail.com'
            bg='gray.600'
            isDisabled
          />



          <Heading color='gray.200' fontSize='md' mb={2} alignSelf='flex-start' mt={12}>
            Alterar senha
          </Heading>

          <Input
            bg='gray.600'
            placeholder='Senha antiga'
            secureTextEntry
          />

          <Input
            bg='gray.600'
            placeholder='Nova senha'
            secureTextEntry
          />

          <Input
            bg='gray.600'
            placeholder='Confirme a nova senha'
            secureTextEntry
          />

          <Button
            title='Atualizar senha'
            mt={4}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}