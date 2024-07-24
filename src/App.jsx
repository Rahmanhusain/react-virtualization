import React from 'react';
import VirtualizedList from './VirtualizedList.jsx';

const App = () => {
  const items = Array.from({ length: 100000}, (_, index) => `Item ${index + 1}`);
  
  const renderItem = (item) => <div style={{display: 'flex',alignItems: 'center'}}>
    <div style={{ borderRadius: '50%', margin: '0 10px 0 0', border: '2px solid red',height: '45px',aspectRatio: '1',
      display: 'flex',alignItems: 'center',justifyContent: 'center'}}>{item.replace('Item ','')}</div>
    <h3>hey this is {item}</h3>
  </div>;

  return (
    <div>
      <h1>Virtualized List Example</h1>

     {/*  {
        items.map((val,ind)=>(
          renderItem(val)
        ))
      } */}

      <VirtualizedList items={items} itemHeight={70} renderItem={renderItem} />
    </div>
  );
};

export default App;
