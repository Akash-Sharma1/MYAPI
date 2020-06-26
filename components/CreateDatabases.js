import colors from "../colors";
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button , TextInput,Alert} from 'react-native';


class CreateDatabases extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      Db: "",
      User: "",
      Host: "",
      Password: "",
      Num_tables: "",  
    };
  }
  changefields(data){
    var F = [];
    for(var i=0;i<this.state.Fields.length;i++){
      if(this.state.Fields[i].id != data.data.id){
        F.push(this.state.Fields[i]);
      }
    }
    F.push(data.data);
    this.setState({Fields : F});
  } 
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex:3, alignContent: "center"}}>
          <Text style={styles.tagtext}>Create Database</Text>
          <View >
            <TextInput
              style={styles.textInput}
              placeholder="Database Name"
              selectionColor={colors.blue}
              onChangeText={(e) => this.setState({ Db: e})}
            ></TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="User"
                selectionColor={colors.blue}
                onChangeText={(e) => this.setState({ User: e})}
            ></TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                selectionColor={colors.blue}
                onChangeText={(e) => this.setState({ Password: e})}
            ></TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Host"
                selectionColor={colors.blue}
                onChangeText={(e) => this.setState({ Host: e})}
            ></TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Number of tables required"
                selectionColor={colors.blue}
                onChangeText={(e) => this.setState({ Num_tables: e})}
            ></TextInput>
          </View>
        </View>
        <View style={styles.btn}>
          <Button
            title="Confirm"
            color={colors.red}
            onPress={()=>{
              this.props.addinfo(this.state);
              Alert.alert("Created");
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      paddingRight:20,
      flex: 1,
      paddingLeft:20,
      paddingTop:20,
      backgroundColor: colors.yellow,
      flexGrow: 100,
    },
    textInput:{
      backgroundColor:"#fff",
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
      color: "black",
      marginTop: 50,
      marginBottom: 50,
      fontSize: 50,
      fontWeight: "700",
    },
    addbtn:{
      marginTop:10,
      marginBottom:10,
    },
    btn:{
      flex:1,
      flexDirection: "row",
      justifyContent: "flex-end",
    }
});

export default CreateDatabases;
