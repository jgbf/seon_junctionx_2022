
const hide_all_stat = () => {
    map.setLayoutProperty('facebook',  'visibility', 'none')
    map.setLayoutProperty('facebook-text','visibility', 'none')
    map.setLayoutProperty('netflix','visibility', 'none')
    map.setLayoutProperty('netflix-text','visibility', 'none')
    map.setLayoutProperty('github','visibility', 'none')
    map.setLayoutProperty('github-text','visibility', 'none')
    map.setLayoutProperty('instagram','visibility', 'none')
    map.setLayoutProperty('instagram-text','visibility', 'none')
    map.setLayoutProperty('linkedin','visibility', 'none')
    map.setLayoutProperty('linkedin-text','visibility', 'none')
}

const change = () => {
    const actual_id = document.getElementById('select3').getElementsByClassName('select-selected')[0].innerText.toLowerCase()
    hide_all_stat()

    map.setLayoutProperty(actual_id,'visibility', 'visible')
    map.setLayoutProperty(`${actual_id}-text`,'visibility', 'visible')
}

document.getElementById('select3').addEventListener('click', change)
