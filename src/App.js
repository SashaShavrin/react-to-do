import React, { useState } from 'react';



function App() {
	const initNotes = [];
	const [notes, setNotes] = useState(initNotes);

	const [value1, setValue1] = useState('');
	const [value2, setValue2] = useState('');
	const [value3, setValue3] = useState('');
	const [value4, setValue4] = useState('');

	let date = new Date();
	let d = date.getDate();
	let m = date.getMonth() + 1;
	let y = date.getFullYear();
	let hours = date.getHours();
	let min = date.getMinutes()
	
	function getDate() {
		if(d<10){
			d='0'+d
		} 
		if(m<10){
			m='0'+m
		} 
	date = y+'-'+m+'-'+d;
		return date
	}

	function getTime() {
		if (min < 10) {
			min = '0' + min
		}
		let realTime = hours + ':' + min;
		document.getElementById("appt").setAttribute("min", realTime)
		return realTime
	}

	function today() {
		 if(d<10){
				d='0'+d
			} 
			if(m<10){
				m='0'+m
			} 
		date = y+'-'+m+'-'+d;
		document.getElementById("today").setAttribute("min", date);
		return date
	}

	function id() { 
		let d = new Date().getTime();//Timestamp
		let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			let r = Math.random() * 16;
			if(d > 0){
				r = (d + r)%16 | 0;
				d = Math.floor(d/16);
			} else {
				r = (d2 + r)%16 | 0;
				d2 = Math.floor(d2/16);
			}
			return (c === 'x' ? r : (r && 0x3 | 0x8)).toString(16);
		});
	}

	function remItem(id) {
		setNotes(notes.filter(note => note.id 
			!== id)); 	
	}

	function addItem() {
			let obj = {
				id: id(),
				name: value1,
				status: 'in process',
				task: value2,
				end: value3,
				endTime: value4,
				date: getDate(),
				time:getTime(),
			};
			
			let name = document.getElementById('nameTask');
			let taskReqeir = document.getElementById('taskReqeir');
			if (obj.name.length === 0 || obj.task.length === 0 || obj.end === '' || obj.endTime === '') {
				if (obj.name.length === 0) {
					name.value='Enter of name...';
					}
				if (obj.task.length === 0)	{
		        taskReqeir.value='Enter of description...';
				   }
				if (obj.end === '' && obj.endTime === '') {
				   }
			} else {
				setNotes([...notes, obj]);	
			}	
	}

	const handleChange = (event) => {
		let elem = event.target;
		
		if (elem.checked) {
			elem.nextSibling.innerHTML = ': done';
			elem.checked = false;
			elem.nextSibling.classList.toggle('item__stateAlarm')
		} else {
			elem.nextSibling.innerHTML = ': in process'
			elem.checked = true;
			elem.nextSibling.classList.remove('item__stateAlarm')
			elem.nextSibling.classList.toggle('item__stateNormal')
		}
	}


	const result = notes.slice(0).reverse().map(note => {
	 return <>
	   <div  className='task'>
	    <h2 className="item__name">Title : {note.name}</h2>
	    <div className="item" key={note.id}>
			<div className='item__info'>
			<button id={id()} className="item__status" checked={'true'} onClick={handleChange}>Status</button>
			<span className='item__state'>: in process</span>
			<div className="item__create">Creat to : {note.date} 
			  <span> {note.time}</span>
			</div>
			<div className="item__deadline">Deadline : {note.end} {note.endTime}</div>
	    </div>	
		<div className='item__description'>	
			<p>Task description:</p>
	        <textarea className='item__field'>{note.task}</textarea>
		</div>
		<button className='item__delete' onClick={() => remItem(note.id)}></button> 
	    </div>
	   </div>
	</>
	});
	
	return <>
	<button className="create-task" onClick={addItem}>Create task</button>
	<div className="create">
	  <div>
		<span>NAME TASK: </span>
		<input id='nameTask' className = "input" value={value1} onChange={event => setValue1(event.target.value)} placeholder="Enter of name..."/> 
	  </div>
	  <div>
		<span>TASK:</span> 
		<input id='taskReqeir' className = "input" value={value2} onChange={event => setValue2(event.target.value)} placeholder='Enter of description...'/> 
	  </div>
	  <div>
		<span>DEADLINE: </span>
		<input id="today" className = "input tcal" type="date" name="date"  min={today} value={value3}  onClick={today} onChange={event => setValue3(event.target.value)} /> 
		<input type="time" id="appt" className = "input appt" name="appt" min={getTime}  max="18:00" step="3600"  value={value4} onClick={getTime} required onChange={event => setValue4(event.target.value)}/>
	  </div>
    </div>
	{result}
	</>
}

export default App;