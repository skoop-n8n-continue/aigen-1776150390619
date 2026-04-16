(function() {
    const TOTAL_TIME = 8 * 60 * 60; // 8 hours in seconds
    const timerElement = document.getElementById('timer');
    const progressBar = document.getElementById('progress-bar');

    let endTime;
    const storedEndTime = localStorage.getItem('countdown_end_time');
    const currentTime = Math.floor(Date.now() / 1000);

    if (storedEndTime && parseInt(storedEndTime) > currentTime) {
        endTime = parseInt(storedEndTime);
    } else {
        endTime = currentTime + TOTAL_TIME;
        localStorage.setItem('countdown_end_time', endTime.toString());
    }

    function updateTimer() {
        const now = Math.floor(Date.now() / 1000);
        const remaining = Math.max(0, endTime - now);

        const hours = Math.floor(remaining / 3600);
        const minutes = Math.floor((remaining % 3600) / 60);
        const seconds = remaining % 60;

        timerElement.textContent =
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        // Update progress bar
        const progress = (remaining / TOTAL_TIME) * 100;
        progressBar.style.width = `${progress}%`;

        if (remaining <= 0) {
            clearInterval(interval);
            timerElement.textContent = "00:00:00";
            document.querySelector('.status').textContent = "Countdown Finished";
            localStorage.removeItem('countdown_end_time');
        }
    }

    const interval = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call
})();
