import { StatusBar } from 'expo-status-bar';
import {Button, Keyboard, StyleSheet, Text, View} from 'react-native';
import {componentsColors} from "../../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../App";
import Input from "../../components/customInput";
import {updateUserService} from "../../services/userServices";

const Profile = () => {
    const [ context, setContext]= useContext(Context)
    const [editMode, setEditMode] = useState(false)
    const [credentials, setCredentials] = React.useState({email: context.email, username: context.user, firstName: context.firstName, lastName: context.lastName, licencePlate: context.licencePlate});
    const [errors, setErrors] = React.useState({});

    useEffect(()=>{

    }, [editMode])
    const handleOnchange = (text, input) => {
        setCredentials(prevState => ({...prevState, [input]: text}));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };
    const enterEditMode = () =>{
        setEditMode(!editMode)
    }

    const validate = async () =>{
        Keyboard.dismiss();
        let isValid = true;
        console.log(credentials)
        if (!credentials.email) {

            handleError('Please input email', 'email');
            isValid = false;
        }
        if (isValid) {
            await updateUserService(context.userID, credentials)
                .then(async (response) => {
                    if (response) {
                        setContext({
                            userID: context.userID ?? '',
                            user: credentials.username ?? '',
                            email: credentials.email ?? '',
                            firstName: credentials.firstName ?? '',
                            lastName: credentials.lastName ?? '',
                            licencePlate: credentials.licencePlate ?? ''
                        })
                        console.log(context)
                        enterEditMode()
                    }else{
                        throw new Error("Update failed")
                    }
                })
                .catch((err) => {
                    handleError('Update failed, please try again!', 'errorMessage')
                })

            }

        }

    return (
        <View style={styles.container}>
            <View style={{ flex:0.2,marginTop:50,marginLeft:20, flexDirection: 'row', alignSelf: 'flex-start'}}>
                <Icon name = 'account-box-outline' style={ styles.userIcon }></Icon>
                <Text style={ styles.username }>{ context.user }</Text>
            </View>
            <View style={{ flex:0.2,marginTop:50,marginRight:20, flexDirection: 'row', alignSelf: 'flex-end'}}>
                <Icon name = 'account-edit-outline' style={ styles.editIcon } onPress = { enterEditMode }></Icon>
                <Text style={{fontSize: 15,}} onPress = { enterEditMode }>Edit</Text>
            </View>
            <View style={{ flex:2, flexDirection:'row'}}>
                <View style={{flex:1, flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
                    <Text>Username</Text>
                    <Text>Email</Text>
                    <Text>First name</Text>
                    <Text>Last Name</Text>
                    <Text>LicencePlate</Text>
                </View>
                <View style={{ width: 1, backgroundColor: 'black'}} />
                {editMode?
                    <View style={{flex: 1, flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
                        <Input
                            onChangeText={text => handleOnchange(text, 'username')}
                            onFocus={() => handleError(null, 'username')}
                            placeholder={context.user}
                            error={errors.username}
                        />
                        <Input
                            onChangeText={text => handleOnchange(text, 'email')}
                            onFocus={() => handleError(null, 'email')}
                            placeholder={context.email}
                            error={errors.email}
                        />
                        <Input
                            onChangeText={text => handleOnchange(text, 'firstName')}
                            onFocus={() => handleError(null, 'firstName')}
                            placeholder={context.firstName}
                            error={errors.firstName}
                        />
                        <Input
                            onChangeText={text => handleOnchange(text, 'lastName')}
                            onFocus={() => handleError(null, 'lastName')}
                            placeholder={context.lastName}
                            error={errors.lastName}
                        />
                        <Input
                            onChangeText={text => handleOnchange(text, 'licencePlate')}
                            onFocus={() => handleError(null, 'licencePlate')}
                            placeholder={context.licencePlate}
                            error={errors.licencePlate}
                        />

                    </View>:
                    <View style={{flex: 1, flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
                        <Text>{context.user}</Text>
                        <Text>{context.email}</Text>
                        <Text>{context.firstName}</Text>
                        <Text>{context.lastName}</Text>
                        <Text>{context.licencePlate}</Text>

                    </View>
                }
            </View>
            {editMode && <Button title="Save" onPress={validate} />}
            <View style={{flex:0.5}}></View>
            <StatusBar style="auto" />
        </View>
    );
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userIcon: {
        color: componentsColors.iconPrimary,
        fontSize: 35,
        marginRight: 10,
    },
    editIcon: {
        color: componentsColors.iconPrimary,
        fontSize: 20,
        marginRight: 10,
    },
    username:{
        fontSize: 22,
        color: componentsColors.textPrimary,

    }
});