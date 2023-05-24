import { useState } from 'react'
import { VStack, FlatList, HStack, Heading, Text } from 'native-base';

import { HomeHeader } from '@components/HomeHeader';
import { Group } from '@components/Group';
import { ExerciseCard } from '@components/ExerciseCard';

export function Home() {
  const [groups, setGroups] = useState(['costa', 'ombro', 'biceps', 'Triceps'])
  const [exercise, setExercise] = useState(['1', '2', '3', '4', '5', '6', '7'])
  const [groupSelected, setGroupSelected] = useState('costa')

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toUpperCase() === item.toUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent='space-between' mb={5}>
          <Heading color='gray.200' fontSize='md'>
            Exercícios
          </Heading>

          <Text color='gray.200' fontSize='sm'>
            {exercise.length}
          </Text>
        </HStack>

        <FlatList
          data={exercise}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => (
            <ExerciseCard />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{paddingBottom: '60px'}}
        />

      </VStack>
    </VStack>
  )
}

