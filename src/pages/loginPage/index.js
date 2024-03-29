import React, {useContext} from 'react'
import {Button, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Input from '../../components/customInput'
import { componentsColors, ROUTES} from "../../constants";
import { loginService} from "../../services/userServices";
import {Context} from "../../../App";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {

    const [ , setContext]= useContext(Context)
    const [credentials, setCredentials] = React.useState({email: '', password: ''});
    const [errors, setErrors] = React.useState({});

    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!credentials.email) {
            handleError('Please input email', 'email');
            isValid = false;
        }
        if (!credentials.password) {
            handleError('Please input password', 'password');
            isValid = false;
        }
        if (isValid) {
            await loginService(credentials)
                .then(async (response) => {
                    if(response){
                        handleError('', "incorrectCredentials")
                        setContext({
                            userID: response.userID ?? '',
                            user: response.user ?? '',
                            email: response.email ?? '',
                            firstName: response.firstName ?? '',
                            lastName: response.lastName ?? '',
                            licencePlate: response.licencePlate ?? '',
                            guestMode:false
                        })

                        await AsyncStorage.setItem('token', response.token ?? '')
                        signInValid()
                    }else {
                        throw new Error("Authentication failed")
                    }})
                .catch((err) => {
                    handleError('Incorrect email or password', 'incorrectCredentials')
                    //console.error(err.message)
                })

        }
    };

    const onRegisterPressed = () =>{
        navigation.navigate(ROUTES.REGISTER)
    }
    const signInValid = () =>{
        navigation.navigate(ROUTES.HOME)
    }
    const handleOnchange = (text, input) => {
        setCredentials(prevState => ({...prevState, [input]: text}));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };

    const enterAsGuest = async () =>{
        setCredentials({email: 'Guest', password: 'Guest'})
        console.log(credentials)
        await loginService(credentials)
            .then(async (response) => {
                if(response){
                    handleError('', "incorrectCredentials")
                    setContext({
                        user: response.user ?? '',
                        guestMode:true
                    })

                    await AsyncStorage.setItem('token', response.token ?? '')
                    setCredentials({email: '', password: ''})
                    signInValid()
                }else {
                    throw new Error("Authentication failed")
                }})
            .catch((err) => {
                handleError('Incorrect email or password', 'incorrectCredentials')
                //console.error(err.message)
            })
    }

    return (
        <SafeAreaView style={{backgroundColor: componentsColors.backgroundColor, flex: 1}}>
            <ScrollView contentContainerStyle={
            {
                marginTop:120,
                paddingTop: 50,
                paddingHorizontal: 20
            }}>
                <Text style={ styles.title }>Sign in</Text>
                <View style={{marginVertical: 20}}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        iconName="email-outline"
                        label="Email"
                        placeholder="Enter your email address"
                        placeholderTextColor={componentsColors.textPrimary}
                        error={errors.email}
                    />
                    <Input
                    onChangeText={text => handleOnchange(text, 'password')}
                    onFocus={() => handleError(null, 'password')}
                    iconName="lock-outline"
                    label="Password"
                    placeholder="Enter your password"
                    placeholderTextColor={componentsColors.textPrimary}
                    error={errors.password}
                    password
                    />
                    {errors.incorrectCredentials && (
                        <Text
                            style={{color: componentsColors.error, fontSize: 15, textAlign: 'center'}}
                        >{ errors.incorrectCredentials }</Text>
                    )}
                    <Button title="Log In" onPress={validate} />
                    <Text
                        onPress={onRegisterPressed}
                        style={{
                            marginTop:20,
                            color: componentsColors.textSecondary,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 16,
                        }}>
                        Don't have account? Register now!
                    </Text>

                    <Text
                        onPress={ enterAsGuest }
                        style={{
                            marginTop:30,
                            color: componentsColors.textSecondary,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 16,
                        }}>
                        Check out the app as Guest!
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
        backgroundColor: componentsColors.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginBottom:30,
        fontWeight: 'bold',
        fontSize: 30,
        color: componentsColors.titles,
        marginLeft: 10,
        alignSelf: "center",
    }
});