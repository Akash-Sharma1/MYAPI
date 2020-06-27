import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button , Alert } from 'react-native';
import colors from "../colors";

class VerifyModels extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            ErrorLog : "Waiting for the results please wait..."
         };
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{flex:3, alignContent: "center"}}>
                <Text style={styles.tagtext}>Quick check</Text>
                <View style={{
                    borderWidth:1,
                    borderRadius:5,
                    padding:10,
                    marginBottom:20,
                }}>
                    <Text style={{ color:colors.yellow, fontWeight:"700" }}>Error Logs:</Text>
                    <Text>
                        {this.state.ErrorLog}
                    </Text>
                </View>
                <View style={{
                    borderWidth:1,
                    borderRadius:5,
                    padding:10,
                    margintop:10,
                }}>
                    <Text style={{ color:colors.yellow, fontWeight:"700" }}>Instructions:</Text>
                    <Text style={{color:"#fff"}}>
                        You can press the "Ready?" button to unlock remaining steps.
                        In the next few steps you will define urls to manage your data.
                        the routes will be created accordingly, note: "Given" keyword means that you have to provide
                        the data so that a particular record is selected (in update, delete and querying the data), if you haven't selected anything in given. 
                        By deafult all of the records in the tables are selected.
                    </Text>
                </View>
                </View>
                <View style={styles.btn}>
                <Button 
                    title="Ready?"
                    color={colors.blue}
                    onPress={()=>{
                        Alert.alert("Unlocked");
                        this.props.proceed();}
                    }
                />
                </View>
            </SafeAreaView>
        );
    }
}

export default VerifyModels;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft:20,
      paddingRight:20,
      paddingTop:20,
      backgroundColor: colors.red,
      flexGrow: 100,
    },
    tagtext:{
      color: "white",
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
  
