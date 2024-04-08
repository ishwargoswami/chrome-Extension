document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const timeInput = document.getElementById("time");
    const setReminderButton = document.getElementById("set-reminder");
    const statusDiv = document.getElementById("status");
  
    setReminderButton.addEventListener("click", function () {
      const taskDescription = taskInput.value;
      const reminderTime = new Date(timeInput.value).getTime();
      const currentTime = new Date().getTime();
  
      if (taskDescription && reminderTime > currentTime) {
        const timeUntilReminder = reminderTime - currentTime;
        setTimeout(function () {
          statusDiv.textContent = `Reminder: ${taskDescription}`;
          alert(`Reminder: ${taskDescription}`); // Show a popup alert message
        }, timeUntilReminder);
        statusDiv.textContent = "Reminder set successfully"; // Add this line
      } else {
        statusDiv.textContent = "Invalid input or time!";
      }
    });
  });
  