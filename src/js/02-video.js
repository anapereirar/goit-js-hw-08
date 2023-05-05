import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

    const iframe = document.querySelector('iframe');
    const player = new Player(iframe);

    const currentTime = localStorage.getItem("videoplayer-current-time");

    player.setCurrentTime(currentTime).then().catch((error) => {
        switch (error.name) {
            case 'RangeError':
                console.log('the time was less than 0 or greater than the video’s duration');
                break;
    
            default:
                console.log('some other error occurred');
                break;
        }
    });

    player.on('timeupdate', throttle(() => {
        player.getCurrentTime().then((seconds) => {
            localStorage.setItem("videoplayer-current-time", seconds)
        }).catch((error) => {
            console.log('Ha ocurrido un error!');
        });
    }, 1000));

