import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button , TextInput } from 'react-native';
import colors from "../colors";

class VerifyRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{flex:3, alignContent: "center"}}>
                <Text style={styles.tagtext}>Design Your Own Api</Text>
                </View>
                <View style={styles.btn}>
                <Button 
                    title="Swipe"
                    color={colors.red}
                />
                </View>
            </SafeAreaView>
        );
    }
}


export default VerifyRoutes;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft:20,
      paddingRight:20,
      paddingTop:20,
      backgroundColor: colors.white,
      flexGrow: 100,
    },
    textInput:{
      marginTop:5,
      marginBottom:5,
      padding: 10,
      height: 40,
      borderRadius:5,
      color: "#000000",
      borderColor: "#000000",
      borderWidth: 1,
    },
    tagtext:{
      color: colors.red,
      marginTop: 50,
      marginBottom: 100,
      fontSize: 50,
      fontWeight: "700",
    },
    btn:{
      flex:1,
      flexDirection: "row",
      justifyContent: "flex-end",
    }
});
  
