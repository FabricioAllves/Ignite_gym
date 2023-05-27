import { useState } from 'react';
import { VStack, ScrollView, Center, Skeleton, Text, Heading, useToast } from 'native-base';
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';




import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';


const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/FabricioAllves.png');

  const toast = useToast();

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)
    try {
      let photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // tipo de midia
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true //usuario pode editar a imagem?
      });

      if (photoSelected.canceled) {
        return
      }
      // Existe uma URI?
      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);

        if (photoInfo.exists && (photoInfo.size / 1024 / 1024 > 5)) {
          // Se for maior que 5MB vai cair aqui
          return toast.show({
            title: 'Essa imagem e muito grande. Escolha uma de ate 5MB.',
            placement: 'top',
            bgColor: 'red.500'
          })
        }

        setUserPhoto(photoSelected.assets[0].uri)
      }

    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />

      <ScrollView contentContainerStyle={{ paddingBottom: 56 }}>
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
              source={{ uri: userPhoto }}
              alt='User foto'
              size={PHOTO_SIZE}
            />}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
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



          <Heading color='gray.200' fontSize='md' mb={2} alignSelf='flex-start' mt={12} fontFamily='heading'>
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
