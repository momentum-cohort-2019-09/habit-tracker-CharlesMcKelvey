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
console.log(delete_buttons)
for (let delete_button of delete_buttons) {
    delete_button.addEventListener('click', event => {
        event.preventDefault()
        fetch(`/delete_habit/${delete_button.dataset.habitpk}/`, {
            method: 'POST'
        }).then(res => res.json())
            .then(data => {
                if (data.ok) {
                    alert(`You have just deleted ${delete_button.dataset.habitname}`)
                    console.log(delete_button.dataset.habitpk)
                    document.querySelector(`habit${delete_button.dataset.habitpk}`).style.display = 'none'
                } else {
                    alert('For some reason, this cannot be deleted')
                }
            })
    })
}

let edit_buttons = document.querySelectorAll('.edit_btn')
for (let edit_button of edit_buttons) {
    edit_button.addEventListener('click', event => {
        event.preventDefault()
        habit_name = document.querySelector(`.habit_name-${edit_button.dataset.habitpk}`)
        habit_description = document.querySelector(`.habit_description-${edit_button.dataset.habitpk}`)
        habit_goal = document.querySelector(`.habit_goal-${edit_button.dataset.habitpk}`)
        edit_box = `
        <form id="edit_form">
            <p class="edit_closing_x">x</p>
            <label for="edit_habit">Name</label>
            <input type="text" value="${habit_name.innerText}">
            <label for="edit_habit">Goal</label>
            <input type="text" value="${habit_goal.innerText}">
            <label for="edit_habit">Description</label>
            <input type="text" value="${habit_description.innerText}">
            <button name="edit_habit" type="submit" id="edit_button">Edit Habit</button>
        </form>
        `

        document.appendChild(edit_box)

        document.querySelector('.edit_closing_x').addEventListener('click', event => {
            document.querySelector('#edit_form').style.display = 'none';
        })

        document.getElementById('edit_button').addEventListener('click', event => {
            fetch(`/edit_habit/${edit_button.dataset.habitpk}`, {
                method: 'POST'
            }).then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        alert('You just successfully edited a habit!')
                        document.getElementById('edit_button').style.display = 'none'

                    } else {
                        alert('For some reason, you cannot edit that habit')
                    }
                })
        })
    })
}

// ---------------- CHARTING SECTION ----------------
let ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Monday: Sept 7th, 2019', 'Tuesday: Sept 8th, 2019', 'Wednesday: Sept 9th, 2019', 'Thursday: Sept 10th, 2019', 'Friday: Sept 11th, 2019', 'Saturday: Sept 12th, 2019'],
        datasets: [{
            label: '# of Votes',
            data: [9000, 6000, 5000, 7000, 2000, 5500],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 5
        }, {
            label: '# of Steps',
            data: [/* Total sum per day here */ 1600, 4000, 7285, 1800, 2600, 4000],
            backgroundColor: [
                'blue',
                'lightyellow',
                'yellow',
                'red',
                'purple',
                'coral'
            ],
            borderColor: [
                'blue',
                'lightblue',
                'yellow',
                'red',
                'purple',
                'coral'
            ],
            borderWidth: 3
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

// add_habit = document.querySelector('.plus_sign')

// add_habit.addEventListerner('click', event => {

// })