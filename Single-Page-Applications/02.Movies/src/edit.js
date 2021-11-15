import {showDetails} from './details.js';
import {e, showView} from './dom.js';


export function showEdit(id) {
    const section = document.querySelector('#edit-movie');
    const form = section.querySelector('form');
    form.addEventListener('submit', onSubmit);
    section.remove();
    showView(section);

    async function onSubmit(e) {
        e.preventDefault();
        
        const title = form.title.value;
        const description = form.description.value;
        const imgUrl = form.imageUrl.value;
    
        try {
            if (title == '' || description == '' || imageUrl == '') {
                throw new Error('All fields are required!');
            }
    
            const { token } = JSON.parse(sessionStorage.getItem('userData'));
    
            const options = {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token
                },
                body: JSON.stringify({title, description, imgUrl})
            }
            await fetch(`http://localhost:3030/data/movies/${id}`, options);
            
            form.reset();
            showDetails(id);
        } catch(err) {
            alert(err.message);
        }
    }
}

