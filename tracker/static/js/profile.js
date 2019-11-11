// console.log('Profile.js loaded')
// submit_habit = document.querySelector('.submit_habit')
// submit_habit.addEventListener('click', event => {
//     event.preventDefault()
//     fetch(`/add_habit/`, {
//         method: 'POST'
//     }).then(res => res.json())
//         .then(data => {
//             if (data.ok) {
//                 // Habit has been submitted successfully. Re-render the page so that the screen shows a new habit
//                 console.log(data)
//             } else {
//                 // Did not work, mark the fields as invalid 
//                 console.log(data)
//             }
//         })
// })

let c = 0
function habitPopUp() {
    if (c == 0) {
        document.getElementById('habit_form_container').style.display = 'block';
        c = 1
    } else {
        document.getElementById('habit_form_container').style.display = 'none';
        c = 0
    }
}

let delete_buttons = document.querySelectorAll('.delete_btn')
for (let delete_button of delete_buttons) {
    delete_button.addEventListener('click', event => {
        if (confirm('Are you sure you want to delete this habit? It will be deleted permanently.')) {
            event.preventDefault()
            fetch(`/delete_habit/${delete_button.dataset.habitpk}/`, {
                method: 'POST'
            }).then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        alert(`You have just deleted ${delete_button.dataset.habitname}`)
                    } else {
                        alert('For some reason, this cannot be deleted')
                    }
                })
            document.querySelector(`#habit-${delete_button.dataset.habitpk}`).style.display = 'none'
        }
    })
}

// let edit_buttons = document.querySelectorAll('.edit_btn')
// for (let edit_button of edit_buttons) {
//     edit_button.addEventListener('click', event => {
//         event.preventDefault()
//         habit_name = document.querySelector(`.habit_name-${edit_button.dataset.habitpk}`)
//         habit_description = document.querySelector(`.habit_description-${edit_button.dataset.habitpk}`)
//         habit_goal = document.querySelector(`.habit_goal-${edit_button.dataset.habitpk}`)
//         edit_box = `
//         <form id="edit_form">
//             <p class="edit_closing_x">x</p>
//             <label for="edit_habit">Name</label>
//             <input type="text" value="${habit_name.innerText}">
//             <label for="edit_habit">Goal</label>
//             <input type="text" value="${habit_goal.innerText}">
//             <label for="edit_habit">Description</label>
//             <input type="text" value="${habit_description.innerText}">
//             <button name="edit_habit" type="submit" id="edit_button">Edit Habit</button>
//         </form>
//         `

//         document.appendChild(edit_box)

//         document.querySelector('.edit_closing_x').addEventListener('click', event => {
//             document.querySelector('#edit_form').style.display = 'none';
//         })

//         document.getElementById('edit_button').addEventListener('click', event => {
//             fetch(`/edit_habit/${edit_button.dataset.habitpk}`, {
//                 method: 'POST'
//             }).then(res => res.json())
//                 .then(data => {
//                     if (data.ok) {
//                         alert('You just successfully edited a habit!')
//                         document.getElementById('edit_button').style.display = 'none'

//                     } else {
//                         alert('For some reason, you cannot edit that habit')
//                     }
//                 })
//         })
//     })
// }

// // add_habit = document.querySelector('.plus_sign')

// // add_habit.addEventListerner('click', event => {

// // })