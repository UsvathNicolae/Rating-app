import React, {useEffect} from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {colors, ROUTES} from "../../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Context} from "../../../App";
import {useContext, useState} from "react";
import Rating from "../../components/rating";
import {getRatingsService, setSeenRatingsService} from "../../services/ratingServices";

const Home = ({navigation}) => {

    const [ context, setContext]= useContext(Context)

    const [isSearching, setIsSearching] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchPressed, setSearchPressed] = useState(false)
    const [ratings, setRatings] = useState([])
    const [ratingError, setRatingError] = useState(null)


    useEffect(() => {
        fetchRatings()
            .then(() => {})


    },[searchPressed])

    const fetchRatings = async () => {
        if (searchText) {
            await getRatingsService( {licencePlate: searchText})
                .then(async (response) => {
                    if (response) {
                        setRatings(response)
                        await setSeenRatingsService({userId: context.userID})
                    } else {
                        throw new Error("Failed to fetch ratings")
                    }
                })
                .catch((err) => {
                    setRatingError(err.message)
                })
        } else {
            await getRatingsService()
                .then(async (response) => {
                    if (response) {
                        setRatings(response)
                        await setSeenRatingsService({ userId: context.userID})
                            .then((res)=>{
                                console.log(res)})
                    } else {
                        throw new Error("Failed to fetch ratings")
                    }
                })
                .catch((err) => {
                    setRatingError(err.message)
                })
        }
    }


    const onProfilePressed = () =>{
        navigation.navigate(ROUTES.PROFILE)
    }
    const addRating = () =>{
        navigation.navigate(ROUTES.ADD_RATING)
    }

    const handleOnchange = (text) => {
        setSearchText(text);
    };
    const search = () =>{
        setIsSearching(!isSearching)
        if(isSearching){
            setSearchPressed(!searchPressed)
        }
    }


    return (

        <View style={ styles.container }>
            {
                !context.guestMode &&
                <View style={
                {
                    height: 50,
                    alignSelf: 'stretch',
                    margin: 10,
                    marginTop: 45,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }
            }>
                <View style={{flexDirection: 'row'}}>
                    <Icon name='account-box-outline' style={styles.userIcon} onPress={onProfilePressed}></Icon>
                    <Text style={styles.username} onPress={onProfilePressed}>{context.user} </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    {
                        isSearching &&
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            value={searchText}
                            onChangeText={text => handleOnchange(text)}
                        />
                    }
                    <Icon name='magnify' style={styles.userIcon} onPress={search}/>
                    <TouchableOpacity style={styles.button} onPress={addRating}>
                        <Text style={styles.buttonText}>+ Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
            }

            <ScrollView style={styles.scrollView}>
                {
                    ratings.map((rating, key) =>
                        <Rating
                            key={rating.id}
                            id={rating.id}
                            description={rating.description}
                            user={rating.username}
                            img={rating.img}
                            anonymous={rating.anonymous}
                            licencePlate={rating.licencePlate}
                            stars={rating.stars}
                            datePosted={rating.createdAt}
                            liked={rating.likedBy}
                            seen={rating.seenBy}
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
        width:'90%',
        paddingHorizontal:10,
        //justifyContent:'center',
        //alignSelf:'stretch',
        marginRight:15,
        marginLeft:15,
        marginTop:15
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
    },
});