import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[
        {name:"John C.", salary:800, increase: true, rise: true, id: 1},
        {name:"Alex M.", salary:700, increase: false, rise: false, id: 2},
        {name:"Carl W.", salary:1500, increase: false, rise: false, id: 3} 
      ]
    }
    this.maxId = 4;
  }

  deleteItem = (id) =>{
    this.setState(({data}) => {
      // const index = data.findIndex(elem => elem.id === id);
      return{
        data: data.filter(item =>item.id!==id)
      }
    })
  }

  addItem = (name, salary) =>{
      const newOne = {
        name,
        salary,
        increase: false,
        rise: false,
        id: this.maxId++
      }
      this.setState(({data}) => {
          const newArr = [...data, newOne];
          return {
              data: newArr
          }
      });
  }

  onToggleIncrease = (id) =>{
    // this.setState(({data})=>{
    //   const index = data.findIndex(elem => elem.id===id);

    //   const old = data[index];
    //   const newItem = {...old, increase: !old.increase};
    //   const newArr = [...data.slice(0, index), newItem, ...data.slice(index+1)];

    //   return{
    //     data: newArr
    //   }
    // })
    this.setState(({data})=>({
      data: data.map(item =>{
        if(item.id===id){
          return {...item, increase: !item.increase}
        }
        return item;
      })
    }))
  }

  onToggleRise = (id) =>{
    this.setState(({data})=>({
      data: data.map(item =>{
        if(item.id===id){
          return {...item, rise:!item.rise};
        }
        return item;
      })
    }))
  }

  render(){
    const employees = this.state.data.length;
    const increase = this.state.data.filter(item =>item.increase).length;
    return (
      <div className="app">
          <AppInfo employees={employees} increase={increase}/>
  
          <div className="search-panel">
              <SearchPanel/>
              <AppFilter/>
          </div>
          
          <EmployeesList data={this.state.data}
          onDelete={this.deleteItem}
          onToggleIncrease={this.onToggleIncrease}
          onToggleRise={this.onToggleRise}/>
          <EmployeesAddForm
          onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;
