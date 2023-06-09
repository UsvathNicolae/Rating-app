import React, {useContext} from 'react'
import {Button, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Input from '../../components/customInput'
import {colors, ROUTES} from "../../constants";
import {login} from "../../services/loginService";
import {Context} from "../../../App";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
    const [ , setContext]= useContext(Context)
    const [credentials, setCredentials] = React.useState({email: '', password: ''});
    const [errors, setErrors] = React.useState({});

    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        console.log(credentials)
        if (!credentials.email) {
            handleError('Please input email', 'email');
            isValid = false;
        }
        if (!credentials.password) {
            handleError('Please input password', 'password');
            isValid = false;
        }
        if (isValid) {
            await login(credentials)
                .then(async (response) => {
                    console.log(response)
                    if(response){
                        setContext({
                            token: response.token ?? '',
                            user: response.user ?? '',
                            userId: response.userId ?? ''
                        })

                        await AsyncStorage.setItem('token', response.token ?? '')
                        setCredentials({email: '', password: ''})
                        signInValid();
                    }else {
                        throw new Error("Authentication failed")
                    }})
                .catch((err) => console.error(err))


        }
    };

    const onRegisterPressed = () =>{
        navigation.navigate(ROUTES.REGISTER)
    }
    const signInValid = () =>{
        navigation.navigate('Register')
    }
    const handleOnchange = (text, input) => {
        setCredentials(prevState => ({...prevState, [input]: text}));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };

    return (
        <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
            <ScrollView contentContainerStyle={
            {
                paddingTop: 50,
                paddingHorizontal: 20
            }}>
                <Text>Sign in</Text>
                <View style={{marginVertical: 20}}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        iconName="email-outline"
                        label="Email"
                        placeholder="Enter your email address"
                        error={errors.email}
                    />
                    <Input
                    onChangeText={text => handleOnchange(text, 'password')}
                    onFocus={() => handleError(null, 'password')}
                    iconName="lock-outline"
                    label="Password"
                    placeholder="Enter your password"
                    error={errors.password}
                    password
                />
                <Button title="Log In" onPress={validate} />
                <Text
                    onPress={onRegisterPressed}
                    style={{
                        color: colors.black,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: 16,
                    }}>
                    Don't have account ?Register
                </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});