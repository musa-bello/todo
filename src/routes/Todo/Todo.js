import React, { Component } from 'react'
import styled, {css} from 'styled-components'
import moment from 'moment';
import { TodoList } from './TodoList';

const Container = styled.div`

    /* height: 100%; */
    display: flex;
    justify-content: center;
    /* align-items: center; */
    /* background: #ccc; */
`;

const TodoCard = styled.div`
    background: transparent;
    min-width: 28vw;
    min-height: 40vh;
    border-radius: 40px;
    border-top: 60px solid #CC634F;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    padding: 0px;
    
    & .filter {
        display: flex;
        justify-content: space-between;
        margin-top: -18px;
        background: #f9f9f9;
        border-bottom: 1px solid #d8d8d8;
        /* height: 40px; */
        padding: 20px;
        
        & .filter-text{
            color: #CC634F;
        }
    }

    & .list {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px solid #d8d8d8;

        & .content{
            display: flex;
            p {
                margin: 0;
                padding: 0 10px;
                cursor: pointer;
            }
        }
    }
`;


const PrimaryButton = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    background: #86da83;
    border: none;
    ${props => 
        props.outline && css`
        border: 2px solid #f5f5f5;
        `
    };
    cursor: pointer;
    margin: 0 4px;
    
`;

const SecondaryButton = styled(PrimaryButton)`
    background: #8f83da;
    ${props => 
        props.outline && css`
        border: 2px solid #dedede;
        `
    };
`;
const DateText = styled.div`
    text-align: center;
    color: #fff;
    position: relative;
    top: -40px;
 
`;

const AddTodo = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    & .content{
            /* display: flex; */
            & input {
                margin: 0 10px;
                padding: 0 10px;
                line-height: 2.5;
                border: none;
                 ::placeholder{
                    color: #b3b3b3;
                }
            }

            span {
                color: #CC634F;
                font-size: 1.5rem;
            }
        }
`;

export class Todo extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         todoText:'',
         todoColor: '',
         primaryColor: false,
         secondaryColor: false,
         primaryOutline: false,
         secondaryOutline: false,
         addPrimary: false,
         addSecondary: false,
         todoData: [],
         toggleFilter: false

      }
    }
    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleOutline = (e) => {
        const {
            primaryOutline, 
            secondaryOutline, 
            addPrimary, 
            addSecondary, 
            toggleFilter
        } = this.state
        const todoList = JSON.parse(localStorage.getItem('todo'));

        let colors = {
            primaryColor: '#86da83',
            secondaryColor: '#8f83da'
        }
        switch (e.key) {
            
            case 1:
                let filterPrimary = todoList?.length > 0
                filterPrimary = todoList.filter(item => {
                    return item.todoColor === colors.primaryColor
                })
                this.setState({
                    primaryOutline: !primaryOutline, 
                    secondaryOutline: false, 
                    filter: filterPrimary, 
                    toggleFilter: !toggleFilter
                })
                break;
            case 2:
                let filterSecondary = todoList?.length > 0
                filterSecondary = todoList.filter(item => {
                    return item.todoColor === colors.secondaryColor
                })
                this.setState({
                    secondaryOutline: !secondaryOutline, 
                    primaryOutline: false,
                    filter: filterSecondary, 
                    toggleFilter: !toggleFilter
                })
                break;
            case 3:
                this.setState({addPrimary: !addPrimary, addSecondary: false, todoColor: colors.primaryColor})
                break;
            case 4:
                this.setState({addSecondary: !addSecondary, addPrimary: false, todoColor: colors.secondaryColor})
                break;
            default:
        }
    }

    handleAdd = (e) => {
        const { todoText, todoColor } = this.state
        const todoList = JSON.parse(localStorage.getItem('todo'));
        if (todoText=== '') {
            alert("You must enter to-do item")   
        } else if (todoColor==='') {
            alert("You must select to-do color") 
        } else {
             let data = {
                todoText,
                todoColor,
                completed: false
            }
            if (todoList?.length > 0) {
                todoList.push(data)
                localStorage.setItem('todo', JSON.stringify(todoList))
                this.setState({todoText: '', todoColor: '', addPrimary: false, addSecondary: false})
            } else {
                let todo = []
                todo.push(data)
                localStorage.setItem('todo', JSON.stringify(todo))
                this.setState({todoText: '', todoColor: '', addPrimary: false, addSecondary: false})
            }
            
        }

    }

    render() {
        const { 
            todoText, 
            primaryOutline, 
            secondaryOutline, 
            addPrimary,  
            addSecondary,
            filter,
            toggleFilter
        } = this.state
        const currentDay = moment().format('ddd');
        const currentDate = moment().format("MMM Do YYYY"); 
        let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        const today = days.includes(currentDay) ? "Today" : null
        const todoList = JSON.parse(localStorage.getItem('todo'));
        return (
        <Container>
            <TodoCard>
                <DateText>{today }, {currentDay } {currentDate} </DateText>
                
                <div className='filter'>
                    <div className='filter-text'>{toggleFilter ? 'Filtering and showing' : 'Showing '} 
                        {toggleFilter ? filter.length : todoList ? todoList.length : 0 } tasks
                    </div>
                    <div>
                        <PrimaryButton outline={primaryOutline} onClick={()=>this.handleOutline({key:1})} />
                        <SecondaryButton outline={secondaryOutline} onClick={()=>this.handleOutline({key:2})}/>
                    </div>
                </div>
                <TodoList 
                    todoData={toggleFilter ? filter : todoList}
                />
              
                <AddTodo>
                        <div className='content'>
                            <span>+</span>
                            <input 
                                type='text' 
                                name='todoText' 
                                value={todoText} 
                                placeholder='Add a task' 
                                onChange={this.handleChange} 
                                onKeyPress={(e)=> e.key=== 'Enter' && this.handleAdd(e)}
                            />
                        </div>
                        <div>
                            <PrimaryButton outline={addPrimary} onClick={()=>this.handleOutline({key:3})} />
                            <SecondaryButton outline={addSecondary} onClick={()=>this.handleOutline({key:4})} />
                        </div>
                    
                </AddTodo>
            </TodoCard>
        </Container>
        )
    }
}

export default Todo