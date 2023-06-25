import { StatusBar } from 'expo-status-bar';
import {Button, Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';
import {componentsColors} from "../../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../App";
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
        if (!credentials.email) {
            credentials.email = context.email
        }
        if (!credentials.username) {
            credentials.username = context.user
        }
        if (!credentials.firstName) {
            credentials.firstName = context.firstName
        }
        if (!credentials.lastName) {
            credentials.lastName = context.lastName
        }
        if (!credentials.licencePlate) {
            credentials.licencePlate = context.licencePlate
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
                    <Text style={ styles.text }>Username</Text>
                    <Text style={ styles.text }>Email</Text>
                    <Text style={ styles.text }>First name</Text>
                    <Text style={ styles.text }>Last Name</Text>
                    <Text style={ styles.text }>LicencePlate</Text>
                </View>
                <View style={{ width: 1, backgroundColor: 'black'}} />
                {editMode?
                    <View style={{flex: 1, flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
                        <TextInput style={{color:componentsColors.textSecondary}}
                            onChangeText={text => handleOnchange(text, 'username')}
                            onFocus={() => handleError(null, 'username')}
                            placeholder={context.user}
                            placeholderTextColor={ componentsColors.textSecondary}
                            error={errors.username}
                        />
                        <TextInput style={{color:componentsColors.textSecondary}}
                            onChangeText={text => handleOnchange(text, 'email')}
                            onFocus={() => handleError(null, 'email')}
                            placeholder={context.email}
                            placeholderTextColor={ componentsColors.textSecondary}
                            error={errors.email}
                        />
                        <TextInput style={{color:componentsColors.textSecondary}}
                            onChangeText={text => handleOnchange(text, 'firstName')}
                            onFocus={() => handleError(null, 'firstName')}
                            placeholder={context.firstName}
                            placeholderTextColor={ componentsColors.textSecondary}
                            error={errors.firstName}
                        />
                        <TextInput style={{color:componentsColors.textSecondary}}
                            onChangeText={text => handleOnchange(text, 'lastName')}
                            onFocus={() => handleError(null, 'lastName')}
                            placeholder={context.lastName}
                            placeholderTextColor={ componentsColors.textSecondary}
                            error={errors.lastName}
                        />
                        <TextInput style={{color:componentsColors.textSecondary}}
                            onChangeText={text => handleOnchange(text, 'licencePlate')}
                            onFocus={() => handleError(null, 'licencePlate')}
                            placeholder={context.licencePlate}
                            placeholderTextColor={ componentsColors.textSecondary}
                            error={errors.licencePlate}
                        />

                    </View>:
                    <View style={{flex: 1, flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
                        <Text style={ styles.text }>{context.user}</Text>
                        <Text style={ styles.text }>{context.email}</Text>
                        <Text style={ styles.text }>{context.firstName}</Text>
                        <Text style={ styles.text }>{context.lastName}</Text>
                        <Text style={ styles.text }>{context.licencePlate}</Text>

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
        color: componentsColors.iconThird,
        fontSize: 35,
        marginRight: 10,
    },
    editIcon: {
        color: componentsColors.iconSecondary,
        fontSize: 20,
        marginRight: 10,
    },
    username:{
        fontSize: 22,
        color: componentsColors.textSecondary,

    },
    text:{
        color: componentsColors.textSecondary,

    }
});