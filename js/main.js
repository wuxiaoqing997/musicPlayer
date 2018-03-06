let musicList = [{
	name: "不二臣",
	singer: "徐秉龙",
	from: "不二臣",
	src: "music/徐秉龙 - 不二臣.mp3",
	pic: "music_pic/0.jpg",
}, {
	name: "童话镇",
	singer: "陈一发儿",
	from: "童话镇",
	src: "music/陈一发儿 - 童话镇.mp3",
	pic: "music_pic/1.jpg",
}, {
	name: "半情歌",
	singer: "元若蓝",
	from: "滚石30周年",
	src: "music/元若蓝 - 半情歌.mp3",
	pic: "music_pic/2.jpg",
}, {
	name: "异乡人",
	singer: "李健",
	from: "想念你",
	src: "music/李健 - 异乡人.mp3",
	pic: "music_pic/3.jpg",
}]

let a = e('#id-audio-player')
function setInfo(info){
	let name = e('#name')
	let from = e('#from')
	let author = e('#author')
	name.innerHTML = `${info.name}`
	from.innerHTML = `${info.from}`
	author.innerHTML = `${info.singer}`
}
function canAduioPlay() {
    let play = e('#on')
    let pic = e('#head')
    bindEvent(a, 'canplay', function() {
        a.play()
        a.volume = 0.45
        toggleClass(pic,'picture-rotate')
        showPlayTime()
        if (!(window.timer2 === undefined)) {
            console.log('timer2')
            clearInterval(timer2)
        }
        progressBarShow()
        play.classList.add('fa-pause')
        play.classList.remove('fa-play')
    })
}
function showPlayTime() {
	let current = e('#current')
    let duration = e('#time')
    let timeTotal = parseInt(a.duration)
    let timeCurrent = parseInt(a.currentTime)
    if (timeTotal > 59) {
        if (parseInt(a.duration % 60) > 10) {
            duration.innerHTML = `${parseInt(a.duration/60)}:${parseInt(a.duration % 60)}`
        } else {
            duration.innerHTML = `${parseInt(a.duration/60)}:0${parseInt(a.duration % 60)}`
        }
    } else {
        if (parseInt(a.duration % 60) > 10) {
            duration.innerHTML = `0:${parseInt(a.duration % 60)}`
        }
        duration.innerHTML = `0:0${parseInt(a.duration % 60)}`
    }

    timer1 = setInterval(function() {
        if (parseInt(a.currentTime) > 59) {
            if (parseInt(a.currentTime % 60) > 9) {
                current.innerHTML = `${parseInt(a.currentTime/60)}:${parseInt(a.currentTime%60)}`
            } else {
                current.innerHTML = `${parseInt(a.currentTime/60)}:0${parseInt(a.currentTime%60)}`
            }
        } else {
            if (a.currentTime > 9) {
                current.innerHTML = `0:${parseInt(a.currentTime)}`
            } else {
                current.innerHTML = `0:0${parseInt(a.currentTime)}`
            }
        }
    }, 1000)
}

