
import React, { useEffect, useState } from 'react';

const Lists = () => {
    const [containers, setContainers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/containers')
          .then(response => response.json())
          .then(setContainers)
          .catch(console.error);
      }, []);
    
      const handleAction = (containerId, action) => {
        fetch(`http://localhost:3001/containers/${containerId}/${action}`, { method: 'POST' })
          .then(() => {
            // Refresh the containers list
            fetch('http://localhost:3001/containers')
              .then(response => response.json())
              .then(setContainers)
              .catch(console.error);
          })
          .catch(console.error);
      };
  return (
    <div>
        
    </div>
  )
}

export default Lists