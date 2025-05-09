import { JSX } from 'react'
import {View,Text,StyleSheet, TextStyle} from 'react-native'

interface Props{
    children: string
    ban?: boolean
    style?: TextStyle
}


const Hello = (props:Props):JSX.Element => {
    const {children, ban, style} = props
    return(
        <View>
            <Text style={[styles.text,style]}>
                Hello {children}{ban ===true ? "!" : ""}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        color:"#ffffff",
        backgroundColor:"blue",
        fontSize:40,
        fontWeight:"bold",
        padding:16
    }
})

export default Hello
