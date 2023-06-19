import {StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useState} from "react";
import {colors} from "../../constants";

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
        color:colors.yellow
    },
    ratingBar:{

        flexDirection:'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});