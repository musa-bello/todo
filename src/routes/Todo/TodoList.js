import React from 'react'
import CheckboxComponent from '../../components/Checkbox'
import styled from 'styled-components';

const ColorCode = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 5px;
    background: ${props => props.color ? props.color : props.color};

`;

export const TodoList = ({
    todoData = [],
}) => {
    const updateTodo = (todo, index) => {
        const todoList = JSON.parse(localStorage.getItem('todo'));
        let newUpdate = todoList.map((item, itemIndex) =>{
            if (itemIndex === index)
            return {
                todoText: item.todoText,
                todoColor: item.todoColor,
                completed: !item.completed
            }
            return item
        })
        localStorage.setItem('todo', JSON.stringify(newUpdate))
    }
  return (
    <>
        {
            todoData?.length > 0 ? (
                todoData.map((item, index) => {
                    return (
                        <div className='list' key={index}>
                            <div className='content'>
                                <CheckboxComponent disabled checked={item.completed}/>
                                <p onClick={()=>updateTodo(item, index)}>{item.todoText}</p>
                            </div>
                            <ColorCode color={item.todoColor}/>
                        </div>
                    )
                })
            ) : (
                <div className='list'>
                    <div className='content'>
                        <p>No todo added</p>
                    </div>
                </div>
            )
        }
    </>
  )
}
