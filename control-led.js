const socket = io('http://localhost:3000');
    const led = document.getElementById('led');
    const led2 = document.getElementById('led2');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    led.addEventListener('click', () => {
      led.classList.toggle('off');
      const isOn = !led.classList.contains('off');
      console.log('LED Clicked, State: ', isOn);
      socket.emit('ledState', { led: 1, state: isOn });
    });

    led2.addEventListener('click', () => {
      led2.classList.toggle('off');
      const isOn2 = !led2.classList.contains('off');
      console.log('LED2 Clicked, State: ', isOn2);
      socket.emit('ledState', { led: 2, state: isOn2 });
    });