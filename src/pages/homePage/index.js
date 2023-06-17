import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {ROUTES} from "../../constants";

const Home = ({navigation}) => {

    const onProfilePressed = () =>{
        navigation.navigate(ROUTES.PROFILE)
    }

    return (
        <View style={styles.container}>
            <Text onPress={onProfilePressed}>Go to profile</Text>
            <StatusBar style="auto" />
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
});