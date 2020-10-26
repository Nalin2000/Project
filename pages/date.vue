<template>
  <div id="clock">
    <p class="date">{{ date }}</p>
    <p class="time">{{ time }}</p>
    <p class="text">DIGITAL CLOCK with Vue.js</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: '',
      date: '',
    }
  },
  mounted() {
    const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    // eslint-disable-next-line no-unused-vars
    const timerID = setInterval(updateTime, 1000)
    updateTime()
    function updateTime() {
      const cd = new Date()
      // eslint-disable-next-line no-undef
      clock.time =
        // eslint-disable-next-line no-undef
        zeroPadding(cd.getHours(), 2) +
        ':' +
        // eslint-disable-next-line no-undef
        zeroPadding(cd.getMinutes(), 2) +
        ':' +
        // eslint-disable-next-line no-undef
        zeroPadding(cd.getSeconds(), 2)
      // eslint-disable-next-line no-undef
      clock.date =
        // eslint-disable-next-line no-undef
        zeroPadding(cd.getFullYear(), 4) +
        '-' +
        // eslint-disable-next-line no-undef
        zeroPadding(cd.getMonth() + 1, 2) +
        '-' +
        // eslint-disable-next-line no-undef
        zeroPadding(cd.getDate(), 2) +
        ' ' +
        week[cd.getDay()]
    }

    function zeroPadding(num, digit) {
      let zero = ''
      for (let i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    }
  },
}
</script>
<style>
.p {
  margin: 0;
  padding: 0;
}
#clock {
  color: #000000;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #000000;
  text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);
}
</style>
