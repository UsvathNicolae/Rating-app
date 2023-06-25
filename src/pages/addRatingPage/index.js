import {Button, Image, Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { CheckBox } from '@rneui/themed';
import {componentsColors} from "../../constants";
import React, {useContext, useEffect, useState} from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Context} from "../../../App";
import Input from "../../components/customInput";
import {createRatingService} from "../../services/ratingServices";
import * as ImagePicker from 'expo-image-picker'


const AddRating = ({navigation}) => {

    const [stars, setStars] = useState([1,2,3,4,5])
    const [ratingStars, setRatingStars] = useState(2);
    const [rating, setRating] = useState({ licencePlate:'', description:'', stars:2, anonymous:false, img:'', username:'', userId:'', likedBy:'', seenBy:'' });
    const [errors, setErrors] = React.useState({});
    const [context , setContext]= useContext(Context)

    const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
    const [image, setImage] = useState(null)



    useEffect(() =>{
        (async () =>{
            const galleryStatus = await  ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermission(galleryStatus.status === 'granted')
        })()
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect: [4,3],
            quality:1,
        })

        if(!result.canceled){
            setImage(result.assets[0].uri)
        }
    }
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
        <View style={{ height:'100%', width:'100%' }}>
            <View style={styles.container}>
                <Input
                    onChangeText={text => handleOnchange(text, 'licencePlate')}
                    label="Licence Plate"
                    placeholder="Enter the licence plate"
                    placeholderTextColor={componentsColors.textPrimary}
                    onFocus={() => handleError(null, 'licencePlate')}
                    error={errors.licencePlate}
                />
                <Input
                    onChangeText={text => handleOnchange(text, 'description')}
                    label="Description"
                    placeholder="Enter a description"
                    placeholderTextColor={componentsColors.textPrimary}
                    onFocus={() => handleError(null, 'description')}
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
                <View style={{ }}>
                    <Button title={'Pick Image'} onPress={() => pickImage()}/>
                    { image && <Image source={{ uri:image }} style={ styles.image }/> }
                </View>
                <CustomRatingBar/>
                <Button title={ 'Post' } onPress={ postRating } />
            </View>
        </View>
    );
}

export default AddRating

const styles = StyleSheet.create({
    container: {
        height:"80%",
        flex: 1,
        marginTop:35,
        backgroundColor: componentsColors.backgroundColor,
        alignItems: 'center',
        justifyContent: "center"
    },
    starIcon:{
        fontSize:30,
        color:componentsColors.starColor
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
    image:{
        width: 300,
        height: 200
    }
});