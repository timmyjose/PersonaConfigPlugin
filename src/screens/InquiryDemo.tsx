import { View, StyleSheet, Button, ScrollView, TextInput, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { Inquiry, Environment } from 'react-native-persona'
import { useState } from 'react'

const InquiryDemo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [text, onChangeText] = useState(null)

  return (
    <View style={styles.container}>
      <Button title='Go Back' onPress={() => navigation.goBack()} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scroll}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          autoCapitalize="none"
          placeholder={'Enter inquiry template id: itmpl_....'}
        />
        <Button
          title="Start Inquiry"
          onPress={() => {
            Inquiry.fromTemplate(text)
              .environment(Environment.SANDBOX)
              .onComplete((inquiryId, status, fields) =>
                Alert.alert(
                  'Complete',
                  `Inquiry ${inquiryId} completed with status "${status}."`,
                ),
              )
              .onCanceled((inquiryId, sessionToken) =>
                Alert.alert('Canceled', `Inquiry ${inquiryId} was cancelled`),
              )
              .onError(error => Alert.alert('Error', error.message))
              .build()
              .start()
          }}
        />
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default InquiryDemo