function progressBarShow() {
    timer2 = setInterval(() => {
        let mDuration = parseInt(a.duration)
        let mCurrentTime = parseInt(a.currentTime)
        //console.log('progressBarShow', parseInt(100 * (mCurrentTime / mDuration)))
        let progress = e('#progress')
        progress.style.width = parseInt(100 * (mCurrentTime / mDuration)) + "%"
       // console.log('progressBar', `progressBar.style = ${progress.style.width}`)
    }, 1000)

}
function pauseOrPlay(){
	let play = e('#on')
	let pic = e('#head')
	log(play,'s')
	bindEvent(play, 'click', function() {
		let statu = play.dataset.statu
		log(statu)
		if(statu == 0){
	        a.play()
	        play.dataset.statu = 1
	        pic.classList.add('picture-rotate')
	        showPlayTime()
	        play.classList.add('fa-pause')
        	play.classList.remove('fa-play')
	        progressBarShow()
	        log(play.dataset.statu,'a')
	    }
	    if(statu == 1) {
	    	log(statu,'5555')
	    	a.pause()
	    	play.dataset.statu = 0
	        pic.classList.remove('picture-rotate')
	        clearInterval(timer1)
	        play.classList.remove('fa-pause')
        	play.classList.add('fa-play')
	        clearInterval(timer2)
	    }
	})
}
function changeMusic() {
    let next = e('#back')
    let play = e('#on')
    let pic = e('#head')
    bindEvent(next, 'click', function() {
    	pic.classList.add('picture-rotate')
        let num = Number(a.dataset.num)
        let len = musicList.length
        log(num,'num1')
        if (num == len - 1) {
        	a.src = musicList[0].src
        	a.dataset.num = 0
        	num = 0
        }else{
	        a.src = musicList[num + 1].src
	        a.dataset.num = num + 1
	        num = a.dataset.num
        }
        pic.src = musicList[num].pic
        setInfo(musicList[num])
        canAduioPlay()
        play.classList.add('fa-pause')
        play.classList.remove('fa-play')
    })
    let pre = e('#pre')
    bindEvent(pre, 'click', function() {
		pic.classList.add('picture-rotate')
    	let num = a.dataset.num
        let len = musicList.length
        log(num)
        if (num == 0) {
            a.src = musicList[len - 1].src
            a.dataset.num = len -1
            num = len - 1
        } else {
            a.src = musicList[(num - 1) ].src
            a.dataset.num = (num - 1) 
            num = (num - 1) % len
        }
        pic.src = musicList[num].pic
        setInfo(musicList[num])
        canAduioPlay()
        play.classList.remove('fa-pause')
        play.classList.add('fa-play')
    })
}
function autoNext() {
    bindEvent(a, 'ended', function() {
        log('autoNext')
        let pic = e('#head')
        let num = a.dataset.num
        let len = musicList.length
        if (num > len) {
        	a.src = musicList[0].src
        	a.dataset.num = 0
        	num = 0
        }
        else{
	        a.src = musicList[(num + 1) % musicList.length].src
	        a.dataset.num = (num + 1) % musicList.length
	        num = a.dataset.num
        }
        pic.src = musicList[num].pic
        setInfo(musicList[num])
        canAduioPlay()
    })
}
function ramdomNext(){
	bindEvent(a, 'ended', function() {
		let len = musicList.length
		let index = Math.ceil(Math.random()*len) - 1
        log(index)
        let num = a.dataset.num
        a.src = musicList[index].src
	    num = index
 		pic.src = musicList[num].pic
        setInfo(musicList[num])
        canAduioPlay()
	})
}
function changeVolume(){
	let add = e('#add')
	let minus = e('#minus')
	let volume = e('#vioce_pro')
	bindEvent(add, 'click', function() {
		log('add')
		a.volume += 0.01
		let width = volume.clientWidth
		log(width)
		volume.style.width = (width + 1) + 'px' 
	})
	bindEvent(minus, 'click', function() {
		log('minus')
		a.volume -= 0.01
		let width = volume.clientWidth
		volume.style.width = (width - 1) + 'px' 
	})
}
function playModel(){
	let list = e('#list')
	let random = e('#random')
	let recycle = e('#recycle')
	log('dd')
	bindEvent(list, 'click', function() {
		removeClassAll('active')
		removeClassAll('normal')
		list.classList.add('active')
		random.classList.add('normal')
		recycle.classList.add('normal')
		autoNext()
	})
	bindEvent(random, 'click', function() {
		ramdomNext()
		removeClassAll('active')
				removeClassAll('normal')
		random.classList.add('active')
		list.classList.add('normal')
		recycle.classList.add('normal')
	})
	bindEvent(recycle, 'click', function() {
		removeClassAll('active')
		removeClassAll('normal')
		recycle.classList.add('active')
		list.classList.add('normal')
		random.classList.add('normal')
		toggleClass(recycle,'active')
		let pic = e('#head')
        let num = a.dataset.num
        bindEvent(a, 'ended', function() {
        	a.src = musicList[num].src
        	canAduioPlay()
        })
	})

}
function main(){
	canAduioPlay()
	showPlayTime()
	progressBarShow()
	pauseOrPlay()
	changeMusic()
	playModel()
	changeVolume()
}
main()
