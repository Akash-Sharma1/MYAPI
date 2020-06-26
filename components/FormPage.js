import * as React from 'react';
import { Text,  View,  SafeAreaView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import colors from '../colors'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import ProjectNamePage from './ProjectNamePage';
import CreateDatabases from './CreateDatabases';
import CreateModels from './CreateModels';
import AddData from './AddData';

export default class App extends React.Component {
    constructor(props){
        super(props);
        
        this.UpdateCaraousal = this.UpdateCaraousal.bind(this);
        this.UpdateModel = this.UpdateModel.bind(this);
        this.AddCrudpages = this.AddCrudpages.bind(this);

        this.state = {
            activeIndex:0,
            ProjectName: "",
            Databaseinfo: {},
            Models: [],
            carouselItems: [
                <ProjectNamePage changeprojectname={(e) => this.setState({ProjectName:e})} /> ,
                <CreateDatabases addinfo={(e) => {
                  this.setState({Databaseinfo : e},()=>{ 
                      this.UpdateCaraousal(this.state.Databaseinfo.Num_tables)
                    });
                  }
                } />
            ]
        }
    }

    UpdateModel(data){
      var M = [];
      for(var i=0;i<this.state.Models.length;i++){
        if(this.state.Models[i].id != data.id){
          M.push(this.state.Models[i]);
        }
      }
      M.push(data);
      this.setState({
        Models : M
      }, ()=>{
        // console.log(this.state.Models);
        if(this.state.Models.length == this.state.Databaseinfo.Num_tables){
          this.AddCrudpages();
        }
      })
    }

    AddCrudpages(){
      var st = 2 + this.state.Databaseinfo.Num_tables;
      var F = [];
      for(var i=0;i<st;i++ ){
        F.push(this.state.carouselItems[i]);
      }
      //to be continued from here
      F.push(
        <AddData model={this.state.Models}/>
      );
      this.setState({
        carouselItems : F
      })
      console.log("here");
    }

    UpdateCaraousal(num){
      num=parseInt(num);
      var F = [];
      F.push(this.state.carouselItems[0]);
      F.push(this.state.carouselItems[1]);
      for(var i=0;i<num;i++){
        F.push(
          <CreateModels table_num={i}  addtable={this.UpdateModel} />
        )
      }
      this.setState({
        carouselItems : F
      })
    }


    _renderItem({item,index}){
        return (
          <View style={{
                height: windowHeight+50,
                width: windowWidth,
            }}>
            {item}
          </View>
        )
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1, backgroundColor: colors.gray ,}}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={windowWidth}
                  itemHeight = {windowHeight}
                  itemWidth={windowWidth}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </SafeAreaView>
        );
    }
}