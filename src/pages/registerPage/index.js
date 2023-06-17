import {Button, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from "react";
import {colors, ROUTES} from "../../constants";
import Input from "../../components/customInput";
import {registerService} from "../../services/userServices";

const Register = ({navigation}) => {

    const [credentials, setCredentials] = React.useState({email: '', username: '', firstName: '', lastName: '', password: '', confirmedPassword: ''});
    const [errors, setErrors] = React.useState({});

    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        console.log(credentials)
        if (!credentials.username) {
            handleError('Please input username', 'username');
            isValid = false;
        }
        if (!credentials.email) {
            handleError('Please input email', 'email');
            isValid = false;
        }
        if (!credentials.firstName) {
            handleError('Please input your first name', 'firstName');
            isValid = false;
        }
        if (!credentials.lastName) {
            handleError('Please input your last name', 'lastName');
            isValid = false;
        }
        if (!credentials.password) {
            handleError('Please input password', 'password');
            isValid = false;
        }
        if (!credentials.confirmedPassword) {
            handleError('Please input password', 'confirmedPassword');
            isValid = false;
        }
        if (isValid) {
            await registerService(credentials)
                .then(onLoginPressed)
                .catch((err) => {
                    handleError('Email is already in use!', 'email');
                })
        }
    };

    const onLoginPressed = () =>{
        navigation.navigate(ROUTES.LOGIN)
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
                    paddingTop: 20,
                    paddingHorizontal: 20
                }}>
                <Text style={styles.title}>Sign up</Text>
                <View style={{marginVertical: 20}}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'username')}
                        onFocus={() => handleError(null, 'username')}
                        iconName="account"
                        label="Username"
                        placeholder="Enter your username"
                        error={errors.username}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        iconName="email-outline"
                        label="Email"
                        placeholder="Enter your email address"
                        error={errors.email}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'firstName')}
                        onFocus={() => handleError(null, 'firstName')}
                        iconName="account"
                        label="First Name"
                        placeholder="Enter your first name"
                        error={errors.firstName}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'lastName')}
                        onFocus={() => handleError(null, 'lastName')}
                        iconName="account"
                        label="Last name"
                        placeholder="Enter your last name"
                        error={errors.lastName}
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
                    <Input
                        onChangeText={text => handleOnchange(text, 'confirmedPassword')}
                        onFocus={() => handleError(null, 'confirmedPassword')}
                        iconName="lock-outline"
                        label="Confirm password"
                        placeholder="Enter your password"
                        error={errors.confirmedPassword}
                        password
                    />
                    <Button title="Register" onPress={validate} />
                    <Text
                        onPress={onLoginPressed}
                        style={{
                            color: colors.black,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 16,
                        }}>
                        Already have an account? Log in!
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        color: colors.black,
        marginLeft: 10,
        alignSelf: "center",
    }
});