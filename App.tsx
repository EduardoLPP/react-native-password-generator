import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import React from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

//Form validation
import * as Yup from 'yup'
import { Formik } from 'formik'

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .required('Lenght is required')
})

export default function App() {

  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
 
  const generatePasswordString = (passwordLength : number) => {
    let characterList = ''

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const digitChars = '012345679'
    const specialChars = '!@#$%^&*()_+'

    if(upperCase) {
      characterList += upperCaseChars
    }

    if(lowerCase){
      characterList += lowerCaseChars
    }

    if(numbers){
      characterList += digitChars
    }

    if(symbols){
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList, 
      passwordLength)

    setPassword(passwordResult)
    setIsPassGenerated(true)
  }

  const createPassword = (characters : string,
    passwordLenght: number) => {
    let result = ''
    for (let index = 0; index < passwordLenght; index++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }

    return result
  }

  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>

          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={ values => {
              generatePasswordString(Number(values.passwordLength))
            }}>
              {({
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleSubmit,
                handleReset,
              }) => (
               <>
                  <View style={styles.inputWrapper}> 
                    <View style={styles.inputColumn}>
                      <Text style={styles.heading}>Password Length</Text>
                      {touched.passwordLength && errors.passwordLength && (
                        <Text style={styles.errorText}>{errors.passwordLength}</Text>
                      )}
                    </View>

                    <TextInput style={styles.inputStyle} 
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="Ex. 8"
                      keyboardType='numeric' />
                  </View>

                  <View style={styles.inputWrapper}> 
                    <Text style={styles.heading}>Include LowerCase</Text>
                    <BouncyCheckbox
                    disableBuiltInState 
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="#29AB87"/>
                  </View>

                  <View style={styles.inputWrapper}> 
                    <Text style={styles.heading}>Include UpperCase</Text>
                    <BouncyCheckbox
                    disableBuiltInState 
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="#FED85D"/>
                  </View>

                  <View style={styles.inputWrapper}> 
                    <Text style={styles.heading}>Include Numbers</Text>
                    <BouncyCheckbox
                    disableBuiltInState 
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#C9A0DC"/>
                  </View>

                  <View style={styles.inputWrapper}> 
                    <Text style={styles.heading}>Include Symbols</Text>
                    <BouncyCheckbox
                    disableBuiltInState 
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#FC80A5"/>
                  </View>

                  <View style={styles.formActions}>
                    <TouchableOpacity
                      disabled={!isValid}
                      style={styles.primaryBtn}
                      onPress={handleSubmit}>
                      <Text style={styles.primaryBtnTxt}>Generate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.secondaryBtn}
                      onPress={ () => {
                        handleReset();
                        resetPasswordState()
                      }}>
                      <Text style={styles.secondaryBtnTxt}>Reset</Text>
                    </TouchableOpacity>
                  </View>
               </>
              )}
            </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result: </Text>
            <Text selectable style={styles.generatedPassword}>{password}</Text>
            <Text style={styles.description}>Long press to copy</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 12,
    padding: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    color: '#758283',
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
    textAlign: 'center'
  },
  heading: {
    fontSize: 20,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
    fontSize: 20
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    marginTop: 50,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 160,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
    justifyContent: 'center'
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 25
  },
  secondaryBtn: {
    width: 160,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
    justifyContent: 'center'
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    color: '#000',
    fontSize: 25
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 8,
    color:'#000',
    fontWeight: 'bold'
  },
})