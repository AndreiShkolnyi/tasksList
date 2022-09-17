import React from 'react';
import moment from 'moment';


export const Task = ({task, onCheck, onDelete}) => { 
    return  (
                <div className="item" id={task.task.id}>
            
        <input 
        className="styled-checkbox" 
        id={`checkbox-${task.task.id}`}
        type="checkbox" 
        value="value1" 
        onClick={() => (onCheck(task.task.id))}
        />
        <label htmlFor={`checkbox-${task.task.id}`} />
        <div className="item__content">
          <b className={task.task.isCompleted === 'true' ? 'completed' : ''}>{task.task.title}</b>
          <p>
            {task.task.content}
          </p>
          <div className="item__bottom">
            <ul>
              <li>
                <svg style={{ width: 24, height: 24 }} viewBox="0 0 70 70">
                  <path d="M51,19h-4v-4h-4v4H27v-4h-4v4h-4c-2.209,0-4,1.791-4,4v28c0,2.209,1.791,4,4,4h32c2.209,0,4-1.791,4-4V23   C55,20.791,53.209,19,51,19z M51,51H19V31h32V51z M51,27H19v-4h32V27z" />
                  <rect height="4" width="4" x="35" y="35" />
                  <rect height="4" width="4" x="43" y="35" />
                  <rect height="4" width="4" x="35" y="43" />
                  <rect height="4" width="4" x="27" y="43" />
                </svg>
                <span>{moment(+task.task.date).format('lll')}</span>
              </li>
           { task.task.isCompleted !== 'true' ? (
             <>
             <li>
          <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {onDelete(task.task.id)}} width="16" height="16" fill="currentColor" className="bi bi-patch-check" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
  <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
</svg>
            </li>
             </>
           ) : <li className='success'>Completed</li>}
            </ul>
          </div>
        </div>
      </div>
    )
        
 }