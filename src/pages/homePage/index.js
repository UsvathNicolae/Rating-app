import React from "react";
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors, ROUTES} from "../../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Context} from "../../../App";
import {useContext, useState} from "react";
import Rating from "../../components/rating";

const Home = ({navigation}) => {

    const [ context, setContext]= useContext(Context)

    //const [ratings, setRatings] = useState([])

    const ratings = [
        {
            description: 'description1',
            username:'user1',
            id:1,
            img:'',
            anonymous:false,
            licencePlate:'TM 94 LIS',
            stars:2,
            date:'18-06-2023',
        },
        {
            description: 'description2',
            username:'user2',
            id:2,
            img:'',
            anonymous:true,
            licencePlate:'TM 13 DRW',
            stars:3,
            date:'18-06-2023',
        },
        {
            description: 'description3',
            username:'user1',
            id:3,
            img:'',
            anonymous:false,
            licencePlate:'TM 94 LIS',
            stars:5,
            date:'18-06-2023',
        },
    ];
    const onProfilePressed = () =>{
        navigation.navigate(ROUTES.PROFILE)
    }
    const addRating = () =>{
        navigation.navigate(ROUTES.ADD_RATING)
    }

    const search = () =>{}

    return (

        <View style={styles.container}>
            <View style={
                {
                    height:50,
                    alignSelf:'stretch',
                    margin:10,
                    marginTop:20,
                    flexDirection:'row',
                    justifyContent:'space-between'
                }
            }>
                <View style={{flexDirection:'row'}}>
                    <Icon name = 'account-box-outline' style={ styles.userIcon } onPress={onProfilePressed}></Icon>
                    <Text style={ styles.username } onPress={onProfilePressed}>{ context.user } </Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Icon name = 'magnify' style={ styles.userIcon } onPress={search}/>
                    <Button title='+ Create' onPress={ addRating }></Button>
                </View>
            </View>

            <ScrollView contentContainerStyle={ styles.scrollView }>
                {
                    ratings.map((rating, key) =>
                        <Rating
                            key = {rating.id}
                            description={rating.description}
                            user={rating.username}
                            img={rating.img}
                            anonymous={rating.anonymous}
                            licencePlate={rating.licencePlate}
                            stars={rating.stars}
                            date={rating.date}
                        />

                    )
                }
            </ScrollView>
        </View>
    );
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userIcon: {
        color: colors.darkBlue,
        fontSize: 35,
        marginRight: 10,
    },
    username:{
        fontSize: 22,
        color: colors.darkBlue,

    },
    scrollView:{
        //flex:1,
        //alignItems:'center',

        //width:'100%',
        //justifyContent:'center',
        //alignSelf:'stretch',
        backgroundColor:'grey',
        marginRight:15,
        marginLeft:15,
        marginTop:15
    }
});