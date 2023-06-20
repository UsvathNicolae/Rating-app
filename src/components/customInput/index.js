import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {componentsColors} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Input = ({
                   label,
                   iconName,
                   error,
                   password,
                   onFocus = () => {},
                   ...props
               }) => {
    const [hidePassword, setHidePassword] = React.useState(password);
    const [isFocused, setIsFocused] = React.useState(false);
    return (
        <View style={{marginBottom: 15}}>
            {label&&
                <Text style={style.label}>{label}</Text>
            }
            <View
                style={[
                    style.inputContainer,
                    {
                        borderColor: error ?
                            componentsColors.error
                            : isFocused?
                                componentsColors.textPrimary
                                : componentsColors.textPrimary,
                        alignItems: 'center',
                    },
                ]}>
                {iconName &&
                    <Icon
                        name={iconName}
                        style={style.icon}
                    />
                }

                <TextInput
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={hidePassword}
                    style={{color: componentsColors.textPrimary}}
                    {...props}
                />
                {password && (
                    <Icon
                        onPress={() => setHidePassword(!hidePassword)}
                        name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                        style={{color: componentsColors.iconPrimary, fontSize: 22, position: 'absolute', right: 20}}
                    />
                )}
            </View>
            {error && (
                <Text style={ style.error }>
                    {error}
                </Text>
            )}
        </View>
    );
};

const style = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: componentsColors.labels,
    },
    inputContainer: {
        height: 55,
        backgroundColor: componentsColors.inputBackground,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
    },
    icon: {
        color: componentsColors.iconPrimary,
        fontSize: 22,
        marginRight: 10
    },
    error:{
        marginTop: 7,
        color: componentsColors.error,
        fontSize: 12
    }
});

export default Input;