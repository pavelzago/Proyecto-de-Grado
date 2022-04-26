import React from 'react';
//import './TodoList.css'

function MainMenu(props) {
  return (
    <section>
      <ul className="px-0">
        {props.children}
      </ul>
    </section>
  );
}

export { MainMenu };