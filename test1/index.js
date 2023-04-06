const inputEl = document.querySelector('input')
const buttonEl = document.querySelector('button')
const timerEl = document.querySelector('span')

const createTimerAnimator = () => {
	return () => {
		timerEl.classList.add('animation')
	}
}

const animateTimer = createTimerAnimator()

inputEl.addEventListener('input', e => {
	const seconds = e.target.value.replace(/\D/g, '')
	inputEl.value = seconds
	setTimer(seconds)
})

buttonEl.addEventListener('click', () => {
	const seconds = Number(inputEl.value)

	animateTimer()

	timer(seconds, setTimer)

	inputEl.value = ''
})

function setTimer(time) {
	const hours = Math.floor(time / 60 / 60)
	const minutes = Math.floor((time / 60) % 60)
	const seconds = Math.floor(time % 60)

	const formatHours = String(hours).length === 1 ? `0${hours}` : hours
	const formatMinutes = String(minutes).length === 1 ? `0${minutes}` : minutes
	const formatSeconds = String(seconds).length === 1 ? `0${seconds}` : seconds

	timerEl.textContent = `${formatHours}:${formatMinutes}:${formatSeconds}`

	if (time <= 0) {
		timerEl.classList.remove('animation')
		return
	}

	return true
}

function timer(time, callback) {
	setTimeout(() => {
		const newTime = time - 1
		const res = callback(newTime)
		if (!res) return
		timer(newTime, callback)
	}, 1000)
}
