import {StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useState} from "react";
import {componentsColors} from "../../constants";

const RatingBar = (props) => {
    const [maxStars, setMaxStars] = useState([1,2,3,4,5])
    return(
        <View style={ styles.ratingBar}>
            {
                maxStars.map((item,key)=>{
                    return(
                        <Icon
                            key = { item }
                            style={ styles.starIcon }
                            name={ item<=props.stars? 'star': 'star-outline'}></Icon>
                    )
                })
            }
        </View>
    )
}
export default RatingBar

const styles = StyleSheet.create({
    starIcon:{
        fontSize:20,
        color:componentsColors.starColor
    },
    ratingBar:{
        flexDirection:'row',
        backgroundColor: componentsColors.ratingBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    }
});