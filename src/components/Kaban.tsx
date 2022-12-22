import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { Item, TaskCard } from './TaskCard';
import styled from 'styled-components';

const data: Item[] = [
  {
    id: '1',
    task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.',
    date: '25-May-2020',
  },
  {
    id: '2',
    task: 'Fix Styling',
    date: '26-May-2020',
  },
  {
    id: '3',
    task: 'Handle Door Specs',
    date: '27-May-2020',
  },
  {
    id: '4',
    task: 'morbi',
    date: '23-Aug-2020',
  },
  {
    id: '5',
    task: 'proin',
    date: '05-Jan-2021',
  },
]

type Column = {
  [key: string]: {
    title: string
    items: Item[]
  }
}
const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;


export const columnsFromBackend: Column = {
  [uuidv4()]: {
    title: 'To-do',
    items: data,
  },
  [uuidv4()]: {
    title: 'In Progress',
    items: [],
  },
  [uuidv4()]: {
    title: 'Done',
    items: [],
  },
};


export const Kaban: React.FC = () => {
  const [columns, setColumns] = useState<Column>(columnsFromBackend)

  const onDragEnd = (result: DropResult, columns: Column, setColumns: React.Dispatch<React.SetStateAction<Column>>) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const onAddColumns = () => {
    setColumns(old => ({ ...old, [uuidv4()]: {
      items: [],
      title: 'teste'
    }}));
  }
  
  const onDeleteColumns = (id: string) => {
    setColumns(old => {
      const arry = Object.fromEntries(Object.entries(old).filter(([key, value]) => key !== id))
      return arry
    })
  }

  return (


    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
        <button onClick={onAddColumns}>ADICIONAR COLUNAS</button>
      <Container>
        <TaskColumnStyles>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Title>{column.title}</Title>
                      <button onClick={() => onDeleteColumns(columnId)}>X</button>
                    </div>
                    {column.items.map((item, index) => (
                      <TaskCard key={item.id} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            );
          })}
        </TaskColumnStyles>
      </Container>
    </DragDropContext>
  )

}
