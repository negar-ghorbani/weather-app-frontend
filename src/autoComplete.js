function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const autoCompleteApi = () => {
    const locationInput = document.getElementById('location');
    if (locationInput.value.length >= 3) {
        fetch(`${process.env.API_HOST}/api/autoComplete?location=${locationInput.value}`)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('data', JSON.stringify(data));
                showSuggestions(data)
            }
            );
    }
}

function showSuggestions(data) {
    const suggestions = document.querySelector('.suggestions ul');
    suggestions.innerHTML = '';

    if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
            let item = data[i].name;
            item = item.replace(item, `<strong>${item}</strong>`);
            suggestions.innerHTML += `<li>${item}</li>`;
        }
        suggestions.classList.add('has-suggestions');
    } else {
        data = [];
        suggestions.innerHTML = '';
        suggestions.classList.remove('has-suggestions');
    }
}

function useSuggestion(e) {
    const suggestions = document.querySelector('.suggestions ul');
    const input = document.querySelector('#location');
    input.value = e.target.innerText;
    input.focus();
    suggestions.innerHTML = '';
    suggestions.classList.remove('has-suggestions');
    weatherApi();
}

const apiCall = debounce(() => autoCompleteApi(), 500);
window.onload = () => {
    const suggestions = document.querySelector('.suggestions ul');
    const input = document.querySelector('#location');
    suggestions.addEventListener('click', useSuggestion);
}

