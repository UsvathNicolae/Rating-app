import {Button, Image, Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { CheckBox } from '@rneui/themed';
import {colors} from "../../constants";
import React, {useContext, useEffect, useState} from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomInput from "../../components/customInput";
import {Context} from "../../../App";
import Input from "../../components/customInput";
import {createRatingService} from "../../services/ratingServices";


const AddRating = ({navigation}) => {

    const [stars, setStars] = useState([1,2,3,4,5])
    const [ratingStars, setRatingStars] = useState(2);
    const [rating, setRating] = useState({ licencePlate:'', description:'', stars:2, anonymous:false, img:'', username:'', userId:'' });
    const [errors, setErrors] = React.useState({});

    const [context , setContext]= useContext(Context)

    const validate = () => {
        Keyboard.dismiss();
        if (!rating.licencePlate) {
            handleError('Please input the licence plate', 'licencePlate');
            return false;
        }
        if (!rating.description) {
            handleError('Please input the licence plate', 'description');
            return false;
        }
        return true;
    }

    const postRating = async () => {
        if(validate()){
            rating.userId = context.userID
            rating.username = context.user
            console.log(rating)
            await createRatingService(rating)
        }
    }
    const handleOnchange = (text, input) => {
        setRating(prevState => ({...prevState, [input]: text}));
    };

    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };

    useEffect(()=>{
        handleOnchange(ratingStars, 'stars')

    },[ratingStars])
    const CustomRatingBar = () => {
        return(
            <View style={ styles.customRatingBar}>
                {
                    stars.map((item,key)=>{
                        return(
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    key={item}
                                    onPress = {() => {
                                        setRatingStars(item)
                                    }}>
                                    <Icon
                                        style={ styles.starIcon }
                                        name={ item<=ratingStars? 'star': 'star-outline'}></Icon>
                                </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <Text>Hello</Text>
            <Input
                onChangeText={text => handleOnchange(text, 'licencePlate')}
                label="Licence Plate"
                placeholder="Enter the licence plate"
                error={errors.licencePlate}
            />
            <Input
                onChangeText={text => handleOnchange(text, 'description')}
                label="Description"
                placeholder="Enter a description"
                error={errors.description}
            />
            <View style={styles.checkboxContainer}>
                <CheckBox
                    checked={rating.anonymous}
                    onPress={() => handleOnchange(!rating.anonymous, 'anonymous')}
                    iconType="material-community"
                    checkedIcon="checkbox-outline"
                    uncheckedIcon={'checkbox-blank-outline'}
                />
                <Text>Do you want to post as anonymous?</Text>
            </View>
            <CustomRatingBar/>
            <Button title={ 'Post' } onPress={ postRating }/>
        </View>
    );
}

export default AddRating

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    starIcon:{
        fontSize:30,
        color:colors.yellow
    },
    customRatingBar:{
        flex: 1,
        flexDirection:'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems:'center',
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: 'center',
    },
});