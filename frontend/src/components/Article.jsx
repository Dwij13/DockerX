import React from 'react';
import './Article.css';

const Article = () => {
  return (
    <div>

      <div className='list_heading'>
        DockersX's Dashboard
      </div>
      <div className='list_top'>
        <div className='list_item'>Container</div>
        <div className='list_item'>imageName</div>
        <div className='list_item'>status</div>
        <div className='list_item'>running</div>
        <div className='list_item'>ip address</div>
        <div className='list_item'>category</div>
      </div>
      <div className='list_group'>
        <div className='list_inner'>
          <div className='list_item'>user Slice</div>
          <div className='list_item'>skmsd</div>
          <div className='list_item'>start</div>
          <div className='list_item'>
          <div className='red_circle'></div>
          </div>
          <div className='list_item'>181.191.12.1</div>
          <div className='list_item'>username</div>
        </div>
      </div>
    </div>
  );
};

export default Article;
