const floaterSet = [
    { char: 'א', name: 'אָלֶף', unicodeName: 'Alef' },
    { char: 'בּ', name: 'בֵּית', unicodeName: 'Bet' },
    { char: 'גּ', name: 'גִּימֵל', unicodeName: 'Gimel' },
    { char: 'דּ', name: 'דָּלֶת', unicodeName: 'Dalet' },
    { char: 'ה', name: 'הֵא', unicodeName: 'He' },
    { char: 'ו', name: 'וָו', unicodeName: 'Vav' },
    { char: 'ז', name: 'זַיִן', unicodeName: 'Zayin' },
    { char: 'ח', name: 'חֵית', unicodeName: 'Chet' },
    { char: 'ט', name: 'טֵית', unicodeName: 'Tet' },
    { char: 'י', name: 'יוֹד', unicodeName: 'Yod' },
    { char: 'יא', name: 'יוֹדאָלֶף', unicodeName: 'Yod Alef' },
    { char: 'יבּ', name: 'יוֹדבֵּית', unicodeName: 'Yod Bet' },
]
const clockFaceQuery = document.querySelector('#clock-face')

floaterSet.forEach((item, index) => {
    var floaterDiv = document.createElement('div')
    floaterDiv.id = 'clock-floater-' + index
    floaterDiv.className = 'clock-floater'
    floaterDiv.textContent = item.name
    floaterDiv.style.fontSize = '55px'
    floaterDiv.style.transform = 'rotate('+ ((index + 1) * 360 / floaterSet.length) +'deg)'
    floaterDiv.setAttribute('data-unicode-name', item.unicodeName)
    clockFaceQuery.appendChild(floaterDiv)
})

const getElementAngularPosition = (domElement) => {
    let styles = window.getComputedStyle(domElement, null)
    let transformationStyles = styles.getPropertyValue("-webkit-transform") || 
        st.getPropertyValue("-moz-transform") || 
        st.getPropertyValue("-ms-transform") || 
        st.getPropertyValue("-o-transform") || 
        st.getPropertyValue("transform") || 
        'none'

    if (transformationStyles != 'none') {
        let geometric = transformationStyles.split('(')[1].split(')')[0].split(',')
        let angle = 180 * Math.atan2(geometric[1], geometric[0]) / Math.PI

        return angle
    }

    return 0
}

const setElementAngularPosition = (domElement, angle) => {
    domElement.style.webkitTransform = 'rotate('+ angle +'deg)'
    domElement.style.mozTransform = 'rotate('+ angle +'deg)'
    domElement.style.msTransform = 'rotate('+ angle +'deg)'
    domElement.style.oTransform = 'rotate('+ angle +'deg)'
    domElement.style.transform = 'rotate('+ angle +'deg)'
}

const rotateElement = (domElement, additionalAngle) => {
    let currentAngle = getElementAngularPosition(domElement)
    let newAngle = currentAngle + additionalAngle
    setElementAngularPosition(domElement, newAngle)
}

const highlightFloater = (index) => {
    var floaterDiv = document.getElementById('clock-floater-' + index)
    // floaterDiv.style.webkitAnimation = 'text-magic 0.8s linear'
    // floaterDiv.style.mozAnimation = 'text-magic 0.8s linear'
    // floaterDiv.style.msAnimation = 'text-magic 0.8s linear'
    // floaterDiv.style.oAnimation = 'text-magic 0.8s linear'
    // floaterDiv.style.animation = 'text-magic 0.8s linear'
    // setInterval(() => {
    //     floaterDiv.style.webkitAnimation = null
    //     floaterDiv.style.mozAnimation = null
    //     floaterDiv.style.msAnimation = null
    //     floaterDiv.style.oAnimation = null
    //     floaterDiv.style.animation = null
    // }, 1000)
    var clockHourChangePlayer = document.getElementById('clock-hour-change')
    clockHourChangePlayer.play()
    clockHourChangePlayer.addEventListener('ended', () => {

    })
}

const run = () => {
    var minuteHand = document.getElementsByClassName('minute-hand')[0]
    var hourHand = document.getElementsByClassName('hour-hand')[0]
    const minuteHandSpeed = 0.6
    const hourHandSpeed = minuteHandSpeed / 12

    var minuteHandCurrentPosition = getElementAngularPosition(minuteHand)
    var minuteHandNextPosition = minuteHandCurrentPosition + minuteHandSpeed
    var hourHandCurrentPosition = getElementAngularPosition(hourHand)
    hourHandCurrentPosition = Math.round(hourHandCurrentPosition)
    
    if (minuteHandCurrentPosition <= 180 && minuteHandNextPosition >= 180) {
        let floaterSetIndex = null

        if (hourHandCurrentPosition == -180 || hourHandCurrentPosition == 180) {
            floaterSetIndex = 11
        } else if (hourHandCurrentPosition == 0) {
            floaterSetIndex = 5
        } else {
            floaterSetIndex = hourHandCurrentPosition / 30 + 5
        }

        highlightFloater(floaterSetIndex)
    }

    rotateElement(minuteHand, minuteHandSpeed)
    rotateElement(hourHand, hourHandSpeed)
}

setInterval(() => run(), 30)
