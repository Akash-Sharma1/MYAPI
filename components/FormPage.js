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
import UpdateData from './UpdateData';
import DeleteData from './DeleteData';
import QueryData from './QueryData';
import VerifyModels from './VerifyModels';
import VerifyRoutes from './VerifyRoutes';

export default class App extends React.Component {
    constructor(props){
        super(props);
        
        this.UpdateCaraousal = this.UpdateCaraousal.bind(this);
        this.UpdateModel = this.UpdateModel.bind(this);
        this.AddCrudpages = this.AddCrudpages.bind(this);
        this.addRoutes = this.addRoutes.bind(this);
        this.deleteRoutes = this.deleteRoutes.bind(this);
        this.updateRoutes = this.updateRoutes.bind(this);
        this.queryRoutes = this.queryRoutes.bind(this);
        this.MakeAPI = this.MakeAPI.bind(this);

        this.state = {
            activeIndex:0,

            ProjectName: "",
            Databaseinfo: {
              Num_tables:"0"
            },
            Models: [],
            AddDataRoutes : [],
            UpdateDataRoutes : [],
            QueryDataRoutes : [],
            DeleteDataRoutes : [],

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
      })
    }

    AddCrudpages(){
      var st = (2 + parseInt(this.state.Databaseinfo.Num_tables));
      var F = [];
      for(var i=0;i<st;i++){
        F.push(this.state.carouselItems[i]);
      }

      F.push(
        <AddData models={this.state.Models} addRoutes={this.addRoutes}/>
      );
      F.push(
        <UpdateData models={this.state.Models} addRoutes={this.updateRoutes}/>
      );
      F.push(
        <DeleteData models={this.state.Models} addRoutes={this.deleteRoutes}/>
      );
      F.push(
        <QueryData models={this.state.Models} addRoutes={this.queryRoutes}/>
      );
      
      F.push(
        <VerifyRoutes Data={{
            AddDataRoutes : this.state.AddDataRoutes,
            UpdateDataRoutes : this.state.UpdateDataRoutes,
            QueryDataRoutes : this.state.QueryDataRoutes,
            DeleteDataRoutes : this.state.DeleteDataRoutes,
          }} proceed={this.MakeAPI}/>
      )

      this.setState({
        carouselItems : F
      })
    }

    MakeAPI(){
      return;
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
      F.push(
        <VerifyModels Data={{
            ProjectName: this.state.ProjectName,
            Databaseinfo: this.state.Databaseinfo,
            Models: this.state.Models,
          }} proceed={this.AddCrudpages}/>
      )
      this.setState({
        carouselItems : F
      })
    }

    addRoutes(R){
      // console.log(R);
      this.setState({
        AddDataRoutes : R
      })
    }
    deleteRoutes(R){
      // console.log(R);
      this.setState({
        UpdateDataRoutes : R
      })
    }
    updateRoutes(R){
      //  console.log(R);
      this.setState({
        DeleteDataRoutes : R
      })
    }
    queryRoutes(R){
      // console.log(R);
      this.setState({
        QueryDataRoutes : R
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