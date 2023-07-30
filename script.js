// Function to update the clock time and check for alarms
function updateTime() {
  // Get the current date and time
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let period = 'AM';

  // Convert hours to 12-hour format and set AM/PM period
  if (hours >= 12) {
    period = 'PM';
    hours = hours - 12;
  }
  if (hours == 0) {
    hours = 12;
  }

  // Create a time string and display it in the "clock" element
  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById("clock").textContent = timeString;

  // Check if any alarms match the current time and trigger the alarm if so
  checkAlarms(hours, minutes, seconds, period);
}

// Function to format single-digit time values with a leading zero
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Function to check alarms against the current time and trigger them if matched
function checkAlarms(hours, minutes, seconds, period) {
  const alarms = document.getElementsByClassName("alarm");

  for (let i = 0; i < alarms.length; i++) {
    const alarm = alarms[i];
    const alarmTime = alarm.dataset.time.split(/:|\s/);
    const alarmHours = parseInt(alarmTime[0]);
    const alarmMinutes = parseInt(alarmTime[1]);
    const alarmSeconds = parseInt(alarmTime[2]);
    const alarmAmPm = alarmTime[3];

    // If the alarm matches the current time, display an alert and remove the alarm element
    if (hours === alarmHours && minutes === alarmMinutes && seconds === alarmSeconds && period === alarmAmPm) {
      alert("Alarm!");
      alarm.remove();
    }
  }
}

// Function to create a new alarm element and add it to the list of alarms
function createAlarmElement(time) {
  const alarmElement = document.createElement("div");
  alarmElement.className = "alarm";
  alarmElement.textContent = time;
  alarmElement.dataset.time = time;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "btn btn-danger";

  // Add event listener to delete the alarm when the "Delete" button is clicked
  deleteButton.addEventListener("click", function () {
    alarmElement.remove();
  });

  alarmElement.appendChild(deleteButton);
  return alarmElement;
}

// Function to set a new alarm based on the user input
function setAlarm() {
  const hourInput = document.getElementById("hour");
  const minuteInput = document.getElementById("minute");
  const secondInput = document.getElementById("second");

  // Parse user inputs for the alarm time
  const hour = parseInt(hourInput.value);
  const minute = parseInt(minuteInput.value);
  const second = parseInt(secondInput.value);
  const ampm = document.getElementById("ampm").value;

  let isValid = true;

  // Validate the hour, minute, and second inputs
  if (isNaN(hour) || hour < 1 || hour > 12) {
    hourInput.classList.add("error");
    isValid = false;
  } else {
    hourInput.classList.remove("error");
  }

  if (isNaN(minute) || minute < 0 || minute > 59) {
    minuteInput.classList.add("error");
    isValid = false;
  } else {
    minuteInput.classList.remove("error");
  }

  if (isNaN(second) || second < 0 || second > 59) {
    secondInput.classList.add("error");
    isValid = false;
  } else {
    secondInput.classList.remove("error");
  }

  // If all inputs are valid, create the alarm element and add it to the list of alarms
  if (isValid) {
    const timeString = `${hour}:${formatTime(minute)}:${formatTime(second)} ${ampm}`;
    const alarmElement = createAlarmElement(timeString);
    document.getElementById("alarms").appendChild(alarmElement);

    // Clear input fields
    hourInput.value = '';
    minuteInput.value = '';
    secondInput.value = '';
  }
}

// Add event listener to the "Set Alarm" button to call the setAlarm function
document.getElementById("setAlarmBtn").addEventListener("click", setAlarm);

// Update the clock time every second by calling the updateTime function
setInterval(updateTime, 1000);
