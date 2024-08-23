import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import InquiryDemo from './screens/InquiryDemo'

export type RootStackParamList = {
  Home: undefined
  InquiryDemo: undefined
}

function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='InquiryDemo' component={InquiryDemo} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
