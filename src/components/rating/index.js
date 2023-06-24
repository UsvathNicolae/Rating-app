import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {componentsColors} from "../../constants";
import RatingBar from "../ratingStars";
import {useContext, useState} from "react";
import {likedRatingService, updateRatingService} from "../../services/ratingServices";
import {Context} from "../../../App";
    const Rating = ( rating ) => {
        const [ context, setContext]= useContext(Context)

        const backgroundColor=rating.seen.includes(context.userID)? componentsColors.ratingBackgroundGray: componentsColors.ratingBackgroundBlue

        const [date, time] = rating.datePosted.split('T')

        const [like, setLike] = useState(rating.liked.includes(context.userID))

        const [numberOfLikes, setNumberOfLikes] = useState(rating.liked.length/2)

        const onLikePressed = async () =>{
            setLike(!like)
            await likedRatingService(rating.id, { userId: context.userID})
            if(!like){
                setNumberOfLikes(numberOfLikes+1)
            }else{
                setNumberOfLikes(numberOfLikes-1)
            }
        }
        return(
        <View style={{ width: '100%', margin:5, backgroundColor:backgroundColor}}>
            {
                rating.anonymous?
                    <View style={ styles.head }>
                        <View style={{flexDirection:'row'}}>
                            <Icon name = 'account-box-outline' style={ styles.userIcon } ></Icon>
                            <View>
                                <Text style={ styles.username } >Anonymous</Text>
                                <Text style={ styles.datePosted } >{ date + ' at ' + time.slice(0,-8) } </Text>
                            </View>
                        </View>
                        <RatingBar stars = { rating.stars } background = {backgroundColor}/>
                    </View>:
                    <View style={ styles.head }>
                        <View style={{flexDirection:'row'}}>
                            <Icon name = 'account-box-outline' style={ styles.userIcon } ></Icon>
                            <View>
                                <Text style={ styles.username } >{ rating.user }</Text>
                                <Text style={ styles.datePosted } >{ date + ' at ' + time.slice(0,-8) } </Text>
                            </View>
                        </View>
                        <RatingBar stars = { rating.stars } background = {backgroundColor}/>
                    </View>
            }
            <Text style={ styles.licencePlate }>{ rating.licencePlate }</Text>
            <Text style={ styles.description }>{ rating.description }</Text>
            {
                rating.img &&
                    <Icon></Icon>
            }
            <View style={{flexDirection:'row'}}>
                {!context.guestMode &&
                    <TouchableOpacity style={ {
                backgroundColor:backgroundColor,
                flexDirection:'row',
                width:70
            } } onPress = { onLikePressed }>
                <Icon style={{ fontSize:20, marginLeft:10, color:componentsColors.iconPrimary }} name={like? 'thumb-up': 'thumb-up-outline'}/>
                <Text style={ styles.text }>Like</Text>
            </TouchableOpacity>
                }
            <Text style={ styles.text }>{numberOfLikes} Likes</Text>
            </View>
        </View>
    )
}

export default Rating


const styles = StyleSheet.create({
    head:{
        //flex:0.2,
        width:'100%',
        marginTop:20,
        //marginLeft:20,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems:'center',
        justifyContent:'space-between'
    },
    container: {
        //flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userIcon: {
        color: componentsColors.textPrimary,
        fontSize: 45,
        marginRight: 10,
    },
    username:{
        fontSize: 15,
        color: componentsColors.textPrimary,

    },
    datePosted:{
        fontSize: 15,
        color: componentsColors.textPrimary,
    },
    licencePlate:{
        fontSize: 15,
        color: componentsColors.textPrimary,
    },
    description:{
        fontSize: 15,
        color: componentsColors.textPrimary,
    },
    text:{
        fontSize: 15,
        color: componentsColors.textPrimary,
    },

});