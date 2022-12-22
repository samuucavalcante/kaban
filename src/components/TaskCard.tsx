import React from 'react'
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';


const TaskInformation = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 15px;
  min-height: 106px;
  border-radius: 5px;
  max-width: 311px;
  background: white;
  margin-top: 15px;

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
  }
  /* .priority{ */
  /* margin-right: 12px; */
  /* align-self: center;
    svg{
      width: 12px !important;
      height: 12px !important;
      margin-right: 12px; */
  /* margin-top: 2px; */
  /* } */
  /* } */
`;

export type Item = {
  id: string
  task: string
  date: string 
}

type Props = {
  item: Item
  index: number
}
export const TaskCard: React.FC<Props> = ({ index, item }) => {
  console.log(item)
  return (
    <Draggable draggableId={item.id} key={item.id}   index={index}>
    {(provided) => (
      <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      >
        <TaskInformation>
          <p>{item.task}</p>
          <div className="secondary-details">
            <p>
              <span>
                {new Date(item.date).toLocaleDateString('en-us', {
                  month: 'short',
                  day: '2-digit',
                })}
              </span>
            </p>
          </div>
        </TaskInformation>
      </div>
    )}
  </Draggable>
  )
}
