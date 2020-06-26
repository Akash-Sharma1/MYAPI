import colors from "../colors";
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Picker, ScrollView , TextInput, Alert} from 'react-native';




class AddData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      num: 1,
      value: [0],
     };
     this.changefields = this.changefields.bind(this);
  }
  changefields(data){
    var F = [];
    for(var i=0;i<this.state.Fields.length;i++){
      if(this.state.Fields[i].id != data.data.id){
        F.push(this.state.Fields[i]);
      }
    }
    F.push(data.data);
    this.setState({Fields : F},
       ()=>{
        //  console.log(this.state.Fields)
        }
    );
  } 
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <View style={{flex:1, alignContent: "center"}}>
          <Text style={styles.tagtext}>Create Routes</Text>
          <Text style={styles.tagtextsmall}>Add Data to models</Text>
          
        <View style={{flex:1, alignContent: "center" }}>

          <View style={{ flex:1, flexDirection:"row",marginBottom:10}}>
            <View style={{ flex:4, marginRight:5 }} >
            <TextInput
              style={styles.textInput}
              value= {(this.state.num != 0) ? this.state.num.toString() : ""}
              placeholder="Number of Routes"
              selectionColor={colors.blue}
              onChangeText={ (e) => {
                if(e=="")e = "0";
                  e = parseInt(e);
                  this.setState({num:e})
              } }
            ></TextInput>

            </View>
            <View style={{ flex:2 , marginTop:8}} >
              <Button 
                title="Routes"
                color={colors.red}
                onPress={()=>{
                    var cols = [];
                    for(var i=0;i<this.state.num;i++){
                      cols.push(i);
                    }
                    this.setState({
                      value: cols
                    });
                }}
              />
            </View>
          </View>
          

          <View style={{flex:5}}>
            {this.state.value.map( (v) => <Onecol 
              key={v.toString()} 
              val={v.toString()} 
              changefields = {this.changefields}
            /> )}
          </View>

          <View style={{
            flex:1,marginBottom:50,marginTop:50
          }}>
          <Button
            title="Submit"
            color={colors.red}
            onPress={()=>{
              this.props.addtable({
                id : this.props.table_num,
                TableName: this.state.Table_name,
                Fields: this.state.Fields
              });
              Alert.alert("Added!!\nYou can swipe now...");
            }}
          />
        </View>
        </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

class Onecol extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      id: this.props.val,
      Url: "",
      Data_method:"Integer",
      default : "None"
     };
  }
  render() {
    return (
      <View style={{flex:1,
          borderWidth:1,
          backgroundColor: "#fff",
          borderRadius:20,
          padding:30,
          marginBottom:10,
        }} >
        <Text style={{backgroundColor:colors.light_grey, padding:10, borderRadius:10,marginTop:5, marginBottom:5}}>Field Number {this.props.val}</Text>
        <TextInput style={{flex:1}}
              style={styles.textInput}
              placeholder="Field name"
              selectionColor={colors.blue}
              onChangeText={ (e) => { this.setState({FieldName:e},()=>{this.props.changefields({data : this.state});} ) } }
          ></TextInput>
        <Text style={{backgroundColor:colors.light_grey, padding:10, borderRadius:50,marginTop:5, marginBottom:5}}>Data Type</Text>
        <Picker style={{flex:1 }} 
          selectedValue={this.state.selectedValue}
          onValueChange={
            (itemValue, itemIndex) => this.setState({selectedValue:itemValue},()=>{this.props.changefields({data : this.state});} )
          }
          >
          <Picker.Item label="Integer" value="Integer" />
          <Picker.Item label="Text" value="Text" />
          <Picker.Item label="Decimal" value="Decimal" />
          <Picker.Item label="Date" value="Date" />
          <Picker.Item label="Time" value="Time" />
        </Picker>

        <Text style={{backgroundColor:colors.light_grey, padding:10, borderRadius:50,marginTop:5, marginBottom:5}}>Constraints</Text>

        <Picker style={{flex:1 , marginTop:5, marginBottom:5}}
          selectedValue={this.state.selectedValuekey1}
          onValueChange={
            (itemValue, itemIndex) => this.setState({selectedValuekey1:itemValue},()=>{this.props.changefields({data : this.state});} )
          }
          >
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Unique" value="Unique" />
          <Picker.Item label="Primary Key" value="Primary Key" />
          <Picker.Item label="Not Null" value="Not Null" />
        </Picker>
        <Picker style={{flex:1 , marginTop:5, marginBottom:5}}
          selectedValue={this.state.selectedValuekey2}
          onValueChange={
            (itemValue, itemIndex) => this.setState({selectedValuekey2:itemValue},()=>{this.props.changefields({data : this.state});} )
          }
          >
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Unique" value="Unique" />
          <Picker.Item label="Primary Key" value="Primary Key" />
          <Picker.Item label="Not Null" value="Not Null" />
        </Picker>
        <Picker style={{flex:1 , marginTop:5, marginBottom:5}}
          selectedValue={this.state.selectedValuekey3}
          onValueChange={
            (itemValue, itemIndex) => this.setState({selectedValuekey3:itemValue},()=>{this.props.changefields({data : this.state});} )
          }
          >
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Unique" value="Unique" />
          <Picker.Item label="Primary Key" value="Primary Key" />
          <Picker.Item label="Not Null" value="Not Null" />
        </Picker>
      
        <Text style={{backgroundColor:colors.light_grey, padding:10, borderRadius:50,marginTop:5, marginBottom:5}}>Default</Text>
        <TextInput style={{flex:1}}
              style={styles.textInput}
              placeholder="None"
              selectionColor={colors.blue}
              onChangeText={ (e) => { this.setState({default:e},()=>{this.props.changefields({data : this.state});} ) } }
          ></TextInput>
      </View>     
    );
  }
}

const styles = StyleSheet.create({
  scrollView:{
    paddingRight:20,
  },
    container: {
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
      marginBottom: 10,
      fontSize: 50,
      fontWeight: "700",
    },
    tagtextsmall:{
        color: "black",
        marginTop: 10,
        marginBottom: 30,
        fontSize: 25,
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
    },viewHolder:
    {
        height: 55,
        backgroundColor: '#26A69A',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },

    text:
    {
        color: 'white',
        fontSize: 25
    },

    btn:
    {
        position: 'absolute',
        right: 25,
        bottom: 25,
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 15
    },

    btnImage:
    {
        resizeMode: 'contain',
        width: '100%',
        tintColor: 'white'
    }
});

export default AddData;
