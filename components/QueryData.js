import colors from "../colors";
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Picker, ScrollView , TextInput, Alert, CheckBox} from 'react-native';

import { RadioButton } from 'react-native-paper';


class QueryData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      num: 1,
      value: [0],
      Routes: [],
     };
     this.changefields = this.changefields.bind(this);
  }
  changefields(data){
    var F = [];
    for(var i=0;i<this.state.Routes.length;i++){
      if(this.state.Routes[i].id != data.data.id){
        F.push(this.state.Routes[i]);
      }
    }
    F.push(data.data);
    this.setState({Routes : F},
       ()=>{
          // console.log(this.state.Routes)
        }
    );
  } 
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <View style={{flex:1, alignContent: "center"}}>
          <Text style={styles.tagtext}>Query over Routes</Text>
          <Text style={styles.tagtextsmall}>Query data from models</Text>
          
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
              key={v} 
              val={v} 
              models = {this.props.models}
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
              this.props.addRoutes(this.state.Routes);
              Alert.alert("Routed! Swipe");
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
      method:"POST",
      given : [],
      query: [],
     };
     this.setslelected = this.setslelected.bind(this);
  }
  setslelected(selected, field, table){
    var G = [];
    var S = [];
    for(var i=0;i<this.state.given.length;i++){
      if(this.state.given[i].model != table || this.state.given[i].field != field){
        G.push(this.state.given[i]);
      }
    }
    for(var i=0;i<this.state.query.length;i++){
        if(this.state.query[i].model != table || this.state.query[i].field != field){
          S.push(this.state.query[i]);
        }
    }
    if(selected != "NULL"){
        if(selected == "Given"){
            G.push({
                "model": table,
                "field": field
            })
        }
        else{
            S.push({
                "model": table,
                "field": field
            })
        }
    }
    this.setState({
      given: G,
      query: S,
    },()=>{
        // console.log("GIVEN",this.state.given);
        // console.log("SET",this.state.query);
      this.props.changefields({data : this.state}) 
    })
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
        <TextInput style={{flex:1}}
              style={styles.textInput}
              placeholder="URL"
              selectionColor={colors.blue}
              onChangeText={ (e) => { this.setState({Url:e},()=>{this.props.changefields({data : this.state});} ) } }
          ></TextInput>
        
        <Text style={{backgroundColor:colors.light_grey, padding:10, borderRadius:50,marginTop:5, marginBottom:5}}>
          Method type</Text>

        <Picker style={{flex:1 }} 
          selectedValue={this.state.method}
          onValueChange={
            (itemValue, itemIndex) => this.setState({method:itemValue},()=>{this.props.changefields({data : this.state});} )
          }
          >
          <Picker.Item label="GET" value="GET" />
          <Picker.Item label="POST" value="POST" />
        </Picker>   

        <View>
          { this.props.models.map( (m) => 
                <MakeBlocks 
                  key = {m.id}
                  table = {m}
                  val = {m.id}
                  setslelected={this.setslelected}
                />
             ) }
        </View>
      </View>     
    );
  }
}

class MakeBlocks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View>
                <Text style={{backgroundColor:colors.red, color:"white", fontWeight:"700", padding:10, borderRadius:50,marginTop:5, marginBottom:5}}>
                    {this.props.table.TableName}
                </Text>
                {
                    this.props.table.Fields.map( (f) =>
                        <RadioModels 
                            key = {f.id}
                            FieldName = {f.FieldName}
                            TableName = {this.props.table.TableName}
                            setslelected={this.props.setslelected}
                        />
                    )
                }
            </View>
        );
    }
}


class RadioModels extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      checked:"NULL"
     };
  }
  render() {
    return (
      <View style={{flexDirection: "row", flex:1, alignItems:"center"}}>
        <Text style={{flex:2,marginLeft:5,marginRight:5}} >{this.props.FieldName}</Text>
        <View style={{flexDirection:"row",alignItems:"center",flex:1,marginLeft:5,marginRight:15}}>
            <Text>Given</Text>
            <RadioButton
            value="Given"
            status={ this.state.checked === 'Given' ? 'checked' : 'unchecked' }
            onPress={() => {
                if(this.state.checked == "Given")
                this.setState({checked : "NULL"},()=>{
                    this.props.setslelected(this.state.checked, this.props.FieldName, this.props.TableName);
                })
                else this.setState({checked: 'Given'},()=>{
                    this.props.setslelected(this.state.checked, this.props.FieldName, this.props.TableName);
                })
            }}
            />
        </View>
        <View style={{flexDirection:"row",alignItems:"center",flex:1,marginLeft:15,marginRight:5}}>
            <Text >Query</Text>
            <RadioButton 
            value="Query"
            status={ this.state.checked === 'Query' ? 'checked' : 'unchecked' }
            onPress={() => {
                if(this.state.checked == "Query")
                this.setState({checked : "NULL"},()=>{
                    this.props.setslelected(this.state.checked, this.props.FieldName, this.props.TableName);
                })
                else this.setState({checked: 'Query'},()=>{
                    this.props.setslelected(this.state.checked, this.props.FieldName, this.props.TableName);
                })
            }}
            />
        </View>
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
      fontSize: 38,
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

export default QueryData;
