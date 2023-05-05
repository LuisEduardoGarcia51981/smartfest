import React from "react";
import {Text,StyleSheet} from 'react-native'
import theme from "../theme.js";
const styles=StyleSheet.create({
    text:{
        fontSize:theme.fontSizes.body,
        color:theme.colors.textPrimary,
        fontFamily:theme.fonts.main,
        fontWeight:theme.fontWeights.normal,

    },
    colorPrimary:{
        color:theme.colors.textPrimary,
    },
    colorSecundary:{
        color:theme.colors.textSecondary,
    },
    bold:{
        fontWeight:theme.fontWeights.bold,
    },   
    subHeading:{
        fontSize:theme.fontSizes.subheading,
    },
    small:{
        fontSize:10,
    },
    textAlignCenter:{
        textAlign:'center',
    },
    colorGreen:{
        color:theme.colors.green,
        fontWeight:theme.fontWeights.bold,
    },
})
export default function StyledText({lines,align,children, color, fontSize,fontWeight, style, ...restOfProps}){
    const textStyles=[
        styles.text,
        align==='center' && styles.textAlignCenter,
        color==='primary' && styles.colorPrimary,
        color=== 'secodary' && styles.colorSecundary,
        fontSize==='subheading' && styles.subHeading,
        fontWeight==='bold' && styles.bold,  
        fontWeight==='boldgreen' && styles.colorGreen,  
              
        style

    ]
    
    return (
        <Text style={textStyles}{...restOfProps} ellipsizeMode='tail' numberOfLines={1}>
            {children}
        </Text>
    )
}