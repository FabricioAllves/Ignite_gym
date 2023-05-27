import { Heading, VStack, Text, SectionList } from 'native-base';


import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryCard } from '@components/HistoryCard';
import { useState } from 'react';

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '26.08.23',
      data: ['Puxada frontal', 'Remada unilateral']
    },
    {
      title: '27.08.23',
      data: ['Puxada frontal']
    }
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Excercicios" />

      <SectionList
        sections={exercises}
        keyExtractor={item => String(item)}
        renderItem={({item}) => (
          <HistoryCard />
        )}
        renderSectionHeader={({section}) => (
          <Heading color='gray.200' fontSize='md' mt={10} mb={3} fontFamily='heading'>
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={exercises.length === 0 && {flex: 1, justifyContent:'center'}}
        ListEmptyComponent={() => (
          <Text color='gray.100' textAlign='center'>
            Não há exercícios registrados ainda. {'\n'}
            Vamos fazer exercícios hojé?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />

    </VStack>
  )
}