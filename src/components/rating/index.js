import {StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {componentsColors} from "../../constants";
import RatingBar from "../ratingStars";
    const Rating = ( rating ) => {

    return(
        <View style={{ width: '100%', margin:5, backgroundColor:componentsColors.ratingBackgroundColor}}>
            {
                rating.anonymous?
                    <View style={ styles.head }>
                        <View style={{flexDirection:'row'}}>
                            <Icon name = 'account-box-outline' style={ styles.userIcon } ></Icon>
                            <View>
                                <Text style={ styles.username } >Anonymous</Text>
                                <Text style={ styles.datePosted } >{ rating.date } </Text>
                            </View>
                        </View>
                        <RatingBar stars = { rating.stars }/>
                    </View>:
                    <View style={ styles.head }>
                        <View style={{flexDirection:'row'}}>
                            <Icon name = 'account-box-outline' style={ styles.userIcon } ></Icon>
                            <View>
                                <Text style={ styles.username } >{ rating.user }</Text>
                                <Text style={ styles.datePosted } >{ rating.date } </Text>
                            </View>
                        </View>
                        <RatingBar stars = { rating.stars }/>
                    </View>
            }
            <Text style={ styles.licencePlate }>{ rating.licencePlate }</Text>
            <Text style={ styles.description }>{ rating.description }</Text>
            {
                rating.img &&
                    <Icon></Icon>
            }
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
    }
});