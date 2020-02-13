console.log('Habit.js loaded')

delete_buttons = document.querySelectorAll('.delete_record')
for (let delete_button of delete_buttons) {
    delete_button.addEventListener('click', event => {
        event.preventDefault()
        if (confirm('This will delete this record. Are you sure?')) {
            fetch(`/delete_record/${delete_button.dataset.recordpk}/`, {
                method: 'POST'
            }).then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        alert('Record successfully deleted')
                        document.querySelector(`#record-${delete_button.dataset.recordpk}`).style.display = 'none';
                    } else {
                        alert('For some reason, record could not be deleted.')
                    }
                })
        }
    })
}

// edit_buttons = document.querySelectorAll('.edit_record')
// for (let edit_button of edit_buttons) {

//     // HIDING CURRENT VERSION AND SHOWING EDITABLE VERSION
//     edit_button.addEventListener('click', event => {
//         event.preventDefault()
//         document.querySelector(`#record-${edit_button.dataset.recordpk}`).style.display = 'none'
//         document.querySelector(`#edit_record_form_${edit_button.dataset.recordpk}`).style.display = 'flex'
//     })
//     // FOR WHEN THE USER MOVES ON TO THE NEXT THING
//     document.querySelector(`#record-${edit_button.dataset.recordpk}`).addEventListener('focusout', event => {
//         event.preventDefault()
//         document.querySelector(`#record-${edit_button.dataset.recordpk}`).style.display = 'flex'
//         document.querySelector(`#edit_record_form_${edit_button.dataset.recordpk}`).style.display = 'none'
//     })
//     // FOR FORM SUBMISSION
//     document.querySelector(`#submit_record_${edit_button.dataset.recordpk}`).addEventListener('click', event => {
//         event.preventDefault()
//         if (confirm('This will add a habit. Are you sure?')) {
//             fetch(`/edit_record/${edit_button.dataset.recordpk}/`, {
//                 method: 'POST'
//             }).then(res => res.json())
//                 .then(data => {
//                     if (data.ok) {
//                         alert('Successfully edited a record!')
//                     } else {
//                         alert('For some reason, the record could not be edited.')
//                     }
//                 })
//         }

//     })
// }
