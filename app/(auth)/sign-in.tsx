import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { signIn } from '@/lib/appwrite'

const SignIn = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async () => {
    const {email, password} = form

    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }
    setIsSubmitting(true)
    try {
      //call the appwrite api to sign in
      await signIn({email, password})
      console.log('Sign in successful')
      router.replace('/')
    } catch (error: any) { 
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>


      <CustomInput                
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
        secureTextEntry={false}
      />

      <CustomInput                
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
        label="Password"
        keyboardType="default"
        secureTextEntry={true}
      />
      <CustomButton title="Sign In" onPress={handleSubmit} isLoading={isSubmitting} />

      <View className='flex justify-center mt-5 flex-row gap-2'>
        <Text className='base-regular text-gray-100'>Don&apos;t have an account?</Text>
        <Link href='/sign-up' className='base-bold text-primary'>
          Sign Up
        </Link>
      </View>
    </View>
  )
}

export default SignIn